import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Stepper from "../../request-internal-permit/components/Stepper/Stepper";
import { SendPopup } from "@4eplatform/shared/src/popups/SendPopup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getGetPermissionByVisitorId } from "../../../redux/permission-slice";
import { editVisitortoPermission } from "../../../redux/visitor-slice";
import { VisitorDataForExternalEdit } from "./VisitorDataForExternalEdit";
import { DeclarationDataForExternalEdit } from "./DeclarationDataForExternalEdit";
import {
  EditExternalSinglePermissionProps,
  EditExternalSinglePermissionSchema,
} from "../../../validation/edit-external-single-permission-validation";
import { Notification } from "@4eplatform/shared/services/notifications";
import { getEmployee } from "@4eplatform/gateway/src/app/features/requestTemplateSlice";
import { useAppSelector } from "../../../redux/store";

const EditEntryPermitSingle = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const managementEmployees = useAppSelector((state) => {
    return state?.managementEmployees?.employee;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployee({}) as any);
  }, []);

  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let [permissionType, setPermissionType] = useState<number>(0);
  let navigate = useNavigate();
  let { visitorId } = useParams();
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  let loggedInUser = localStorage.getItem("userId");
  let [employeeEmail, setEmployeeEmail] = useState("");

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
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<EditExternalSinglePermissionProps>({
    resolver: yupResolver(EditExternalSinglePermissionSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let formValues = watch();
  let [orgName, setOrgName] = useState<string>("");
  let [orgId, setOrgId] = useState<string>("");
  let [receivedId, setReceivedId] = useState<string>("");
  let [receivedName, setReceivedName] = useState<string>("");
  const { singlePermission } = useSelector(
    (state: RootState) => state.permission
  );
  useEffect(() => {
    if (visitorId) {
      dispatch(
        getGetPermissionByVisitorId({
          Visitor_id: visitorId,
        }) as any
      );
    }
  }, [visitorId]);
  useEffect(() => {
    setValue("email", singlePermission?.visitorEmail);
    setValue("endDate", singlePermission?.endDate);
    setValue("endTime", singlePermission?.endTime);
    setValue("nationalId", singlePermission?.visitorNID);
    setValue("note", singlePermission?.permissionNote);
    setValue("orgId", singlePermission?.orgId);
    setValue("permissionReason", singlePermission?.permissionReason);
    setValue("phone", singlePermission?.visitorPhone);
    setValue("recivedId", singlePermission?.recievedId);
    setValue("startDate", singlePermission?.startDate);
    setValue("startTime", singlePermission?.startTime);
    setValue("userId", singlePermission?.userId);
    setValue("visitorName", singlePermission?.visitorName);
    setValue("whatsapp", singlePermission?.visitorWhatsApp);
    setReceivedId(singlePermission?.recievedId);
    setPermissionType(singlePermission?.permissionType);
    setReceivedName(singlePermission?.receivedVisiting);
    setOrgId(singlePermission?.orgId);
    setOrgName(singlePermission?.orgName);
    setSelectedFilesForAttachments(
      singlePermission?.attachments?.map((attachment) => {
        return {
          name: attachment?.filename,
          path: attachment?.filepath,
          id: attachment?.id,
        };
      })
    );
  }, [singlePermission]);
  const putVisitortoPermission = async (
    data: EditExternalSinglePermissionProps
  ) => {
    let formData = new FormData();
    formData.append("permissionId", singlePermission?.permissionId);
    if (data?.permissionReason != singlePermission?.permissionReason) {
      formData.append("reason", data?.permissionReason as string);
    }
    formData.append("visitorId", singlePermission?.visitorId);
    if (data?.startDate != singlePermission?.startDate) {
      formData.append("startDate", data?.startDate as string);
    }
    if (data?.endDate != singlePermission?.endDate) {
      formData.append("endDate", data?.endDate as string);
    }
    if (data?.startTime != singlePermission?.startTime) {
      formData.append("startTime", data?.startTime as string);
    }
    if (data?.endTime != singlePermission?.endTime) {
      formData.append("endTime", data?.endTime as string);
    }
    if (data?.userId != singlePermission?.userId) {
      formData.append("userId", data?.userId as string);
    }
    if (data?.visitorName != singlePermission?.visitorName) {
      formData.append("visitorName", data?.visitorName as string);
    }
    if (data?.nationalId != singlePermission?.visitorNID) {
      formData.append("nationalID", data?.nationalId as string);
    }
    if (data?.phone != singlePermission?.visitorPhone) {
      formData.append("phoneNumber", data?.phone as string);
    }
    if (data?.whatsapp != singlePermission?.visitorWhatsApp) {
      formData.append("whatsAppNumber", data?.whatsapp as string);
    }
    if (data?.orgId != singlePermission?.orgId) {
      formData.append("orgId", data?.orgId as string);
    }
    if (data?.email != singlePermission?.visitorEmail) {
      formData.append("email", data?.email as string);
    }
    if (data?.recivedId != singlePermission?.recievedId) {
      formData.append("recivedId", data?.recivedId as string);
    }
    if (data?.note != singlePermission?.permissionNote) {
      formData.append("notes", data?.note as string);
    }
    if (permissionType != singlePermission?.permissionType) {
      formData.append("permissionType", permissionType?.toString());
    }
    selectedFilesForAttachments?.forEach((file: any) => {
      if (file?.size) {
        formData.append("attachments", file);
      } else if (
        selectedFilesForAttachments?.some((item: any) => {
          return item?.size > 0;
        }) ||
        selectedFilesForAttachments?.filter((item: any) => {
          return item?.path;
        })?.length != singlePermission?.attachments?.length
      ) {
        formData.append("oldAttachment", file?.path);
      } else {
      }
    });
    await dispatch(editVisitortoPermission(formData) as any).then(
      (res: any) => {
        if (res.payload.statusEnum == 3) {
          showSuccessAlert(true, "SavedSuccessfully", intl, () => {
            if (
              data?.recivedId &&
              data?.recivedId != "00000000-0000-0000-0000-000000000000"
            ) {
              Notification.edittingRequestForVisitor(
                data?.recivedId,
                `/visitormanagement/permissions-Permits`,
                89,
                "",
                employeeEmail,
                true,
                203,
                new Date(),
                "طلب تعديل",
                "طلب تعديل",
                "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
                ""
              );
            } else {
              managementEmployees
                ?.find((org) => {
                  return org?.id == singlePermission?.orgId;
                })
                ?.mebmers?.forEach((member: any) => {
                  if (member?.email) {
                    Notification.edittingRequestForVisitor(
                      member?.userId,
                      `/visitormanagement/permissions-Permits`,
                      89,
                      "",
                      member?.email,
                      true,
                      203,
                      new Date(),
                      "طلب تعديل",
                      "طلب تعديل",
                      "4d431df1-72ce-4ed5-828b-14eb52a6e80f",
                      ""
                    );
                  }
                });
            }
            if (loggedInUser?.toLowerCase() == data?.recivedId?.toLowerCase()) {
              window.location.href =
                "/systems-services-settings/dynamic-workspace";
            } else {
              navigate("/systems-services-settings/dynamic-workspace", {
                state: { cardName, serviceName },
              });
            }
          });
        } else if (res?.payload?.message) {
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      }
    );
  };
  let handleEdit = (formValues: EditExternalSinglePermissionProps) => {
    if (currentStep === steps.length - 1) {
      putVisitortoPermission(formValues);
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
            />
          </div>
          <form onSubmit={handleSubmit(handleEdit)}>
            {currentStep === 0 && (
              <VisitorDataForExternalEdit
                register={register}
                setValue={setValue}
                trigger={trigger}
                formValues={formValues}
                errors={errors}
              />
            )}
            {currentStep === 1 && (
              <DeclarationDataForExternalEdit
                register={register}
                setValue={setValue}
                trigger={trigger}
                employeeId={receivedId}
                setEmployeeId={setReceivedId}
                employeeName={receivedName}
                setEmployeeName={setReceivedName}
                orgId={orgId}
                setOrgId={setOrgId}
                setOrgName={setOrgName}
                orgName={orgName}
                formValues={formValues}
                errors={errors}
                setSelectedFilesForAttachments={setSelectedFilesForAttachments}
                selectedFilesForAttachments={selectedFilesForAttachments}
                permissionType={permissionType}
                setPermissionType={setPermissionType}
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
              <button className="btn btn-success mx-3" type="submit">
                {currentStep === steps.length - 1
                  ? intl.formatMessage({ id: "SavePermit" })
                  : intl.formatMessage({ id: "SaveAndContainue" })}
              </button>
              <Link to={"/permits-list"} state={{ cardName, serviceName }}>
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

export default EditEntryPermitSingle;
