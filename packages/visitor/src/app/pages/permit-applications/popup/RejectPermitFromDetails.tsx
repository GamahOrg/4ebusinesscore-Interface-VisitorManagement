import { ChangeEvent, FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateVisitorPermissionGroupStatus,
  updateVisitorPermissionStatus,
} from "../../../redux/visitor-permission-slice";
import {
  updateStatusCancelRequest,
  updateStatusCancelRequestGroup,
} from "../../../redux/cancel-request-slice";
import { updateEditedPermissionRequest } from "../../../redux/edited-permission-slice";
import {
  getGetPermissionByVisitorId,
  GetGroupbyID,
} from "../../../redux/permission-slice";
import moment from "moment";
import { RootState } from "../../../redux/store";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { rejectPermitValidations } from "../../../validation/approve-permit-validation";
import { Notification } from "@4eplatform/shared/services/notifications";

type RejectPopupProps = {
  show?: any;
  handleClose?: any;
  permit: any;
  type?: string;
};

export const RejectPermitFromDetails: FC<RejectPopupProps> = ({
  show,
  handleClose,
  permit,
  type,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { id, groupId, tabName } = useParams();
  let loggedInUserId = localStorage.getItem("userId");
  let userInfo = JSON.parse(localStorage.getItem("userInfo") as any) || "";
  let loggedInUserFullName =
    userInfo?.firstName +
    " " +
    userInfo?.secondName +
    " " +
    userInfo?.thirdName +
    " " +
    userInfo?.forthName;
  useEffect(() => {
    if (type === "Group") {
      dispatch(GetGroupbyID({ Gruopid: permit?.groupId || groupId }) as any);
    } else if (type === "Person") {
      dispatch(
        getGetPermissionByVisitorId({
          Visitor_ID: permit?.visitorId || id,
        }) as any
      );
    }
  }, [permit]);

  const { singlePermission } = useSelector(
    (state: RootState) => state.permission
  );
  const { groupPermission } = useSelector(
    (state: RootState) => state.permission
  );

  const handleReject = () => {
    const noteValue = watch("note");
    const formData = createFormData();
    let notificationDataForCreator = {
      title: "تفاصيل الزياره",
      titleEn: "visiting details",
      messageAr: "تم رفض التصريح الخاص بك",
      messageEn: "Your permission is rejected",
      workspaceKey: 202,
      workspaceKeyTo: 89,
      senderId: loggedInUserId,
      settingStatus: 32,
      sendSignalR: true,
      name: loggedInUserFullName,
      phone: "",
      qrCode: "",
      date: new Date().toISOString()?.split("T")[0],
    };

    if (tabName == "permissions-Permits") {
      if (type == "Group") {
        dispatch(
          updateVisitorPermissionGroupStatus({
            params: {
              GroupId: [permit?.groupId || groupId],
              PutGroupStatus: 5,
              notes: noteValue,
            },
            body: formData,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Group status updated successfully" ||
            res?.payload?.message == "Group status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              groupPermission?.creatorId as string,
              `/visitormanagement/my-permits/view-group/visitor-workspace/${
                permit?.groupId || groupId
              }`,
              89,
              "",
              groupPermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              GetGroupbyID({ Gruopid: permit?.groupId || groupId }) as any
            );

            showSuccessAlert(true, "RejectionSuccessfully", intl);
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
        });
      } else {
        dispatch(
          updateVisitorPermissionStatus({
            params: {
              Id: [permit?.visitorId || id],
              PutPermissionStatus: 5,
              notes: noteValue,
            },
            body: formData,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Visitor status updated successfully" ||
            res?.payload?.message == "Visitor status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              singlePermission?.creatorId as string,
              `/visitormanagement/my-permits/view-permit/visitor-workspace/${
                permit?.visitorId || id
              }/${permit?.visitorId || id}`,
              89,
              "",
              singlePermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              getGetPermissionByVisitorId({
                Visitor_ID: permit?.visitorId || id,
              }) as any
            );
            showSuccessAlert(true, "RejectionSuccessfully", intl);
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
        });
      }
    } else if (tabName == "permits-renewal") {
      if (type == "Group") {
        dispatch(
          updateVisitorPermissionGroupStatus({
            params: {
              GroupId: [permit?.groupId || groupId],
              PutGroupStatus: 5,
              notes: noteValue,
            },
            body: formData,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Group status updated successfully" ||
            res?.payload?.message == "Group status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              groupPermission?.creatorId as string,
              `/visitormanagement/my-permits/view-group/visitor-workspace/${
                permit?.groupId || groupId
              }`,
              89,
              "",
              groupPermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              GetGroupbyID({ Gruopid: permit?.groupId || groupId }) as any
            );
            showSuccessAlert(true, "RejectionSuccessfully", intl);
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
        });
      } else {
        dispatch(
          updateVisitorPermissionStatus({
            params: {
              Id: [permit?.visitorId || id],
              PutPermissionStatus: 5,
              notes: noteValue,
            },
            body: formData,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Visitor status updated successfully" ||
            res?.payload?.message == "Visitor status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              singlePermission?.creatorId as string,
              `/visitormanagement/my-permits/view-permit/visitor-workspace/${
                permit?.visitorId || id
              }/${permit?.visitorId || id}`,
              89,
              "",
              singlePermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              getGetPermissionByVisitorId({
                Visitor_ID: permit?.visitorId || id,
              }) as any
            );

            showSuccessAlert(true, "RejectionSuccessfully", intl);
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
        });
      }
    } else if (tabName == "permits-cancellation") {
      if (type == "Group") {
        dispatch(
          updateStatusCancelRequestGroup({
            params: {
              GroupId: permit?.groupId || groupId,
              Status: 2,
              notes: noteValue,
            },
            body: formData,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Group status updated successfully" ||
            res?.payload?.message == "Group status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              groupPermission?.creatorId as string,
              `/visitormanagement/my-permits/view-group/visitor-workspace/${
                permit?.groupId || groupId
              }`,
              89,
              "",
              groupPermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );

            dispatch(
              GetGroupbyID({ Gruopid: permit?.groupId || groupId }) as any
            );
            showSuccessAlert(true, "RejectionSuccessfully", intl);
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
        });
      } else {
        dispatch(
          updateStatusCancelRequest({
            params: {
              VisitorId: permit?.visitorId || id,
              Status: 2,
              notes: noteValue,
            },
            body: formData,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Visitor status updated successfully" ||
            res?.payload?.message == "Visitor status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              singlePermission?.creatorId as string,
              `/visitormanagement/my-permits/view-permit/visitor-workspace/${
                permit?.visitorId || id
              }/${permit?.visitorId || id}`,
              89,
              "",
              singlePermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              getGetPermissionByVisitorId({
                Visitor_ID: permit?.visitorId || id,
              }) as any
            );
            showSuccessAlert(true, "RejectionSuccessfully", intl);
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
        });
      }
    } else if (tabName == "permits-amendments-applications") {
      if (type == "Group") {
        dispatch(
          updateEditedPermissionRequest({
            editedId: permit?.editedId,
            status: 2,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Visitor status updated successfully" ||
            res?.payload?.message == "Visitor status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              groupPermission?.creatorId as string,
              `/visitormanagement/my-permits/view-group/visitor-workspace/${
                permit?.groupId || groupId || permit?.editedId
              }`,
              89,
              "",
              groupPermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              GetGroupbyID({
                Gruopid: permit?.groupId || groupId || permit?.editedId,
              }) as any
            );
            showSuccessAlert(true, "RejectionSuccessfully", intl);
          } else if (res.payload.message === "You Can't Do This ..") {
            showSuccessAlert(
              false,
              "YouAreNotAuthorizedToApproveTheApplication",
              intl
            );
          }
        });
      } else {
        dispatch(
          updateEditedPermissionRequest({
            editedId: permit?.editedId,
            status: 2,
          }) as any
        ).then((res: any) => {
          if (
            res.payload.message == "Visitor status updated successfully" ||
            res?.payload?.message == "Visitor status updated successfully"
          ) {
            Notification.rejectPermitRequest(
              singlePermission?.creatorId as string,
              `/visitormanagement/my-permits/view-permit/visitor-workspace/${
                permit?.visitorId || id
              }/${permit?.visitorId || id}`,
              89,
              "",
              singlePermission?.creatorEmail as string,
              true,
              202,
              new Date().toISOString()?.split("T")[0],
              "رفض التصريح للزائر",
              "رفض التصريح للزائر"
            );
            dispatch(
              getGetPermissionByVisitorId({
                Visitor_ID: permit?.visitorId || id,
              }) as any
            );
            showSuccessAlert(true, "RejectionSuccessfully", intl);
          } else if (res.payload.message === "You Can't Do This ..") {
            showSuccessAlert(
              false,
              "YouAreNotAuthorizedToApproveTheApplication",
              intl
            );
          }
        });
      }
    } else if (tabName == "permits-addition") {
      dispatch(
        updateVisitorPermissionGroupStatus({
          params: {
            GroupId: [permit?.groupId || groupId],
            PutGroupStatus: 5,
            notes: noteValue,
          },
          body: formData,
        }) as any
      ).then((res: any) => {
        if (
          res.payload.message == "Visitor status updated successfully" ||
          res?.payload?.message == "Group status updated successfully"
        ) {
          Notification.rejectPermitRequest(
            groupPermission?.creatorId as string,
            `/visitormanagement/my-permits/view-group/visitor-workspace/${
              permit?.groupId || groupId
            }`,
            89,
            "",
            groupPermission?.creatorEmail as string,
            true,
            202,
            new Date().toISOString()?.split("T")[0],
            "رفض التصريح للزائر",
            "رفض التصريح للزائر"
          );
          dispatch(
            GetGroupbyID({ Gruopid: permit?.groupId || groupId }) as any
          );
          showSuccessAlert(true, "RejectionSuccessfully", intl);
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
      });
    }
  };

  const {
    register,
    watch,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(rejectPermitValidations),
    mode: "onChange",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      clearErrors("attachments");
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const createFormData = () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`Attachment`, file);
    });
    return formData;
  };
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
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
                    {intl.formatMessage({ id: "ConfirmationOfRejection" })}
                  </h1>
                  <h1 className="mb-3 text-center">
                    <i
                      className="fas fa-times-circle text-danger"
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
              <div className="mb-13">
                {type == "Group" && tabName !== "PermitAmendment" ? (
                  <h5 className="mb-7 text-primary">
                    <i className="fas fa-users ms-3 fs-5"></i>
                    <span className="fw-bold">
                      {intl.formatMessage({ id: "GroupNumber" })} :
                    </span>
                    <span className="mx-3 text-dark fw-bold">
                      {groupPermission?.groupNumber}#
                    </span>
                  </h5>
                ) : (
                  <h5 className="mb-7 text-primary">
                    <i className="fas fa-users ms-3 fs-5"></i>
                    <span className="fw-bold">
                      {intl.formatMessage({ id: "PermitNumber" })} :
                    </span>
                    <span className="mx-3 text-dark fw-bold">
                      {singlePermission?.permissionNumber}#
                    </span>
                  </h5>
                )}

                {/* {type === "Group" && tabName !== "PermitAmendment" && <h5 className="mb-7 text-primary">
                  <i className="fas fa-code ms-3 fs-5"></i>
                  <span className="fw-bold">
                    {intl.formatMessage({ id: "Number" })} :
                  </span>
                  <span className="mx-3 text-dark fw-bold">{permit?.permissionDto?.length}</span>
                </h5>} */}
                <h5 className="mb-7 text-primary">
                  <i className="fas fa-briefcase ms-3 fs-5"></i>
                  <span className="fw-bold">
                    {intl.formatMessage({ id: "AuthorizingAuthority" })} :
                  </span>

                  <span className="mx-3 text-dark fw-bold">
                    {type === "Group" && tabName !== "PermitAmendment"
                      ? groupPermission?.orgName
                      : permit?.orgName || singlePermission?.orgName}
                  </span>
                </h5>
                {type === "Group" && tabName !== "PermitAmendment" ? (
                  <h5 className="mb-7 text-primary">
                    <i className="fas fa-user ms-3 fs-5"></i>
                    <span className="fw-bold">
                      {intl.formatMessage({ id: "GroupName" })} :
                    </span>
                    <span className="mx-3 text-dark fw-bold">
                      {permit?.groupName || groupPermission?.groupName}
                    </span>
                  </h5>
                ) : (
                  <h5 className="mb-7 text-primary">
                    <i className="fas fa-user ms-3 fs-5"></i>
                    <span className="fw-bold">
                      {intl.formatMessage({ id: "VisitorName" })} :
                    </span>
                    <span className="mx-3 text-dark fw-bold">
                      {permit?.visitorName || singlePermission?.visitorName}
                    </span>
                  </h5>
                )}
                {(type === "Group" && tabName !== "PermitAmendment") ||
                  (singlePermission?.visitorWhatsApp && (
                    <h5 className="mb-7 text-primary">
                      <i className="fab fa-whatsapp ms-3 fs-5"></i>
                      <span className="fw-bold">
                        {intl.formatMessage({ id: "WhatsAppNumber" })} :
                      </span>
                      <span className="mx-3 text-dark fw-bold">
                        {singlePermission?.visitorWhatsApp}
                      </span>
                    </h5>
                  ))}
                {type === "Person" && (
                  <h5 className="mb-7 text-primary">
                    <i className="fas fa-exclamation-circle ms-3 fs-5"></i>
                    <span className="fw-bold">
                      {intl.formatMessage({ id: "Parkings" })} :
                    </span>
                    <span className="mx-3 text-dark fw-bold">
                      {/* {intl.formatMessage({
                      id: handlePermissionSource(
                        type === "Group" && tabName !== "PermitAmendment"
                          ? groupPermission?.permissionSource
                          : permit?.permissionSource
                      )?.value,
                    }) ?? intl.formatMessage({ id: "NotFound" })} */}
                      {singlePermission?.isParking
                        ? intl.formatMessage({ id: "Found" })
                        : intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </h5>
                )}

                <h5 className="mb-7 text-primary">
                  <i className="fas fa-calendar-alt ms-3 fs-5"></i>
                  <span className="fw-bold">
                    {intl.formatMessage({ id: "PermitDate" })} :
                  </span>

                  <span className="mx-3 text-dark fw-bold">
                    {moment(
                      type === "Group" && tabName !== "PermitAmendment"
                        ? groupPermission?.startDate
                        : singlePermission?.startDate
                    ).format("YYYY-MM-DD") ??
                      intl.formatMessage({ id: "NotFound" })}
                  </span>
                </h5>
                <h5 className="mb-7 text-primary">
                  <i className="fas fa-calendar-alt ms-3 fs-5"></i>
                  <span className="fw-bold">
                    {intl.formatMessage({ id: "PermitTime" })} :
                  </span>
                  <span className="mx-3 text-dark fw-bold">
                    {moment(
                      type === "Group" && tabName !== "PermitAmendment"
                        ? groupPermission?.startTime
                        : singlePermission?.startTime,
                      "HH:mm:ss"
                    ).format("HH:mm") ?? intl.formatMessage({ id: "NotFound" })}
                  </span>
                </h5>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2 pt-2 pb-3">
                    <label htmlFor="note" className="form-label px-2 required">
                      {intl.formatMessage({ id: "Note" })}
                    </label>
                    <textarea
                      id="note"
                      className="form-control form-control-solid min-h-90px mb-3 mb-lg-2"
                      placeholder={intl.formatMessage({
                        id: "EnterTheNote",
                      })}
                      {...register("note")}
                    />
                    {errors.note && (
                      <p className="text-danger p-2">
                        {intl.formatMessage({
                          id: errors.note.message as string,
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-2 pt-2 pb-3">
                    <input
                      className="myform-control"
                      hidden
                      id="files"
                      type="file"
                      {...register("noteAttachments")}
                      onChange={handleFileChange}
                      multiple
                    />
                    <div className="position-relative">
                      <label
                        htmlFor="files"
                        className="w-100 h-60px d-flex align-items-center border border-gray-500 border-1 rounded-2 cursor-pointer px-3"
                      >
                        {intl.formatMessage({ id: "AddAttachment" })}
                      </label>
                      <div
                        className="position-absolute cursor-pointer"
                        style={{
                          top: "50%",
                          left: intl?.locale == "ar" ? "17%" : "",
                          right: intl?.locale == "en" ? "17%" : "",

                          transform: "translateY(-50%)",
                        }}
                      >
                        <label htmlFor="files" className="cursor-pointer">
                          <i className="fa-solid fa-paperclip mx-1 fs-3 fa-fw"></i>
                        </label>
                      </div>
                      <div
                        className="position-absolute cursor-pointer"
                        style={{
                          top: "50%",
                          left: intl?.locale == "ar" ? "12%" : "",
                          right: intl?.locale == "en" ? "12%" : "",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <label htmlFor="files" className="cursor-pointer">
                          <i className="fa-solid fa-clapperboard mx-1 fs-3 fa-fw"></i>
                        </label>
                      </div>
                      <div
                        className="position-absolute cursor-pointer"
                        style={{
                          top: "50%",
                          left: intl?.locale == "ar" ? "7%" : "",
                          right: intl?.locale == "en" ? "7%" : "",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <label htmlFor="files" className="cursor-pointer">
                          <i className="fa-solid fa-image mx-1 fs-3 fa-fw"></i>
                        </label>
                      </div>
                      <div
                        className="position-absolute cursor-pointer"
                        style={{
                          top: "50%",
                          left: intl?.locale == "ar" ? "2%" : "",
                          right: intl?.locale == "en" ? "2%" : "",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <label htmlFor="files" className="cursor-pointer">
                          <i className="fa-solid fa-file mx-1 fs-3 fa-fw"></i>
                        </label>
                      </div>
                    </div>
                    {errors.noteAttachments && (
                      <p className="text-danger p-2">
                        {intl.formatMessage({
                          id: errors.noteAttachments.message as string,
                        })}
                      </p>
                    )}
                    {selectedFiles && (
                      <div>
                        <ul>
                          {selectedFiles.map((file, index) => (
                            <li
                              key={index}
                              className="d-flex justify-content-between align-items-center my-2"
                            >
                              {file.name}
                              <button
                                onClick={() => handleRemoveFile(index)}
                                className="bg-transparent text-danger fw-bold border-0"
                              >
                                X
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
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
                  className="btn btn-danger"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit((data) => {
                      handleClose();
                      handleReject();
                    })();
                  }}
                >
                  {intl.formatMessage({ id: "ConfirmationOfRejection" })}
                </button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};
