import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../redux/users-slice";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import { EmployeeHierarchyFilteredPopup } from "./EmployeeHierarchyFilteredPopup";
import { permissionTypeModel } from "../../../model/permission-type-model";

type DeclarationDataProps = {
  register?: any;
  setValue?: any;
  trigger?: any;
  userId: string | null;
  employeeId?: any;
  setEmployeeId?: any;
  orgId?: any;
  setOrgId?: any;
  selectedImage?: any;
  setSelectedImage?: any;
  errors?: any;
  DisplayErrorMessage?: any;
  comeFrom?: string;
  permitType?: string;
  setPermitType?: any;
  formValues?: any;
  setEmployeeEmail?: any;
  permitTypeId?: string;
  setPermitTypeId?: any;
  permissionTypes?:any;
  isParking?:any;
  setIsParking?:any;
};
const DeclarationData: FC<DeclarationDataProps> = ({
  register,
  setValue,
  trigger,
  userId,
  employeeId,
  setEmployeeId,
  orgId,
  setOrgId,
  selectedImage,
  setSelectedImage,
  errors,
  DisplayErrorMessage,
  comeFrom = "request-internal-permit",
  permitType = "",
  setPermitType,
  formValues,
  setEmployeeEmail,
  permitTypeId,
  setPermitTypeId,
  permissionTypes,
  isParking,
  setIsParking,
}) => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  let [employeeName, setEmployeeName] = useState<string>("");
  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId as string) as any);
    }
  }, [userId]);
  useEffect(() => {
    if (employeeName) {
      setValue?.("RecivedId", employeeName);
      trigger?.("RecivedId");
    }
  }, [employeeName]);

  useEffect(() => {
    if (orgName) {
      setValue?.("OrgId", orgName);
      trigger?.("OrgId");

      setEmployeeName("");
      setValue?.("RecivedId", "");
      trigger?.("RecivedId");
    }
  }, [orgName]);

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    if (files) {
      setSelectedImage([...selectedImage, ...files]);
    }
    event.target.value = "";
  };
let language = intl.locale;
  useEffect(() => {
    setValue?.("stepNumber", 1);
  }, []);

  // Show required error for PermitType as soon as the step loads.
  useEffect(() => {
    trigger?.("PermitTypeId");
  }, [trigger]);

  
  useEffect(() => {
    if (formValues?.StartDateTime && formValues?.EndDateTime) {
      trigger?.(["StartDateTime", "EndDateTime"]);
    }
  }, [formValues?.StartDateTime, formValues?.EndDateTime, trigger]);
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
            {/* <div className="form-control form-control-solid d-flex px-2">
              <div className="d-flex flex-nowrap">
                <input
                  type="radio"
                  name="PermitType"
                  id="PermitWorkEnable"
                  className="form-check-input"
                  checked={permitType === "work"}
                  onChange={() => setPermitType("work")}
                />
                <label htmlFor="cardStateEnable" className="mx-2 text-nowrap">
                  {intl.formatMessage({ id: "PermitWork" })}
                </label>
              </div>
              {comeFrom === "request-entry-permit" && (
                <div className="mx-2 d-flex flex-nowrap">
                  <input
                    type="radio"
                    name="PermitType"
                    id="PersonalVisitPermitDisable"
                    className="form-check-input"
                    checked={permitType === "visit"}
                    onChange={() => setPermitType("visit")}
                  />
                  <label
                    htmlFor="cardStatusDisable"
                    className="mx-2 text-nowrap"
                  >
                    {intl.formatMessage({ id: "PersonalVisitPermit" })}
                  </label>
                </div>
              )}
            </div> */}
