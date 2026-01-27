import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "react-bootstrap";

interface AccessDeniedProps {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (data: { comment: string }) => void;
    isLoading?: boolean;
}

const schema = yup.object({
    comment: yup.string().required("Comment is required"),
});

const AccessDenied = ({ show, handleClose, onSubmit = () => { }, isLoading = false }: AccessDeniedProps) => {
    const intl = useIntl();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{intl.formatMessage({ id: "AccessDenied" })}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label required">
                            {intl.formatMessage({ id: "Comment" })}
                        </label>
                        <textarea
                            className={"form-control"}
                            rows={4}
                            {...register("comment")}
                        />
                        {errors.comment && (
                            <div className="text-danger mt-1">
                                {intl.formatMessage({ id: "CommentIsRequired" })}
                            </div>
                        )}
                    </div>
                    <div className="text-end mt-4">
                        <button type="button" className="btn btn-light me-3" onClick={handleClose}>
                            {intl.formatMessage({ id: "Cancel" })}
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {intl.formatMessage({ id: "Loading" })}
                                </>
                            ) : (
                                intl.formatMessage({ id: "Submit" })
                            )}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AccessDenied;
