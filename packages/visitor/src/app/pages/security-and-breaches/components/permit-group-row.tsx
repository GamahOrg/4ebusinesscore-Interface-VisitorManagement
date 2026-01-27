import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { ViolationGroupModel } from "../../../model/violation-group-model";
import { PermissionSource, PermissionType } from "../../../model/permit-enums";
import { GroupPermitActions } from "./groupPermitActions";
import { handlePermissionSource } from "../../permit-applications/utils/permitApplicationUtil";
const PermitGroupRow: FC<any> = ({
  permit,
  expandedGroups,
  handleToggle,
  pageSizeForGroups,
  pageIndexForGroups,
}: {
  permit: ViolationGroupModel;
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
              {permit?.groupcode}
            </div>
          </Link>
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.groupName}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>

      {/* نوع التصريح */}
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
        {permit?.permissionType == PermissionType?.WorkingPermission
            ? intl.formatMessage({ id: "PermitWork" })
            : permit?.permissionType == PermissionType?.PersonalPermission
              ? intl.formatMessage({ id: "PersonalVisit" })
              : ""}
        </div>
      </td>
      {/* جهة التصريح */}
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
        {permit?.orgName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      {/* مصدر التصريح */}
      <td className="text-center">
        <div
          className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionSource)?.className}`}
        >
        {intl.formatMessage({ id: handlePermissionSource(permit?.permissionSource)?.value })}
        </div>
      </td>
      {/* مستقبل الزيارة */}
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
        {permit?.recivedName || intl.formatMessage({id:"NotFound"})}
        </div>
      </td>
      <td className="text-center">
              <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <GroupPermitActions
          id={permit?.groupId}
          {...{ pageIndexForGroups, pageSizeForGroups }}
        />
      </td>
    </>
  );
};

export default PermitGroupRow;
