import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { FC, useEffect, useState } from "react";
import { PermitTableSomeGroupList } from "../components/permit-table-some-group-list";
import {
  getAdditionPermissionsRequests,
  getRenewalPermissionsGroupRequests,
  getVisitorPermissionGroup,
  updateVisitorPermissionStatus,
} from "../../../redux/visitor-permission-slice";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { sendHayakmNotificationToVisitor } from "../../../redux/visitor-slice";
import { VisitorRootUrl } from "@4eplatform/shared/apis/visitor";
import { v4 as uuidv4 } from "uuid";

type ApprovalPopupProps = {
  show?: any;
  handleClose?: any;
  permit: any;
  tabName?: string;
  pageIndexGroup?: number;
  pageSizeGroup?: number;
};
interface State {
  [key: number]: boolean;
}
type Action = { type: "toggle"; id: number };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.id]: !state[action.id] };
    default:
      throw new Error();
  }
}
const initialState = {};
export const ApprovalSomeGroupPopup: FC<ApprovalPopupProps> = ({
  show,
  handleClose,
  permit,
  tabName,
  pageIndexGroup,
  pageSizeGroup,
}) => {
  const intl = useIntl();
  const [selectedPermits, setSelectedPermits] = useState([]);
  let newUserId = uuidv4();
  let loggedInUserId = localStorage.getItem("userId");
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as any);
  let loggedInUserFullName =
    userInfo?.firstName +
    " " +
    userInfo?.secondName +
    " " +
    userInfo?.thirdName +
    " " +
    userInfo?.forthName;

  const dispatch = useDispatch();

  // to handle seding multiple ids in searchParams
  const params = new URLSearchParams();
  selectedPermits.forEach((permitId) => {
    params.append("Id", permitId);
  });
  params.append("PutPermissionStatus", "2");
  const queryString = params.toString();

  const handleApproval = () => {
    const params: any = {
      pageSize: pageSizeGroup,
      pageIndex: pageIndexGroup,
    };
    if (selectedPermits.length == 0) {
      showSuccessAlert(false, "YouDidntSelectAnyPermit", intl);
    } else {
      if (tabName == "PermitApplications") {
        dispatch(updateVisitorPermissionStatus(queryString) as any as any).then(
          (res: any) => {
            dispatch(
              getVisitorPermissionGroup({ ...params, status: 0 }) as any
            );
            if (
              res.payload.message == "Visitor status updated successfully" ||
              res?.payload?.message == "Visitor status updated successfully"
            ) {
              res?.payload?.result?.forEach((item: any) => {
                let { visitorName, qrCodeUrl, orgName, email } = item;
                let notificationData = {
                  title: "تفاصيل الزياره",
                  titleEn: "visiting details",
                  messageAr: "تم قبول التصريح الخاص بك",
                  messageEn: "Your permission is accepted",
                  senderId: loggedInUserId,
                  receiverId: newUserId,
                  receiverEmail: email,
                  settingStatus: 31,
                  actionUrl: "",
                  workspaceKey: 202,
                  workspaceKeyTo: 89,
                  sendSignalR: true,
                  visitorName: visitorName,
                  qrCode: VisitorRootUrl + qrCodeUrl,
                  date: new Date().toISOString()?.split("T")[0],
                  address: orgName,
                  name: loggedInUserFullName,
                  phone: "",
                };
                dispatch(
                  sendHayakmNotificationToVisitor(notificationData) as any
                );
              });
              showSuccessAlert(true, "AcceptedSuccessfully", intl);
            } else if (
              res.payload.message === "You Can't Do This .." ||
              res?.payload?.message == "You can't do this."
            ) {
              showSuccessAlert(
                false,
                "YouAreNotAuthorizedToApproveTheApplication",
                intl
              );
            }
          }
        );
      } else if (tabName == "AdditionPermits") {
        dispatch(updateVisitorPermissionStatus(queryString) as any as any).then(
          (res: any) => {
            dispatch(
              getAdditionPermissionsRequests({ ...params, status: 1 }) as any
            );
            if (
              res.payload.message == "Visitor status updated successfully" ||
              res?.payload?.message == "Visitor status updated successfully"
            ) {
              res?.payload?.result?.forEach((item: any) => {
                let { visitorName, qrCodeUrl, orgName, email } = item;
                let notificationData = {
                  title: "تفاصيل الزياره",
                  titleEn: "visiting details",
                  messageAr: "تم قبول التصريح الخاص بك",
                  messageEn: "Your permission is accepted",
                  senderId: loggedInUserId,
                  receiverId: newUserId,
                  receiverEmail: email,
                  settingStatus: 31,
                  actionUrl: "",
                  workspaceKey: 202,
                  workspaceKeyTo: 89,
                  sendSignalR: true,
                  visitorName: visitorName,
                  qrCode: VisitorRootUrl + qrCodeUrl,
                  date: new Date().toISOString()?.split("T")[0],
                  address: orgName,
                  name: loggedInUserFullName,
                  phone: "",
                };
                dispatch(
                  sendHayakmNotificationToVisitor(notificationData) as any
                );
              });
              showSuccessAlert(true, "AcceptedSuccessfully", intl);
            } else if (
              res.payload.message === "You Can't Do This .." ||
              res?.payload?.message == "You can't do this."
            ) {
              showSuccessAlert(
                false,
                "YouAreNotAuthorizedToApproveTheApplication",
                intl
              );
            }
          }
        );
      } else if (tabName == "PermitRenewal") {
        dispatch(updateVisitorPermissionStatus(queryString) as any as any).then(
          (res: any) => {
            dispatch(
              getRenewalPermissionsGroupRequests({ ...params, status: 2 }) as any
            );
            if (
              res.payload.message == "Visitor status updated successfully" ||
              res?.payload?.message == "Visitor status updated successfully"
            ) {
              res?.payload?.result?.forEach((item: any) => {
                let { visitorName, qrCodeUrl, orgName, email } = item;
                let notificationData = {
                  title: "تفاصيل الزياره",
                  titleEn: "visiting details",
                  messageAr: "تم قبول التصريح الخاص بك",
                  messageEn: "Your permission is accepted",
                  senderId: loggedInUserId,
                  receiverId: newUserId,
                  receiverEmail: email,
                  settingStatus: 31,
                  actionUrl: "",
                  workspaceKey: 202,
                  workspaceKeyTo: 89,
                  sendSignalR: true,
                  visitorName: visitorName,
                  qrCode: VisitorRootUrl + qrCodeUrl,
                  date: new Date().toISOString()?.split("T")[0],
                  address: orgName,
                  name: loggedInUserFullName,
                  phone: "",
                };
                dispatch(
                  sendHayakmNotificationToVisitor(notificationData) as any
                );
              });
              showSuccessAlert(true, "AcceptedSuccessfully", intl);
            } else if (
              res.payload.message === "You Can't Do This .." ||
              res?.payload?.message == "You can't do this."
            ) {
              showSuccessAlert(
                false,
                "YouAreNotAuthorizedToApproveTheApplication",
                intl
              );
            }
          }
        );
      }
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose} size="xl">
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="mb-13">
                  <h1 className="mb-3 text-center">
                    {intl.formatMessage({ id: "AcceptanceConfirmation" })}
                  </h1>
                  <h1 className="mb-3 text-center">
                    <i
                      className="fas fa-check-circle text-success"
                      style={{ fontSize: "64px" }}
                    ></i>
                  </h1>
                  <div className="text-muted fw-bold fs-5"></div>
                </div>
              </Modal.Title>
            </div>
          </Modal.Header>

          <form id="kt_modal_new_target_form" className="form" action="#">
            <Modal.Body className="pb-0 mx-4">
              <div
                className="table-responsive mb-3"
                style={{ maxHeight: "250px" }}
              >
                <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                  <thead>
                    <tr className="fw-bolder projectSecColor">
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted"></th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitNumber" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "VisitorName" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitReason" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "AuthorizingAuthority" })}
                      </th>

                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitSource" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "visitReceiver" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitStatus" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permit?.permissionDto?.map((permission: any) =>
                      permission.visitorDto?.map((visitor: any, index: any) => {
                        const modifiedVisitor = {
                          permissionType: permission?.permissionType,
                          permissionSource: permission?.permissionSource,
                          permissionCode: visitor?.visitorCode,
                          orgId: permission?.orgId,
                          recivedId: permission?.recivedId,
                          orgName: permission?.orgName,
                          recivedName: permission?.recivedName,
                          visitorName: visitor?.visitorName,
                          userId: visitor?.userId,
                          permissionStatus: visitor?.permissionStatus,
                          visitorId: visitor?.visitorId,
                          permissionID: permission?.permissionId,
                        };

                        return (
                          <tr key={index}>
                            <PermitTableSomeGroupList
                              permit={modifiedVisitor}
                              setSelectedPermits={setSelectedPermits}
                            />
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
              <div className="d-flex justify-content-center ">
                <button
                  className="btn btn-secondary px-15 me-5"
                  onClick={handleClose}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={(event) => {
                    event.preventDefault();
                    handleClose();
                    handleApproval();
                  }}
                >
                  {intl.formatMessage({ id: "AcceptanceConfirmation" })}
                </button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};
