import { FC, Fragment } from "react";
import { useIntl } from "react-intl";
import { GroupPermissionDetailsModel } from "../../../model/group-permission-details-model";
import moment from "moment";
import { Attachment } from "../../../model/single-permission-details-model";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { VisitorRootUrl } from "@4eplatform/shared/apis/visitor";
import { BuildingStatus } from "@4eplatform/shared/enums/enums";

interface GroupDataProps {
  groupPermission: GroupPermissionDetailsModel;
}

const GroupData: FC<GroupDataProps> = ({ groupPermission }) => {
  const intl = useIntl();
  return (
    <div className="card bg-light  p-6 mb-7">
      <div className="px-3 mb-1">
        <p className="fw-bolder fs-4">
          {intl.formatMessage({ id: "GroupData" })}
        </p>
      </div>
      <div className="row gy-5 p-3">
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "GroupNumber" })} :
            <span className="mx-2 text-dark fw-bold">
              {groupPermission?.groupNumber}
            </span>
          </p>
        </div>
        {groupPermission?.receivedVisiting && (
          <div className="col-lg-6 col-sm-12">
            <p className="text-gray-400">
              {" "}
              {intl.formatMessage({ id: "VisitReceiver" })} :
              <span className="mx-2 text-dark fw-bold">
                {groupPermission?.receivedVisiting}
              </span>
            </p>
          </div>
        )}

        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "AuthorizingAuthority" })} :
            <span className="mx-2 text-dark fw-bold">
              {groupPermission?.orgName}
            </span>
          </p>
        </div>
        {/* <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitType" })} :
            <span className="mx-2 text-dark fw-bold">
              {groupPermission?.permissionSource == 0
                ? intl.formatMessage({ id: "Internall" })
                : intl.formatMessage({ id: "Externall" })}
            </span>
          </p>
        </div> */}
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
            {" "}
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

        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitTimeStart" })} :
            <span className="mx-2 text-dark fw-bold">
              {groupPermission?.startTime
                ? moment(groupPermission?.startTime, "HH:mm:ss").format(
                    "hh:mm A"
                  )
                : intl.formatMessage({ id: "NotFound" })}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitTimeEnd" })} :
            <span className="mx-2 text-dark fw-bold">
              {groupPermission?.endTime
                ? moment(groupPermission?.endTime, "HH:mm:ss").format("hh:mm A")
                : intl.formatMessage({ id: "NotFound" })}
            </span>
          </p>
        </div>
        <div className="card py-3">
          <div className="row ">
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitRequestDate" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.createdOn
                    ? moment(groupPermission?.createdOn).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitCreator" })} :
                <span className="mx-2 text-dark fw-bold">
                  {groupPermission?.creator}
                </span>
              </p>
            </div>
          </div>
        </div>
        {groupPermission?.permissionReason && (
          <div className="card py-3">
            <p className="text-gray-400">
              {" "}
              {intl.formatMessage({ id: "PermitReason" })}{" "}
            </p>
            <p>{groupPermission?.permissionReason}</p>
          </div>
        )}
        {groupPermission?.attachments?.length > 0 && (
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
                                VisitorRootUrl
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
                              href={`${VisitorRootUrl}${attachment?.filepath}`}
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
                </div>
              </div>
            </div>
          </div>
        )}

        {groupPermission?.parkingDto?.length > 0 && (
          <div
            className="card py-3 overflow-scroll"
            style={{
              maxHeight: "413px",
            }}
          >
            <div className="mb-2">
              <label className="text-gray-500 font-bold">
                {intl.formatMessage({ id: "Parkings" })} :
              </label>
            </div>
            {groupPermission?.parkingDto?.map((parking, index) => (
              <div
                key={index}
                className={`py-4  ${
                  index !== groupPermission.parkingDto.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="mb-2">
                  <label className="text-gray-500 ">
                    {intl.formatMessage({ id: "Parking" })}({index + 1}) :
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

        {(groupPermission?.managerDecission?.notes ||
          groupPermission?.managerDecission?.attachmentUrl) && (
          <div className="card py-3">
            <div className="col-lg-12">
              <div>
                <label className="text-gray-400 mb-5">
                  {intl.formatMessage({ id: "ManagerDecision" })} :
                </label>
                <p className="text-gray-400">
                  {" "}
                  {intl.formatMessage({ id: "TheReason" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {groupPermission?.managerDecission?.notes ||
                      intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>
                {groupPermission?.managerDecission?.attachmentUrl && (
                  <div className="d-flex text-center align-items-center gap-5">
                    <p className="text-gray-400">
                      {" "}
                      {intl.formatMessage({ id: "Attachments" })} :
                    </p>
                    <div>
                      <img
                        src={getIconSrc(
                          groupPermission?.managerDecission?.attachmentName,
                          {
                            path: groupPermission?.managerDecission
                              ?.attachmentUrl,
                          },
                          VisitorRootUrl
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
                            groupPermission?.managerDecission?.attachmentName
                          ))
                        }
                      />
                      <a
                        href={`${VisitorRootUrl}${groupPermission?.managerDecission?.attachmentUrl}`}
                        target="_blank"
                      >
                        <span className="text-primary mx-2 fw-bolder">
                          {groupPermission?.managerDecission?.attachmentName}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {groupPermission?.permissionNote && (
          <div className="card py-3">
            <p className="text-gray-400">
              {" "}
              {intl.formatMessage({ id: "Notes" })}{" "}
            </p>
            <p>{groupPermission?.permissionNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupData;
