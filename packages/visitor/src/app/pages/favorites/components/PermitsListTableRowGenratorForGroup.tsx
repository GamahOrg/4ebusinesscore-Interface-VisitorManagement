import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { VisitorsPermissionGroupModel } from "../../../model/visitior-permission-group-model";
import { PermissionSource, PermissionType } from "../../../model/permit-enums";
import { NewActionsGroup } from "./NewActionsGroup";

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
  let dispatch = useDispatch();


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


      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.groupcode}#
        </div>
      </td>

      <td>
        {permit?.permissionDto.map((permission, index) => {
          return (
            <div key={index} className="d-flex align-items-center justify-content-center">
              <Link to={""} className="d-flex justify-content-start flex-column">
                <div className="fw-bolder mb-1 fs-6">
                  --
                </div>
              </Link>
            </div>
          );
        })}
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"> {permit?.groupName || intl.formatMessage({id:"NotFound"})}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          ({permit?.permissionDto[0]?.visitorDto?.length})
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionDto[0].permissionType == PermissionType?.WorkingPermission
            ? intl.formatMessage({ id: "PermitWork" })
            : intl.formatMessage({ id: "PersonalVisit" })}
        </div>
      </td>
      <td>
        {permit?.permissionDto.map((permission, index) => {
          return (
            <div key={index} className="d-flex align-items-center justify-content-center">
              <Link to={""} className="d-flex justify-content-start flex-column">
                <div className="text-primary fw-bolder text-hover-primary mb-1 fs-6">
                  {permission?.orgName}
                </div>
              </Link>
            </div>
          );
        })}
      </td>
      <td className="text-center">
        <div
          className={`badge ${permit?.permissionDto[0].permissionSource === PermissionSource?.Internal
            ? "badge-light-success"
            : permit?.permissionDto[0].permissionSource === PermissionSource?.External
              ? "badge-light-primary"
              : "badge-light-danger"
            } fw-bolder d-block mb-1 fs-6`}
        >
          {permit?.permissionDto[0].permissionSource === PermissionSource?.Internal
            ? intl.formatMessage({ id: "Internall" })
            : intl.formatMessage({ id: "Externall" })}
        </div>
      </td>
      <td>
        {permit?.permissionDto.map((permission, index) => {
          return (
            <div key={index} className="d-flex align-items-center justify-content-center">
              <Link to={""} className="d-flex justify-content-start flex-column">
                <div className="text-primary fw-bolder text-hover-primary mb-1 fs-6">
                  {permission?.recivedName || intl.formatMessage({id:"NotFound"})}
                </div>
              </Link>
            </div>
          );
        })}
      </td>

      <td className="text-center">
      {"--"}
      </td>
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
