import { FC } from "react";
import { SinglePermitActions } from "./SinglePermitActions";
import { useIntl } from "react-intl";
import {
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";
import { handlePermissionSource } from "../../permit-applications/utils/permitApplicationUtil";

type PermitPersonRowProps = {
  permit?: any;
  pageSizeForMember?: number;
  pageIndexForMember?: number;
};

const PermitPersonRow: FC<PermitPersonRowProps> = ({
  permit,
  pageSizeForMember,
  pageIndexForMember,
}) => {
  const intl = useIntl();
  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionCode || intl.formatMessage({id:"NotFound"})}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.visitorName || intl.formatMessage({id:"NotFound"})}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.violationCount || intl.formatMessage({id:"NotFound"})}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.permissionType == PermissionType?.WorkingPermission
            ? intl.formatMessage({ id: "PermitWork" })
            : permit?.permissionType == PermissionType?.PersonalPermission
            ? intl.formatMessage({ id: "PersonalVisit" })
          :""}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionOrg}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionSource)?.className}`}
        >
                {intl.formatMessage({ id: handlePermissionSource(permit?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionReceiver || intl.formatMessage({id:"NotFound"})}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge ${
            permit?.permissionStatus == PermissionStatus?.Approved &&
            "badge-light-success"
          }
          ${permit?.permissionStatus == PermissionStatus?.InProgress && "badge-light-primary"}
          ${permit?.permissionStatus == PermissionStatus?.Finshed && "badge-secondary"}
          ${permit?.permissionStatus == PermissionStatus?.Canceled && "badge-light-danger"}
          ${permit?.permissionStatus == PermissionStatus?.Rejected && "badge-light-danger"}
          ${permit?.permissionStatus == PermissionStatus?.Pending && "badge-light-warning"}
            `}
        >
          {permit?.permissionStatus == PermissionStatus?.Pending ? (
            <>{intl.formatMessage({ id: "UnderRevision" })}</>
          ) : permit?.permissionStatus == PermissionStatus?.InProgress ? (
            <>{intl.formatMessage({ id: "Continued" })}</>
          ) : permit?.permissionStatus == PermissionStatus?.Approved ? (
            <>{intl.formatMessage({ id: "Acceptable" })}</>
          ) : permit?.permissionStatus == PermissionStatus?.Canceled ? (
            <>{intl.formatMessage({ id: "Canceledd" })}</>
          ) : permit?.permissionStatus == PermissionStatus?.Finshed ? (
            <>{intl.formatMessage({ id: "Finished" })}</>
          ) : (
            <>{intl.formatMessage({ id: "Rejected" })}</>
          )}
        </div>
      </td>
      <td className="text-center">
        <SinglePermitActions
          id={permit?.visitorId}
          {...{ pageIndexForMember, pageSizeForMember }}
          permit={permit}
        />
      </td>
    </>
  );
};

export default PermitPersonRow;
