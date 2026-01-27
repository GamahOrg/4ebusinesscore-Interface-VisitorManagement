import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ManagementHierarchyPopup } from "../popups/ManagementHierarchyPopup";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { EmployeeHierarchyFilteredPopup } from "../popups/EmployeeHierarchyFilteredPopup";
import { AddExternalGroupPermissionProps } from "../../../validation/add-external-group-permission-validation";
import { permissionTypeModel } from "../../../model/permission-type-model";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers/AssetHelpers";

type DeclarationDataProps = {
  userId: string | null;
  employeeId?: any;
  setEmployeeId?: any;
  orgId?: any;
  setOrgId?: any;
  selectedImage?: any;
  setSelectedImage?: any;
  register?: UseFormRegister<AddExternalGroupPermissionProps>;
  setValue?: UseFormSetValue<AddExternalGroupPermissionProps>;
  trigger?: UseFormTrigger<AddExternalGroupPermissionProps>;
  formValues?: AddExternalGroupPermissionProps;
  errors?: FieldErrors<AddExternalGroupPermissionProps>;
  clearErrors?: UseFormClearErrors<AddExternalGroupPermissionProps>;
  selectedFilesForAttachments?: any;
  setSelectedFilesForAttachments?: any;
  permissionType?: any;
  setPermissionType?: any;
  setOrgName?: any;
  orgName?: string;
  employeeName?: string;
  setEmployeeName?: any;
  setEmployeeEmail?: any;
  permitTypeId?: string;
  setPermitTypeId?: any;
  permissionTypes?: any;
  isParking?: any;
  setIsParking?: any;
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
  permissionType,
  setPermissionType,
  setOrgName,
  orgName,
  employeeName,
  setEmployeeName,
  setEmployeeEmail,
  permitTypeId,
  setPermitTypeId,
  permissionTypes,
  isParking,
  setIsParking,
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
    if (employeeId) {
      setValue?.("recivedId", employeeId);
      trigger?.("recivedId");
    }
  }, [employeeId, setValue, trigger]);

  useEffect(() => {
    if (orgId) {
      setValue?.("orgId", orgId);
      trigger?.("orgId");
    }
  }, [orgId, setValue, trigger]);
  useEffect(() => {
    setValue?.("stepNumber", 1);
  }, [setValue]);

  // Ensure org required validation is shown immediately on step load.
  useEffect(() => {
    trigger?.("orgId");
  }, [trigger]);

  // Show required error for PermitType as soon as the step loads.
  useEffect(() => {
    trigger?.("permitTypeId");
  }, [trigger]);

  // Show required error for groupName as soon as the step loads.
  useEffect(() => {
    trigger?.("groupName");
  }, [trigger]);

  useEffect(() => {
    if (formValues?.StartDateTime && formValues?.EndDateTime) {
      trigger?.(["StartDateTime", "EndDateTime"]);
    }
  }, [formValues?.StartDateTime, formValues?.EndDateTime, trigger]);

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
        <div className="col-md-6 col-12">
          <div className="mb-2 pt-2 pb-3 ">
            <label
              style={{
                width: "100%",
                textAlign: language == "ar" ? "right" : "left",
              }}
              className="form-label px-2  fs-6 text-gray-700 required"
            >
              {intl.formatMessage({
                id: "TheGeneralAuthorityForRealEstate",
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
                  id: "TheGeneralAuthorityForRealEstate",
                })}
                {...register?.("groupName")}
              />
            </div>
            {DisplayErrorMessage(errors?.groupName?.message, intl)}
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div>
            <label
              htmlFor="PermitWork"
              className="form-label mx-2 px-2 fw-bolder required"
            >
              {intl.formatMessage({ id: "PermitType" })}
            </label>
            {/* <div className="form-control form-control-solid d-flex px-2">
              <div className="d-flex flex-nowrap">
                <input
                  type="radio"
                  name="PermitType"
                  id="PermitWorkEnable"
                  className="form-check-input"
                  defaultChecked
                  checked={permissionType == 0}
                  onChange={() => {
                    setPermissionType(0);
                  }}
                />
                <label htmlFor="cardStateEnable" className="mx-2 text-nowrap">
                  {intl.formatMessage({ id: "PermitWork" })}
                </label>
              </div>
              <div className="mx-2 d-flex flex-nowrap">
                <input
                  type="radio"
                  name="PermitType"
                  id="PersonalVisitPermitDisable"
                  className="form-check-input"
                  checked={permissionType == 1}
                  onChange={() => {
                    setPermissionType(1);
                  }}
                />
                <label htmlFor="cardStatusDisable" className="mx-2 text-nowrap">
                  {intl.formatMessage({ id: "PersonalVisitPermit" })}
                </label>
              </div>
            </div> */}

            <div className="input-group">
              <select
                className="form-select form-select-solid"
                name="PermitType"
                id="PermitType"
                value={permitTypeId}
                {...register?.("permitTypeId")}
                onChange={(e) => {
                  setPermitTypeId?.(e.target.value);
                  setValue?.("permitTypeId", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  trigger?.("permitTypeId");
                }}
              >
                <option value="" disabled>
                  {intl.formatMessage({ id: "PermitType" })}
                </option>
                {permissionTypes?.map((item: permissionTypeModel) => (
                  <option key={item?.id} value={item?.id}>
                    {language == "ar" ? item?.nameAr : item?.nameEn}
                  </option>
                ))}
              </select>
            </div>
            {DisplayErrorMessage(errors?.permitTypeId?.message, intl)}
          </div>
        </div>
        <div className="col-md-6 col-12">
          <label
            className="fs-6 fw-bold mb-2 required"
            htmlFor="classNameification"
          >
            {intl.formatMessage({ id: "DeclaringAuthority" })}{" "}
          </label>
          <div className="input-group ">
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
        <div className="col-md-6 col-12">
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
        {/* <div className="col-sm-3 col-12">
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
        </div> */}
        <div className="col-sm-6 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="startDateTime"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "FromDate" })}
            </label>
            <input
              id="startDateTime"
              type="datetime-local"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "FromDate" })}
              {...register?.("StartDateTime")}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          {DisplayErrorMessage(errors?.StartDateTime?.message, intl)}
        </div>

        <div className="col-sm-6 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="EndDateTime"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "ToDate" })}
            </label>
            {/*
      Limit the end datetime to the same calendar day selected in FromDate.
      Time stays flexible within that day.
    */}
            <input
              id="EndDateTime"
              type="datetime-local"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "ToDate" })}
              {...register?.("EndDateTime")}
              min={
                formValues?.StartDateTime
                  ? `${formValues?.StartDateTime?.split("T")?.[0]}T00:00`
                  : new Date().toISOString().slice(0, 16)
              }
              max={
                formValues?.StartDateTime
                  ? `${formValues?.StartDateTime?.split("T")?.[0]}T23:59`
                  : undefined
              }
            />
          </div>
          {DisplayErrorMessage(errors?.EndDateTime?.message, intl)}
        </div>
      </div>

      <div className="row">
        <div className="col-12 my-5">
          <label className="mb-4">
            <span>
              {intl.formatMessage({ id: "DoYouWantToRequestParking" })}
            </span>
          </label>
          <div className="d-flex ">
            <div className="d-flex flex-nowrap mx-4">
              <input
                type="radio"
                id="isParkingYes"
                name="isParking"
                value="yes"
                checked={isParking === "yes"}
                onChange={(e) => setIsParking(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="cardStateEnable" className="mx-2 text-nowrap">
                {intl.formatMessage({ id: "YES" })}
              </label>
            </div>
            <div className="d-flex flex-nowrap mx-4">
              <input
                type="radio"
                id="isParkingNo"
                name="isParking"
                value="no"
                checked={isParking === "no"}
                onChange={(e) => setIsParking(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="cardStateEnable" className="mx-2 text-nowrap">
                {intl.formatMessage({ id: "NO" })}
              </label>
            </div>
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
                    src={toAbsoluteUrl("/media/pmo/uploadFile.png")}
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
          setEmployeeEmail={setEmployeeEmail}
          orgId={orgId}
        />
      </div>
    </>
  );
};
export { DeclarationDataForGroup };
