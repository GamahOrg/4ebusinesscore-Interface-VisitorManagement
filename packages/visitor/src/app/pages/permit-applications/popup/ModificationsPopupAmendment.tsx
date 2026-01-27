import { FC, Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux"
import { getEditedPermission, getEditedPermissionById, getEditedPermissionGroup, updateEditedPermissionRequest } from "../../../redux/edited-permission-slice";
import { RootState } from "../../../redux/store";
import moment from 'moment';
import { Attachment } from "../../../model/edited-permission-model";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { handlePermissionSource } from "../utils/permitApplicationUtil";
import { v4 as uuidv4 } from "uuid";
import { sendHayakmNotificationToVisitor } from "../../../redux/visitor-slice";


type ApprovalPopupProps = {
  show?: any;
  handleClose?: any;
  permit: any;
  type?: string;
  pageIndexMember?: number;
  pageSizeMember?: number;
  pageIndexGroup?: number;
  pageSizeGroup?: number;
};

export const ModificationsPopupAmendment: FC<ApprovalPopupProps> = ({
  show,
  handleClose,
  permit,
  type,
  pageIndexMember,
  pageSizeMember,
  pageIndexGroup,
  pageSizeGroup,
}) => {
  const intl = useIntl();

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
  useEffect(() => {
    dispatch(getEditedPermissionById(permit.editedId) as any)
  }, [permit?.visitorId])

  const { editedPermission } = useSelector((state: RootState) => state.editedPermission)


  const memberParams: any = {
    pageSize: pageSizeMember,
    pageIndex: pageIndexMember,
  };
  const groupParams: any = {
    pageSize: pageSizeGroup,
    pageIndex: pageIndexGroup,
  };

  const handleEditRequest = (status: number) => {
    dispatch(updateEditedPermissionRequest({ editedId: editedPermission?.editId, status }) as any).then((res: any) => {
      if (res.payload.message == "Visitor status updated successfully") {
        res?.payload?.result?.forEach((item: any) => {
          let { visitorName, qrCodeUrl, orgName, email } = item;
          let notificationData = {
            title: "تفاصيل الزياره",
            titleEn: "visiting details",
            messageAr:status==1?"تم قبول التصريح الخاص بك":"تم رفض التصريح الخاص بك",
            messageEn:status==1?"Your permission is accepted": "Your permission is rejected",
            senderId: loggedInUserId,
            receiverId: newUserId,
            receiverEmail: email,
            settingStatus: status==1?31:32,
            actionUrl: "",
            workspaceKey: 202,
            workspaceKeyTo: 89,
            sendSignalR: true,
            visitorName: visitorName,
            qrCode: status==1?VisitorRootUrl + qrCodeUrl:"",
            date: new Date().toISOString()?.split("T")[0],
            address: orgName,
            name: loggedInUserFullName,
            phone: "",
          };
          dispatch(
            sendHayakmNotificationToVisitor(notificationData) as any
          );
        });
        status === 1 ? showSuccessAlert(true, "AcceptedSuccessfully", intl) : showSuccessAlert(true, "RejectedSuccessfully", intl)
        type === "Person" ? dispatch(getEditedPermission(memberParams) as any) : dispatch(getEditedPermissionGroup(groupParams) as any)
      } else if (res.payload.message == "You Can't Do This ..") {
        status === 1 ? showSuccessAlert(false, "YouAreNotAuthorizedToApproveTheApplication", intl) : showSuccessAlert(false, "YouAreNotAuthorizedToRejectTheApplication", intl)
      } else {
        status === 1 ? showSuccessAlert(false, "ApprovalFailed", intl) : showSuccessAlert(false, "RejectionFailed", intl)
      }
    })
  }



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
          >
            <Modal.Title className="w-100 d-flex align-items-center justify-content-center">
              <h2 className="card-title d-flex justify-content-center align-items-center flex-column">
                <h2 className="card-label fs-4 my-5 ">

                  {intl.formatMessage({ id: "ViewModifications" })}
                </h2>
              </h2>
            </Modal.Title>
          </Modal.Header>
          <form id="kt_modal_new_target_form" className="form" action="#">
            <Modal.Body className="pb-5 mx-4">
              <div className="text-muted d-flex align-items-center ">
                <h6 className="text-black m-0">
                  {intl.formatMessage({
                    id: "RequestToAmendPermitInformation",
                  })}
                </h6>
                <span className="mx-2 text-muted">( {permit?.permissionCode}# )</span>
              </div>
              <div className="d-flex align-items-center justify-content-between my-6">
                <div className="text-muted d-flex align-items-center ">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "Administrator",
                    })}
                  </h6>
                  <span className="mx-2 text-black">: {editedPermission?.responsibleName}</span>
                </div>
                <div className="text-muted d-flex align-items-center ">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "ChangeRequestTime",
                    })}{" "}
                    :{" "}
                  </h6>
                  <span className="mx-2 text-black">
                    {editedPermission?.editDate
                      ? moment(editedPermission.editDate, 'MM/DD/YYYY HH:mm:ss').locale('ar').format('dddd | hh:mm A | D MMMM YYYY')
                      : intl.formatMessage({ id: "NotFound" })}
                  </span>
                </div>
              </div>
              <h5 className="text-black my-6">
                {" "}
                {intl.formatMessage({
                  id: "Modifications",
                })}
              </h5>
              <div className="d-flex flex-column gap-4">
                {(editedPermission?.startDate || editedPermission?.endDate) && <div className="text-muted d-flex align-items-center ">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "PermitStartDate"
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.startDate ? moment(editedPermission?.startDate).format("YYYY-MM-DD") : intl.formatMessage({ id: "NoEditFound" })}</span>
                  <i className="fas fa-long-arrow-alt-left fs-3 text-muted mx-2"></i>
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "PermitEndDate",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.endDate ? moment(editedPermission?.endDate).format("YYYY-MM-DD") : intl.formatMessage({ id: "NoEditFound" })}</span>
                </div>}

                {(editedPermission?.startTime || editedPermission?.endTime) && <div className="text-muted d-flex align-items-center">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "FromHour",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.startTime ? moment(editedPermission?.startTime, 'HH:mm:ss').format('HH:mm') : intl.formatMessage({ id: "NoEditFound" })} </span>
                  <i className="fas fa-long-arrow-alt-left fs-3 text-muted mx-2"></i>
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "ToHour",
                    })}
                    :{" "}
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.endTime ? moment(editedPermission?.endTime, 'HH:mm:ss').format('HH:mm') : intl.formatMessage({ id: "NoEditFound" })}</span>
                </div>}


                {editedPermission?.visitorName && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "VisitorName",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.visitorName} </span>
                </div>}

                {editedPermission?.visitorNID && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "IDNumber",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.visitorNID} </span>
                </div>}

                {editedPermission?.receivedVisiting && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "visitReceiver",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.receivedVisiting} </span>
                </div>}

                {editedPermission?.orgName && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "AuthorizingAuthority",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.orgName} </span>
                </div>}

                {(editedPermission?.permissionSource !== null || editedPermission?.permissionSource !== undefined) && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "AuthorizingAuthority",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{intl.formatMessage({ id: handlePermissionSource(editedPermission?.permissionSource).value })} </span>
                </div>}

                {editedPermission?.permissionReason && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "PermitReason",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.permissionReason} </span>
                </div>}
                {editedPermission?.permissionNote && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "Notes",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.permissionNote} </span>
                </div>}

                {editedPermission?.visitorPhone && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "PhoneNumber",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.visitorPhone} </span>
                </div>}

                {editedPermission?.visitorWhatsApp && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "WhatsAppNumber",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.visitorWhatsApp} </span>
                </div>}

                {editedPermission?.visitorEmail && <div className="text-muted d-flex">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "Email",
                    })}{" "}
                    :
                  </h6>
                  <span className="mx-2 text-black">{editedPermission?.visitorEmail} </span>
                </div>}
                {editedPermission?.attachments?.length > 0 && <div className="text-muted d-flex align-items-center">
                  <h6 className="text-muted m-0">
                    {intl.formatMessage({
                      id: "Attachments",
                    })}{" "}
                    :
                  </h6>
                  {editedPermission?.attachments?.map(
                    (attachment: Attachment) => {
                      return (
                        <Fragment key={attachment?.id}>
                          <div>
                            <img
                              src={getIconSrc(
                                attachment?.filename,
                                { path: attachment?.filepath },
                                VisitorRootUrl
                              )}
                              style={{
                                height: "50px",
                                width: "50px",
                                display: "inline-block",
                                borderRadius: "50%",
                              }}
                              alt=""
                              onError={(e: any) =>
                              (e.target.src = getIconSrcError(
                                attachment?.filename
                              ))
                              }
                            />
                            <a
                              href={`${VisitorRootUrl}${attachment?.filepath}`}
                              target="_blank"
                            >
                              <span className="text-primary mx-2 fw-bolder">
                                {attachment?.filename}
                              </span>
                            </a>
                          </div>
                        </Fragment>
                      );
                    }
                  )}
                </div>}

              </div>
            </Modal.Body>
            <Modal.Footer>
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
                    handleEditRequest(2)
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
                    handleEditRequest(1)
                  }}
                >
                  <span className="indicator-label">
                    {" "}
                    {intl.formatMessage({ id: "AcceptRequest" })}
                  </span>
                </button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};
