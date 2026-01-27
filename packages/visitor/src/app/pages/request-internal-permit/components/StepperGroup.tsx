import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Stepper from "./Stepper/Stepper";
import { SendPopup } from "@4eplatform/shared/src/popups/SendPopup";
import { GroupVisitorData } from "./GroupVisitorData";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DeclarationDataForGroup } from "./DeclarationDataForGroup";
import { addGroupPermission } from "../../../redux/visitor-slice";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import {
  AddInternalGroupPermissionProps,
  AddInternalGroupPermissionSchema,
} from "../../../validation/add-internal-group-permission-validation";
import { Notification } from "@4eplatform/shared/services/notifications";
import { getEmployee } from "@4eplatform/gateway/src/app/features/requestTemplateSlice";
import { RootState, useAppSelector } from "../../../redux/store";

const StepperGroup = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  let [employeeEmail, setEmployeeEmail] = useState("");
  const managementEmployees = useAppSelector((state: RootState) => {
    return state?.managementEmployees?.employee;
  });
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(0);

  let [employeeId, setEmployeeId] = useState<string>("");
  const [orgId, setOrgId] = useState("");
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  let [employeeName, setEmployeeName] = useState<string>("");
  const [orgName, setOrgName] = useState("");
  const {
    register,
    setValue,
    trigger,
    setError,
    watch,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInternalGroupPermissionProps>({
    resolver: yupResolver(AddInternalGroupPermissionSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  useEffect(() => {
    dispatch(getEmployee({}) as any);
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
  let [groupNameIsRepeated,setGroupNameIsRepeated]=useState<boolean>(false)

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    setValue("stepNumber", 0);
  }, []);
  let navigate = useNavigate();
  const addGroup = async (data: AddInternalGroupPermissionProps) => {
    let formData = new FormData();
    let body = formValues?.recivedId
      ? {
          visitors: visitors?.map((visitor: any) => {
            return {
              visitorName: visitor?.visitorName,
              nationalID: visitor?.nationalID,
              phoneNumber: visitor?.phoneNumber,
              whatsAppNumber: visitor?.whatsappNumber,
              email: visitor?.email,
              userId: visitor?.userId,
            };
          }),
          groupName: formValues?.groupName,
          permissionType: 0,
          orgId: formValues?.orgId,
          recivedId: formValues?.recivedId,
          permissionReason: formValues?.permissionReason,
          startDate: formValues?.startDate,
          endDate: formValues?.endDate,
          startTime: `${formValues?.startTime}:00`,
          endTime: `${formValues?.endTime}:00`,
          note: formValues?.note,
          permissionSource: 0,
        }
      : {
          visitors: visitors?.map((visitor: any) => {
            return {
              visitorName: visitor?.visitorName,
              nationalID: visitor?.nationalID,
              phoneNumber: visitor?.phoneNumber,
              whatsAppNumber: visitor?.whatsappNumber,
              email: visitor?.email,
              userId: visitor?.userId,
            };
          }),
          groupName: formValues?.groupName,
          permissionType: 0,
          orgId: formValues?.orgId,
          permissionReason: formValues?.permissionReason,
          startDate: formValues?.startDate,
          endDate: formValues?.endDate,
          startTime: `${formValues?.startTime}:00`,
          endTime: `${formValues?.endTime}:00`,
          note: formValues?.note,
          permissionSource: 0,
        };

    formData.append("json", JSON.stringify(body));
    selectedFilesForAttachments?.forEach((file: any) => {
      formData.append("Attachments", file);
    });

    setLoading(true);
    await dispatch(addGroupPermission(formData) as any).then((res: any) => {
      if (res.payload.statusEnum == 3) {
        showSuccessAlert(true, "AddedSuccessfully", intl, () => {
          if (formValues?.recivedId) {
            Notification.addingInternalPermitRequestForVisitor(
              formValues?.recivedId,
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
                return org?.id == formValues?.orgId;
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
      } else if (res?.payload?.message == '["GroupName is already exist"]') {
        showSuccessAlert(false, "GroupNameIsRepeated", intl);
        setGroupNameIsRepeated(true)
      } else if (res?.payload?.message)
        showSuccessAlert(false, res.payload.message, intl);
      setLoading(false);
    });
  };
  let handleAdd = (formValues: AddInternalGroupPermissionProps) => {
    if (currentStep === steps.length - 1) {
      addGroup(formValues);
    } else {
      handleNext();
    }
  };
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
            />
          </div>
          <form onSubmit={handleSubmit(handleAdd)}>
            {currentStep === 0 && (
              <GroupVisitorData
                register={register}
                setValue={setValue}
                trigger={trigger}
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
                setSelectedFilesForAttachments={setSelectedFilesForAttachments}
                selectedFilesForAttachments={selectedFilesForAttachments}
                setOrgName={setOrgName}
                orgName={orgName}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
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
                  // onClick={handleNext}
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
