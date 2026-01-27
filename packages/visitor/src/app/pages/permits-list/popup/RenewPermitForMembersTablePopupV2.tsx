import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { object, string, InferType } from "yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fetchAllPermissionList,
  renewPermission,
} from "../../../redux/permissions-list-slice";
import { PermissionListModel } from "../../../model/permission-list-model";
import { Notification } from "@4eplatform/shared/services/notifications";
import { useNavigate } from "react-router-dom";
import { getEmployee } from "@4eplatform/technical-support/src/app/redux/features/requestTemplate/requestTemplateSlice";
import { useAppSelector } from "../../../redux/store";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show?: any;
  handleClose?: any;
  permit: PermissionListModel;
  pageIndexForMember?: number;
  pageSizeForMember?: number;
};

const RenewPermitForMembersTablePopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  permit,
  pageIndexForMember,
  pageSizeForMember,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  const managementEmployees = useAppSelector((state) => {
    return state?.managementEmployees?.employee;
  });
  useEffect(() => {
    dispatch(getEmployee({}) as any);
  }, []);
  let navigate = useNavigate();
  let loggedInUserId = localStorage.getItem("userId");
  let language: string = intl.locale;
  const RenewalPermitForMemberSchema = object({
    startDate: string().required("InputFieldIsRequried"),
    endDate: string().required("InputFieldIsRequried"),
    startTime: string()
      .required("InputFieldIsRequried")
      .test({
        name: "startTime",
        message: "StartTimeMustBeBeforeEndTimeForTheSameDay",
        test: function (value: any) {
          let startDate = this.parent.startDate;
          let endDate = this.parent.endDate;
          if (
            new Date(startDate).setHours(0, 0, 0, 0) ==
              new Date(endDate).setHours(0, 0, 0, 0) &&
            this.parent.endTime
          ) {
            return value < this.parent.endTime;
          } else {
            return true;
          }
        },
      }),
    endTime: string()
      .required("InputFieldIsRequried")
      .test({
        name: "endTime",
        message: "EndTimeMustBeAfterStartTimeForTheSameDay",
        test: function (value: any) {
          let startDate = this.parent.startDate;
          let endDate = this.parent.endDate;
          if (
            new Date(startDate).setHours(0, 0, 0, 0) ==
              new Date(endDate).setHours(0, 0, 0, 0) &&
            this.parent.startTime
          ) {
            return value > this.parent.startTime;
          } else {
            return true;
          }
        },
      }),
  });

  type RenewalPermitForMemberProps = InferType<
    typeof RenewalPermitForMemberSchema
  >;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RenewalPermitForMemberProps>({
    resolver: yupResolver(RenewalPermitForMemberSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  let handleRenewPermitForVisitor = async (
    formValues: RenewalPermitForMemberProps
  ) => {
    let body = {
      visitorId: permit?.vistorId,
      putPermissionDto: {
        startDate: formValues?.startDate,
        endDate: formValues?.endDate,
        startTime: `${formValues?.startTime}:00`,
        endTime: `${formValues?.endTime}:00`,
      },
    };
    try {
      await dispatch(renewPermission(body) as any).then((res: any) => {
        if (res?.payload?.statusEnum == 3) {
          handleClose();
          showSuccessAlert(true, "RenewedSuccessfully", intl, () => {
            let params = {
              pagesize: pageSizeForMember,
              pageIndex: pageIndexForMember,
            };
            dispatch(fetchAllPermissionList(params) as any);
            if (
              permit?.receivedId &&
              permit?.receivedId != "00000000-0000-0000-0000-000000000000" &&
              permit?.reveivedMail
            ) {
              Notification.renewingPermitRequestForVisitor(
                permit?.receivedId,
                `/visitormanagement/permissions-Permits`,
                89,
                "",
                permit?.reveivedMail,
                true,
                203,
                new Date(),
                "طلب تجديد",
                "طلب تجديد"
              );
            } else {
              managementEmployees
                ?.find((org) => {
                  return (
                    org?.nameAr == permit?.orgName ||
                    org?.nameEn == permit?.orgName
                  );
                })
                ?.mebmers?.forEach((member: any) => {
                  if (member?.email) {
                    Notification.renewingPermitRequestForVisitor(
                      member?.userId,
                      `/visitormanagement/permissions-Permits`,
                      89,
                      "",
                      member?.email,
                      true,
                      203,
                      new Date(),
                      "طلب تجديد",
                      "طلب تجديد"
                    );
                  }
                });
            }
            if (
              loggedInUserId?.toLowerCase() == permit?.receivedId?.toLowerCase()
            ) {
              window.location.href =
                "/systems-services-settings/dynamic-workspace";
            } else {
              navigate("/systems-services-settings/dynamic-workspace");
            }
          });
        } else if (res?.payload?.message) {
          handleClose();
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      });
    } catch (error) {}
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <div className="card-header w-100 px-1 d-flex justify-content-center pb-2 border-0  mt-10">
            <Modal.Title>
              <h3 className="card-title flex-column align-items-center">
                <span className="card-label fw-bolder fs-3 mb-2 ">
                  {intl.formatMessage({ id: "RenewPermit" })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleRenewPermitForVisitor)}>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-4 col-12 my-2">
                <label className="mb-2 required">
                  {intl.formatMessage({
                    id: "PermitStartDate",
                  })}
                </label>
                <input
                  className="form-control form-control-solid"
                  type="date"
                  {...register("startDate")}
                  min={
                    new Date()?.toISOString()?.split("T")[0] ||
                    (permit?.endDate as any)
                  }
                  placeholder={intl.formatMessage({ id: "StartDate" })}
                />
                {DisplayErrorMessage(
                  errors?.startDate?.message,
                  intl,
                  language
                )}
              </div>
              <div className="col-sm-4 col-12 my-2">
                <label className="mb-2 required">
                  {intl.formatMessage({
                    id: "PermitEndDate",
                  })}
                </label>
                <input
                  className="form-control form-control-solid"
                  type="date"
                  min={formValues?.startDate || permit?.endDate}
                  {...register("endDate")}
                  placeholder={intl.formatMessage({ id: "PermitEndDate" })}
                />
                {DisplayErrorMessage(errors?.endDate?.message, intl, language)}
              </div>
              <div className="col-sm-4 col-12 my-2">
                <label className="mb-2 required">
                  {intl.formatMessage({
                    id: "FromHour",
                  })}
                </label>
                <input
                  className="form-control form-control-solid"
                  type="time"
                  {...register("startTime")}
                  placeholder={intl.formatMessage({ id: "FromHour" })}
                />
                {DisplayErrorMessage(
                  errors?.startTime?.message,
                  intl,
                  language
                )}
              </div>
              <div className="col-sm-4 col-12 my-2 ">
                <label className="mb-2 required">
                  {intl.formatMessage({
                    id: "ToHour",
                  })}
                </label>
                <input
                  className="form-control form-control-solid"
                  type="time"
                  {...register("endTime")}
                  placeholder={intl.formatMessage({ id: "ToHour" })}
                />
                {DisplayErrorMessage(errors?.endTime?.message, intl, language)}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center py-2">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center ">
                  <div
                    onClick={handleClose}
                    className="btn btn-secondary mx-1 text-center"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success mx-3"
                    style={{ border: "none" }}
                  >
                    {intl.formatMessage({ id: "RenewPermit" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default RenewPermitForMembersTablePopup;
