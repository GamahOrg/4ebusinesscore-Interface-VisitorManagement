import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stepper from "./Stepper/Stepper";
import { VisitorData } from "./VisitorData";
import { DeclarationData } from "./DeclarationData";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import objectToFormData from "@4eplatform/shared/assets/forms/FormData";
import { addPermissionVisitor } from "../../../redux/visitor-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { Button, Spinner } from "react-bootstrap";
import { AddInternalIndividualPermissionSchema } from "../../../validation/add-internal-individual-permission-validation";
import { Notification } from "@4eplatform/shared/services/notifications";
import { getEmployee } from "@4eplatform/gateway/src/app/features/requestTemplateSlice";
import { RootState, useAppSelector } from "../../../redux/store";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

const StepperOne = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const managementEmployees = useAppSelector((state: RootState) => {
    return state?.managementEmployees?.employee;
  });
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState<number>(0);
  let [employeeId, setEmployeeId] = useState<string>("");
  const [orgId, setOrgId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const dispatch = useDispatch();
  let [userId, setUserId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();
  let location = useLocation();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(AddInternalIndividualPermissionSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const handleAddNewMeeting = () => {
    setModalShow(true);
  };

  let formValues = watch();

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
  ];

  const handleNext = (e: any) => {
    trigger?.([
      "VisitorName",
      "PhoneNumber",
      "WhatsAppNumber",
      "NationalID",
      "Email",
      "BuildingType",
    ])?.then((valid) => {
      if (!valid) {
        return;
      } else setCurrentStep(currentStep + 1);
    });
    e.preventDefault();
  };

  const handleNextIndividual = async () => {
    const valid = await trigger?.([
      "VisitorName",
      "PhoneNumber",
      "WhatsAppNumber",
      "NationalID",
      "Email",
      "BuildingType",
    ]);
    return valid;
  };

  let [employeeEmail, setEmployeeEmail] = useState("");

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    dispatch(getEmployee({}) as any);
  }, []);

  const onSubmit = async (data: any) => {
    // Prevent submit and show inline error for required PermitTypeId
    if (!data?.PermitTypeId) {
      setValue("PermitTypeId", data?.PermitTypeId || "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      await trigger("PermitTypeId");
      return;
    }

    let { OrgId, RecivedId, ...restData } = data;
    const filteredData = Object.fromEntries(
      Object.entries(restData).filter(([key, value]) => value !== "")
    );
    var formData = objectToFormData(filteredData);
    formData.append("PermissionType", "0");
    formData.append("PermissionSource", "0");
    formData.append("OrgId", orgId);
    if (employeeId) {
      formData.append("RecivedId", employeeId);
    }
    formData.append("UserId", userId as string);
    selectedImage.forEach((file) => {
      formData.append("Attachments", file);
    });

    setLoading(true);
    await dispatch(addPermissionVisitor(formData) as any).then((res: any) => {
      if (res.payload.statusEnum == 3) {
        showSuccessAlert(true, "AddedSuccessfully", intl, () => {
          if (employeeId) {
            Notification.addingInternalPermitRequestForVisitor(
              employeeId,
              `/visitormanagement/permissions-Permits`,
              89,
              "",
              employeeEmail,
              true,
              200,
              new Date(),
              "طلب دخول",
              "طلب دخول",
              "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
              ""
            );
          } else {
            managementEmployees
              ?.find((org) => {
                return org?.id == orgId;
              })
              ?.mebmers?.forEach((member: any) => {
                if (member?.email) {
                  Notification.addingInternalPermitRequestForVisitor(
                    member?.userId,
                    `/visitormanagement/permissions-Permits`,
                    89,
                    "",
                    member?.email,
                    true,
                    200,
                    new Date(),
                    "طلب دخول",
                    "طلب دخول",
                    "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
                    ""
                  );
                }
              });
          }
          if (userId?.toLowerCase() == formValues?.recivedId?.toLowerCase()) {
            window.location.href =
              "/systems-services-settings/dynamic-workspace";
          } else {
            navigate("/systems-services-settings/dynamic-workspace");
          }
        });
      } else showSuccessAlert(false, res.payload.message, intl);

      setLoading(false);
    });
  };

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
                setUserId={setUserId}
                errors={errors}
                DisplayErrorMessage={DisplayErrorMessage}
                comeFrom="request-internal-permit"
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
                comeFrom="request-internal-permit"
                formValues={formValues}
                setEmployeeEmail={setEmployeeEmail}
              />
            )}

            <div className="d-flex justify-content-end mb-3 my-5">
              {currentStep !== 0 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => currentStep !== 0 && handlePrev()}
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

              <Link to="/systems-services-settings/dynamic-workspace">
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
