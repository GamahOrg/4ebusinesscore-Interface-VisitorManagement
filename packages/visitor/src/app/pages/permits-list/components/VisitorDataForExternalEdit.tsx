import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { EditExternalSinglePermissionProps } from "../../../validation/edit-external-single-permission-validation";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type VisitorDataProps = {
  register?: UseFormRegister<EditExternalSinglePermissionProps>;
  setValue?: UseFormSetValue<EditExternalSinglePermissionProps>;
  trigger?: UseFormTrigger<EditExternalSinglePermissionProps>;
  formValues?: EditExternalSinglePermissionProps;
  errors?: FieldErrors<EditExternalSinglePermissionProps>;
};
const VisitorDataForExternalEdit: FC<VisitorDataProps> = ({
  register,
  setValue,
  errors,
}) => {
  const intl = useIntl();
  useEffect(() => {
    setValue?.("stepNumber", 0);
  }, []);

  let language = intl.locale;
  return (
    <>
      <div className="row my-8">
        <div className="col-sm-4 col-12">
          <label
            className="fs-6 fw-bold mb-2 required"
            htmlFor="classNameification"
          >
            {intl.formatMessage({ id: "VisitorName" })}
          </label>

          <div className="input-group ">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-user fs-2"></i>
              </span>
            </div>
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "VisitorName",
              })}
              {...register?.("visitorName")}
            />
            {DisplayErrorMessage(errors?.visitorName?.message, intl, language)}
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <label className={`mb-2 required`}>
            <span>{intl.formatMessage({ id: "IDNumber" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="special fas fa-file-signature "></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="number"
              placeholder={intl.formatMessage({ id: "IDNumber" })}
              {...register?.("nationalId")}
            />
          </div>
          {DisplayErrorMessage(errors?.nationalId?.message, intl, language)}
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "Phone" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa-solid fa-phone special"></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="text"
              placeholder={intl.formatMessage({ id: "Phone" })}
              {...register?.("phone")}
            />
          </div>
          {DisplayErrorMessage(errors?.phone?.message, intl, language)}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "WhatsAppNumber" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa-brands fa-whatsapp special"></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="text"
              placeholder={intl.formatMessage({ id: "WhatsAppNumber" })}
              {...register?.("whatsapp")}
            />
            {DisplayErrorMessage(errors?.whatsapp?.message, intl, language)}
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "Email" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="far fa-envelope special"></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="email"
              placeholder={intl.formatMessage({ id: "Email" })}
              {...register?.("email")}
            />
          </div>
          {DisplayErrorMessage(errors?.email?.message, intl, language)}
        </div>
      </div>
    </>
  );
};
export { VisitorDataForExternalEdit };
