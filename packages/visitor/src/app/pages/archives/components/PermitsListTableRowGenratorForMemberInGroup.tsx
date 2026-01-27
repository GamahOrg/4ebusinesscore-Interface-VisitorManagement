import { useIntl } from "react-intl";
import { FC } from "react";
import {
  PermissionSource,
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";
import { ActionsForMemberFromGroupsTable } from "./ActionsForMemberFromGroupsTable";
import {
  ModifiedVisitorDtoModel,
  VisitorsPermissionGroupModel,
} from "../../../model/visitior-permission-group-model";
import { handlePermissionSource, handlePermissionStatus, handlePermissionType } from "../../permit-applications/utils/permitApplicationUtil";
const PermitsListTableRowGenratorForMemberInGroup= ({
  group,
  visitor,
  pageSizeForGroups,
  pageIndexForGroups,
}: {
  visitor?: ModifiedVisitorDtoModel;
  group: VisitorsPermissionGroupModel;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
}) => {
  const intl = useIntl();
  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"></div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {group?.groupcode}#
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.permissionCode}#
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.visitorName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {/* {permit?.} */} (1)
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionType(visitor?.permissionType)?.className}`}>
          {intl.formatMessage({ id: handlePermissionType(visitor?.permissionType)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.orgName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(visitor?.permissionSource)?.className}`}>
          {intl.formatMessage({ id: handlePermissionSource(visitor?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.recivedName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionStatus(visitor?.permissionStatus)?.className}`}>
          {intl.formatMessage({ id: handlePermissionStatus(visitor?.permissionStatus)?.value })}
        </div>
      </td>
      <td className="text-center">
        <ActionsForMemberFromGroupsTable
          id={visitor?.visitorId as string}
          visitor={visitor as ModifiedVisitorDtoModel}
          pageIndexForGroups={pageIndexForGroups}
          pageSizeForGroups={pageSizeForGroups}
        />
      </td>
    </>
  );
};

export default PermitsListTableRowGenratorForMemberInGroup;
