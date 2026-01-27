import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import { FC, useState } from "react";
import { useIntl } from "react-intl";

const DeclarationData: FC = () => {
  const intl = useIntl();
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  return (
    <>
      <div className="row my-8">
        <div className="col-md-4">
          <div>
            <label
              htmlFor="PermitWork"
              className="form-label mx-2 px-2 fw-bolder"
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
              <div className="mx-2 d-flex flex-nowrap">
                <input
                  type="radio"
                  name="PermitType"
                  id="PersonalVisitPermitDisable"
                  className="form-check-input"
                />
                <label htmlFor="cardStatusDisable" className="mx-2 text-nowrap">
                  {intl.formatMessage({ id: "PersonalVisitPermit" })}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
            {intl.formatMessage({ id: "DeclaringAuthority" })}{" "}
          </label>
          <div className="input-group ">
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "ChooseManagementEntity",
              })}
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
        </div>
      </div>
      <div className="row my-8">
        <div className="col-sm-12 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "ReasonForStatement" })}</span>
          </label>
          <textarea
            className="form-control form-control-solid"
            name="ReasonForStatement"
            placeholder={intl.formatMessage({ id: "ReasonForStatement" })}
          />
        </div>
      </div>
      <div className="row my-8">
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label htmlFor="startDate" className="form-label px-2  fontSz-6 ">
              {intl.formatMessage({ id: "BeginningDate" })}
            </label>
            <input
              id="startDate"
              type="date"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({
                id: "BeginningDate",
              })}
            />
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label htmlFor="startDate" className="form-label px-2  fontSz-6 ">
              {intl.formatMessage({ id: "EndingDate" })}
            </label>
            <input
              id="startDate"
              type="date"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "EndingDate" })}
            />
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label htmlFor="startDate" className="form-label px-2  fontSz-6 ">
              {intl.formatMessage({ id: "FromHour" })}
            </label>
            <input
              id="startDate"
              type="time"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "FromHour" })}
            />
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="mb-2 pt-2 pb-3">
            <label htmlFor="startDate" className="form-label px-2  fontSz-6 ">
              {intl.formatMessage({ id: "ToHour" })}
            </label>
            <input
              id="startDate"
              type="time"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "ToHour" })}
            />
          </div>
        </div>
      </div>
      <div className="col-12 my-5">
        <div className="mb-2 pt-2 pb-3">
          <label className="form-label px-2  fs-6 text-gray-700">
            {intl.formatMessage({ id: "UploadFile" })}
          </label>
          <label
            className="d-flex align-items-center bg-primary bg-opacity-10 p-4 rounded-2 border-dashed border-1 border-primary"
            htmlFor="uploadKnowledgeFile"
            role="button"
          >
            <div>
              <i className="bi bi-file-earmark-arrow-up-fill fa-3x text-primary opacity-75"></i>
            </div>
            <div className="mx-4">
              <p className="text-primary fw-bolder mb-2">
                {intl.formatMessage({
                  id: "FastDownloadFile",
                })}
              </p>
              <p>
                {intl.formatMessage({
                  id: "DragAndDropOrChooseFilesFromComputer",
                })}
              </p>
            </div>
          </label>
          <input type="file" hidden id="uploadKnowledgeFile" />
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
            name="Note"
            placeholder={intl.formatMessage({ id: "ReasonForStatement" })}
          />
        </div>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_viewallcards_hierarchy"
        aria-hidden="true"
      >
        <ManagementHierarchyPopup
          show={modalMShow}
          handleClose={() => setModalMShow(false)}
        />
      </div>
      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
      />
    </>
  );
};
export { DeclarationData };
