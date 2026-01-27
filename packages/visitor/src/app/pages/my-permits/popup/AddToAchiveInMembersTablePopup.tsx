import { FC } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch } from "react-redux";
import {
  addArchiveForMember,
  fetchAllPermissionList,
} from "../../../redux/permissions-list-slice";
import { PermissionListModel } from "../../../model/permission-list-model";

type PopupProps = {
  show: boolean;
  handleClose: any;
  permit?: PermissionListModel;
  pageIndexForMember?: number;
  pageSizeForMember?: number;
};
export const AddToAchiveInMembersTablePopup: FC<PopupProps> = ({
  show,
  handleClose,
  permit,
  pageIndexForMember,
  pageSizeForMember,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let handleAddArchive = () => {
    let formData = new FormData();
    formData.append("Visitor_id", permit?.vistorId as string);
    formData.append("IsArchive", "true");
    try {
      dispatch(addArchiveForMember(formData) as any).then((res: any) => {
        if (res?.payload?.statusEnum == 3) {
          handleClose();
          showSuccessAlert(true, "ArchivedSuccessfully", intl, () => {
            let params = {
              pagesize: pageSizeForMember,
              pageIndex: pageIndexForMember,
            };
            dispatch(fetchAllPermissionList(params) as any);
          });
        } else if (res?.payload?.message) {
          handleClose();
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      });
    } catch (error) {}
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Row className="justify-content-center mt-5 mb-10">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h3>
                    {intl.formatMessage({ id: "ArchivingConfirmationMessage" })}
                  </h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>

        <Modal.Body className="pb-0">
          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>{intl.formatMessage({ id: "AreYouSureToArchivePermit" })}</h5>
            </div>
          </Row>
        </Modal.Body>

        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-80"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Back" })}
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      handleClose();
                      handleAddArchive();
                    }}
                    className="  btn btn-success me-5 w-100 fs-12 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Yes" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Yes" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
