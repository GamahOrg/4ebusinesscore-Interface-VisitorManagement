import { Fragment, useEffect } from "react";
import { FC } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowPermission } from "../../../redux/permissions-list-slice";
import { RootState } from "../../../redux/store";
import {
  ActionType,
  CanceledReason,
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";
import moment from "moment";
import {
  getGetPermissionByVisitorId,
  GetGroupbyID,
} from "../../../redux/permission-slice";
import { VisitorAggRootUrl } from "@4eplatform/shared/apis/visitor_agg";
import { Attachment } from "../../../model/single-permission-details-model";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";

const PermitFollow: FC<{
  tabName: string;
  isMemberOrGroup?: string;
  permitDetails?: any;
}> = ({ isMemberOrGroup, permitDetails }) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let { permitId } = useParams();
  const { singlePermission } = useSelector(
    (state: RootState) => state.permission
  );
  const { groupPermission } = useSelector(
    (state: RootState) => state.permission
  );
  let followPermissionsList = useSelector((state: RootState) => {
    return state?.permissionsList?.followPermissionList;
  });
  useEffect(() => {
    if (isMemberOrGroup == "member") {
      if (permitDetails?.vistorId != "") {
        dispatch(
          getGetPermissionByVisitorId({
            Visitor_id: permitId,
          }) as any
        );
        dispatch(fetchFollowPermission(permitId) as any);
      }
    } else if (isMemberOrGroup == "group") {
      if (permitId != "") {
        dispatch(GetGroupbyID({ Gruopid: permitId }) as any).then(
          (res: any) => {
            if (res?.payload?.result?.permissionId) {
              dispatch(
                fetchFollowPermission(res?.payload?.result?.permissionId) as any
              );
            }
          }
        );
      }
    }
  }, [isMemberOrGroup, permitDetails]);
  return (
    <>
      <div className="card bg-light  p-6 mb-7">
        <div className="px-3 mb-1">
          {isMemberOrGroup == "member" ? (
            <></>
          ) : (
            <>
              <p className="fw-bolder fs-4">
                {intl.formatMessage({ id: "GroupData" })}
              </p>
            </>
          )}
        </div>
        <div className="row">
          {isMemberOrGroup == "member" ? (
            <>
              <div className="  col-sm-12 col-md-6">
                <div className="card p-6">
                  <p className="text-gray-400 fw-bold  fs-5">
                    {" "}
                    {intl.formatMessage({ id: "VisitorData" })} :
                  </p>
                  <div className="row">
                    <div className="col-10">
                      <p className="text-dark fw-bold  fs-5">
                        {singlePermission?.visitorName ||
                          intl.formatMessage({ id: "NotFound" })}
                        <span className="px-2 text-primary fw-bold">
                          #{singlePermission?.permissionNumber}
                        </span>
                      </p>
                    </div>
                    <div className="col-2">
                      {" "}
                      <div
                        className={`badge ${
                          singlePermission?.permissionStatus ==
                            PermissionStatus?.Approved && "badge-light-success"
                        }
           ${singlePermission?.permissionStatus == PermissionStatus?.InProgress && "badge-light-primary"}
           ${singlePermission?.permissionStatus == PermissionStatus?.Finshed && "badge-secondary"}
           ${singlePermission?.permissionStatus == PermissionStatus?.Canceled && "badge-light-danger"}
           ${singlePermission?.permissionStatus == PermissionStatus?.Rejected && "badge-light-danger"}
           ${singlePermission?.permissionStatus == PermissionStatus?.Pending && "badge-light-warning"} text-center py-2 fw-bold`}
                      >
                        {singlePermission?.permissionStatus ==
                        PermissionStatus?.Pending ? (
                          <>{intl.formatMessage({ id: "UnderRevision" })}</>
                        ) : singlePermission?.permissionStatus ==
                          PermissionStatus?.InProgress ? (
                          <>{intl.formatMessage({ id: "Continued" })}</>
                        ) : singlePermission?.permissionStatus ==
                          PermissionStatus?.Approved ? (
                          <>{intl.formatMessage({ id: "Acceptable" })}</>
                        ) : singlePermission?.permissionStatus ==
                          PermissionStatus?.Canceled ? (
                          <>{intl.formatMessage({ id: "Canceledd" })}</>
                        ) : singlePermission?.permissionStatus ==
                          PermissionStatus?.Finshed ? (
                          <>{intl.formatMessage({ id: "Finished" })}</>
                        ) : (
                          <>{intl.formatMessage({ id: "Rejected" })}</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="  col-sm-12 col-md-6">
                <div className="card p-6">
                  <p className="text-gray-400 fw-bold  fs-5">
                    {" "}
                    {intl.formatMessage({ id: "VisitorsData" })} :
                  </p>
                  {groupPermission?.visitor?.map((visitor) => {
                    return (
                      <Fragment key={visitor?.vistorId}>
                        <div className="row">
                          <div className="col-10">
                            <p className="text-dark fw-bold  fs-5">
                              {visitor?.vistorName ||
                                intl.formatMessage({ id: "NotFound" })}
                              :
                              <span className="px-2 text-primary fw-bold">
                                #{visitor?.permissionNumber}
                              </span>
                            </p>
                          </div>
                          <div className="col-2">
                            {" "}
                            <div
                              className={`badge ${
                                visitor?.permissionStatus ==
                                  PermissionStatus?.Approved &&
                                "badge-light-success"
                              }
            ${visitor?.permissionStatus == PermissionStatus?.InProgress && "badge-light-primary"}
            ${visitor?.permissionStatus == PermissionStatus?.Finshed && "badge-secondary"}
            ${visitor?.permissionStatus == PermissionStatus?.Canceled && "badge-light-danger"}
            ${visitor?.permissionStatus == PermissionStatus?.Rejected && "badge-light-danger"}
            ${visitor?.permissionStatus == PermissionStatus?.Pending && "badge-light-warning"} text-center py-2 fw-bold`}
                            >
                              {visitor?.permissionStatus ==
                              PermissionStatus?.Pending ? (
                                <>
                                  {intl.formatMessage({ id: "UnderRevision" })}
                                </>
                              ) : visitor?.permissionStatus ==
                                PermissionStatus?.InProgress ? (
                                <>{intl.formatMessage({ id: "Continued" })}</>
                              ) : visitor?.permissionStatus ==
                                PermissionStatus?.Approved ? (
                                <>{intl.formatMessage({ id: "Acceptable" })}</>
                              ) : visitor?.permissionStatus ==
                                PermissionStatus?.Canceled ? (
                                <>{intl.formatMessage({ id: "Canceledd" })}</>
                              ) : visitor?.permissionStatus ==
                                PermissionStatus?.Finshed ? (
                                <>{intl.formatMessage({ id: "Finished" })}</>
                              ) : (
                                <>{intl.formatMessage({ id: "Rejected" })}</>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {isMemberOrGroup == "member" ? (
            <>
              {" "}
              <div className=" col-sm-12 col-md-6">
                <div className="card p-6">
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitCreator" })} :
                        <span className="px-2 text-dark fw-bold">
                          {singlePermission?.creator}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitReason" })} :
                        <span className="px-2 text-dark fw-bold">
                          {singlePermission?.permissionType ==
                          PermissionType?.WorkingPermission
                            ? intl.formatMessage({ id: "PermitWork" })
                            : singlePermission?.permissionType ==
                                PermissionType?.PersonalPermission
                              ? intl.formatMessage({ id: "PersonalVisit" })
                              : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "AuthorizingAuthority" })} :
                        <span className="px-2 text-dark fw-bold">
                          {singlePermission?.orgName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitDateStart" })} :
                        <span className="px-2 text-dark fw-bold">
                          {moment(singlePermission?.startDate).format(
                            "YYYY-MM-DD"
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitDateEnd" })} :
                        <span className="px-2 text-dark fw-bold">
                          {moment(singlePermission?.endDate).format(
                            "YYYY-MM-DD"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitTimeStart" })} :
                        <span className="px-2 text-dark fw-bold">
                          {singlePermission?.startTime}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitTimeEnd" })} :
                        <span className="px-2 text-dark fw-bold">
                          {singlePermission?.endTime}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className=" col-sm-12 col-md-6">
                <div className="card p-6">
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "GroupNumber" })} :
                        <span className="px-2 text-dark fw-bold">
                          #{groupPermission?.groupNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitCreator" })} :
                        <span className="px-2 text-dark fw-bold">
                          {groupPermission?.creator}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitReason" })} :
                        <span className="px-2 text-dark fw-bold">
                          {groupPermission?.permissionType ==
                          PermissionType?.WorkingPermission
                            ? intl.formatMessage({ id: "PermitWork" })
                            : groupPermission?.permissionType ==
                                PermissionType?.PersonalPermission
                              ? intl.formatMessage({ id: "PersonalVisit" })
                              : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "AuthorizingAuthority" })} :
                        <span className="px-2 text-dark fw-bold">
                          {groupPermission?.orgName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitDateStart" })} :
                        <span className="px-2 text-dark fw-bold">
                          {moment(groupPermission?.startDate).format(
                            "YYYY-MM-DD"
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitDateEnd" })} :
                        <span className="px-2 text-dark fw-bold">
                          {moment(groupPermission?.endDate).format(
                            "YYYY-MM-DD"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitTimeStart" })} :
                        <span className="px-2 text-dark fw-bold">
                          {groupPermission?.startTime}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <p className="text-gray-400 fw-bold  fs-5">
                        {intl.formatMessage({ id: "PermitTimeEnd" })} :
                        <span className="px-2 text-dark fw-bold">
                          {groupPermission?.endTime}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {followPermissionsList?.map((item, index) => {
        return (
          <Fragment key={item?.permissionId + index}>
            {item?.action == ActionType.AddNewVisitor && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-primary p-2">
                      <i className="fal fa-user-plus d-block text-primary text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-primary p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({
                            id: "AddNewVisitorRequest",
                          })}{" "}
                          :
                          <span className="px-2 text-primary fw-bold">
                            {item?.visitorName}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Applicant" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.createBy}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.CanceledPermissionForVisitor && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({
                            id: "VisitorPermitCanceled",
                          })}{" "}
                          :
                          <span className="px-2 text-danger fw-bold">
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.createBy}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          {/* <span className="mx-2 text-dark fw-bold">
                          الاثنين | 10:30 | 25 يناير
                        </span> */}
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="card p-6">
                      <div className="row">
                        <div className="col-sm-12">
                          <p className="text-dark-400 fw-bold  fs-5">
                            {" "}
                            {intl.formatMessage({ id: "CancelReason" })} :
                            {item?.reasonForCancled == CanceledReason?.Violation
                              ? intl.formatMessage({ id: "Violation" })
                              : item?.reasonForCancled == CanceledReason?.Other
                                ? intl.formatMessage({ id: "OtherReason" })
                                : ""}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-dark fw-bold  fs-5">
                          {intl.formatMessage({ id: "Violation" })} :
                          <span className="mx-2 text-danger fw-bold">
                            {item?.violationtype}
                          </span>
                        </p>
                        <p className="text-dark fw-bold  fs-5">
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.EditPermissionInfo && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-primary p-2">
                      <i className="fal fa-pencil d-block text-primary text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-primary p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({
                            id: "PermitDataEditRequest",
                          })}{" "}
                          :
                          <span className="px-2 text-gray-400  fw-bold">
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Applicant" })} :
                          {item?.createBy}
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="card p-6">
                      <div className="row">
                        <div className="col-sm-12">
                          <p className="text-dark-400 fw-bold  fs-5">
                            {" "}
                            {intl.formatMessage({ id: "Edits" })} :
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.startDate ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "PermitStartDate",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.startDate
                                  ? moment(item?.startDate).format("YYYY-MM-DD")
                                  : intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.startDate && item?.endDate ? (
                            <>
                              <span className="mx-2 text-success fw-bold fs-1">
                                ←
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.endDate ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({ id: "PermitEndDate" })} :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.endDate
                                  ? moment(item?.endDate).format("YYYY-MM-DD")
                                  : intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.startTime ? (
                            <>
                              {" "}
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "PermitTimeStart",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.startTime}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}

                          {item?.startTime && item?.endTime ? (
                            <>
                              <span className="mx-2 text-success fw-bold fs-1">
                                ←
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.endTime ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({ id: "PermitTimeEnd" })} :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.endTime}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.visitorName ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "VisitorName",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.visitorName}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.email ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "Email",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.email}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.nationalID ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "IDNumber",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.nationalID}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.phoneNumber ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "Phone",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.phoneNumber}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.whatsAppNumber ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "WhatsAppNumber",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.whatsAppNumber}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.orgName ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "DeclaringAuthority",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.orgName}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.recivedName ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "FutureVisit",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.recivedName}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.reason ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "ReasonForStatement",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.reason}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.notes ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "Note",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.notes}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      {item?.attachments?.length > 0 ? (
                        <>
                          <div className="row">
                            <div className="col-lg-12 mb-2 pt-2 pb-3">
                              <label
                                htmlFor="notes"
                                className="form-label mb-3 px-2 fontSz-6"
                              >
                                {intl.formatMessage({ id: "Attachments" })}
                              </label>
                              <div className="d-flex  flex-wrap gap-2">
                                {item?.attachments?.map(
                                  (attachment: Attachment) => {
                                    return (
                                      <Fragment key={attachment?.id}>
                                        <div className="d-flex my-2 align-items-center mx-1">
                                          <a
                                            href={`${VisitorAggRootUrl}${attachment?.filepath}`}
                                            download={attachment?.filename}
                                            target="_blank"
                                            className="text-primary mx-2 fw-bolder p-0 m-0"
                                          >
                                            <img
                                              src={getIconSrc(
                                                attachment?.filename,
                                                { path: attachment?.filepath },
                                                VisitorAggRootUrl
                                              )}
                                              alt=""
                                              className="d-inline-block ms-2"
                                              style={{
                                                height: "40px",
                                                width: "40px",
                                              }}
                                              onError={(e: any) =>
                                                (e.target.src = getIconSrcError(
                                                  attachment?.filename
                                                ))
                                              }
                                            />
                                            <span>{attachment?.filename}</span>
                                          </a>

                                          <div></div>
                                        </div>
                                      </Fragment>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.updatedPermissionInfo && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light p-2">
                      <i className="fal fa-check-circle d-block text-success text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "PermitDataEdited" })} :
                          <span className="px-2 text-gray-400 fw-bold">
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Applicant" })} :{" "}
                          {item?.createBy}
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="card p-6">
                      <div className="row">
                        <div className="col-sm-12">
                          <p className="text-dark-400 fw-bold  fs-5">
                            {" "}
                            {intl.formatMessage({ id: "Edits" })} :
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          {item?.startDate ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "PermitStartDate",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.startDate
                                  ? moment(item?.startDate).format("YYYY-MM-DD")
                                  : intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.startDate && item?.endDate ? (
                            <>
                              <span className="mx-2 text-success fw-bold fs-1">
                                ←
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.endDate ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({ id: "PermitEndDate" })} :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.endDate
                                  ? moment(item?.endDate).format("YYYY-MM-DD")
                                  : intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.startTime ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "PermitTimeStart",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.startTime}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.startTime && item?.endTime ? (
                            <>
                              <span className="mx-2 text-success fw-bold fs-1">
                                ←
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.endTime ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({ id: "PermitTimeEnd" })} :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.endTime}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.visitorName ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "VisitorName",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.visitorName}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.email ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "Email",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.email}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.nationalID ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "IDNumber",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.nationalID}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.phoneNumber ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "Phone",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.phoneNumber}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.whatsAppNumber ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "WhatsAppNumber",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.whatsAppNumber}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.orgName ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "DeclaringAuthority",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.orgName}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.recivedName ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "FutureVisit",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.recivedName}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.reason ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "ReasonForStatement",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.reason}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="my-0">
                          {item?.notes ? (
                            <>
                              <span className="mx-2 text-dark text-gray-400 fw-bold">
                                {" "}
                                {intl.formatMessage({
                                  id: "Note",
                                })}{" "}
                                :
                              </span>
                              <span className="mx-2 text-dark fw-bold">
                                {item?.notes}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                      {item?.attachments?.length > 0 ? (
                        <>
                          <div className="row">
                            <div className="col-lg-12 mb-2 pt-2 pb-3">
                              <label
                                htmlFor="notes"
                                className="form-label mb-3 px-2 fontSz-6"
                              >
                                {intl.formatMessage({ id: "Attachments" })}
                              </label>
                              <div className="d-flex  flex-wrap gap-2">
                                {item?.attachments?.map(
                                  (attachment: Attachment) => {
                                    return (
                                      <Fragment key={attachment?.id}>
                                        <div className="d-flex my-2 align-items-center mx-3">
                                          <a
                                            href={`${VisitorAggRootUrl}${attachment?.filepath}`}
                                            download={attachment?.filename}
                                            target="_blank"
                                            className="text-primary mx-2 fw-bolder p-0 m-0"
                                          >
                                            <img
                                              src={getIconSrc(
                                                attachment?.filename,
                                                { path: attachment?.filepath },
                                                VisitorAggRootUrl
                                              )}
                                              alt=""
                                              className="d-inline-block ms-2"
                                              style={{
                                                height: "40px",
                                                width: "40px",
                                              }}
                                              onError={(e: any) =>
                                                (e.target.src = getIconSrcError(
                                                  attachment?.filename
                                                ))
                                              }
                                            />
                                            <div>
                                              <span className="mx-2">
                                                {attachment?.filename}
                                              </span>
                                            </div>
                                          </a>
                                        </div>
                                      </Fragment>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.RecordedViolation && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "ViolationRecorded" })} :
                          <span className="px-2 text-danger fw-bold">
                            ({item?.visitorName}){" "}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.createBy}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="card p-6">
                      <div>
                        <p className="text-dark fw-bold  fs-5">
                          {intl.formatMessage({ id: "Violation" })} :
                          <span className="mx-2 text-danger fw-bold">
                            {item?.reason}
                          </span>
                        </p>
                        <p className="text-dark fw-bold  fs-5">
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.AcceptedPermission && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light p-2">
                      <i className="fal fa-check-circle d-block text-success text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "PermitAccepted" })} :
                          <span className="px-2 text-primary fw-bold">
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.createBy}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.CancelGroup && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "CancelGroupRequest" })} :
                          <span className="px-2 text-dark fw-bold">
                            {" "}
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Applicant" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.createBy}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.ReNewPermissionForVisitor && (
              <Fragment></Fragment>
            )}
            {item?.action == ActionType.rejectUpdated && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "RejectEditRequest" })} :
                          <span className="px-2 text-dark fw-bold">
                            {" "}
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.recivedName}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.RejectRenew && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "RejectRenewRequest" })} :
                          <span className="px-2 text-dark fw-bold">
                            {" "}
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.recivedName}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.RejectPermission && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({
                            id: "RejectPermissionRequest",
                          })}{" "}
                          :
                          <span className="px-2 text-dark fw-bold">
                            {" "}
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.recivedName}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
            {item?.action == ActionType.RejectCancel && (
              <Fragment>
                <div className="position-relative">
                  <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className="rounded-circle bg-light-danger p-2">
                      <i className="far fa-times-circle d-block text-danger text-center"></i>
                    </div>
                    <div
                      className="h-100 border-primary mx-auto mt-3"
                      style={{
                        border: "1px dashed #000",
                        width: "1px",
                      }}
                    ></div>
                  </div>
                  <div className="card bg-light-danger p-6 mb-7 me-10 ">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="text-dark-400 fw-bold  fs-5">
                          {" "}
                          {intl.formatMessage({ id: "RejectCancelRequest" })} :
                          <span className="px-2 text-dark fw-bold">
                            {" "}
                            ({item?.visitorName})
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Administrator" })} :
                          <span className="px-2 text-dark fw-bold">
                            {item?.recivedName}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <p className="text-gray-400">
                          {" "}
                          {intl.formatMessage({ id: "Date" })} :
                          <span className="mx-2 text-dark fw-bold">
                            {item?.date
                              ? moment(item?.date).format("YYYY-MM-DD")
                              : intl.formatMessage({ id: "NotFound" })}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default PermitFollow;
