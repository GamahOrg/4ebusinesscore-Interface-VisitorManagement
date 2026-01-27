import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stepper from "./Stepper/Stepper";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { VisitorData } from "../../request-internal-permit/components/VisitorData";
import { DeclarationData } from "../../request-internal-permit/components/DeclarationData";
import objectToFormData from "@4eplatform/shared/assets/forms/FormData";
import { addPermissionVisitor } from "../../../redux/visitor-slice";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { AddExternalIndividualPermissionSchema } from "../../../validation/add-external-individual-validation";
import { Notification } from "@4eplatform/shared/services/notifications";
import { getEmployee } from "@4eplatform/gateway/src/app/features/requestTemplateSlice";
import { RootState, useAppSelector } from "../../../redux/store";
import { getAllLKPermissiontypes } from "../../../redux/permissions-type-slice";
import ViechleData from "../../request-internal-permit/components/ViechleData";
import { fetchRoles, fetchUserRoles } from "../../../redux/roles-slice";
const StepperOne = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  let navigate = useNavigate();
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const translateErrorMessage = (message: string): string => {
    if (
      message.includes("Cannot read properties of undefined (reading 'data')")
    ) {
      return intl.formatMessage({ id: "CantReadData" });
    } else if (message.includes("Cannot read properties of undefined")) {
      return intl.formatMessage({ id: "CantReadData" });
    } else if (message === "YouMustEnterCarType.CarColor.AndCarPlateData") {
      return intl.formatMessage({ id: "ChooseCar" });
    } else if (
      message.includes("YouMustEnterCarType,CarColor,AndCarPlateData")
    ) {
      return intl.formatMessage({ id: "ChooseCar" });
    } else if (message.includes("YouMustEnterCarType")) {
      return intl.formatMessage({ id: "ChooseCar" });
    } else if (message.includes("youCanNotHaveMoreCarsThanVisitors")) {
      return intl.formatMessage({ id: "youCanNotHaveMoreCarsThanVisitors" });
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

  const showAlertAboveModals = (status: boolean, message: string) => {
    const displayMessage = status ? message : translateErrorMessage(message);

    Swal.fire({
      text: displayMessage,
      icon: status ? "success" : "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
      didOpen: () => {
        const swalContainer = document.querySelector(".swal2-container");
        if (swalContainer) {
          (swalContainer as HTMLElement).style.zIndex = "99999";
        }
      },
    });
  };

  let [employeeId, setEmployeeId] = useState<string>("");
  let [employeeEmail, setEmployeeEmail] = useState("");
  const managementEmployees = useAppSelector((state: RootState) => {
    return state?.managementEmployees?.employee;
  });

  const [orgId, setOrgId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [permitType, setPermitType] = useState<string>("");
  const [permitTypeId, setPermitTypeId] = useState<string>("");
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState<boolean>(false);
  let location = useLocation();
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
    return (
      item?.nameAr === "مدير تصاريح حياكم" || item?.nameAr === "مدير الخدمة"
    );
  })?.id;
  useEffect(() => {
    if (roleIdForCommitteesManager) {
      dispatch(
        fetchUserRoles({ id: roleIdForCommitteesManager, myparams: {} }) as any,
      );
    }
  }, [roleIdForCommitteesManager]);
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(AddExternalIndividualPermissionSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let formValues = watch();

  const handleAddNewMeeting = () => {
    setModalShow(true);
  };
  useEffect(() => {
    dispatch(getEmployee({}) as any);
    dispatch(getAllLKPermissiontypes({}) as any);
  }, []);

  const [isParking, setIsParking] = useState<any>("no");

  useEffect(() => {
    setValue?.("stepNumber", 0);
    // set default building type to primary on first load
    setValue?.("BuildingType", "1");
    trigger?.("BuildingType");
  }, []);

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

  const stepFields: { [key: number]: string[] } = {
    0: ["VisitorName", "PhoneNumber", "WhatsAppNumber", "NationalID", "Email"],
    1: ["StartDateTime", "EndDateTime", "OrgId"],
  };

  const handleNext = async (e: any) => {
    e.preventDefault();
    const valid = await trigger(stepFields[currentStep]);
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  const handleNextIndividual = async () => {
    if (stepFields[currentStep]) {
      const valid = await trigger?.(stepFields[currentStep]);
      return valid;
    }
    return false;
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const onSubmit = async (data: any) => {
    if (permitTypeId === "") {
      showAlertAboveModals(
        false,
        intl.formatMessage({ id: "YouMustEnterTheTypeOfDeclaration" }),
      );
      return;
    }
    let { OrgId, RecivedId, StartDateTime, EndDateTime, ...restData } = data;
    const filteredData = Object.fromEntries(
      Object.entries(restData).filter(([key, value]) => value !== ""),
    );
    let startDate = "";
    let startTime = "";
    let endDate = "";
    let endTime = "";
    if (StartDateTime) {
      [startDate, startTime] = StartDateTime.split("T");
    }
    if (EndDateTime) {
      [endDate, endTime] = EndDateTime.split("T");
    }
    var formData = objectToFormData(filteredData);
    formData.append("StartDate", startDate);
    formData.append("StartTime", startTime);
    formData.append("EndDate", endDate);
    formData.append("EndTime", endTime);
    formData.append("LK_PermissionType", permitTypeId);
    formData.append("IsParking", isParking === "yes" ? "true" : "false");
    formData.append("PermissionSource", "1");
    formData.append("OrgId", orgId);
    if (employeeId) {
      formData.append("RecivedId", employeeId);
    }
    selectedImage.forEach((file) => {
      formData.append("Attachments", file);
    });
    setLoading(true);
    await dispatch(addPermissionVisitor(formData) as any)
      .then((res: any) => {
        if (res.payload.statusEnum == 3) {
          showAlertAboveModals(
            true,
            intl.formatMessage({ id: "AddedSuccessfully" }),
          );
          usersInRole?.forEach((user: any) => {
            Notification.addingInternalPermitRequestForVisitor(
              user?.userId,
              `/visitormanagement/permissions-Permits/view-permit/visitor-workspace/${res?.payload?.result}`,
              89,
              "",
              user?.email,
              true,
              201,
              new Date(),
              "طلب دخول",
              "طلب دخول",
              "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
              "",
            );
          });
          navigate("/");
        } else showAlertAboveModals(false, res.payload.message);
        setLoading(false);
      })
      .catch((error: any) => {
        // Handle error case with custom alert
        const errorMessage = error?.message || "An error occurred";
        showAlertAboveModals(false, errorMessage);
        setLoading(false);
      });
  };

  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: intl.locale == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: intl.locale == "ar" ? "right" : "left",
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
  let permissionTypes = useSelector((state: RootState) => {
    return state?.permissionTypes?.permissionTypes;
  });

  return (
    <>
      <div className="card shadow-sm p-4 rounded pb-0 mt-5">
        <div className="card-body pb-0">
          <form className="form outputForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-center p-10 ">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                handleNextIndividual={async () => await handleNextIndividual()}
              />
            </div>
            {currentStep === 0 && (
              <VisitorData
                register={register}
                setValue={setValue}
                trigger={trigger}
                userId={userId}
                errors={errors}
                DisplayErrorMessage={DisplayErrorMessage}
                comeFrom="request-entry-permit"
                formValues={formValues}
              />
            )}
            {currentStep === 1 && (
              <DeclarationData
                register={register}
                setValue={setValue}
                trigger={trigger}
                userId={userId}
                employeeId={employeeId}
                setEmployeeId={setEmployeeId}
                orgId={orgId}
                setOrgId={setOrgId}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                errors={errors}
                DisplayErrorMessage={DisplayErrorMessage}
                comeFrom="request-entry-permit"
                permitType={permitType}
                setPermitType={setPermitType}
                formValues={formValues}
                setEmployeeEmail={setEmployeeEmail}
                permitTypeId={permitTypeId}
                setPermitTypeId={setPermitTypeId}
                permissionTypes={permissionTypes}
                isParking={isParking}
                setIsParking={setIsParking}
              />
            )}

            {currentStep === 2 && (
              <ViechleData
                register={register}
                setValue={setValue}
                trigger={trigger}
                formValues={formValues}
                errors={errors}
                DisplayErrorMessage={DisplayErrorMessage}
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
                  disabled={currentStep === 0}
                >
                  {intl.formatMessage({ id: "Previous" })}
                </button>
              )}

              {currentStep === steps.length - 1 ? (
                !loading ? (
                  <button
                    type="submit"
                    className="btn btn-success mx-3"
                    onClick={() => {
                      handleAddNewMeeting();
                    }}
                  >
                    {intl.formatMessage({ id: "RequestPermit" })}
                  </button>
                ) : (
                  <Button variant="success" disabled className="mx-3">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mx-2"
                    />
                    <span>{intl.formatMessage({ id: "Adding" })}</span>
                  </Button>
                )
              ) : (
                <button
                  type="submit"
                  className="btn btn-success mx-3"
                  onClick={(e) => handleNext(e)}
                >
                  {intl.formatMessage({ id: "SaveAndContainue" })}
                </button>
              )}

              <Link to="/">
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
    </>
  );
};

export default StepperOne;
