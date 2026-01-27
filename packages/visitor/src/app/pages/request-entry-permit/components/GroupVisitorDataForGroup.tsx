import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { AddPopup } from "../popups/AddPopup";
import { v4 as uuidv4 } from "uuid";
import { AddExternalGroupPermissionProps } from "../../../validation/add-external-group-permission-validation";
import { DeletePopup } from "../../request-internal-permit/popups/DeletePopup";
import { getEditedPermissionGroup } from "../../../redux/edited-permission-slice";
import {
  getVisitorPermissionGroup,
  getCancelPermissionsGroup,
  getRenewalPermissionsGroupRequests,
} from "../../../redux/visitor-permission-slice";
import { useAppDispatch } from "../../../redux/store";
type VisitorDataProps = {
  register?: UseFormRegister<AddExternalGroupPermissionProps>;
  setValue?: UseFormSetValue<AddExternalGroupPermissionProps>;
  trigger?: UseFormTrigger<AddExternalGroupPermissionProps>;
  getValues?: UseFormGetValues<AddExternalGroupPermissionProps>;
  userId?: string | null;
  visitors?: any;
  setVisitors?: any;
  formValues?: AddExternalGroupPermissionProps;
  errors?: FieldErrors<AddExternalGroupPermissionProps>;
  clearErrors?: UseFormClearErrors<AddExternalGroupPermissionProps>;
  setGroupNameIsRepeated?: any;
  groupNameIsRepeated?: boolean;
};
const GroupVisitorDataForGroup: FC<VisitorDataProps> = ({
  register,
  setValue,
  trigger,
  getValues,
  userId,
  visitors,
  setVisitors,
  formValues,
  errors,
  clearErrors,
  setGroupNameIsRepeated,
  groupNameIsRepeated,
}) => {
  const intl = useIntl();
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  let newUserId = uuidv4();
  const [showDelete, setShowDelete] = useState(false);
  let language: string = intl.locale;

  let dispatch = useAppDispatch();
  let [cancelGroupNames, setCancelGroupNames] = useState([]);
  let [editedGroupNames, setEditedGroupNames] = useState([]);
  let [renewalGroupNames, setRenewalGroupNames] = useState([]);
  let [groupVisitorNames, setGroupVisitorNames] = useState([]);
  useEffect(() => {
    const params: any = {
      pageSize: 10000,
      pageIndex: 1,
    };
    dispatch(getVisitorPermissionGroup(params) as any).then((res: any) => {
      setGroupVisitorNames(
        res?.payload?.result?.map((group: any) => {
          return group?.groupName?.toLowerCase();
        })
      );
    });
    dispatch(getCancelPermissionsGroup(params) as any).then((res: any) => {
      setCancelGroupNames(
        res?.payload?.result?.map((group: any) => {
          return group?.groupName?.toLowerCase();
        })
      );
    });

    dispatch(getEditedPermissionGroup(params) as any).then((res: any) => {
      setEditedGroupNames(
        res?.payload?.result?.map((group: any) => {
          return group?.groupName?.toLowerCase();
        })
      );
    });
    dispatch(getRenewalPermissionsGroupRequests(params) as any).then(
      (res: any) => {
        setRenewalGroupNames(
          res?.payload?.result?.map((group: any) => {
            return group?.groupName?.toLowerCase();
          })
        );
      }
    );
  }, []);
  let allGroupNames: any = [
    ...(Array.isArray(groupVisitorNames) ? groupVisitorNames : []),
    ...(Array.isArray(renewalGroupNames) ? renewalGroupNames : []),
    ...(Array.isArray(editedGroupNames) ? editedGroupNames : []),
    ...(Array.isArray(cancelGroupNames) ? cancelGroupNames : []),
  ];
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
  let [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    if (formValues?.visitorName) {
      setValue?.("userId", newUserId);
    }
  }, [formValues?.visitorName]);
  let [nationalIds, setNationalIds] = useState<any>([]);
  let [phoneNumbers, setPhoneNumbers] = useState<any>([]);
  let [emails, setEmails] = useState<any>([]);
  useEffect(() => {
    setNationalIds(
      visitors?.map((visitor: any) => {
        return visitor?.nationalID?.toString();
      })
    );
    setPhoneNumbers(
      visitors?.map((visitor: any) => {
        return visitor?.phoneNumber?.toString();
      })
    );
    setEmails(
      visitors?.map((visitor: any) => {
        return visitor?.email?.toString();
      })
    );
  }, [visitors]);
  let handleAddVisitor = () => {
    const currentFormValues = getValues?.() || formValues;

    setValue?.("isAddForTable", true as any);
    trigger?.([
      "visitorName",
      "nationalId",
      "phone",
      "whatsapp",
      "email",
    ])?.then((valid) => {
      if (!valid) {
        return;
      }

      const isEmailDuplicate = emails?.includes(
        (currentFormValues as any)?.email?.toString()
      );
      const isPhoneDuplicate = phoneNumbers?.includes(
        currentFormValues?.phone?.toString()
      );
      const isNationalIdDuplicate = nationalIds?.includes(
        (currentFormValues as any)?.nationalId?.toString()
      );

      if (isNationalIdDuplicate) {
        showSuccessAlert(false, "ThisIDNumberIsAlreadyExists", intl, () => {});
        return;
      }

      if (isEmailDuplicate) {
        showSuccessAlert(false, "ThisEmailIsAlreadyExists", intl, () => {});
        return;
      }

      if (isPhoneDuplicate) {
        showSuccessAlert(
          false,
          "ThisPhoneNumberIsAlreadyExists",
          intl,
          () => {}
        );
        return;
      }

      if (
        visitors
          ?.map((user: any) => {
            return user?.userId;
          })
          ?.includes(currentFormValues?.userId)
      ) {
        showSuccessAlert(false, "PleaseEnterDiffrentData", intl, () => {});
        return;
      }

      const newVisitor = {
        visitorName: currentFormValues?.visitorName,
        nationalID: (currentFormValues as any)?.nationalId,
        email: (currentFormValues as any)?.email,
        phoneNumber: currentFormValues?.phone,
        whatsappNumber: currentFormValues?.whatsapp || "",
        userId: currentFormValues?.userId || "user-" + Date.now(),
      };

      setVisitors((prev: any) => {
        const newVisitors = [...prev, newVisitor];
        return newVisitors;
      });

      setValue?.("visitorName", "");
      setValue?.("nationalId" as any, "");
      setValue?.("phone", "");
      setValue?.("whatsapp", "");
      setValue?.("email" as any, "");
      setValue?.("userId", "");
      setValue?.("isAddForTable", false as any);

      clearErrors?.("email" as any);
      clearErrors?.("nationalId" as any);
      clearErrors?.("phone");
      clearErrors?.("visitorName");
      clearErrors?.("whatsapp");
      clearErrors?.("userId");
      clearErrors?.("isAddForTable" as any);

      showSuccessAlert(true, "AddedSuccessfully", intl, () => {});
    });
  };
  let handleDeleteVisitor = (id: string) => {
    setVisitors(
      visitors?.filter((visitor: any) => {
        return visitor?.userId != id;
      })
    );
    showSuccessAlert(true, "DeletedSuccessfully", intl, () => {});
  };
  return (
    <>
      <div className="row my-8">
        <div className="col-12">
          <label className="fs-6 fw-bold mb-2 required">
            <span>{intl.formatMessage({ id: "BuldingDetails" })}</span>
          </label>
          <div className="d-flex align-items-center mt-2">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="building-type-primary"
                value="1"
                disabled={visitors && visitors.length > 0}
                {...register?.("BuildingType" as any)}
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
                disabled={visitors && visitors.length > 0}
                {...register?.("BuildingType" as any)}
              />
              <label
                className="form-check-label"
                htmlFor="building-type-secondary"
              >
                {intl.formatMessage({ id: "Secondary" })}
              </label>
            </div>
          </div>
          {DisplayErrorMessage((errors as any)?.BuildingType?.message, intl)}
        </div>
      </div>
      <div className="row my-8">
        <div className="col-sm-4 col-12">
          <label
            className="fs-6 fw-bold mb-2 required"
            htmlFor="classNameification"
          >
            {intl.formatMessage({ id: "VisitorName" })}{" "}
          </label>

          <div className="input-group ">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-person special"></i>
              </span>
            </div>
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "VisitorName",
              })}
              {...register?.("visitorName")}
            />
          </div>
          {DisplayErrorMessage(errors?.visitorName?.message, intl)}
        </div>

        <div className="col-sm-4 col-12">
          <label className="mb-2 required">
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
              type="text"
              placeholder={intl.formatMessage({ id: "IDNumber" })}
              {...register?.("nationalId" as any)}
              // onChange={(e) => {

              //   trigger?.("nationalId" as any);
              // }}
            />
          </div>
          {DisplayErrorMessage((errors as any)?.nationalId?.message, intl)}
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2 required">
            <span>{intl.formatMessage({ id: "Phone" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ padding: "0 8px" }}>
                +966
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="text"
              placeholder={intl.formatMessage({ id: "Phone" })}
              {...register?.("phone")}
            />
            {DisplayErrorMessage(errors?.phone?.message, intl)}
          </div>
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
              name="WhatsAppNumber"
              {...register?.("whatsapp")}
              placeholder={intl.formatMessage({ id: "WhatsAppNumber" })}
            />
            {DisplayErrorMessage(errors?.whatsapp?.message, intl)}
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
              {...register?.("email" as any)}
            />
            {DisplayErrorMessage((errors as any)?.email?.message, intl)}
          </div>
        </div>
        {/* <div className="col-sm-4 col-12">
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
                readOnly={visitors?.length > 0 && groupNameIsRepeated==false ? true : false}
                {...register?.("groupName")}
              />
            </div>
            {DisplayErrorMessage(errors?.groupName?.message, intl)}
          </div>
        </div> */}
      </div>
      <div className="col-12 col-lg-7  mb-7 mt-10">
        <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
          <div className="d-flex justify-content-end align-items-center w-50">
            <div
              className="btn btn-success mx-1 text-center"
              onClick={(e) => {
                e.preventDefault();

                setModalAddShow(true);
              }}
            >
              {intl.formatMessage({ id: "Add" })}
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive py-5 overflow-y-auto mh-250px">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="px-2 pb-3 min-w-100px">
                {intl.formatMessage({
                  id: "VisitorName",
                })}
              </th>
              <th className="px-2 pb-3 min-w-100px">
                {" "}
                {intl.formatMessage({
                  id: "IDNumber",
                })}{" "}
              </th>
              <th className="px-2 pb-3 min-w-100px">
                {" "}
                {intl.formatMessage({
                  id: "Phone",
                })}{" "}
              </th>
              <th className="px-2 pb-3 min-w-100px">
                {intl.formatMessage({
                  id: "WhatsAppNumber",
                })}{" "}
              </th>
              <th className="px-2 pb-3 min-w-100px">
                {intl.formatMessage({
                  id: "Email",
                })}
              </th>
              <th className="px-2 pb-3 min-w-100px">
                {" "}
                {intl.formatMessage({
                  id: "TheProcedures",
                })}{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {visitors?.map((visitor: any, index: any) => (
              <tr key={visitor?.userId}>
                <td className="">{visitor?.visitorName}</td>
                <td className="text-center">{visitor?.nationalID}</td>
                <td className="text-center">{visitor?.phoneNumber}</td>
                <td className="text-center">{visitor?.whatsappNumber}</td>
                <td className="text-center">{visitor?.email}</td>
                <td className="text-center">
                  <a
                    onClick={() => {
                      setSelectedId(visitor?.userId);
                      handleDeleteVisitor(visitor?.userId);
                    }}
                    className="menu-link px-3 text-danger text-muted"
                  >
                    <span className="svg-icon svg-icon-3 mx-2">
                      <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                    </span>
                  </a>
                </td>
                {selectedId == visitor?.userId && (
                  <DeletePopup
                    showDelete={showDelete}
                    handleCloseDelete={() => setShowDelete(false)}
                    handleDelete={() => {
                      handleDeleteVisitor(selectedId);
                    }}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPopup
        show={modalAddShow}
        handleClose={() => setModalAddShow(false)}
        handleAdd={() => {
          handleAddVisitor();
        }}
      />
    </>
  );
};
export { GroupVisitorDataForGroup };
