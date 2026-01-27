import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../redux/users-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { EmployeeHierarchyPopup } from "./EmployeeHierarchyPopup";
import { AddPopup } from "../popups/AddPopup";
import { DeletePopup } from "../popups/DeletePopup";
import { AddInternalGroupPermissionProps } from "../../../validation/add-internal-group-permission-validation";
import { getEditedPermissionGroup } from "../../../redux/edited-permission-slice";
import {
  getVisitorPermissionGroup,
  getCancelPermissionsGroup,
  getRenewalPermissionsGroupRequests,
} from "../../../redux/visitor-permission-slice";

type VisitorDataProps = {
  register?: UseFormRegister<AddInternalGroupPermissionProps>;
  setValue?: UseFormSetValue<AddInternalGroupPermissionProps>;
  trigger?: UseFormTrigger<AddInternalGroupPermissionProps>;
  userId?: string | null;
  visitors?: any;
  setVisitors?: any;
  formValues?: AddInternalGroupPermissionProps;
  errors?: FieldErrors<AddInternalGroupPermissionProps>;
  clearErrors?: UseFormClearErrors<AddInternalGroupPermissionProps>;
  setGroupNameIsRepeated?:any,
  groupNameIsRepeated?:boolean
};
const GroupVisitorData: FC<VisitorDataProps> = ({
  register,
  setValue,
  trigger,
  userId,
  visitors,
  setVisitors,
  formValues,
  errors,
  clearErrors,
  setGroupNameIsRepeated,
  groupNameIsRepeated
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState(false);
  let language: string = intl.locale;
  let [selectedUserDetails, setSelectedUserDetails] = useState<any>({});
  const [handleAdd, setHandleAdd] = useState<boolean>(false);

  useEffect(() => {
    setValue?.("stepNumber", 0);
  }, []);
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
  let [employeeId, setEmployeeId] = useState<string>("");
  let [employeeName, setEmployeeName] = useState<string>("");
  useEffect(() => {
    if (employeeId && handleAdd) {
      dispatch(fetchUser(employeeId) as any).then((res: any) => {
        setSelectedUserDetails(res?.payload?.result);
      });
      setHandleAdd(false);
    }
  }, [employeeId, handleAdd]);

  useEffect(() => {
    if (selectedUserDetails?.id) {
      const fullName = selectedUserDetails
        ? selectedUserDetails?.firstName +
          " " +
          selectedUserDetails?.secondName +
          " " +
          selectedUserDetails?.thirdName +
          " " +
          selectedUserDetails?.forthName
        : "";
      if (fullName) {

        setValue?.("visitorName", fullName);
        trigger?.("visitorName");
      }

      setValue?.("email", selectedUserDetails?.email);
      setValue?.("phone", selectedUserDetails?.phoneNumber);
      setValue?.("nationalId", selectedUserDetails?.nationalId);
      setValue?.("userId", selectedUserDetails?.id);
      setValue?.("whatsapp", "");
      trigger?.();
    }
  }, [selectedUserDetails]);
  let [selectedId, setSelectedId] = useState("");
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
  let handleAddVisitor = (formValues: AddInternalGroupPermissionProps) => {
    if (
      allGroupNames?.includes(formValues?.groupName?.toLowerCase() as string)
    ) {
      showSuccessAlert(false, "GroupNameIsRepeated", intl);
      setGroupNameIsRepeated(true)
      return;
    }
    else {
      setGroupNameIsRepeated(false)
    }
    setValue?.("isAddForTable", true);
    trigger?.("isAddForTable");
    trigger?.([
      "groupName",
      "visitorName",
      "userId",
      "phone",
      "whatsapp",
      "nationalId",
      "email",
    ])?.then((valid) => {
      if (!valid) {
        return;
      }
      if (
        visitors
          ?.map((user: any) => {
            return user?.userId;
          })
          ?.includes(formValues?.userId)
      ) {
        showSuccessAlert(
          true,
          "ThisUserAlreadyAddedPreviously",
          intl,
          () => {}
        );
        setEmployeeId("");
        setEmployeeName("");
        setValue?.("email", "");
        setValue?.("nationalId", "");
        setValue?.("phone", "");
        setValue?.("visitorName", "");
        setValue?.("whatsapp", "");
        setValue?.("userId", "");
        // setValue?.("groupName", "");
        clearErrors?.("email");
        clearErrors?.("nationalId");
        clearErrors?.("phone");
        clearErrors?.("visitorName");
        clearErrors?.("whatsapp");
        clearErrors?.("userId");
        // clearErrors?.("groupName");
        setValue?.("isAddForTable", false);
        return;
      }
     
      const isEmailDuplicate = emails?.includes(formValues?.email?.toString());
      const isPhoneDuplicate = phoneNumbers?.includes(formValues?.phone?.toString());
      const isNationalIdDuplicate = nationalIds?.includes(formValues?.nationalId?.toString());
      
      if (isNationalIdDuplicate) {
        showSuccessAlert(false, "ThisIDNumberIsAlreadyExists", intl, () => {});
        return;
      }
      
      if (isEmailDuplicate) {
        showSuccessAlert(false, "ThisEmailIsAlreadyExists", intl, () => {});
        return;
      }
      
      if (isPhoneDuplicate) {
        showSuccessAlert(false, "ThisPhoneNumberIsAlreadyExists", intl, () => {});
        return;
      }
      setVisitors((prev: any) => [
        ...prev,
        {
          visitorName: formValues?.visitorName,
          nationalID: formValues?.nationalId,
          email: formValues?.email,
          phoneNumber: formValues?.phone,
          whatsappNumber: formValues?.whatsapp,
          userId: formValues?.userId,
        },
      ]);
      setEmployeeId("");
      setEmployeeName("");
      setValue?.("email", "");
      setValue?.("nationalId", "");
      setValue?.("phone", "");
      setValue?.("visitorName", "");
      setValue?.("whatsapp", "");
      setValue?.("userId", "");
      // setValue?.("groupName", "");
      clearErrors?.("email");
      clearErrors?.("nationalId");
      clearErrors?.("phone");
      clearErrors?.("visitorName");
      clearErrors?.("whatsapp");
      clearErrors?.("userId");
      // clearErrors?.("groupName");
      setValue?.("isAddForTable", false);
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
        <div className="col-sm-4 col-12">
          <label
            className="fs-6 fw-bold mb-2 required"
            htmlFor="classNameification"
          >
            {intl.formatMessage({ id: "VisitorName" })}{" "}
          </label>

          <div className="input-group ">
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "VisitorName",
              })}
              // value={employeeName}
              {...register?.("visitorName")}
              readOnly
              disabled
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
          {DisplayErrorMessage(errors?.userId?.message, intl)}
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
              readOnly={selectedUserDetails?.nationalId ? true : false}
              className="form-control form-control-solid"
              type="text"
              placeholder={intl.formatMessage({ id: "IDNumber" })}
              {...register?.("nationalId")}
            />
            {DisplayErrorMessage(errors?.nationalId?.message, intl)}
          </div>
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
              readOnly={selectedUserDetails?.phoneNumber? true : false}
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
              readOnly
              className="form-control form-control-solid"
              type="email"
              placeholder={intl.formatMessage({ id: "Email" })}
              {...register?.("email")}
            />
            {DisplayErrorMessage(errors?.email?.message, intl)}
          </div>
        </div>
        <div className="col-sm-4 col-12">
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
                readOnly={visitors?.length > 0 && groupNameIsRepeated==false? true : false}
                {...register?.("groupName")}
              />
            </div>
            {DisplayErrorMessage(errors?.groupName?.message, intl)}
          </div>
        </div>
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
            {visitors?.map((visitor: any) => (
              <tr key={visitor?.userId}>
                <td className="">{visitor?.visitorName}</td>
                <td className="text-center">{visitor?.nationalID}</td>
                <td className="text-center">{visitor?.phoneNumber}</td>
                <td className="text-center">{visitor?.whatsappNumber}</td>
                <td className="text-center">{visitor?.email}</td>
                <td className="text-center">
                  <a
                    onClick={() => {
                      setShowDelete(true);
                      setSelectedId(visitor?.userId);
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

      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        setEmployeeName={setEmployeeName}
        setHandleAdd={setHandleAdd}
      />
      <AddPopup
        show={modalAddShow}
        handleClose={() => setModalAddShow(false)}
        handleAdd={() => {
          handleAddVisitor(formValues as AddInternalGroupPermissionProps);
        }}
      />
    </>
  );
};
export { GroupVisitorData };
