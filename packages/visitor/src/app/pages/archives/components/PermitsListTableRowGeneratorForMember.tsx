import { useIntl } from "react-intl";
import { ActionsForMember } from "./ActionsForMember";
import { FC } from "react";
import {
  PermissionSource,
  PermissionStatus,
  PermissionType,
} from "../../../model/permit-enums";
import { VisitorPermissionModel } from "../../../model/visitor-permission-model";
import { handlePermissionSource, handlePermissionStatus, handlePermissionType } from "../../permit-applications/utils/permitApplicationUtil";
const PermitsListTableRowGenratorForMember: FC<any> = ({
  permit,
  pageSizeForMember,
  pageIndexForMember,
}: {
  permit: VisitorPermissionModel;
  pageSizeForMember: number;
  pageIndexForMember: number;
}) => {
  const intl = useIntl();
  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionCode}#
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.visitorName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionType(permit?.permissionType)?.className}`}>
          {intl.formatMessage({ id: handlePermissionType(permit?.permissionType)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.orgName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionSource)?.className}`}>
          {intl.formatMessage({ id: handlePermissionSource(permit?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.recivedName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionStatus(permit?.permissionStatus)?.className}`}>
          {intl.formatMessage({ id: handlePermissionStatus(permit?.permissionStatus)?.value })}
        </div>
      </td>
      <td className="text-center">
        <ActionsForMember
          id={permit?.permissionID as string}
          permit={permit}
          {...{ pageIndexForMember, pageSizeForMember }}
        />
      </td>
    </>
  );
};

export default PermitsListTableRowGenratorForMember;
