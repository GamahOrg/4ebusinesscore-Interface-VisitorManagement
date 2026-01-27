import { FC } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

type ApprovalPopupProps = {
  show?: any;
  handleClose?: any;
  permit?: any;
};

export const ViolationPopup: FC<ApprovalPopupProps> = ({
  show,
  handleClose,
  permit
}) => {
  const intl = useIntl();

  const showSuccessAlert = (message: string) => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: `${message}` }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  return (
    <>
      <Modal centered show={show} onHide={handleClose} size="lg">
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <Modal.Title className="w-100 d-flex align-items-center justify-content-center">
              <h2 className="card-title d-flex justify-content-center align-items-center flex-column">
                <h2 className="card-label fs-4 my-5 ">
                  {" "}
                  {intl.formatMessage({ id: "PermitCancellationReason" })}
                </h2>
              </h2>
            </Modal.Title>
          </Modal.Header>
          <form id="kt_modal_new_target_form" className="form" action="#">
            <Modal.Body className="pb-5 mx-4">
              <div className="my-6 text-muted ">
                {" "}
                {intl.formatMessage({
                  id: "TheViolation",
                })}
              </div>
              <div className="my-6 text-danger ">{permit?.violationtype || intl.formatMessage({ id: "NotFound" })}</div>
              <div className="my-6 text-black ">
                {permit?.reason || intl.formatMessage({ id: "NotFound" })}
              </div>
            </Modal.Body>
          </form>
        </div>
      </Modal>
    </>
  );
};
