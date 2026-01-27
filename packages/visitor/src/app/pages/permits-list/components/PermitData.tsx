import { FC, Fragment } from "react";
import { useIntl } from "react-intl";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import {
  Attachment,
  SinglePermissionDetailsModel,
} from "../../../model/single-permission-details-model";
import moment from "moment";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { VisitorRootUrl } from "@4eplatform/shared/apis/visitor";

interface PermitDataProps {
  singlePermission: SinglePermissionDetailsModel;
}
const PermitData: FC<PermitDataProps> = ({ singlePermission }) => {
  const intl = useIntl();
  return (
    <div className="card bg-light  p-6 mb-7">
      <div className="px-3 mb-1">
        <p className="fw-bolder fs-4">
          {intl.formatMessage({ id: "PermitData" })}
        </p>
      </div>
      <div className="row gy-5 p-3">
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "PermitNumber" })} :
            <span className="mx-1 text-dark fw-bold">
              #{singlePermission?.permissionNumber}
            </span>
          </p>
        </div>
        {singlePermission?.receivedVisiting && (
          <div className="col-lg-6 col-sm-12">
            <p className="text-gray-400">
              {" "}
              {intl.formatMessage({ id: "VisitReceiver" })} :
              <span className="mx-2 text-dark fw-bold">
                {singlePermission?.receivedVisiting}
              </span>
            </p>
          </div>
        )}

        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "AuthorizingAuthority" })} :
            <span className="mx-2 text-dark fw-bold">
              {singlePermission?.orgName}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "Parkings" })} :
            <span className=" mx-2 text-dark fw-bold">
              {" "}
              {singlePermission?.isParking
                ? intl.formatMessage({ id: "Found" })
                : intl.formatMessage({ id: "NotFound" })
              }
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitDateStart" })} :
            <span className="mx-2 text-dark fw-bold">
              {singlePermission?.startDate
                ? moment(singlePermission?.startDate).format("YYYY-MM-DD")
                : intl.formatMessage({ id: "NotFound" })}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitDateEnd" })} :
            <span className="mx-2 text-dark fw-bold">
              {" "}
              {singlePermission?.endDate
                ? moment(singlePermission?.endDate).format("YYYY-MM-DD")
                : intl.formatMessage({ id: "NotFound" })}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitTimeStart" })} :
            <span className="mx-2 text-dark fw-bold">
              {singlePermission?.startTime}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitTimeEnd" })} :
            <span className="mx-2 text-dark fw-bold">
              {singlePermission?.endTime}
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
                  {" "}
                  {singlePermission?.createdOn
                    ? moment(singlePermission?.createdOn).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
            </div>
            <div className="col-lg-6 col-sm-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "PermitCreator" })} :
                <span className="mx-2 text-dark fw-bold">
                  {singlePermission?.creator}
                </span>
              </p>
            </div>
          </div>
        </div>
        {singlePermission?.permissionReason && <div className="card py-3">
          <p className="text-gray-400">
            {" "}
            {intl.formatMessage({ id: "PermitReason" })}{" "}
          </p>
          {singlePermission?.permissionReason}
        </div>}



        {singlePermission?.attachments?.length > 0 && (
          <div className="card py-3">
            <div className="col-lg-12">
              <div>
                <label className="text-gray-400 mb-5">
                  {intl.formatMessage({ id: "Attachments" })} :
                </label>
                <div className="d-flex text-center align-items-center gap-5">
                  {singlePermission?.attachments?.map(
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

        {singlePermission?.parkingDto?.length > 0 && <div className="card py-3">
          <div className="row">
            <div className="col-12">
              <div>
                <label className="text-gray-400 mb-5">
                  {intl.formatMessage({ id: "Parkings" })} :
                </label>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "CarColor" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {singlePermission?.parkingDto[0]?.carColor || intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "CarModel" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {singlePermission?.parkingDto[0]?.carModel || intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "CarPlateData" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {singlePermission?.parkingDto[0]?.carPlateData || intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "Duration" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {singlePermission?.parkingDto[0]?.duration || intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>}

        {(singlePermission?.managerDecission?.notes || singlePermission?.managerDecission?.attachmentUrl) && <div className="card py-3">
          <div className="col-lg-12">
            <div>
              <label className="text-gray-400 mb-5">
                {intl.formatMessage({ id: "ManagerDecision" })} :
              </label>
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "TheReason" })} :
                <span className="mx-2 text-dark fw-bold">
                  {singlePermission?.managerDecission?.notes || intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>
              {singlePermission?.managerDecission?.attachmentUrl && <div className="d-flex text-center align-items-center gap-5">
                <p className="text-gray-400">
                  {" "}
                  {intl.formatMessage({ id: "Attachments" })} :
                </p>
                <div>
                  <img
                    src={getIconSrc(
                      singlePermission?.managerDecission?.attachmentName,
                      { path: singlePermission?.managerDecission?.attachmentUrl },
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
                      singlePermission?.managerDecission?.attachmentName
                    ))
                    }
                  />
                  <a
                    href={`${VisitorRootUrl}${singlePermission?.managerDecission?.attachmentUrl}`}
                    target="_blank"
                  >
                    <span className="text-primary mx-2 fw-bolder">
                      {singlePermission?.managerDecission?.attachmentName}
                    </span>
                  </a>
                </div>
              </div>}

            </div>
          </div>
        </div>}

        {singlePermission?.permissionNote && (
          <div className="card py-3">
            <p className="text-gray-400">
              {" "}
              {intl.formatMessage({ id: "Notes" })}{" "}
            </p>
            {singlePermission?.permissionNote}
          </div>
        )}
      </div>
    </div >
  );
};

export default PermitData;
