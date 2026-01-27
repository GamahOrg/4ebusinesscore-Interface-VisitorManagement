import { FC } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

type ApprovalPopupProps = {
  show?: any;
  handleClose?: any;
};

export const ReasonPopup: FC<ApprovalPopupProps> = ({ show, handleClose }) => {
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
              <div className="my-6 text-black ">
                هو ببساطة نص شكلي بمعني أن الفاية هي الشكل و ليس المحتوي و
                يستخدم في صناعة المطابع و دور النشر ولا يوال المعيار للنص الشكلي
                منذ الثؤن الخامس عشر
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <div className="d-flex pt-12">
                <button
                  type="reset"
                  className="btn btn-light me-3"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {intl.formatMessage({ id: "Back" })}
                </button>

                <button
                  type="submit"
                  className="btn btn-danger me-3"
                  onClick={(event) => {
                    event.preventDefault();
                    handleClose();
                    showSuccessAlert("RejectionSuccessfully");
                  }}
                >
                  <span className="indicator-label">
                    {" "}
                    {intl.formatMessage({ id: "RequestRejection" })}
                  </span>
                </button>
                <button
                  type="submit"
                  className="btn btn-success "
                  onClick={(event) => {
                    event.preventDefault();
                    handleClose();
                    showSuccessAlert("AcceptedSuccessfully");
                  }}
                >
                  <span className="indicator-label">
                    {" "}
                    {intl.formatMessage({ id: "AcceptRequest" })}
                  </span>
                </button>
              </div>
            </Modal.Footer> */}
          </form>
        </div>
      </Modal>
    </>
  );
};
