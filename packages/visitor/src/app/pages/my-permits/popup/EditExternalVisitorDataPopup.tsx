import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddVisitorProps,
  AddVisitorSchema,
} from "../../../validation/add-visitor-validation";
import { editVisitortoPermission } from "../../../redux/visitor-slice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { GetGroupbyIDWithFilter } from "../../../redux/permission-slice";
import { Notification } from "@4eplatform/shared/services/notifications";
import { useNavigate } from "react-router-dom";
import { getEmployee } from "@4eplatform/technical-support/src/app/redux/features/requestTemplate/requestTemplateSlice";
import { useAppSelector } from "../../../redux/store";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show?: any;
  handleClose?: any;
  visitor?: any;
  pageIndex?: number;
  pageSize?: number;
};
const EditExternalVisitorDataPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  visitor,
  pageSize,
  pageIndex,
}) => {
  const intl = useIntl();
  let navigate = useNavigate();
  let loggedInUserId = localStorage.getItem("userId");
  let dispatch = useDispatch();
  const managementEmployees = useAppSelector((state: RootState) => {
    return state?.managementEmployees?.employee;
  });
  useEffect(() => {
    dispatch(getEmployee({}) as any);
  }, []);
  let { groupId } = useParams();
  let language: string = intl.locale;
  let newUserId = uuidv4();
  const { groupPermission } = useSelector(
    (state: RootState) => state.permission
  );
  let [employeeName, setEmployeeName] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddVisitorProps>({
    resolver: yupResolver(AddVisitorSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let handleEditVisitor = async (formValues: AddVisitorProps) => {
    let formData = new FormData();
    if (employeeName != visitor?.vistorName) {
      formData.append("VisitorName", employeeName as string);
    }
    formData.append("VisitorId", visitor?.vistorId as string);
    if (
      formValues?.VisitorNId &&
      visitor?.visitorNID != formValues?.VisitorNId
    ) {
      formData.append("NationalID", formValues?.VisitorNId as string);
    }
    if (visitor?.visitorPhone != formValues?.Phone) {
      formData.append("PhoneNumber", formValues?.Phone as string);
    }
    if (visitor?.visitorWhatsApp != formValues?.Whatsapp) {
      formData.append("WhatsAppNumber", formValues?.Whatsapp as string);
    }

    if (formValues?.Email != visitor?.visitorEmail) {
      formData.append("Email", formValues?.Email);
    }
    formData.append("PermissionId", visitor?.permissionID as string);
    try {
      await dispatch(editVisitortoPermission(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 3) {
            handleClose();
            showSuccessAlert(true, "AddedSuccessfully", intl, () => {
              dispatch(
                GetGroupbyIDWithFilter({
                  Gruopid: groupId,
                  pageSize,
                  pageIndex,
                }) as any
              );
              if (
                visitor?.receivedId &&
                visitor?.receivedId != "00000000-0000-0000-0000-000000000000" &&
                visitor?.reveivedMail
              ) {
                Notification.edittingRequestForVisitor(
                  visitor?.receivedId,
                  `/visitormanagement/permissions-Permits`,
                  89,
                  "",
                  visitor?.reveivedMail,
                  true,
                  203,
                  new Date(),
                  "طلب تعديل",
                  "طلب تعديل",
                  "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
                  ""
                );
              } else {
                managementEmployees
                  ?.find((org) => {
                    return (
                      org?.nameAr == visitor?.orgName ||
                      org?.nameEn == visitor?.orgName ||
                      org?.id == visitor?.orgId
                    );
                  })
                  ?.mebmers?.forEach((member: any) => {
                    if (member?.email) {
                      Notification.edittingRequestForVisitor(
                        member?.userId,
                        `/visitormanagement/permissions-Permits`,
                        89,
                        "",
                        member?.email,
                        true,
                        203,
                        new Date(),
                        "طلب تعديل",
                        "طلب تعديل",
                        "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
                        ""
                      );
                    }
                  });
              }
              if (
                loggedInUserId?.toLowerCase() ==
                visitor?.receivedId?.toLowerCase()
              ) {
                window.location.href =
                  "/systems-services-settings/dynamic-workspace";
              } else {
                navigate("/systems-services-settings/dynamic-workspace");
              }
            });
          } else if (res?.payload?.message) {
            handleClose();
            showSuccessAlert(false, res?.payload?.message, intl, () => {});
          }
        }
      );
    } catch (error) {}
  };
  useEffect(() => {
    if (visitor?.permissionID) {
      setValue("Email", visitor?.visitorEmail);
      setValue("GroupName", groupPermission?.groupName);
      setValue("Phone", visitor?.visitorPhone);
      setValue("Whatsapp", visitor?.visitorWhatsApp);
      setValue("VisitorNId", visitor?.visitorNID);
      setValue("UserId", visitor?.userId);
      setEmployeeName(visitor?.vistorName);
    }
  }, [visitor]);
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
                  {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleEditVisitor)}>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="VisitorName" className="mb-2 required">
                    {intl.formatMessage({ id: "VisitorName" })}
                  </label>
                  <div className="input-group position-relative">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="VisitorName"
                      value={employeeName}
                      placeholder={intl.formatMessage({ id: "VisitorName" })}
                      onChange={(e) => {
                        setEmployeeName(e?.target?.value);
                      }}
                    />
                  </div>
                </div>
                {DisplayErrorMessage(errors?.UserId?.message, intl, language)}
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="IDNumber" className="mb-2 required">
                    {intl.formatMessage({ id: "IDNumber" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-id-card fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="IDNumber"
                      placeholder={intl.formatMessage({ id: "IDNumber" })}
                      {...register("VisitorNId")}
                    />
                    {DisplayErrorMessage(
                      errors?.VisitorNId?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="PhoneNumber" className="mb-2 required">
                    {intl.formatMessage({ id: "PhoneNumber" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-phone fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="PhoneNumber"
                      placeholder={intl.formatMessage({ id: "PhoneNumber" })}
                      {...register("Phone")}
                    />
                    {DisplayErrorMessage(
                      errors?.Phone?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="WhatsAppNumber" className="mb-2">
                    {intl.formatMessage({ id: "WhatsAppNumber" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-whatsapp fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="WhatsAppNumber"
                      placeholder={intl.formatMessage({ id: "WhatsAppNumber" })}
                      {...register("Whatsapp")}
                    />
                    {DisplayErrorMessage(
                      errors?.Whatsapp?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="Email" className="mb-2 required">
                    {intl.formatMessage({ id: "Email" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-envelope fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder={intl.formatMessage({ id: "Email" })}
                      {...register("Email")}
                    />
                    {DisplayErrorMessage(
                      errors?.Email?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-4">
                <div className="mb-2 pt-2 pb-3 ">
                  <label
                    style={{
                      width: "100%",
                      textAlign: language == "ar" ? "right" : "left",
                    }}
                    className="form-label px-2  fs-6 text-gray-700 required"
                  >
                    {intl.formatMessage({
                      id: "GroupName",
                    })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special fas fa-users"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "GroupName",
                      })}
                      readOnly
                      {...register("GroupName")}
                    />
                  </div>
                  {DisplayErrorMessage(
                    errors?.GroupName?.message,
                    intl,
                    language
                  )}
                </div>
              </div>
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
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success mx-1 text-center w-100"
                    style={{ border: "none" }}
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditExternalVisitorDataPopup;
