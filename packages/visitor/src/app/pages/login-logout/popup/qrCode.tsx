import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import QrCodeImage from "@4eplatform/gateway/public/media/QrCode.png"
import VisitorDetails from './visitorDetails';
import AccessDenied from "./AccessDenied";
import LoggedByPermitNumber from "./LoggedByPermitNumber";
import { useDispatch, useSelector } from "react-redux"
import { getPermissionbyVistorid } from "../../../redux/violation-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";


type AddPopupProps = {
    show?: any;
    handleClose?: any;
    handleCloseLogin?: any;
    searchText: string;
    selectedDate: string;
    isTransit: boolean;
    transitStatus: number;
};


const QrCode: React.FC<AddPopupProps> = ({
    show,
    handleClose,
    handleCloseLogin,
    searchText, selectedDate, isTransit, transitStatus
}) => {
    const intl = useIntl();

    const [modalHShow, setModalHShow] = useState<boolean>(false);


    const [ShowVisitorDetails, setShowVisitorDetails] = useState(false);
    const [showAccessDenied, setShowAccessDenied] = useState(false);
    const [showLoggedByPermitNumbers, setLoggedByPermitNumbers] = useState(false);
    const dispatch = useDispatch();


    const getPermitDetails = (permitNumber: any) => {
        let params = { Visitor_ID: permitNumber };
        dispatch(getPermissionbyVistorid(params) as any).then((res: any) => {

            if (res.payload.message === "NoPermissionFound") {
                showSuccessAlert(false, "PermissionNotAvailable", intl);
            } else {
                setShowVisitorDetails(true);
            }

        })

    };


    const handleCloseVisitorDetails = () => {
        setShowVisitorDetails(false);
    };

    const handleShowAccessDenied = () => {
        setShowAccessDenied(true);
    };

    const handleCloseAccessDenied = () => {
        setShowAccessDenied(false);
    };
    const handleShowLoggedByPermitNumbers = () => {
        setLoggedByPermitNumbers(true);
    };

    const handleCloseLoggedByPermitNumbers = () => {
        setLoggedByPermitNumbers(false);
    };



    const [filter, setFilter] = useState<any>({
        courseName: "",
    });


    let handleCancel = () => {
        setFilter({
            courseName: "",
        });
        handleClose();
    };





    return (
        <>
            <div className="modal fade" aria-hidden="true">
                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={handleClose}
                >
                    <div className="card">
                        <Modal.Header
                            closeButton
                            className="p-5"
                            style={{
                                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
                                padding: "0px",
                            }}
                        >
                            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                                <Modal.Title>
                                    <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                                        <span className="card-label fw-bolder fs-1 my-5">
                                            {intl.formatMessage({ id: "ChooseTheRegistrationMethod" })}
                                        </span>
                                    </h3>
                                </Modal.Title>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="form outputForm">
                                <div className="row">
                                    <div className="paragraph rounded p-5"
                                        style={{ backgroundColor: "#F5F8FA" }}>
                                        <img src={QrCodeImage} width="460px" height="300px" />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <div>
                                <button
                                    className="btn btn-primary m-0   px-20 w-100 mb-4"
                                    onClick={getPermitDetails}
                                >
                                    {intl.formatMessage({ id: "ScanTheCode" })}
                                </button>
                                <button
                                    className="btn btn-outline-primary w-100 m-0 "
                                    style={{ paddingLeft: "120px", paddingRight: "120px" }}
                                    onClick={handleShowLoggedByPermitNumbers}
                                >
                                    <span className="indicator-label">
                                        {intl.formatMessage({ id: "RegisterWithPermitNumber" })}
                                    </span>
                                </button>
                            </div>
                        </Modal.Footer>

                    </div>
                </Modal>

                <VisitorDetails
                    show={ShowVisitorDetails}
                    handleClose={handleCloseVisitorDetails}
                    onAccessDenied={handleShowAccessDenied}
                    handleCloseLoggedByPermitNumbers={handleCloseLoggedByPermitNumbers}
                    handleCloseLogin={handleCloseLogin}
                    searchText={searchText}
                    selectedDate={selectedDate}
                    isTransit={isTransit}
                    transitStatus={transitStatus}

                />

                <AccessDenied
                    show={showAccessDenied}
                    handleClose={handleCloseAccessDenied}
                />

                <LoggedByPermitNumber
                    show={showLoggedByPermitNumbers}
                    handleClose={handleCloseLoggedByPermitNumbers}
                    getPermitDetails={getPermitDetails}
                />
            </div>

        </>
    );
};

export default QrCode;
