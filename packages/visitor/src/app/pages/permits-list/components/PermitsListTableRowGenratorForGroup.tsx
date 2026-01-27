import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { GroupModel } from "../../../model/permission-list-model";
import { NewActionsGroup } from "./NewActionsGroup";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import {
  fetchGroupsWithVisitors,
  putFavouriteForGroup,
} from "../../../redux/permissions-list-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { handlePermissionSource, handlePermissionStatus, handlePermissionType } from "../../permit-applications/utils/permitApplicationUtil";

const PermitsListTableRowGenratorForGroup: FC<any> = ({
  permit,
  expandedGroups,
  handleToggle,
  pageSizeForGroups,
  pageIndexForGroups,
}: {
  permit: GroupModel;
  expandedGroups: any;
  handleToggle?: any;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let isFavourite = permit?.permissionListDto
    ?.map((item) => {
      return item?.isFouvirte;
    })
    ?.every((ele) => {
      return ele == true;
    });
  let handleFavourite = async () => {
    try {
      await dispatch(
        putFavouriteForGroup({
          id: permit?.id,
          params: { isFouvrite: !isFavourite ? "true" : "false" },
        }) as any
      ).then((res: any) => {
        if (res?.payload?.statusEnum == 3) {
          showSuccessAlert(
            true,
            !isFavourite
              ? "AddedSuccessfullyToFavourite"
              : "RemovedSuccessfullyFromFavourite",
            intl,
            () => {
              let params = {
                pagesize: pageSizeForGroups,
                pageIndex: pageIndexForGroups,
              };
              dispatch(fetchGroupsWithVisitors(params) as any);
            }
          );
        } else if (res?.payload?.message) {
          showSuccessAlert(false, res?.payload?.message, intl, () => { });
        }
      });
    } catch (error) { }
  };

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
          <Link state={{ cardName, serviceName }}
            to={`/permits-list/view-group/visitor-workspace/${permit?.id}`} className="d-flex justify-content-start flex-column">
            <div className="text-primary fw-bolder text-hover-primary mb-1 fs-6">
              {permit?.groupNamber}#
            </div>
          </Link>
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{"--"}</div>
      </td>
      <td className="text-center">
        <Link state={{ cardName, serviceName }}
          to={`/permits-list/view-group/visitor-workspace/${permit?.id}`} className="d-flex justify-content-start flex-column">
          <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.groupName}
          </div>
        </Link>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          ({permit?.permissionListDto?.length})
        </div>

      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionType(permit?.permissionListDto[0]?.permissionType)?.className}`}>
          {intl.locale == "ar" ? permit?.permissionTypeAr ? permit?.permissionTypeAr : intl.formatMessage({ id: "NotFound" }) : permit?.permissionTypeEn ? permit?.permissionTypeEn : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.permissionListDto[0]?.orgName || intl.formatMessage({ id: "NotFound" })}</div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 text-dark`}>
          {permit?.permissionListDto[0]?.isParking ? intl.formatMessage({ id: "Found" }) : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.permissionListDto[0]?.recivedVisiting || intl.formatMessage({ id: "NotFound" })}</div>
      </td>
      <td className="text-center">
        {"--"}
      </td>
      {/* <td className="text-center">
        <div
          onClick={() => {
            handleFavourite();
          }}
          className={`btn hover-text-warning fw-bolder mx-1 text-center mw-100 text-hover-warning`}
        >
          <i
            className={isFavourite ? "fas fa-star" : "far fa-star"}
            style={{
              color: isFavourite ? "yellow" : "",
              fontSize: "20",
            }}
          ></i>
        </div>
      </td> */}
      {/* <td className="text-center">
        <NewActionsGroup
          id={permit?.id}
          permit={permit}
          {...{
            pageSizeForGroups,
            pageIndexForGroups,
          }}
        />
      </td> */}
      <td className="text-center">
        <Link
          state={{ cardName, serviceName }}
          to={`/permits-list/view-group/visitor-workspace/${permit?.id}`}
        >
          <div className="menu-link px-3 text-muted text-hover-gblue">
            <span className="svg-icon svg-icon-3 mx-2">
              <i className="fa-solid fa-eye"></i>
            </span>{" "}
            {intl.formatMessage({ id: "Show" })}
          </div>

        </Link>
      </td>
    </>
  );
};

export default PermitsListTableRowGenratorForGroup;
