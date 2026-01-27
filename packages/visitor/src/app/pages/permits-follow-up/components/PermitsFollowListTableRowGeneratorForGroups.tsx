import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { GroupModel } from "../../../model/permission-list-model";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";

const PermitsFollowListTableRowGeneratorForGroups: FC<any> = ({
  permit,
  expandedGroups,
  handleToggle,
}: {
  permit: GroupModel;
  expandedGroups: any;
  handleToggle?: any;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
}) => {
  const intl = useIntl();
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  return (
    <>
      <td>
        <div onClick={() => handleToggle(permit?.id)} role="button">
          {expandedGroups?.includes(permit?.id) ? (
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
              {permit?.groupNamber}
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
        <div className="text-dark fw-bolder d-block mb-1 fs-6">({permit?.permissionListDto?.length})</div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <div>{"--"}</div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <div>{"--"}</div>
      </td>
      <td className="text-center">
        <Link
          to={`/permits-follow/permits-follow-logs/${permit?.groupNamber}/${permit?.id}?type=group`}
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

export default PermitsFollowListTableRowGeneratorForGroups;
