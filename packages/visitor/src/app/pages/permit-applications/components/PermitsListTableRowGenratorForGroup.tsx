import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { ActionsGroup } from "./ActionsGroup";
import { handlePermissionStatus } from "../utils/permitApplicationUtil";
import { BuildingStatus } from "@4eplatform/shared/enums/enums";

const PermitsListTableRowGenratorForGroup: FC<any> = ({
  permit,
  tabName,
  expandedGroups,
  handleToggle,
  pageIndexGroup,
  pageSizeGroup,
}: {
  permit: any;
  expandedGroups: any;
  handleToggle?: any;
  tabName?: string;
  pageIndexGroup?: number;
  pageSizeGroup?: number;
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
          <Link
            to={`/permissions-Permits/view-group/visitor-workspace/${permit?.groupId}`}
            className="d-flex justify-content-start flex-column"
          >
            <div className="text-primary-original fw-bolder text-hover-primary mb-1 fs-6">
              {permit?.groupcode}#
            </div>
          </Link>
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <Link
          to={`/permissions-Permits/view-group/visitor-workspace/${permit?.groupId}`}
        >
          <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.groupName || "--"}
          </div>
        </Link>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {" "}
          {tabName == "PermitApplications" &&
            `(${permit?.permissionDto[0]?.visitorDto?.length || 0})`}{" "}
          {tabName == "AdditionPermits" &&
            `(${permit?.permissionDto[0]?.visitorDto?.length || 0})`}{" "}
          {tabName == "PermitAmendment" &&
            `(${permit?.editedlGroupInfoDto?.length || 0})`}{" "}
          {tabName == "PermitCancellation" &&
            `(${permit?.cancelGroupInfoDtos?.length || 0})`}{" "}
          {tabName == "PermitRenewal" &&
            `(${permit?.permissionDto[0]?.visitorDto?.length || 0})`}
        </div>
      </td>
      {tabName == "PermitCancellation" && (
        <td className="text-center">
          <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
        </td>
      )}
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 text-dark`}>
          {/* {intl.formatMessage({
            id: handlePermissionType(tabName === "PermitAmendment"
              ? permit?.editedlGroupInfoDto[0]?.permissionType
              : tabName === "PermitCancellation"
                ? permit?.cancelGroupInfoDtos[0]?.permissionType
                : permit?.permissionDto[0]?.permissionType)?.value
          })} */}
          {permit?.editedlGroupInfoDto &&
            (intl.locale == "ar"
              ? permit?.permissionTypeAr
                ? permit?.permissionTypeAr
                : intl.formatMessage({ id: "NotFound" })
              : permit?.permissionTypeEn
              ? permit?.permissionTypeEn
              : intl.formatMessage({ id: "NotFound" }))}
          {permit?.permissionDto &&
            (intl.locale == "ar"
              ? permit?.permissionDto[0]?.permissionTypeAr
                ? permit?.permissionDto[0]?.permissionTypeAr
                : intl.formatMessage({ id: "NotFound" })
              : permit?.permissionDto[0]?.permissionTypeEn
              ? permit?.permissionDto[0]?.permissionTypeEn
              : intl.formatMessage({ id: "NotFound" }))}
          {permit?.cancelGroupInfoDtos &&
            (intl.locale == "ar"
              ? permit?.cancelGroupInfoDtos[0]?.permissionTypeAr
                ? permit?.cancelGroupInfoDtos[0]?.permissionTypeAr
                : intl.formatMessage({ id: "NotFound" })
              : permit?.cancelGroupInfoDtos[0]?.permissionTypeEn
              ? permit?.cancelGroupInfoDtos[0]?.permissionTypeEn
              : intl.formatMessage({ id: "NotFound" }))}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {tabName === "PermitApplications" &&
          permit?.permissionDto?.[0]?.orgName
            ? permit.permissionDto[0].orgName
            : tabName === "AdditionPermits" &&
              permit?.permissionDto?.[0]?.orgName
            ? permit.permissionDto[0].orgName
            : tabName === "PermitRenewal" &&
              "permit?.permissionDto?.[0]?.orgName"
            ? permit.permissionDto[0].orgName
            : tabName === "PermitAmendment" && permit?.orgName
            ? permit.orgName
            : tabName === "PermitCancellation" && permit?.orgName
            ? permit.orgName
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.buildingType
            ? permit?.buildingType === BuildingStatus.Main
              ? intl.formatMessage({ id: "Major" })
              : intl.formatMessage({ id: "Sub" })
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 text-dark`}>
          {permit?.permissionDto &&
            (permit?.permissionDto[0]?.isParking
              ? intl.formatMessage({ id: "Found" })
              : intl.formatMessage({ id: "NotFound" }))}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {tabName === "PermitApplications" &&
          permit?.permissionDto?.[0]?.recivedName
            ? permit.permissionDto[0].recivedName
            : tabName === "AdditionPermits" &&
              permit?.permissionDto?.[0]?.recivedName
            ? permit.permissionDto[0].recivedName
            : tabName === "PermitRenewal" &&
              permit?.permissionDto?.[0]?.recivedName
            ? permit.permissionDto[0].recivedName
            : tabName === "PermitAmendment" && permit?.recivedName
            ? permit.recivedName
            : tabName === "PermitCancellation" && permit?.recivedName
            ? permit.recivedName
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge fw-bolder d-block mb-1 fs-6 ${
            handlePermissionStatus(
              tabName === "PermitAmendment"
                ? permit?.editedlGroupInfoDto[0]?.permissionStatus
                : tabName === "PermitCancellation"
                ? permit?.cancelGroupInfoDtos[0]?.permissionStatus
                : permit?.permissionDto[0]?.visitorDto[0]?.permissionStatus
            )?.className
          }`}
        >
          {intl.formatMessage({
            id: handlePermissionStatus(
              tabName === "PermitAmendment"
                ? permit?.editedlGroupInfoDto[0]?.permissionStatus
                : tabName === "PermitCancellation"
                ? permit?.cancelGroupInfoDtos[0]?.permissionStatus
                : permit?.permissionDto[0]?.visitorDto[0]?.permissionStatus
            )?.value,
          })}
        </div>
      </td>

      {tabName == "PermitApplications" && (
        <td className="text-center">
          <ActionsGroup
            id={permit?.groupId}
            permit={permit}
            tabName={tabName}
            pageSizeGroup={pageSizeGroup}
            pageIndexGroup={pageIndexGroup}
          />
        </td>
      )}
      {tabName == "PermitRenewal" && (
        <td className="text-center">
          <ActionsGroup
            id={permit?.groupId}
            permit={permit}
            tabName={tabName}
            pageSizeGroup={pageSizeGroup}
            pageIndexGroup={pageIndexGroup}
          />
        </td>
      )}

      {tabName === "AdditionPermits" && (
        <td className="text-center">
          <ActionsGroup
            id={permit?.groupId}
            permit={permit}
            tabName={tabName}
            pageSizeGroup={pageSizeGroup}
            pageIndexGroup={pageIndexGroup}
          />
        </td>
      )}

      {tabName === "PermitCancellation" && (
        <td className="text-center">
          <ActionsGroup
            id={permit?.groupId}
            permit={permit}
            tabName={tabName}
            pageSizeGroup={pageSizeGroup}
            pageIndexGroup={pageIndexGroup}
          />
        </td>
      )}
    </>
  );
};

export default PermitsListTableRowGenratorForGroup;
