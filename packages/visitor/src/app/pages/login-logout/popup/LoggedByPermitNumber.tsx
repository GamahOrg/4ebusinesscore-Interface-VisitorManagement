import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type AddPopupProps = {
    show?: boolean;
    handleClose?: () => void;
    getPermitDetails?: any
};

interface FormInputs {
    permitNumber: string;
}

const schema = yup.object({
    permitNumber: yup.string().required('Permit number is required')
}).required();


const LoggedByPermitNumber: React.FC<AddPopupProps> = ({
    show,
    handleClose,
    getPermitDetails
}) => {
    const intl = useIntl();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormInputs , e:any ) => {
        e.preventDefault();
        // onVisitorDetails?.(data.permitNumber);
        getPermitDetails(data?.permitNumber);
        reset();
        // Reset form after submission
    };

    const handleCancel = () => {
        reset();
        handleClose?.();
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
                                        <span className="card-label fs-4 my-5">
                                            {" "}
                                            {intl.formatMessage({ id: "RegisterWithThePermitNumber" })}
                                        </span>
                                    </h3>
                                </Modal.Title>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="form outputForm" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                                        <label
                                            htmlFor="Indicatorname"
                                            className="form-label px-2 fontSz-6"
                                        >
                                            {intl.formatMessage({ id: "PermitNumber" })}
                                            <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                {...register("permitNumber")}
                                                type="text"
                                                className="form-control w-100"
                                                placeholder={intl.formatMessage({
                                                    id: "EnterThePermitNumber",
                                                })}
                                            />
                                            {errors.permitNumber && (
                                                <div className="text-danger mt-1">
                                                    {intl.formatMessage({ id: "PermitNumberRequired" })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <div className="d-flex justify-content-start w-100">
                                <button
                                    type="button"
                                    className="btn btn-outline-dark me-3 px-20"
                                    onClick={handleCancel}
                                >
                                    {intl.formatMessage({ id: "Back" })}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ paddingLeft: "120px", paddingRight: "120px" }}
                                onClick={(e) => handleSubmit(onSubmit)(e)}
                                >
                                    <span className="indicator-label">
                                        {" "}
                                        {intl.formatMessage({ id: "Inspect" })}
                                    </span>
                                </button>
                            </div>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
            <div
                className="modal fade"
                id="Rega_modal_viewEmployee_hierarchy"
                aria-hidden="true"
            >
            </div>
        </>
    );
};

export default LoggedByPermitNumber;
