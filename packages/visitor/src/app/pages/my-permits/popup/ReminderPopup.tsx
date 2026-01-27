import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch } from "react-redux";
import { PermissionListModel } from "../../../model/permission-list-model";
import { Notification } from "@4eplatform/shared/services/notifications";
import { fetchRoles, fetchUserRoles } from "../../../redux/roles-slice";
import { useAppSelector, RootState } from "../../../redux/store";
import {
  fetchMyPermissions,
  putPermissionReminder,
} from "../../../redux/permissions-list-slice";

type PopupProps = {
  show: boolean;
  handleClose: any;
  permit?: any;
  pageIndexForMember?: number;
  pageSizeForMember?: number;
};
export const ReminderPopup: FC<PopupProps> = ({
  show,
  handleClose,
  permit,
  pageIndexForMember,
  pageSizeForMember,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  useEffect(() => {
    let params: any = {
      pageSize: "100000",
      pageNumber: "1",
    };
    dispatch(fetchRoles(params) as any);
  }, []);
  let roles = useAppSelector((state: RootState) => {
    return state?.roles?.roles;
  });
  let usersInRole = useAppSelector((state: RootState) => {
    return state?.roles?.usersInRole;
  });
  let roleIdForCommitteesManager = roles?.find((item: any) => {
    return (
      item?.nameAr == "مدير الخدمه" ||
      item?.nameAr == "مدير الخدمة" ||
      item?.nameAr == "مدير تصاريح حياكم"
    );
  })?.id;
  useEffect(() => {
    if (roleIdForCommitteesManager) {
      dispatch(
        fetchUserRoles({ id: roleIdForCommitteesManager, myparams: {} }) as any,
      );
    }
  }, [roleIdForCommitteesManager]);

  //setting status for notifcation work space key == 53
  const memberParams: any = {
    pagesize: pageSizeForMember || 10,
    pageIndex: pageIndexForMember || 1,
  };

  const handleReminder = () => {
    dispatch(putPermissionReminder({ id: permit?.permissionID }) as any);
    usersInRole?.forEach((user: any) => {
      Notification.permitReminder(
        user?.userId,
        `/visitormanagement/permissions-Permits/view-permit/visitor-workspace/${permit?.vistorId}`,
        89,
        "",
        user?.email,
        true,
        222,
        new Date(),
        "تذكير موافقة",
        "تذكير موافقة",
        "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
        "",
      );
    });
    showSuccessAlert(true, "ReminderedSuccessfully", intl, () => {
      dispatch(fetchMyPermissions(memberParams) as any);
    });
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
                    {intl.formatMessage({ id: "ConfrimationPermitRemind" })}
                  </h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>

        <Modal.Body className="pb-0">
          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>{intl.formatMessage({ id: "AreYouSureToRemindPermit" })}</h5>
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
                      handleReminder();
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