<div className="input-group">
                      <select
                        className="form-select form-select-solid"
                        name="PermitType"
                        id="PermitType"
                        value={permitTypeId}
    {...register?.("PermitTypeId")}
    onChange={(e) => {
      setPermitTypeId?.(e.target.value);
      setValue?.("PermitTypeId", e.target.value, {
        shouldValidate: true,
        shouldDirty: true,
      });
      trigger?.("PermitTypeId");
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
            {DisplayErrorMessage(
              errors?.PermitTypeId?.message,
              intl,
              intl.locale
            )}
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
              {...register("OrgId")}
            />
            <div className="h-110 d-flex" role="button">
              <span
                className="input-group-text"
                onClick={() => setModalMShow(true)}
              >
                <i className="bi bi-diagram-3 fs-3 text-muted"></i>
              </span>
            </div>
            {DisplayErrorMessage(errors?.OrgId?.message, intl, intl.locale)}
          </div>
        </div>

        <div className="col-sm-4 col-12">
          <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
            {intl.formatMessage({ id: "FutureVisit" })}{" "}
          </label>

          <div className="input-group ">
            <input
              readOnly
              className="form-control"
              placeholder={intl.formatMessage({
                id: "SelectEmployee",
              })}
              {...register("RecivedId")}
            />
            <div className="h-110 d-flex" role="button">
              <span
                className="input-group-text"
                onClick={() => setModalHShow(true)}
              >
                <i className="bi bi-diagram-3 fs-3 text-muted"></i>
              </span>
            </div>
            {DisplayErrorMessage(errors?.RecivedId?.message, intl, intl.locale)}
          </div>
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
            {...register("PermissionReason")}
          />
        </div>
      </div>
      {DisplayErrorMessage(
        errors?.PermissionReason?.message,
        intl,
        intl.locale
      )}
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
              {...register("StartDate")}
              min={new Date()?.toISOString()?.split("T")[0]}
            />
          </div>
          {DisplayErrorMessage(errors?.StartDate?.message, intl, intl.locale)}
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label
              htmlFor="endDate"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "EndingDate" })}
            </label>
            <input
              id="endDate"
              type="date"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "EndingDate" })}
              {...register("EndDate")}
              min={formValues?.StartDate}
            />
          </div>
          {DisplayErrorMessage(errors?.EndDate?.message, intl, intl.locale)}
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
              {...register("StartTime")}
            />
          </div>
          {DisplayErrorMessage(errors?.StartTime?.message, intl, intl.locale)}
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
              {...register("EndTime")}
            />
          </div>
          {DisplayErrorMessage(errors?.EndTime?.message, intl, intl.locale)}
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
      {...register("StartDateTime")}
      min={new Date().toISOString().slice(0, 16)}
    />
  </div>
  {DisplayErrorMessage(errors?.StartDateTime?.message, intl, intl.locale)}
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
      Restrict the day to the same date chosen in FromDate.
      Time remains free, but only that calendar day is allowed.
    */}
    <input
      id="EndDateTime"
      type="datetime-local"
      className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
      placeholder={intl.formatMessage({ id: "ToDate" })}
      {...register("EndDateTime")}
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
  {DisplayErrorMessage(errors?.EndDateTime?.message, intl, intl.locale)}
</div>
      </div>
<div className="row">
<div className="col-12 my-5">
<label className="mb-4">
      <span>{intl.formatMessage({ id: "DoYouWantToRequestParking" })}</span>
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
        <div className="col-12 my-5">
          <div className="mb-2 pt-2 pb-3">
            <label className="form-label px-2 fs-6 text-gray-700">
              {intl.formatMessage({ id: "UploadFile" })}
            </label>

            <label
              className="d-flex align-items-center bg-primary bg-opacity-10 p-4 rounded-2 border-dashed border-1 border-primary"
              htmlFor="outputAttachment"
              role="button"
            >
              <div>
                <i className="bi bi-file-earmark-arrow-up-fill fa-3x text-primary opacity-75"></i>
              </div>
              <div className="mx-4">
                <p className="text-primary fw-bolder my-2 p-0">
                  {intl.formatMessage({
                    id: "QuickFileUploader",
                  })}
                </p>
                <p className="p-0 my-1">
                  {intl.formatMessage({
                    id: "DragAndDropOrChooseFilesFromComputer",
                  })}
                </p>
              </div>

              {selectedImage && (
                <>
                  <div>
                    <ul>
                      {selectedImage?.map((file: any, index: number) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between align-items-center my-2"
                        >
                          {file.name}
                          <button
                            onClick={() =>
                              setSelectedImage(() => {
                                return selectedImage.filter(
                                  (img: any) => img !== file
                                );
                              })
                            }
                            className="bg-transparent text-danger fw-bold border-0"
                          >
                            <i className="bi bi-trash fa-lg"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </label>
            <div
              className="dropzone dropzone-queue mb-2"
              id="kt_dropzonejs_example_3"
            >
              <div className="dropzone-panel mb-lg-0 mb-2">
                <input
                  multiple
                  type="file"
                  id="outputAttachment"
                  className="dropzone-select w-100 uploadFile-style inputAreaHeight d-none"
                  {...register("Attachments")}
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
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
            //   type="text-area"
            // name="Note"
            placeholder={intl.formatMessage({ id: "Note" })}
            {...register("Note")}
          />
        </div>
      </div>
      {DisplayErrorMessage(errors?.Note?.message, intl, intl.locale)}
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
export { DeclarationData };
