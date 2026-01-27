import React, { useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

type PopupProps = {
    show?: any;
    handleClose?: any;
};
const CancelPermitPopupSingle: React.FC<PopupProps> = ({
    show,
    handleClose,
}) => {
    const [showViolation, setShowViolation] = useState(false)
    const [showOtherReason, setShowOtherReason] = useState(false)
    const intl = useIntl();
    const showSuccessAlert = () => {
        Swal.fire({
            timer: 2000,
            text: intl.formatMessage({ id: "CanceledSuccessfully" }),
            icon: "success",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: { confirmButton: "btn btn-primary" },
        });
    };

    const handleRadioChange = (e: { target: { value: string; }; }) => {
        if (e.target.value === "violation") {
            setShowViolation(true)
            setShowOtherReason(false);
        } else if (e.target.value === "otherReason") {
            setShowViolation(false)
            setShowOtherReason(true);
        }
    }
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
                                    {intl.formatMessage({ id: "CancelPermit" })}
                                </span>
                            </h3>
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <label className="mb-2">
                            <span>{intl.formatMessage({ id: "CancelReason" })}</span>
                        </label>
                        <div className="card bg-light py-4">
                            <div className="d-flex">
                                <div>
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        id="violation"
                                        className="form-check-input mx-2"
                                        value="violation"
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="BarcodeRadio" >
                                        {intl.formatMessage({ id: "Violation" })}
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        id="otherReason"
                                        className="form-check-input mx-2"
                                        value="otherReason"
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="SerialRadio" >
                                        {intl.formatMessage({ id: "OtherReason" })}
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        {showViolation && <div>
                            <label className="mb-2">
                                <span>{intl.formatMessage({ id: "RecordedViolation" })}</span>
                            </label>
                            <select
                                id="ConfidentialityType"
                                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                                data-placeholder="اختر"
                                tabIndex={-1}
                                aria-hidden="true"
                            >
                                <option disabled selected>
                                    {intl.formatMessage({ id: "DamageInTheFacility" })}
                                </option>
                            </select>
                        </div>}
                        {showOtherReason && <div>
                            <label className="mb-2">
                                <span>{intl.formatMessage({ id: "CancelReason" })}</span>
                            </label>
                            <textarea
                                className='form-control bg-light '
                                rows={5}
                                placeholder={intl.formatMessage({ id: "EnterTheReason" })}
                            ></textarea>
                        </div>}
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
                                    className="btn btn-danger mx-1 text-center w-100"
                                    style={{ border: "none" }}
                                    onClick={() => {
                                        handleClose();
                                        showSuccessAlert();
                                    }}
                                >
                                    {intl.formatMessage({ id: "Cancel" })}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CancelPermitPopupSingle;
