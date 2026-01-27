import {
  GroupModel,
} from "../../../model/permission-list-model";
import { useIntl } from "react-intl";
import { FC } from "react";
import { useDispatch } from "react-redux";
import {
  PermissionSource,
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";

const PermitsListTableRowGenratorForMemberInGroup: FC<any> = ({
  permit,
  group,

}: {
  permit: any;
  group: GroupModel;
  pageSizeForGroup: number;
  pageIndexForGroup: number
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();

  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"></div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {group?.groupNamber}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionCode}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.visitorName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          (1)
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionType == PermissionType?.WorkingPermission
            ? intl.formatMessage({ id: "PermitWork" })
            : intl.formatMessage({ id: "PersonalVisit" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.orgName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge ${permit?.permissionSource === PermissionSource?.Internal
              ? "badge-light-success"
              : permit?.permissionSource === PermissionSource?.External
                ? "badge-light-primary"
                : "badge-light-danger"
            } fw-bolder d-block mb-1 fs-6`}
        >
          {permit?.permissionSource === PermissionSource?.Internal
            ? intl.formatMessage({ id: "Internall" })
            : intl.formatMessage({ id: "Externall" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.recivedName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge ${permit?.permissionStatus == PermissionStatus?.Approved &&
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
        <div
          className={`btn hover-text-warning fw-bolder mx-1 text-center mw-100 text-hover-warning`}
        >
        </div>
      </td>
      <td className="text-center">
      </td>
    </>
  );
};

export default PermitsListTableRowGenratorForMemberInGroup;
