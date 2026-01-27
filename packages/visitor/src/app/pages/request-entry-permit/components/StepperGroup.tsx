import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Stepper from "./Stepper/Stepper";
import { SendPopup } from "@4eplatform/shared/src/popups/SendPopup";
import { DeclarationDataForGroup } from "./DeclarationDataForGroup";
import { GroupVisitorDataForGroup } from "./GroupVisitorDataForGroup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addGroupPermission } from "../../../redux/visitor-slice";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import {
  AddExternalGroupPermissionProps,
  AddExternalGroupPermissionSchema,
} from "../../../validation/add-external-group-permission-validation";
import { Notification } from "@4eplatform/shared/services/notifications";
import { getEmployee } from "@4eplatform/gateway/src/app/features/requestTemplateSlice";
import { RootState, useAppSelector } from "../../../redux/store";
import { getAllLKPermissiontypes } from "../../../redux/permissions-type-slice";
import ViechleDataGroup from "./ViechleDataGroup";
import { fetchRoles, fetchUserRoles } from "../../../redux/roles-slice";

const StepperGroup = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const managementEmployees = useAppSelector((state: RootState) => {
    return state?.managementEmployees?.employee;
  });
  let [employeeId, setEmployeeId] = useState<any>("");
  const [orgId, setOrgId] = useState("");
  let [permissionType, setPermissionType] = useState<string>("");
  const [permitTypeId, setPermitTypeId] = useState<string>("");
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isParking, setIsParking] = useState<any>("no");
  let [parkingArray, setParkingArray] = useState([]);
  const {
    register,
    setValue,
    trigger,
    watch,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExternalGroupPermissionProps>({
    resolver: yupResolver(AddExternalGroupPermissionSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      visitorName: "",
      nationalId: "",
      phone: "",
      whatsapp: "",
      email: "",
      BuildingType: "",
      userId: "",
      isAddForTable: false,
    },
  });
  let formValues = watch();
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(0);
  let [employeeEmail, setEmployeeEmail] = useState("");
  useEffect(() => {
    dispatch(getEmployee({}) as any);
    dispatch(getAllLKPermissiontypes({}) as any);
  }, []);
  useEffect(() => {
    let params: any = {
      pageSize: "100000",
      pageNumber: "1",
    };
    dispatch(fetchRoles(params) as any);
  }, []);
  let roles = useAppSelector((state: RootState) => {
    return state?.roles?.roles;
  });
  let usersInRole = useAppSelector((state: RootState) => {
    return state?.roles?.usersInRole;
  });
  let roleIdForCommitteesManager = roles?.find((item: any) => {
    return item?.nameAr == "مدير الخدمه" || item?.nameAr == "مدير الخدمة";
  })?.id;
  useEffect(() => {
    if (roleIdForCommitteesManager) {
      dispatch(
        fetchUserRoles({ id: roleIdForCommitteesManager, myparams: {} }) as any
      );
    }
  }, [roleIdForCommitteesManager]);

  // const steps = [
  //   {
  //     name: intl.formatMessage({ id: "VisitorData" }),
  //     id: 1,
  //     icon: <i className="fas fa-file-alt fs-3"></i>,
  //   },
  //   {
  //     name: intl.formatMessage({ id: "DeclarationData" }),
  //     id: 2,
  //     icon: <i className="fas fa-server fs-3"></i>,
  //   },
  // ];
  const steps = [
    {
      name: intl.formatMessage({ id: "VisitorData" }),
      id: 1,
      icon: <i className="fas fa-file-alt fs-3"></i>,
    },
    {
      name: intl.formatMessage({ id: "DeclarationData" }),
      id: 2,
      icon: <i className="fas fa-server fs-3"></i>,
    },
    ...(isParking === "yes"
      ? [
          {
            name: intl.formatMessage({ id: "VehicleData" }),
            id: 3,
            icon: <i className="fas fa-parking fs-3"></i>,
          },
        ]
      : []),
  ];
  const handleNext = () => {
    if (visitors?.length == 0) {
      showSuccessAlert(false, "YouMustEnterAtLeastOneVisitor", intl);
      return;
    } else {
      showSuccessAlert(true, "SavedSuccessfully", intl, () => {
        setCurrentStep(currentStep + 1);
      });
    }
  };
  let navigate = useNavigate();
  let [groupNameIsRepeated, setGroupNameIsRepeated] = useState<boolean>(false);
  // const handlePrev = () => {
  //   setCurrentStep(currentStep - 1);
  // };
  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  let [employeeName, setEmployeeName] = useState<string>("");
  const [orgName, setOrgName] = useState("");

  const translateErrorMessage = (message: string): string => {
    if (message.includes("YouMustEnterCarType")) {
      return intl.formatMessage({ id: "ChooseCar" });
    } else if (
      message.includes("Cannot read properties of undefined (reading 'data')")
    ) {
      return intl.formatMessage({ id: "CantReadData" });
    } else if (message.includes("Cannot read properties of undefined")) {
      return intl.formatMessage({ id: "CantReadData" });
    } else if (
      message.includes("This Permission Is Not Vailed") ||
      message.includes("This Permission Is Not Valid")
    ) {
      return intl.formatMessage({ id: "PermissionNotValid" });
    } else if (
      message.includes("Network Error") ||
      message.includes("network")
    ) {
      return intl.formatMessage({ id: "NetworkError" });
    } else if (message.includes("timeout")) {
      return intl.formatMessage({ id: "TimeoutError" });
    } else if (message.includes("404") || message.includes("Not Found")) {
      return intl.formatMessage({ id: "NotFound" });
    } else if (
      message.includes("500") ||
      message.includes("Internal Server Error")
    ) {
      return intl.formatMessage({ id: "ServerError" });
    } else if (message.includes("403") || message.includes("Forbidden")) {
      return intl.formatMessage({ id: "AccessDenied" });
    } else if (message.includes("401") || message.includes("Unauthorized")) {
      return intl.formatMessage({ id: "Unauthorized" });
    }

    return message;
  };

  const validateData = () => {
    if (isParking === "yes") {
      for (let i = 0; i < parkingArray?.length; i++) {
        const item = parkingArray[i] as any;
        if (!item?.CarType || !item?.CarPlateData || !item?.CarColor) {
          showSuccessAlert(
            false,
            translateErrorMessage("YouMustEnterCarType"),
            intl
          );
          return false;
        }
      }
    }
    return true;
  };
  const addGroup = async (data: AddExternalGroupPermissionProps) => {
    if (!validateData()) {
      return;
    }

    let formData = new FormData();
    const startDateTime = (formValues as any)?.StartDateTime
      ? new Date((formValues as any)?.StartDateTime)
      : null;
    const endDateTime = (formValues as any)?.EndDateTime
      ? new Date((formValues as any)?.EndDateTime)
      : null;
    const startDate = startDateTime
      ? startDateTime.toISOString().split("T")[0]
      : "";
    const startTime = startDateTime
      ? startDateTime.toTimeString().split(" ")[0]
      : "";
    const endDate = endDateTime ? endDateTime.toISOString().split("T")[0] : "";
    const endTime = endDateTime ? endDateTime.toTimeString().split(" ")[0] : "";

    // Get BuildingType from form values (Primary = "1", Secondary = "2")
    const buildingType = (formValues as any)?.BuildingType || "1";

    let body = (formValues as any)?.recivedId
      ? {
          visitors: visitors?.map((visitor: any) => {
            return {
              visitorName: visitor?.visitorName,
              nationalID: visitor?.nationalID,
              phoneNumber: visitor?.phoneNumber,
              whatsAppNumber: visitor?.whatsappNumber,
              email: visitor?.email,
            };
          }),
          BuildingType: buildingType,
          groupName: (formValues as any)?.groupName,
          LK_PermissionType: permitTypeId,
          IsParking: isParking === "yes" ? true : false,
          parking: isParking === "yes" ? parkingArray : [],
          orgId: (formValues as any)?.orgId,
          recivedId: (formValues as any)?.recivedId,
          permissionReason: (formValues as any)?.permissionReason,
          startDate,
          startTime,
          endDate,
          endTime,
          note: (formValues as any)?.note,
          permissionSource: 1,
        }
      : {
          visitors: visitors?.map((visitor: any) => {
            return {
              visitorName: visitor?.visitorName,
              nationalID: visitor?.nationalID,
              phoneNumber: visitor?.phoneNumber,
              whatsAppNumber: visitor?.whatsappNumber,
              email: visitor?.email,
            };
          }),
          BuildingType: buildingType,
          groupName: (formValues as any)?.groupName,
          LK_PermissionType: permitTypeId,
          IsParking: isParking === "yes" ? true : false,
          parking: isParking === "yes" ? parkingArray : [],
          orgId: (formValues as any)?.orgId,
          permissionReason: (formValues as any)?.permissionReason,
          startDate,
          startTime,
          endDate,
          endTime,
          note: (formValues as any)?.note,
          permissionSource: 1,
        };

    formData.append("json", JSON.stringify(body));
    selectedFilesForAttachments?.forEach((file: any) => {
      formData.append("Attachments", file);
    });

    setLoading(true);
    await dispatch(addGroupPermission(formData) as any).then((res: any) => {
      if (res.payload.statusEnum == 3) {
        showSuccessAlert(true, "AddedSuccessfully", intl, () => {
          usersInRole?.forEach((user: any) => {
            Notification.addingInternalPermitRequestForVisitor(
              user?.userId,
              `/visitormanagement/permissions-Permits/view-group/visitor-workspace/${res?.payload?.result}`,
              89,
              "",
              user?.email,
              true,
              201,
              new Date(),
              "طلب دخول",
              "طلب دخول",
              "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
              ""
            );
          });

          navigate("/my-permits");
        });
      } else if (res?.payload?.message == '["GroupName is already exist"]') {
        showSuccessAlert(false, "TheOrganizationNameIsDuplicated", intl);
        setGroupNameIsRepeated(true);
      } else if (
        res?.payload?.message == '["At least one parking entry is required."]'
      ) {
        showSuccessAlert(false, "AtLeastOneParkingEntryIsrequired", intl);
        setGroupNameIsRepeated(true);
      } else if (res?.payload?.message) {
        showSuccessAlert(false, res.payload.message, intl);
      }
      setLoading(false);
    });
  };
  let handleAdd = (formValues: AddExternalGroupPermissionProps) => {
    setValue("stepNumber", currentStep);
    setValue("isAddForTable", false);

    if (currentStep === 0) {
      if (visitors?.length === 0) {
        showSuccessAlert(false, "YouMustEnterAtLeastOneVisitor", intl);
        return;
      } else {
        handleNext();
        return;
      }
    }

    if (currentStep === steps.length - 1) {
      addGroup(formValues);
    } else {
      handleNext();
    }
  };

  // Handle form submission errors
  const onError = (errors: any) => {
    // Show error message for the first error
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      showSuccessAlert(false, firstError.message, intl);
    }
  };

  const handleManualSubmit = () => {
    if (currentStep !== steps.length - 1) {
      showSuccessAlert(
        false,
        "You must complete all steps before submitting the request.",
        intl
      );
      return;
    }

    if (!visitors || visitors.length === 0) {
      showSuccessAlert(false, "YouMustEnterAtLeastOneVisitor", intl);
      return;
    }

    const todayStr = new Date().toISOString().substring(0, 10);
    const nowTime = new Date().toTimeString().split(" ")[0];
    if (!getValues("startDate")) setValue("startDate", todayStr);
    if (!getValues("endDate")) setValue("endDate", todayStr);
    if (!getValues("startTime")) setValue("startTime", nowTime);
    if (!getValues("endTime")) setValue("endTime", nowTime);
    setValue("stepNumber", currentStep);
    setValue("isAddForTable", false);
    trigger().then((isValid) => {
      if (isValid) {
        const formData = getValues();
        handleAdd(formData);
      } else {
        setTimeout(() => {}, 100);
      }
    });
  };
  let permissionTypes = useSelector((state: RootState) => {
    return state?.permissionTypes?.permissionTypes;
  });

  useEffect(() => {
    setValue?.("stepNumber", 0);
    // set default building type to primary on first load
    setValue?.("BuildingType" as any, "1");
    trigger?.("BuildingType" as any);
  }, []);
  return (
    <>
      <div className="card shadow-sm p-4 rounded pb-0 mt-5">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-center p-10 ">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              visitors={visitors}
              handleNextInStepper={true}
              formValues={formValues}
            />
          </div>
          <form onSubmit={handleSubmit(handleAdd, onError)}>
            {currentStep === 0 && (
              <GroupVisitorDataForGroup
                register={register}
                setValue={setValue}
                trigger={trigger}
                getValues={getValues}
                userId={userId}
                visitors={visitors}
                setVisitors={setVisitors}
                formValues={formValues}
                errors={errors}
                clearErrors={clearErrors}
                groupNameIsRepeated={groupNameIsRepeated}
                setGroupNameIsRepeated={setGroupNameIsRepeated}
              />
            )}
            {currentStep === 1 && (
              <DeclarationDataForGroup
                register={register}
                setValue={setValue}
                trigger={trigger}
                userId={userId}
                employeeId={employeeId}
                setEmployeeId={setEmployeeId}
                orgId={orgId}
                setOrgId={setOrgId}
                formValues={formValues}
                errors={errors}
                clearErrors={clearErrors}
                permissionType={permissionType}
                setPermissionType={setPermissionType}
                setSelectedFilesForAttachments={setSelectedFilesForAttachments}
                selectedFilesForAttachments={selectedFilesForAttachments}
                setOrgName={setOrgName}
                orgName={orgName}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
                setEmployeeEmail={setEmployeeEmail}
                permitTypeId={permitTypeId}
                setPermitTypeId={setPermitTypeId}
                permissionTypes={permissionTypes}
                isParking={isParking}
                setIsParking={setIsParking}
              />
            )}
            {currentStep === 2 && (
              <ViechleDataGroup
                register={register}
                setValue={setValue}
                trigger={trigger}
                formValues={formValues}
                errors={errors}
                parkingArray={parkingArray}
                setParkingArray={setParkingArray}
                visitors={visitors}
              />
            )}
            <div className="d-flex justify-content-end mb-3 my-5">
              {currentStep !== 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrev();
                  }}
                  // onClick={() => currentStep !== 0 && handlePrev()}
                  disabled={currentStep === 0}
                >
                  {intl.formatMessage({ id: "Previous" })}
                </button>
              )}

              {currentStep === steps.length - 1 &&
                (!loading ? (
                  <button
                    type="button"
                    className="btn btn-success mx-3"
                    onClick={() => {
                      handleManualSubmit();
                    }}
                  >
                    {intl.formatMessage({ id: "RequestPermit" })}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success mx-3"
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mx-2"
                    />
                    <span>{intl.formatMessage({ id: "Adding" })}</span>
                  </button>
                ))}
              {currentStep !== steps.length - 1 && (
                <button
                  type="button"
                  className="btn btn-success mx-3"
                  onClick={() => {
                    handleNext();
                  }}
                >
                  {intl.formatMessage({ id: "SaveAndContainue" })}
                </button>
              )}
              <Link to="/visitor-workspace">
                <button
                  className="btn btn-outlined-dark border border-dark"
                  onClick={() => currentStep !== 0 && handlePrev()}
                  disabled={currentStep === 0}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SendPopup show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
};

export default StepperGroup;
