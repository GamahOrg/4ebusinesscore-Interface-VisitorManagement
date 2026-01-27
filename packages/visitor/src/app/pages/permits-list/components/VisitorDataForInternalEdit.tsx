import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { fetchUser } from "@4eplatform/gateway/src/app/features/userSlice";
import { useDispatch } from "react-redux";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { EmployeeHierarchyPopup } from "../popup/EmployeeHierarchyPopup";
import { EditInternalSinglePermissionProps } from "../../../validation/edit-internal-single-permission-validation";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type VisitorDataProps = {
  register?: UseFormRegister<EditInternalSinglePermissionProps>;
  setValue?: UseFormSetValue<EditInternalSinglePermissionProps>;
  trigger?: UseFormTrigger<EditInternalSinglePermissionProps>;
  formValues?: EditInternalSinglePermissionProps;
  errors?: FieldErrors<EditInternalSinglePermissionProps>;
  setEmployeeName?: any;
  employeeName?: string;
  employeeId?: string;
  setEmployeeId?: any;
};
const VisitorDataForInternalEdit: FC<VisitorDataProps> = ({
  register,
  setValue,
  trigger,
  formValues,
  errors,
  setEmployeeName,
  employeeName,
  employeeId,
  setEmployeeId,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [firstMount, setFirstMount] = useState(true);
  let [user, setUser] = useState<any>({});
  const [handleAdd, setHandleAdd] = useState<boolean>(false);

  useEffect(() => {
    setValue?.("stepNumber", 0);
  }, []);
  useEffect(() => {
    if (employeeId && firstMount == false && handleAdd) {
      dispatch(fetchUser(employeeId as string) as any)?.then((res: any) => {
        setUser(res?.payload?.result);
      });
    }
  }, [employeeId, handleAdd]);

  // useEffect(() => {
  //   if (employeeName) {
  //     setValue?.("visitorName", employeeName);
  //     trigger?.("visitorName");
  //   }
  // }, [employeeName]);

  // let user = useSelector((state: RootState) => {
  //   return state?.user?.data;
  // });

  useEffect(() => {
    if (user?.id) {
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
        setValue?.("visitorName", fullName);
        trigger?.("visitorName");
      }
      if (user?.nationalId) {
        setValue?.("nationalId", user?.nationalId);
      }
      if (user?.phoneNumber) {
        setValue?.("phone", user?.phoneNumber);
      }
      if (user?.email) {
        setValue?.("email", user?.email);
      }
      setValue?.("userId", user?.id);
      setHandleAdd(false);
    }
  }, [user]);
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
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "VisitorName",
              })}
              // value={employeeName}
              {...register?.("visitorName")}
            />
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
              readOnly={user?.nationalId ? true : false}
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
              readOnly={user?.phoneNumber ? true : false}
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
      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        setEmployeeName={setEmployeeName}
        setFirstMount={setFirstMount}
        setHandleAdd={setHandleAdd}
      />
    </>
  );
};
export { VisitorDataForInternalEdit };
