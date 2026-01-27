import { FC, Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { Attachment } from "../../../model/single-permission-details-model";
import moment from "moment";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { VisitorAggRootUrl } from "@4eplatform/shared/apis/visitor_agg";
import { BuildingStatus } from "@4eplatform/shared/enums/enums";
import ViewEmployee from "../popup/ViewEmployeePopup";

interface PermitDataProps {
  singlePermission: any;
}
const PermitData: FC<PermitDataProps> = ({ singlePermission }) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <div className="card bg-light  p-6 mb-7">
      <div className="px-3 mb-1">
        <p className="fw-bolder fs-4">
          {intl.formatMessage({ id: "PermitData" })}
        </p>
      </div>
      <div className="row gy-5 p-3">
        {singlePermission?.permissionNumber ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "PermitNumber" })} :
              <span className="mx-1 text-dark fw-bold text-break">
                #{singlePermission?.permissionNumber}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.receivedVisiting ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "VisitReceiver" })} :
              <span className="mx-2 text-dark fw-bold text-break">
                {singlePermission?.receivedVisiting ||
                  intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.orgName ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "AuthorizingAuthority" })} :
              <span className="mx-2 text-dark fw-bold text-break">
                {singlePermission?.orgName ||
                  intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="col-lg-6 col-12 mb-3">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "Parkings" })} :
            <span className="mx-2 text-dark fw-bold">
              {singlePermission?.isParking
                ? intl.formatMessage({ id: "Found" })
                : intl.formatMessage({ id: "NotFound" })}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "Building" })} :
            <span className=" mx-2 text-dark fw-bold">
              {singlePermission?.buildingType
                ? singlePermission?.buildingType === BuildingStatus.Main
                  ? intl.formatMessage({ id: "Major" })
                  : intl.formatMessage({ id: "Sub" })
                : intl.formatMessage({ id: "NotFound" })}
            </span>
          </p>
        </div>
        <div className="col-lg-6 col-sm-12"></div>

        {singlePermission?.startDate ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "PermitDateStart" })} :
              <span className="mx-2 text-dark fw-bold">
                {singlePermission?.startDate
                  ? moment(singlePermission?.startDate).format("YYYY-MM-DD")
                  : intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.endDate ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "PermitDateEnd" })} :
              <span className="mx-2 text-dark fw-bold">
                {singlePermission?.endDate
                  ? moment(singlePermission?.endDate).format("YYYY-MM-DD")
                  : intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.startTime ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "PermitTimeStart" })} :
              <span className="mx-2 text-dark fw-bold">
                {singlePermission?.startTime
                  ? moment(singlePermission?.startTime, "HH:mm:ss").format(
                      "hh:mm A"
                    )
                  : intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.endTime ? (
          <div className="col-lg-6 col-12 mb-3">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "PermitTimeEnd" })} :
              <span className="mx-2 text-dark fw-bold">
                {singlePermission?.endTime
                  ? moment(singlePermission?.endTime, "HH:mm:ss").format(
                      "hh:mm A"
                    )
                  : intl.formatMessage({ id: "NotFound" })}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.createdOn || singlePermission?.creator ? (
          <div className="card py-4 mb-3 w-100">
            <div className="row">
              {singlePermission?.createdOn ? (
                <div className="col-lg-6 col-12 mb-2">
                  <p className="text-gray-400 mb-0">
                    {intl.formatMessage({ id: "PermitRequestDate" })} :
                    <span className="mx-2 text-dark fw-bold">
                      {singlePermission?.createdOn
                        ? moment(singlePermission?.createdOn).format(
                            "YYYY-MM-DD"
                          )
                        : intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </p>
                </div>
              ) : (
                ""
              )}

              {singlePermission?.creator ? (
                <div className="col-lg-6 col-12 mb-2">
                  <p
                    className="text-gray-400 cursor-pointer mb-0"
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    {intl.formatMessage({ id: "PermitCreator" })} :
                    <span className="mx-2 text-dark fw-bold text-break">
                      {singlePermission?.creator ||
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

        {singlePermission?.permissionReason ? (
          <div className="card py-3 mb-3 w-100">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "PermitReason" })}
            </p>
            <span className="text-break">
              {singlePermission?.permissionReason ||
                intl.formatMessage({ id: "NotFound" })}
            </span>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.attachments?.length ? (
          <div className="card py-3 mb-3 w-100">
            <div className="col-12">
              <div>
                <label className="text-gray-400 mb-3">
                  {intl.formatMessage({ id: "Attachments" })} :
                </label>
                <div
                  className="d-flex flex-wrap flex-md-nowrap text-center align-items-center gap-3 gap-md-5 overflow-auto"
                  style={{ maxWidth: "100%", flexWrap: "wrap" }}
                >
                  {singlePermission?.attachments?.map(
                    (attachment: Attachment) => {
                      return (
                        <Fragment key={attachment?.id}>
                          <div className="mb-2" style={{ minWidth: "80px" }}>
                            <img
                              src={getIconSrc(
                                attachment?.filename,
                                { path: attachment?.filepath },
                                VisitorAggRootUrl
                              )}
                              style={{
                                height: "40px",
                                width: "40px",
                                maxWidth: "100%",
                                display: "inline-block",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              alt=""
                              onError={(e: any) => {
                                if (e.target.dataset.fallbackUsed) return;
                                e.target.src = getIconSrcError(
                                  attachment?.filename
                                );
                                e.target.onerror = null; // remove further error triggering
                                e.target.dataset.fallbackUsed = "true"; // set flag
                              }}
                            />
                            <a
                              href={`${VisitorAggRootUrl}${attachment?.filepath}`}
                              target="_blank"
                              className="d-block text-truncate"
                              style={{ maxWidth: "80px" }}
                            >
                              <span className="text-primary mx-2 fw-bolder text-truncate">
                                {attachment?.filename}
                              </span>
                            </a>
                          </div>
                        </Fragment>
                      );
                    }
                  )}
                  {singlePermission?.attachments?.length == 0 &&
                    intl.formatMessage({ id: "NotFound" })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {singlePermission?.parkingDto?.length > 0 && (
          <div className="card py-3 mb-3 w-100">
            <div className="row">
              <div className="col-12">
                <div>
                  <label className="text-gray-400 mb-3">
                    {intl.formatMessage({ id: "Parkings" })} :
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-12 mb-2">
                <div>
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "CarColor" })} :
                    <span className="mx-2 text-dark fw-bold text-break">
                      {singlePermission?.parkingDto[0]?.carColor ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-12 mb-2">
                <div>
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "CarModel" })} :
                    <span className="mx-2 text-dark fw-bold text-break">
                      {singlePermission?.parkingDto[0]?.carModel ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-12 mb-2">
                <div>
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "CarPlateData" })} :
                    <span className="mx-2 text-dark fw-bold text-break">
                      {singlePermission?.parkingDto[0]?.carPlateData ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-12 mb-2">
                <div>
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "Duration" })} :
                    <span className="mx-2 text-dark fw-bold text-break">
                      {singlePermission?.parkingDto[0]?.duration ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {singlePermission?.permissionNote ||
        singlePermission?.managerDecission?.notes ? (
          <div className="card py-3 mb-3 w-100">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Notes" })}
            </p>
            <span className="text-break">
              {singlePermission?.permissionNote ||
                singlePermission?.managerDecission?.notes ||
                intl.formatMessage({ id: "NotFound" })}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      {modalShow && (
        <ViewEmployee
          show={modalShow}
          handleClose={() => setModalShow(false)}
          id={singlePermission?.creatorId}
        />
      )}
    </div>
  );
};

export default PermitData;
