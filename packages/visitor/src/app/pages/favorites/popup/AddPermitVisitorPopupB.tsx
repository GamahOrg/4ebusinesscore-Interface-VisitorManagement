import React from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

type PopupProps = {
    show?: any;
    handleClose?: any;
};
const AddPermitVisitor: React.FC<PopupProps> = ({
    show,
    handleClose,
}) => {
    const intl = useIntl();
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
                                    {intl.formatMessage({ id: "AddPermitVisitor" })}
                                </span>
                            </h3>
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body
                >

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
        </>
    );
};

export default AddPermitVisitor;
