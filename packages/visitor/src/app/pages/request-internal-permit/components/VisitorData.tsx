import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EmployeeHierarchyPopup } from "./EmployeeHierarchyPopup";
import { fetchUser } from "@4eplatform/gateway/src/app/features/userSlice";
import { useDispatch } from "react-redux";

type VisitorDataProps = {
  register?: any;
  setValue?: any;
  trigger?: any;
  userId: string | null;
  errors?: any;
  DisplayErrorMessage?: any;
  comeFrom?: string;
  formValues?: any;
  setUserId?: any;
};
const VisitorData: FC<VisitorDataProps> = ({
  register,
  setValue,
  trigger,
  userId,
  errors,
  DisplayErrorMessage,
  comeFrom = "request-internal-permit",
  setUserId,
}) => {
  const intl = useIntl();

  const dispatch = useDispatch();

  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [employeeId, setEmployeeId] = useState<string>("");
  let [employeeName, setEmployeeName] = useState<string>("");
  let [user, setUser] = useState<any>({});
  const [handleAdd, setHandleAdd] = useState<boolean>(false);

  useEffect(() => {
    if (employeeId && comeFrom === "request-internal-permit" && handleAdd) {
      setUserId(employeeId);
      dispatch(fetchUser(employeeId as string) as any)?.then((res: any) => {
        setUser(res?.payload?.result);
      });
    }
  }, [employeeId, handleAdd]);

  useEffect(() => {
    if (user?.id && comeFrom === "request-internal-permit") {
      const fullName = user
        ? user?.firstName +
          " " +
          user?.secondName +
          " " +
          user?.thirdName +
          " " +
          user?.forthName
        : "";
      if (fullName) {
        setValue("VisitorName", fullName);
        trigger("VisitorName");
      }

      if (user?.nationalId || user?.nationalId === "") {
        setValue("NationalID", user?.nationalId);
        trigger("NationalID");
      }
      if (user?.phoneNumber) {
        setValue("PhoneNumber", user?.phoneNumber);
        trigger("PhoneNumber");
      }
      if (user?.email) {
        setValue("Email", user?.email);
        trigger("Email");
      }
      setHandleAdd(false);
    }
  }, [user]);

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
            <input
              readOnly={comeFrom === "request-internal-permit"}
              className="form-control"
              placeholder={intl.formatMessage({
                id: "VisitorName",
              })}
              {...register("VisitorName")}
            />
            {comeFrom === "request-internal-permit" && (
              <div className="h-110 d-flex" role="button">
                <span
                  className="input-group-text"
                  onClick={() => {
                    setModalHShow(true);
                  }}
                >
                  <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                </span>
              </div>
            )}
            {DisplayErrorMessage(
              errors?.VisitorName?.message,
              intl,
              intl.locale
            )}
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
              readOnly={user?.nationalId ? true : false}
              className="form-control form-control-solid"
              type="number"
              placeholder={intl.formatMessage({ id: "IDNumber" })}
              {...register("NationalID")}
            />
          </div>
          {DisplayErrorMessage(errors?.NationalID?.message, intl, intl.locale)}
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "Phone" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ padding: "0 8px" }}>
                966+
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="text"
              placeholder={intl.formatMessage({ id: "Phone" })}
              {...register("PhoneNumber")}
            />
          </div>
          {DisplayErrorMessage(errors?.PhoneNumber?.message, intl, intl.locale)}
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
              {...register("WhatsAppNumber")}
            />
            {DisplayErrorMessage(
              errors?.WhatsAppNumber?.message,
              intl,
              intl.locale
            )}
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
              readOnly={comeFrom === "request-internal-permit"}
              className="form-control form-control-solid"
              type="email"
              placeholder={intl.formatMessage({ id: "Email" })}
              {...register("Email")}
            />
          </div>
          {DisplayErrorMessage(errors?.Email?.message, intl, intl.locale)}
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "Thebulding" })}</span>
          </label>
          <div className="d-flex align-items-center mt-1">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="building-type-primary"
                value="1"
                {...register("BuildingType", {
                  required: "InputFieldIsRequried",
                })}
              />
              <label
                className="form-check-label"
                htmlFor="building-type-primary"
              >
                {intl.formatMessage({ id: "Primary" })}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="building-type-secondary"
                value="2"
                {...register("BuildingType", {
                  required: "InputFieldIsRequried",
                })}
              />
              <label
                className="form-check-label"
                htmlFor="building-type-secondary"
              >
                {intl.formatMessage({ id: "Secondary" })}
              </label>
            </div>
          </div>
          {DisplayErrorMessage(
            errors?.BuildingType?.message,
            intl,
            intl.locale
          )}
        </div>
      </div>
      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        setEmployeeName={setEmployeeName}
        setHandleAdd={setHandleAdd}
      />
    </>
  );
};
export { VisitorData };
