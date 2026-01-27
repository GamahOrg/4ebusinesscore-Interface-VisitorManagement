import React, { useEffect, useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import AccessDenied from "./AccessDenied";
import { useDispatch, useSelector } from "react-redux"
import { createCheckIn, fetchCheckInById, fetchCheckInList, updateCheckIn } from "../../../redux/check-in-slice";
import { RootState } from "../../../redux/store";
import moment from "moment-timezone";
import 'moment/locale/ar';
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import Swal from "sweetalert2";

type AddPopupProps = {
    show?: any;
    handleClose?: any;
    onAccessDenied?: any;
    handleCloseLoggedByPermitNumbers?: any
    handleCloseLogin?: any
    searchText: string;
    selectedDate: string;
    isTransit: boolean;
    transitStatus: any;
};

const visitorDetails: React.FC<AddPopupProps> = ({
    show,
    handleClose,
    onAccessDenied,
    handleCloseLoggedByPermitNumbers,
    handleCloseLogin,
    searchText, selectedDate, isTransit, transitStatus
}) => {
    const intl = useIntl();
    const [showAccessDenied, setShowAccessDenied] = useState(false);
    const [isAccessLoading, setIsAccessLoading] = useState(false);
    const [isAccessDeniedLoading, setIsAccessDeniedLoading] = useState(false);

    const translateErrorMessage = (message: string): string => {
       
        if (message.includes("Cannot read properties of undefined (reading 'data')")) {
            return intl.formatMessage({ id: "CantReadData" });
        } else if (message.includes("Cannot read properties of undefined")) {
            return intl.formatMessage({ id: "CantReadData" });
        } else if (message.includes("This Permission Is Not Vaild :(") ){
            return intl.formatMessage({ id: "PermissionNotValid" });
        } else if (message.includes("Network Error") || message.includes("network")) {
            return intl.formatMessage({ id: "NetworkError" });
        } else if (message.includes("timeout")) {
            return intl.formatMessage({ id: "TimeoutError" });
        } else if (message.includes("404") || message.includes("Not Found")) {
            return intl.formatMessage({ id: "NotFound" });
            
        }
        else if ( message.includes("): This Permission Is Not Valid")) {
            return intl.formatMessage({ id: "PermissionNotvalid" });
            
        }
        else if (message.includes("500") || message.includes("Internal Server Error")) {
            return intl.formatMessage({ id: "ServerError" });
        } else if (message.includes("403") || message.includes("Forbidden")) {
            return intl.formatMessage({ id: "AccessDenied" });
        } else if (message.includes("401") || message.includes("Unauthorized")) {
            return intl.formatMessage({ id: "Unauthorized" });
        }
        
        
        return message;
    };

   
    const showAlertAboveModals = (status: boolean, message: string) => {
        let displayMessage;
        
        if (status) {
            
            if (message === "CheckPassed") {
                displayMessage = intl.formatMessage({ id: "CheckPassed" });
            } else if (message === "DeniedSuccessfully") {
                displayMessage = intl.formatMessage({ id: "DeniedSuccessfully" });
            } else if (message === "CheckOutPassed") {
                displayMessage = intl.formatMessage({ id: "CheckOutPassed" });
            }
            
            else {
                displayMessage = message;
            }
        } else {
            
            displayMessage = translateErrorMessage(message);
        }
        
        Swal.fire({
            text: displayMessage,
            icon: status ? "success" : "error",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                confirmButton: "btn btn-primary",
                container: "swal2-container-high-zindex"
            },
            didOpen: () => {
                // Set high z-index for the alert container and backdrop
                const swalContainer = document.querySelector('.swal2-container');
                const swalBackdrop = document.querySelector('.swal2-backdrop');
                const swalPopup = document.querySelector('.swal2-popup');
                
                if (swalContainer) {
                    (swalContainer as HTMLElement).style.zIndex = '999999';
                    (swalContainer as HTMLElement).style.position = 'fixed';
                }
                if (swalBackdrop) {
                    (swalBackdrop as HTMLElement).style.zIndex = '999998';
                }
                if (swalPopup) {
                    (swalPopup as HTMLElement).style.zIndex = '999999';
                }
            }
        });
    };

    const handleAccessDeniedSubmit = (data: { comment: string }) => {
        setIsAccessDeniedLoading(true);
        dispatch(createCheckIn({
            params: {
                visitorid: permitDetails?.visitorId,
                isTransit: false,
                comment: data.comment
            }
        }) as any).then((res: any) => {
            
            const alertMessage = res?.payload?.message || "Unknown response";
            const isSuccess = res?.payload?.message === "CheckPassed";
            
           
            showAlertAboveModals(isSuccess, alertMessage);

            if (res?.payload?.message === "CheckPassed") {
                const params = {
                    pageSize: 10,
                    pageNamber: 1,
                    isTransit,
                    transitStatus,
                    ...(searchText && { search: searchText }),
                    ...(selectedDate && { date: selectedDate })
                }
                dispatch(fetchCheckInList(params) as any)
                handleClose();
                handleCloseLoggedByPermitNumbers();
                handleCloseLogin();
                setShowAccessDenied(false);
            }
        }).catch((error: any) => {
           
            const errorMessage = error?.message || "An error occurred";
            showAlertAboveModals(false, errorMessage);
        }).finally(() => {
            setIsAccessDeniedLoading(false);
        });
    };

    const handlePermissionStatus = (status: number | string) => {
        switch (status) {
            case 0:
                return { className: "badge-light-warning text-warning", value: "UnderRevision" };
            case 1:
                return { className: "badge-light-primary text-primary-original", value: "Continued" };
            case 2:
                return { className: "badge-light-success text-success", value: "Acceptable" };
            case 3:
                return { className: "badge-light-danger text-danger", value: "Canceled" };
            case 4:
                return { className: "badge-secondary text-dark", value: "Finished" };
            case 5:
                return { className: "badge-light-danger text-danger", value: "Rejected" };
            default:
                return { className: "text-dark", value: "NotFound" };
        }
    };


    const dispatch = useDispatch();

    const { selectedCheckIn } = useSelector((state: RootState) => state.checkIn)

    const permitDetails = useSelector((state: RootState) => {
        return state?.violation?.visitorDetails;
    });

    const handleAccess = (state?: boolean) => {
        setIsAccessLoading(true);
        if (!permitDetails?.inside) {
            dispatch(createCheckIn({
                params: {
                    visitorid: permitDetails?.visitorId,
                    isTransit: state
                }
            }) as any).then((res: any) => {
         
                const alertMessage = res?.payload?.message || "Unknown response";
                const isSuccess = res?.payload?.message === "CheckPassed";
                
                
                showAlertAboveModals(isSuccess, alertMessage);

                if (res?.payload?.message === "CheckPassed") {
                    const params = {
                        pageSize: 10,
                        pageNamber: 1,
                        isTransit,
                        transitStatus,
                        ...(searchText && { search: searchText }),
                        ...(selectedDate && { date: selectedDate })
                    }
                    dispatch(fetchCheckInList(params) as any)
                    handleClose();
                    handleCloseLoggedByPermitNumbers();
                    handleCloseLogin();
                }
            }).catch((error: any) => {
              
                const errorMessage = error?.message || "An error occurred";
                showAlertAboveModals(false, errorMessage);
            }).finally(() => {
                setIsAccessLoading(false);
            })
        } else {
            dispatch(updateCheckIn({
                id: permitDetails?.visitorId,
            }) as any).then((res: any) => {
              
                const alertMessage = res?.payload?.message || "Unknown response";
                const isSuccess = res?.payload?.message === "CheckOutPassed";
                
             
                showAlertAboveModals(isSuccess, alertMessage);

                if (res?.payload?.message === "CheckOutPassed") {
                    const params = {
                        pageSize: 10,
                        pageNamber: 1,
                        isTransit,
                        transitStatus,
                        ...(searchText && { search: searchText }),
                        ...(selectedDate && { date: selectedDate })
                    }
                    dispatch(fetchCheckInList(params) as any)
                    handleClose();
                    handleCloseLoggedByPermitNumbers();
                    handleCloseLogin();
                }
            }).catch((error: any) => {
              
                const errorMessage = error?.message || "An error occurred";
                showAlertAboveModals(false, errorMessage);
            }).finally(() => {
                setIsAccessLoading(false);
            })
        }
    }

    return (
        <>
            <style>
                {`
                    .swal2-container-high-zindex {
                        z-index: 999999 !important;
                    }
                    .swal2-backdrop {
                        z-index: 999998 !important;
                    }
                    .swal2-popup {
                        z-index: 999999 !important;
                    }
                `}
            </style>
            <Modal
                // size="lg"
                show={show}
                onHide={handleClose}
                centered
                aria-labelledby="contained-modal-title-vcenter"
                className="visitor-details-modal"
            >
                <Modal.Header
                    closeButton
                    style={{
                        alignItems: intl.locale === "ar" ? "flex-start" : "center",
                        flexDirection: intl.locale === "en" ? "column-reverse" : "row",
                    }}
                    className=""
                >
                    <div className="card-header mt-2 d-flex justify-content-center w-100 px-2 border-bottom-0">
                        <Row className="">
                            <Col xs={12}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    <div className="text-center fw-bold">
                                        <h2> {intl.formatMessage({ id: "DeclarationData" })}</h2>
                                    </div>
                                </Modal.Title>
                            </Col>
                        </Row>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="InProgress"
                        style={{ backgroundColor: "#009EF70D" }}>
                        <h4 className="text-primary text-center py-4">{intl.formatMessage({ id: handlePermissionStatus(permitDetails?.permissionStatus)?.value })}</h4>
                    </div>
                    <div className=" mb-8 p-4"
                      >
                        <p className="text-success m-3 fs-4">#{permitDetails?.permissionNumber}</p>
                        <p className="mb-4 fs-5"><b>{permitDetails?.visitorName}</b></p>
                        <p className="mb-4 text-muted">{intl.formatMessage({ id: "IdentityNumber" })}<span className="text-dark ms-2"><b>{permitDetails?.visitorNID}</b></span></p>
                        <p className="mb-4 text-muted">{intl.formatMessage({ id: "VisitDestination" })}<span className="text-dark ms-2"><b>{permitDetails?.orgName}</b></span></p>
                        <p className="mb-4 text-muted">{intl.formatMessage({ id: "visitReceiver" })}:<span className="text-dark ms-2"><b>{permitDetails?.receivedVisiting}</b></span></p>
                        <p className="mb-4 text-muted">{intl.formatMessage({ id: "StatementType" })}:<span className="text-dark ms-2"><b>{intl.locale == "ar" ? permitDetails?.permissionTypeAr ? permitDetails?.permissionTypeAr : intl.formatMessage({ id: "NotFound" }) : permitDetails?.permissionTypeEn ? permitDetails?.permissionTypeEn : intl.formatMessage({ id: "NotFound" })}</b></span></p>
                        <p className="mb-4 text-muted">{intl.formatMessage({ id: "PermitStatus" })}:<span className="text-dark ms-2"><b>  {intl.formatMessage({ id: handlePermissionStatus(permitDetails?.permissionStatus)?.value })}</b></span></p>

                        <div className="card bg-light w-100 mt-3 p-4 rounded">
                            <p className="mb-4 text-muted">{intl.formatMessage({ id: "AuthorizedEntryDate:" })}</p>
                            <div className="d-flex flex-start">
                                <div className="text-muted">
                                    {" "}
                                    {intl.formatMessage({ id: "FromDate" })} :{" "}
                                </div>
                                <div
                                    style={{ fontWeight: 900 }}
                                    className="me-4 text-bold fs-6 text-dark"
                                >
                                    {/* {moment(permitDetails?.startDate).local().format('D MMMM YYYY')} */}
                                    {moment
                                        .tz(permitDetails?.startDate, "UTC")
                                        .tz(
                                            Intl.DateTimeFormat().resolvedOptions().timeZone
                                        )
                                        .locale(intl.locale)
                                        .format("DD MMMM YYYY")}
                                </div>
                                <div className="mx-5">
                                    <i className="fas fa-long-arrow-alt-left text-primary"></i>
                                </div>
                                <div className="text-muted">
                                    {" "}
                                    {intl.formatMessage({ id: "ToDate" })} :{" "}
                                </div>
                                <div
                                    style={{ fontWeight: 900 }}
                                    className="me-4 text-bold fs-6 text-dark"
                                >
                                    {/* {moment(permitDetails?.endDate).local().format('D MMMM YYYY')} */}
                                    {moment
                                        .tz(permitDetails?.endDate, "UTC")
                                        .tz(
                                            Intl.DateTimeFormat().resolvedOptions().timeZone
                                        )
                                        .locale(intl.locale)
                                        .format("DD MMMM YYYY")}
                                </div>
                            </div>
                        </div>
                        <div className="card bg-light w-100 mt-3  p-4 rounded">
                            <p className="mb-4 text-muted">{intl.formatMessage({ id: "AuthorizedEntryTime" })}</p>
                            <div className="d-flex flex-start">
                                <div className="text-muted">
                                    <i className="far fa-clock"></i>
                                </div>
                                <div
                                    style={{ fontWeight: 900 }}
                                    className="me-4 text-bold fs-6 text-dark"
                                >
                                    {
                                        moment(permitDetails?.startTime, "HH:mm:ss")
                                            .locale(intl.locale)
                                            .format("hh:mm A")
                                    }
                                </div>
                                <div className="mx-5">
                                    <i className="fas fa-long-arrow-alt-left text-primary"></i>
                                </div>
                                <div
                                    style={{ fontWeight: 900 }}
                                    className="me-4 text-bold fs-6 text-dark"
                                >
                                    {
                                        moment(permitDetails?.endTime, "HH:mm:ss")
                                            .locale(intl.locale)
                                            .format("hh:mm A")
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className="mb-5">
                    {permitDetails?.inside ? <div className="d-flex justify-content-center w-100"> <button
                        className="btn btn-danger px-20 py-1"
                        onClick={() => {
                            handleAccess()
                        }}
                        disabled={isAccessLoading}
                    >
                        <span className="indicator-label">
                            {isAccessLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {intl.formatMessage({ id: "Loading" })}
                                </>
                            ) : (
                                intl.formatMessage({ id: "Logout" })
                            )}
                        </span>
                    </button>
                    </div> : <div className="d-flex justify-content-start w-100">
                        <button
                            className="btn btn-primary flex-grow-1 py-3"
                            onClick={() => {
                                handleAccess(true)
                            }}
                            disabled={isAccessLoading}
                        >
                            {isAccessLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {intl.formatMessage({ id: "Loading" })}
                                </>
                            ) : (
                                intl.formatMessage({ id: "AccessGranted" })
                            )}
                        </button>
                        <button
                            className="btn btn-danger flex-grow-1 py-3"
                            onClick={() => setShowAccessDenied(true)}
                            disabled={isAccessDeniedLoading}
                        >
                            <span className="indicator-label">
                                {isAccessDeniedLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        {intl.formatMessage({ id: "Loading" })}
                                    </>
                                ) : (
                                    intl.formatMessage({ id: "AccessDenied" })
                                )}
                            </span>
                        </button>
                    </div>}

                </Modal.Footer>
            </Modal>
            <AccessDenied
                show={showAccessDenied}
                handleClose={() => setShowAccessDenied(false)}
                onSubmit={handleAccessDeniedSubmit}
                isLoading={isAccessDeniedLoading}
            />

        </>
    );
};

export default visitorDetails;
