import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { NewActionsGroup } from "./NewActionsGroup";
import { useIntl } from "react-intl";
import { VisitorsPermissionGroupModel } from "../../../model/visitior-permission-group-model";
import { handlePermissionSource, handlePermissionStatus, handlePermissionType } from "../../permit-applications/utils/permitApplicationUtil";
const PermitsListTableRowGenratorForGroup: FC<any> = ({
  permit,
  expandedGroups,
  handleToggle,
  pageSizeForGroups,
  pageIndexForGroups,
}: {
  permit: VisitorsPermissionGroupModel;
  expandedGroups: any;
  handleToggle?: any;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
}) => {
  const intl = useIntl();
  return (
    <>
      <td>
        <div onClick={() => handleToggle(permit?.groupId)} role="button">
          {expandedGroups?.includes(permit?.groupId) ? (
            <IoIosArrowDown size={22} className="text-muted" />
          ) : getCurrentSystemLanguage() === "ar" ? (
            <IoIosArrowBack size={22} className="text-muted" />
          ) : (
            <IoIosArrowBack
              size={22}
              className="text-muted"
              style={{ transform: "scaleX(-1)" }}
            />
          )}
        </div>
      </td>

      <td>
        <div className="d-flex align-items-center justify-content-center">
          <Link to={""} className="d-flex justify-content-start flex-column">
            <div className="text-primary fw-bolder text-hover-primary mb-1 fs-6">
              {permit?.groupcode}#
            </div>
          </Link>
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.groupName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          ({permit?.permissionDto[0]?.visitorDto?.length})
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionType(permit?.permissionDto[0]?.permissionType)?.className}`}>
          {intl.formatMessage({ id: handlePermissionType(permit?.permissionDto[0]?.permissionType)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.permissionDto[0]?.orgName}</div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionDto[0]?.permissionSource)?.className}`}>
          {intl.formatMessage({ id: handlePermissionSource(permit?.permissionDto[0]?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.permissionDto[0]?.recivedVisiting || intl.formatMessage({ id: "NotFound" })}</div>
      </td>
      {/* <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionStatus(permit?.permissionDto[0]?.visitorDto[0]?.permissionStatus)?.className}`}>
          {intl.formatMessage({ id: handlePermissionStatus(permit?.permissionDto[0]?.visitorDto[0]?.permissionStatus)?.value })}
        </div>
      </td > */}
      <td className="text-center">
        {"--"}
      </td >
      <td className="text-center">
        <NewActionsGroup
          id={permit?.groupId}
          permit={permit}
          {...{
            pageSizeForGroups,
            pageIndexForGroups,
          }}
        />
      </td>
    </>
  );
};

export default PermitsListTableRowGenratorForGroup;
