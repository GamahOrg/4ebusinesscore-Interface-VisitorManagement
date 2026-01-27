import {
  GroupModel,
  PermissionListModel,
} from "../../../model/permission-list-model";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import {
  PermissionSource,
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";

const PermitsFollowListTableRowGeneratorForMembersInGroup = ({
  permit,
  group,
  pageSizeForGroups,
  pageIndexForGroups,
}: {
  permit: PermissionListModel;
  group: GroupModel;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
}) => {
  const intl = useIntl();
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
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
          {permit?.permissionNumber}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.vistorName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {/* {permit?.} */} (1)
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
          className={`badge ${
            permit?.permissionSource === PermissionSource?.Internal
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
          {permit?.recivedVisiting || intl.formatMessage({ id: "NotFound" })}
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
        <Link
          to={`/permits-follow/permits-follow-logs/${permit?.permissionNumber}/${permit?.visitorId || permit?.vistorId}?type=member`}
          className="px-3 text-primary"
          state={{ permit, cardName, serviceName }}
        >
          <span className="svg-icon svg-icon-3 mx-2">
            <i className="fa-solid fa-eye"></i>
          </span>
          {intl.formatMessage({ id: "Show" })}
        </Link>
      </td>
    </>
  );
};

export default PermitsFollowListTableRowGeneratorForMembersInGroup;
