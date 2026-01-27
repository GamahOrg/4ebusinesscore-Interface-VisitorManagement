import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { EmployeeHierarchyFilteredPopup } from "./EmployeeHierarchyFilteredPopup";
import { AddInternalGroupPermissionProps } from "../../../validation/add-internal-group-permission-validation";
type DeclarationDataProps = {
  userId: string | null;
  employeeId?: any;
  setEmployeeId?: any;
  orgId?: any;
  setOrgId?: any;
  selectedImage?: any;
  setSelectedImage?: any;
  register?: UseFormRegister<AddInternalGroupPermissionProps>;
  setValue?: UseFormSetValue<AddInternalGroupPermissionProps>;
  trigger?: UseFormTrigger<AddInternalGroupPermissionProps>;
  formValues?: AddInternalGroupPermissionProps;
  errors?: FieldErrors<AddInternalGroupPermissionProps>;
  clearErrors?: UseFormClearErrors<AddInternalGroupPermissionProps>;
  selectedFilesForAttachments?: any;
  setSelectedFilesForAttachments?: any;
  setOrgName?: any;
  orgName?: string;
  employeeName?: string;
  setEmployeeName?: any;
  setEmployeeEmail?: any;
};
const DeclarationDataForGroup: FC<DeclarationDataProps> = ({
  register,
  setValue,
  trigger,
  userId,
  employeeId,
  setEmployeeId,
  orgId,
  setOrgId,
  formValues,
  errors,
  clearErrors,
  selectedFilesForAttachments,
  setSelectedFilesForAttachments,
  setOrgName,
  orgName,
  employeeName,
  setEmployeeName,
  setEmployeeEmail,
}) => {
  const intl = useIntl();
  let language = intl.locale;
  const getIconSrc = (fileName: string, file: any) => {
    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return URL.createObjectURL(file);
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    } else if (
      fileName?.endsWith(".mp4") ||
      fileName?.endsWith(".webm") ||
      fileName?.endsWith(".avi") ||
      fileName?.endsWith(".mkv") ||
      fileName?.endsWith(".flv") ||
      fileName?.endsWith(".ts")
    ) {
      return "/media/pmo/video.png";
    } else if (
      fileName?.endsWith(".ppt") ||
      fileName?.endsWith(".pptx") ||
      fileName?.endsWith(".pptm") ||
      fileName?.endsWith(".pps") ||
      fileName?.endsWith(".ppsx") ||
      fileName?.endsWith(".ppsm")
    ) {
      return "/media/pmo/powerPointIcon.png";
    }
  };
  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language == "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  useEffect(() => {
    // if (employeeId) {
    setValue?.("recivedId", employeeId);
    trigger?.("recivedId");
    // }
  }, [employeeId]);

  useEffect(() => {
    if (orgId) {
      setValue?.("orgId", orgId);
      trigger?.("orgId");
    }
  }, [orgId]);
  useEffect(() => {
    setValue?.("stepNumber", 1);
  }, []);

  const handleFileInputChange = (event: any) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFilesForAttachments([
      ...selectedFilesForAttachments,
      ...filesArray,
    ]);
  };
  const handleFileDelete = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForAttachments.filter(
      (file: any, index: any) => index !== indexToRemove
    );
    setSelectedFilesForAttachments(updatedFiles);
  };
  return (
    <>
      <div className="row my-8">
        <div className="col-md-4">
          <div>
            <label
              htmlFor="PermitWork"
              className="form-label mx-2 px-2 fw-bolder required"
            >
              {intl.formatMessage({ id: "PermitType" })}
            </label>
            <div className="form-control form-control-solid d-flex">
              <div>
                <input
                  type="radio"
                  name="PermitWork"
                  id="PermitWorkEnable"
                  className="form-check-input"
                  defaultChecked
                />
                <label htmlFor="cardStateEnable" className="mx-2">
                  {intl.formatMessage({ id: "PermitWork" })}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <label
            className="fs-6 fw-bold mb-2 required"
            htmlFor="classNameification"
          >
            {intl.formatMessage({ id: "DeclaringAuthority" })}{" "}
          </label>
          <div className="input-group">
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "ChooseManagementEntity",
              })}
              value={orgName}
              readOnly
            />
            <div className="h-110 d-flex" role="button">
              <span
                className="input-group-text"
                onClick={() => setModalMShow(true)}
              >
                <i className="bi bi-diagram-3 fs-3 text-muted"></i>
              </span>
            </div>
          </div>
          {DisplayErrorMessage(errors?.orgId?.message, intl)}
        </div>
        <div className="col-sm-4 col-12">
          <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
            {intl.formatMessage({ id: "FutureVisit" })}{" "}
          </label>

          <div className="input-group">
            <input
              readOnly
              className="form-control"
              placeholder={intl.formatMessage({
                id: "SelectEmployee",
              })}
              value={employeeName}
            />
            <div className="h-110 d-flex" role="button">
              <span
                className="input-group-text"
                onClick={() => setModalHShow(true)}
              >
                <i className="bi bi-diagram-3 fs-3 text-muted"></i>
              </span>
            </div>
          </div>
          {DisplayErrorMessage(errors?.recivedId?.message, intl)}
        </div>
      </div>
      <div className="row my-8">
        <div className="col-sm-12 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "ReasonForStatement" })}</span>
          </label>
          <textarea
            className="form-control form-control-solid"
            placeholder={intl.formatMessage({ id: "ReasonForStatement" })}
            {...register?.("permissionReason")}
          />
          {DisplayErrorMessage(errors?.permissionReason?.message, intl)}
        </div>
      </div>
      <div className="row my-8">
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="startDate"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "BeginningDate" })}
            </label>
            <input
              id="startDate"
              type="date"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({
                id: "BeginningDate",
              })}
              {...register?.("startDate")}
              min={new Date()?.toISOString()?.split("T")[0]}
            />
            {DisplayErrorMessage(errors?.startDate?.message, intl)}
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="EndingDate"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "EndingDate" })}
            </label>
            <input
              id="EndingDate"
              type="date"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "EndingDate" })}
              {...register?.("endDate")}
              min={formValues?.startDate}
            />
            {DisplayErrorMessage(errors?.endDate?.message, intl)}
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="startDate"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "FromHour" })}
            </label>
            <input
              id="startDate"
              type="time"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "FromHour" })}
              {...register?.("startTime")}
              max={
                formValues?.startDate == formValues?.endDate &&
                formValues?.endTime
                  ? formValues?.endTime
                  : ""
              }
            />
            {DisplayErrorMessage(errors?.startTime?.message, intl)}
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="toHour"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "ToHour" })}
            </label>
            <input
              id="toHour"
              type="time"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "ToHour" })}
              {...register?.("endTime")}
              min={
                formValues?.startDate == formValues?.endDate &&
                formValues?.startTime
                  ? formValues?.startTime
                  : ""
              }
            />
            {DisplayErrorMessage(errors?.endTime?.message, intl)}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 my-5">
          <label className="form-label px-2 fontSz-6">
            {intl.formatMessage({ id: "ATTACHMENTS" })}
          </label>
          <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
            <div>
              {/* Upload Button */}
              <label
                htmlFor="outputAttachment1"
                className="form-label dropzone-select uploadFile-style inputAreaHeight"
              >
                <div role="button" className="d-flex align-items-center">
                  <img
                    style={{
                      width: "50px",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                    src="/media/pmo/uploadFile.png"
                    className="img-fluid"
                  />
                  <div
                    className="row py-auto"
                    style={{ position: "relative", top: "-7px" }}
                  >
                    <span className="text-primary fw-bolder">
                      {intl.formatMessage({
                        id: "QuickFileUploader",
                      })}
                    </span>
                    <span>
                      {" "}
                      {intl.formatMessage({
                        id: "DragAndDropOrChooseFilesFromComputer",
                      })}
                    </span>
                  </div>
                </div>
              </label>
              <input
                multiple
                type="file"
                id="outputAttachment1"
                name="attachments1"
                onChange={handleFileInputChange}
                placeholder={intl.formatMessage({ id: "FileUpload" })}
                className="d-none"
              />
              {/* Attachment List */}
              <ul className="d-flex align-items-center flex-wrap">
                {selectedFilesForAttachments?.map(
                  (file: any, index: number) => (
                    <li
                      key={index}
                      className="d-flex align-items-center my-2 mx-2 position-relative"
                    >
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        src={getIconSrc(file?.name, file)}
                      />
                      <div className="mx-1">{file.name}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          left: "-10px",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          display: "flex",
                          color: "black",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleFileDelete(index)}
                      >
                        x
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-8">
        <div className="col-sm-12 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "Note" })}</span>
          </label>
          <textarea
            className="form-control form-control-solid"
            placeholder={intl.formatMessage({ id: "Note" })}
            {...register?.("note")}
          />
          {DisplayErrorMessage(errors?.note?.message, intl)}
        </div>
      </div>
      <div className="modal fade" aria-hidden="true">
        <ManagementHierarchyPopup
          show={modalMShow}
          handleClose={() => setModalMShow(false)}
          orgId={orgId}
          setOrgId={setOrgId}
          orgName={orgName}
          setOrgName={setOrgName}
        />
        <EmployeeHierarchyFilteredPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
          employeeId={employeeId}
          setEmployeeId={setEmployeeId}
          setEmployeeName={setEmployeeName}
          orgId={orgId}
          setEmployeeEmail={setEmployeeEmail}
        />
      </div>
    </>
  );
};
export { DeclarationDataForGroup };
