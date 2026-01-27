import React, { useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";

type PopupProps = {
    show?: any;
    handleClose?: any;
};
const AddVisitorPopup: React.FC<PopupProps> = ({
    show,
    handleClose,
}) => {
    const intl = useIntl();
    const [modalHShow, setModalHShow] = useState<boolean>(false);
    const showSuccessAlert = () => {
        Swal.fire({
            timer: 2000,
            text: intl.formatMessage({ id: "AddedSuccessfully" }),
            icon: "success",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: { confirmButton: "btn btn-primary" },
        });
    };
    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <Modal.Header
                    closeButton
                    style={{
                        alignItems: intl.locale == "ar" ? "flex-start" : "center",
                        flexDirection: intl.locale == "en" ? "column-reverse" : "row",
                    }}
                >
                    <div className="card-header w-100 px-1 d-flex justify-content-center pb-2 border-0  mt-10">
                        <Modal.Title>
                            <h3 className="card-title flex-column align-items-center">
                                <span className="card-label fw-bolder fs-3 mb-2 ">
                                    {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                                </span>
                            </h3>
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body
                >
                    <div className="row">
                        <div className="col-sm-4 col-12 my-2">
                            <div className="mb-4">
                                <label htmlFor="VisitorName" className="mb-2 required">
                                    {intl.formatMessage({ id: "VisitorName" })}
                                </label>
                                <div className="input-group position-relative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user fs-2"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" id="VisitorName" placeholder={intl.formatMessage({ id: "VisitorName" })} />
                                    <div
                                        className="position-absolute translate-middle-y"
                                        style={{
                                            top: "50%",
                                            left: intl.locale == "ar" ? "15px" : "",
                                            right: intl.locale == "en" ? "15px" : "",
                                        }}
                                    >
                                        <i
                                            className="bi bi-diagram-3 cursor-pointer fs-1 text-muted"
                                            onClick={() => setModalHShow(true)}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12 my-2">
                            <div className="mb-4">
                                <label htmlFor="IDNumber" className="mb-2 required">
                                    {intl.formatMessage({ id: "IDNumber" })}
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="far fa-id-card fs-2"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" id="IDNumber" placeholder={intl.formatMessage({ id: "IDNumber" })} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12 my-2">
                            <div className="mb-4">
                                <label htmlFor="PhoneNumber" className="mb-2 required">
                                    {intl.formatMessage({ id: "PhoneNumber" })}
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-phone fs-2"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" id="PhoneNumber" placeholder={intl.formatMessage({ id: "PhoneNumber" })} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12 my-2">
                            <div className="mb-4">
                                <label htmlFor="WhatsAppNumber" className="mb-2 required">
                                    {intl.formatMessage({ id: "WhatsAppNumber" })}
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fab fa-whatsapp fs-2"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" id="WhatsAppNumber" placeholder={intl.formatMessage({ id: "WhatsAppNumber" })} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12 my-2">
                            <div className="mb-4">
                                <label htmlFor="Email" className="mb-2 required">
                                    {intl.formatMessage({ id: "Email" })}
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope fs-2"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" id="Email" placeholder={intl.formatMessage({ id: "Email" })} />
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className="justify-content-center py-2">
                    <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                        <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                            <div className="d-flex justify-content-center align-items-center w-50">
                                <div
                                    onClick={handleClose}
                                    className="btn btn-secondary mx-1 text-center w-100"
                                >
                                    {intl.formatMessage({ id: "Cancel" })}
                                </div>
                                <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-success mx-1 text-center w-100"
                                    style={{ border: "none" }}
                                    onClick={() => {
                                        handleClose();
                                        showSuccessAlert();
                                    }}
                                >
                                    {intl.formatMessage({ id: "Add" })}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>

            </Modal>
            <ManagementHierarchyPopup
                show={modalHShow}
                handleClose={() => setModalHShow(false)}
            />
        </>
    );
};

export default AddVisitorPopup;
