import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { EditSinglePermissionProps } from "../../../validation/edit-individual-permission-validation";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form"; 
import { EmployeeHierarchyFilteredPopup } from "../../request-entry-permit/popups/EmployeeHierarchyFilteredPopup";
import { VisitorAggRootUrl } from "@4eplatform/shared/apis/visitor_agg";
import { ManagementHierarchyPopup } from "../../permits-list/popup/ManagementHierarchyPopup";
type DeclarationDataProps = {
  employeeId?: string;
  setEmployeeId?: any;
  setEmployeeName?: any;
  employeeName?: string;
  orgId?: string;
  setOrgId?: any;
  orgName?: string;
  setOrgName?: any;
  register?: UseFormRegister<EditSinglePermissionProps>;
  setValue?: UseFormSetValue<EditSinglePermissionProps>;
  trigger?: UseFormTrigger<EditSinglePermissionProps>;
  formValues?: EditSinglePermissionProps;
  errors?: FieldErrors<EditSinglePermissionProps>;
  selectedFilesForAttachments?: any;
  setSelectedFilesForAttachments?: any;
};
const DeclarationDataForInternalEdit: FC<DeclarationDataProps> = ({
  register,
  setValue,
  trigger,
  employeeId,
  setEmployeeId,
  employeeName,
  setEmployeeName,
  orgId,
  setOrgId,
  orgName,
  setOrgName,
  errors,
  formValues,
  selectedFilesForAttachments,
  setSelectedFilesForAttachments,
}) => {
  const intl = useIntl();
  const { singlePermission } = useSelector(
    (state: RootState) => state.permission
  );
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  useEffect(() => {
    setValue?.("stepNumber", 1);
  }, []);
  useEffect(() => {
    if (employeeName) {
      setValue?.("recivedId", employeeId);
      trigger?.("recivedId");
    }
  }, [employeeName]);

  useEffect(() => {
    if (orgName) {
      setValue?.("orgId", orgId);
      trigger?.("orgId");
    }
  }, [orgName]);

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
  let language = intl.locale;
  const getIconSrc = (fileName: string, file: any, rootUrl: string) => {
    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return file?.path ? `${rootUrl}${file?.path}` : URL.createObjectURL(file);
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
            <div className="form-control form-control-solid d-flex px-2">
              <div className="d-flex flex-nowrap">
                <input
                  type="radio"
                  name="PermitType"
                  id="PermitWorkEnable"
                  className="form-check-input"
                  defaultChecked
                />
                <label htmlFor="cardStateEnable" className="mx-2 text-nowrap">
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
            {intl.formatMessage({ id: "DeclaringAuthority" })}
          </label>
          <div className="input-group ">
            <input
              readOnly
              className="form-control"
              placeholder={intl.formatMessage({
                id: "ChooseManagementEntity",
              })}
              value={orgName}
            />
            <div className="h-110 d-flex" role="button">
              <span
                className="input-group-text"
                onClick={() => setModalMShow(true)}
              >
                <i className="bi bi-diagram-3 fs-3 text-muted"></i>
              </span>
            </div>
            {DisplayErrorMessage(errors?.orgId?.message, intl)}
          </div>
        </div>

        <div className="col-sm-4 col-12">
          <label
            className="fs-6 fw-bold mb-2 required"
            htmlFor="classNameification"
          >
            {intl.formatMessage({ id: "FutureVisit" })}{" "}
          </label>

          <div className="input-group ">
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
            {DisplayErrorMessage(errors?.recivedId?.message, intl)}
          </div>
        </div>
      </div>
      <div className="row my-8">
        <div className="col-sm-12 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "ReasonForStatement" })}</span>
          </label>
          <textarea
            className="form-control form-control-solid"
            placeholder={intl.formatMessage({ id: "ReasonForStatement" })}
            {...register?.("permissionReason")}
          />
        </div>
      </div>
      {DisplayErrorMessage(errors?.permissionReason?.message, intl)}
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
              min={singlePermission?.startDate}
            />
          </div>
          {DisplayErrorMessage(errors?.startDate?.message, intl)}
        </div>

        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="startDate"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "EndingDate" })}
            </label>
            <input
              id="startDate"
              type="date"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "EndingDate" })}
              {...register?.("endDate")}
              min={formValues?.startDate}
            />
          </div>
          {DisplayErrorMessage(errors?.endDate?.message, intl)}
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
            />
          </div>
          {DisplayErrorMessage(errors?.startTime?.message, intl)}
        </div>

        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="startDate"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "ToHour" })}
            </label>
            <input
              id="startDate"
              type="time"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "ToHour" })}
              {...register?.("endTime")}
            />
          </div>
          {DisplayErrorMessage(errors?.endTime?.message, intl)}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 my-5">
          <label className="form-label px-2  fontSz-6 required">
            {intl.formatMessage({ id: "ATTACHMENTS" })}
          </label>
          <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
            <label
              htmlFor="outputAttachment1"
              className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
            >
              <div role="button" className="d-flex align-items-center">
                {selectedFilesForAttachments?.length > 0 ? (
                  <>
                    <div>
                      <ul className="d-flex align-items-center flex-wrap">
                        {selectedFilesForAttachments?.map((file: any, index: any) => (
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
                              src={getIconSrc(
                                file?.name,
                                file,
                                VisitorAggRootUrl
                              )}
                              className={file?.name}
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
                              }}
                              onClick={() => handleFileDelete(index)}
                            >
                              x
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </label>
            <div
              className="dropzone dropzone-queue "
              id="kt_dropzonejs_example_3"
            >
              <div className="dropzone-panel">
                <input
                  multiple
                  type="file"
                  id="outputAttachment1"
                  name="attachments1"
                  onChange={handleFileInputChange}
                  placeholder={intl.formatMessage({ id: "FileUpload" })}
                  className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-8">
        <div className="col-sm-12 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "Note" })}</span>
          </label>
          <textarea
            className="form-control form-control-solid"
            placeholder={intl.formatMessage({ id: "Note" })}
            {...register?.("note")}
          />
        </div>
      </div>
      {DisplayErrorMessage(errors?.note?.message, intl)}
      <div className="modal fade" aria-hidden="true">
        <ManagementHierarchyPopup
          show={modalMShow}
          handleClose={() => setModalMShow(false)}
          orgId={orgId as string}
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
        />
      </div>
    </>
  );
};
export { DeclarationDataForInternalEdit };
