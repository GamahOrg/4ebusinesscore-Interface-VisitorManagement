import { FC, Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { GroupPermissionDetailsModel } from "../../../model/group-permission-details-model";
import moment from "moment";
import { Attachment } from "../../../model/single-permission-details-model";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { VisitorAggRootUrl } from "@4eplatform/shared/apis/visitor_agg";
import { BuildingStatus } from "@4eplatform/shared/enums/enums";
import ViewEmployee from "../popup/ViewEmployeePopup";

interface GroupDataProps {
  groupPermission: GroupPermissionDetailsModel;
}

const GroupData: FC<GroupDataProps> = ({ groupPermission }) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <div className="card bg-light  p-6 mb-7">
        <div className="px-3 mb-1">
          <p className="fw-bolder fs-4">
            {intl.formatMessage({ id: "GroupData" })}
          </p>
        </div>
        <div className="row gy-5 p-3">
          {groupPermission?.groupNumber ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "GroupNumber" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.groupNumber}#
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
          {groupPermission?.groupName ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "GroupName" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.groupName}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}

          {groupPermission?.receivedVisiting ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "VisitReceiver" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.receivedVisiting ||
                    intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
          {groupPermission?.orgName ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "AuthorizingAuthority" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.orgName ||
                    intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="col-lg-6 col-sm-12">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Parkings" })} :
              <span className=" mx-2 text-dark fw-bold">
                {groupPermission?.isParking
                  ? intl.formatMessage({ id: "Found" })
                  : intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Building" })} :
              <span className=" mx-2 text-dark fw-bold">
                {groupPermission?.buildingType
                  ? groupPermission?.buildingType === BuildingStatus.Main
                    ? intl.formatMessage({ id: "Major" })
                    : intl.formatMessage({ id: "Sub" })
                  : intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>

          {groupPermission?.startDate ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitStartDate" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.startDate
                    ? moment(groupPermission?.startDate).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
          {groupPermission?.endDate ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitEndDate" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.endDate
                    ? moment(groupPermission?.endDate).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}

          {groupPermission?.startTime ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitTimeStart" })} :
                <span className="mx-2 text-dark fw-bold">
                  {" "}
                  {groupPermission?.startTime
                    ? moment(groupPermission?.startTime, "HH:mm:ss").format(
                        "hh:mm A"
                      )
                    : intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}

          {groupPermission?.endTime ? (
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitTimeEnd" })} :
                <span className="mx-2 text-dark fw-bold">
                  {" "}
                  {groupPermission?.endTime
                    ? moment(groupPermission?.endTime, "HH:mm:ss").format(
                        "hh:mm A"
                      )
                    : intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}

          {groupPermission?.createdOn || groupPermission?.creator ? (
            <div className="card py-4">
              <div className="row ">
                {groupPermission?.createdOn ? (
                  <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400 mb-0">
                      {" "}
                      {intl.formatMessage({ id: "PermitRequestDate" })} :
                      <span className="mx-2 text-dark fw-bold">
                        {groupPermission?.createdOn
                          ? moment(groupPermission?.createdOn).format(
                              "YYYY-MM-DD"
                            )
                          : intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {groupPermission?.creator ? (
                  <div className="col-lg-6 col-sm-12">
                    <p
                      className="text-gray-400 cursor-pointer mb-0"
                      onClick={() => {
                        setModalShow(true);
                      }}
                    >
                      {" "}
                      {intl.formatMessage({ id: "PermitCreator" })} :
                      <span className="mx-2 text-dark fw-bold">
                        {groupPermission?.creator ||
                          intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          {groupPermission?.permissionReason ? (
            <div className="card py-3">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitReason" })}{" "}
              </p>
              <p>
                {groupPermission?.permissionReason ||
                  intl.formatMessage({ id: "NotFound" })}
              </p>
            </div>
          ) : (
            ""
          )}

          {groupPermission?.attachments?.length ? (
            <div className="card py-3">
              <div className="col-lg-12">
                <div>
                  <label className="text-gray-400 mb-5">
                    {intl.formatMessage({ id: "Attachments" })} :
                  </label>
                  <div className="d-flex text-center align-items-center gap-5">
                    {groupPermission?.attachments?.map(
                      (attachment: Attachment) => {
                        return (
                          <Fragment key={attachment?.id}>
                            <div>
                              <img
                                src={getIconSrc(
                                  attachment?.filename,
                                  { path: attachment?.filepath },
                                  VisitorAggRootUrl
                                )}
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  display: "inline-block",
                                  borderRadius: "50%",
                                }}
                                alt=""
                                onError={(e: any) =>
                                  (e.target.src = getIconSrcError(
                                    attachment?.filename
                                  ))
                                }
                              />
                              <a
                                href={`${VisitorAggRootUrl}${attachment?.filepath}`}
                                target="_blank"
                                download
                              >
                                <span className="text-primary mx-2 fw-bolder">
                                  {attachment?.filename}
                                </span>
                              </a>
                            </div>
                          </Fragment>
                        );
                      }
                    )}
                    {groupPermission?.attachments?.length === 0 &&
                      intl.formatMessage({ id: "NotFound" })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {groupPermission?.permissionNote ||
          groupPermission?.managerDecission?.notes ? (
            <div className="card py-3">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "Notes" })}{" "}
              </p>
              <p>
                {groupPermission?.permissionNote ||
                  groupPermission?.managerDecission?.notes ||
                  intl.formatMessage({ id: "NotFound" })}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {groupPermission?.parkingDto?.length > 0 && (
          <div className="card p-3 overflow-y-scroll">
            <div className="mb-2">
              <label className="text-gray-500 font-bold">
                {intl.formatMessage({ id: "Parkings" })} :
              </label>
            </div>
            {groupPermission?.parkingDto?.map((parking, index) => (
              <div
                key={index}
                className={`py-4 overflow-y-auto ${
                  index !== groupPermission.parkingDto.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="mb-2">
                  <label className="text-gray-500">
                    {intl.formatMessage({ id: "Parking" })} ({index + 1}) :
                  </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "CarType" })} :{" "}
                      <span className="ml-2 text-gray-900 font-semibold">
                        {parking?.carType ||
                          intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "CarColor" })} :{" "}
                      <span className="ml-2 text-gray-900 font-semibold">
                        {parking?.carColor ||
                          intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "CarModel" })} :{" "}
                      <span className="ml-2 text-gray-900 font-semibold">
                        {parking?.carModel ||
                          intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "CarPlateData" })} :{" "}
                      <span className="ml-2 text-gray-900 font-semibold">
                        {parking?.carPlateData ||
                          intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "Duration" })} :{" "}
                      <span className="ml-2 text-gray-900 font-semibold">
                        {parking?.duration ||
                          intl.formatMessage({ id: "NotFound" })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modalShow && (
        <ViewEmployee
          show={modalShow}
          handleClose={() => setModalShow(false)}
          id={groupPermission?.creatorId}
        />
      )}
    </>
  );
};

export default GroupData;
