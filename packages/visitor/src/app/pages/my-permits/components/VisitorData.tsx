import { FC } from "react";
import { useIntl } from "react-intl";
import { SinglePermissionDetailsModel } from "../../../model/single-permission-details-model";
import { PermissionStatus } from "../../../model/permit-enums";
interface PermitDataProps {
  singlePermission: SinglePermissionDetailsModel;
}

const VisitorData: FC<PermitDataProps> = ({ singlePermission }) => {
  const intl = useIntl();
  return (
    <div className="card bg-light  p-6 mb-7">
      <div className="px-3 mb-1">
        <p className="fw-bolder fs-4">
          {intl.formatMessage({ id: "VisitorData" })}
        </p>
      </div>
      <div className="card p-6">
        <div className="row">
          <div className="col-10">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "IDNumber" })}/
                  {intl.formatMessage({ id: "Residence" })} :
                  <span className="px-2 text-dark fw-bold">
                    {singlePermission?.visitorNID}
                  </span>
                </p>
              </div>
              <div className="col-lg-6 col-sm-12">
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "QuadrupleName" })} :
                  <span className="px-2 text-dark fw-bold">
                    {singlePermission?.visitorName}{" "}
                  </span>
                </p>
              </div>
              <div className="col-lg-6 col-sm-12">
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "PhoneNumber" })} :
                  <span className="px-2 text-dark fw-bold">
                    {" "}
                    {singlePermission?.visitorPhone}
                  </span>
                </p>
              </div>
              <div className="col-lg-6 col-sm-12">
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "Email" })} :
                  <span className="px-2 text-dark fw-bold">
                    {singlePermission?.visitorEmail}
                  </span>
                </p>
              </div>
              {singlePermission?.visitorWhatsApp && (
                <div className="col-lg-6 col-sm-12">
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "WhatsAppNumber" })} :
                    <span className="px-2 text-dark fw-bold">
                      {" "}
                      {singlePermission?.visitorWhatsApp}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-2">
            <div
              className={`badge ${
                singlePermission?.permissionStatus ==
                  PermissionStatus?.Approved && "badge-light-success"
              }
            ${singlePermission?.permissionStatus == PermissionStatus?.InProgress && "badge-light-primary"}
            ${singlePermission?.permissionStatus == PermissionStatus?.Finshed && "badge-secondary"}
            ${singlePermission?.permissionStatus == PermissionStatus?.Canceled && "badge-light-danger"}
            ${singlePermission?.permissionStatus == PermissionStatus?.Rejected && "badge-light-danger"}
            ${singlePermission?.permissionStatus == PermissionStatus?.Pending && "badge-light-warning"} text-center py-2`}
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
  );
};

export default VisitorData;
