import { useIntl } from "react-intl";
import { FC } from "react";
import { useDispatch } from "react-redux";
import {
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";
import { ViolationGroupModel } from "../../../model/violation-group-model";
import { ViolationModel } from "../../../model/violation-model";
import { PermitActionsFromGroup } from "./PermitActionsFromGroup";
import { handlePermissionSource} from "../../permit-applications/utils/permitApplicationUtil";


const PermitsListTableRowGenratorForMemberInGroup: FC<any> = ({
  permit,
  group,
  pageSizeForGroup,
  pageIndexForGroup,
}: {
  permit: ViolationModel;
  group: ViolationGroupModel;
  pageSizeForGroup: number;
  pageIndexForGroup: number;
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"></div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"></div>
      </td>

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
              : ""}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.orgName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionSource)?.className} `}
        >
                   {intl.formatMessage({ id: handlePermissionSource(permit?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.recivedName || intl.formatMessage({id:"NotFound"})}
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
        <PermitActionsFromGroup
          id={permit?.visitorId}
          {...{ pageIndexForGroup, pageSizeForGroup }}
          permit={permit}
        />
      </td>


    </>
  );
};

export default PermitsListTableRowGenratorForMemberInGroup;
