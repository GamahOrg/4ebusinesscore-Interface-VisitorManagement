import {
  GroupModel,
  PermissionListModel,
} from "../../../model/permission-list-model";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  fetchGroupsWithVisitors,
  putFavouriteForVisitor,
} from "../../../redux/permissions-list-slice";
import { ActionsForMemberFromGroupsTable } from "./ActionsForMemberFromGroupsTable";
import {
  handlePermissionStatus,
  handlePermissionType,
} from "../../permit-applications/utils/permitApplicationUtil";
const PermitsListTableRowGenratorForMemberInGroup = ({
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
  let dispatch = useDispatch();
  let handleFavourite = async () => {
    let formData = new FormData();
    formData.append("IsFouvrite", !permit?.isFouvirte ? "true" : "false");
    formData.append("Visitor_id", permit?.vistorId);
    try {
      await dispatch(putFavouriteForVisitor(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 3) {
            showSuccessAlert(
              true,
              !permit?.isFouvirte
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
            showSuccessAlert(false, res?.payload?.message, intl, () => {});
          }
        }
      );
    } catch (error) {}
  };

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
          {group?.groupNamber}#
        </div>
      </td>
      <td className="text-center">
        <Link
          state={{ cardName, serviceName }}
          to={`/my-permits/view-permit/visitor-workspace/${
            permit?.permissionID
          }/${permit?.visitorId || permit?.vistorId}`}
        >
          <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.permissionNumber}#
          </div>
        </Link>
      </td>
      <td className="text-center">
        <Link
          state={{ cardName, serviceName }}
          to={`/my-permits/view-permit/visitor-workspace/${
            permit?.permissionID
          }/${permit?.visitorId || permit?.vistorId}`}
        >
          <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.vistorName || intl.formatMessage({ id: "NotFound" })}
          </div>
        </Link>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">--</div>
      </td>
      <td className="text-center">
        <div
          className={`badge fw-bolder d-block mb-1 fs-6 ${
            handlePermissionType(permit?.permissionType)?.className
          }`}
        >
          {intl.locale == "ar"
            ? permit?.permissionTypeAr
              ? permit?.permissionTypeAr
              : intl.formatMessage({ id: "NotFound" })
            : permit?.permissionTypeEn
            ? permit?.permissionTypeEn
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {intl.locale === "ar"
            ? permit?.orgName
              ? permit?.orgName
              : intl.formatMessage({ id: "NotFound" })
            : permit?.orgNameEn
            ? permit?.orgNameEn
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">-- </div>
      </td>

      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 text-dark`}>
          {permit?.isParking
            ? intl.formatMessage({ id: "Found" })
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.recivedVisiting || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge fw-bolder d-block mb-1 fs-6 ${
            handlePermissionStatus(permit?.permissionStatus)?.className
          }`}
        >
          {intl.formatMessage({
            id: handlePermissionStatus(permit?.permissionStatus)?.value,
          })}
        </div>
      </td>
      {/* <td className="text-center">
        <div
          onClick={() => {
            handleFavourite();
          }}
          className={`btn hover-text-warning fw-bolder mx-1 text-center mw-100 text-hover-warning`}
        >
          <i
            className={permit?.isFouvirte ? "fas fa-star" : "far fa-star"}
            style={{
              color: permit?.isFouvirte ? "yellow" : "",
              fontSize: "20",
            }}
          ></i>
        </div>
      </td> */}
      <td className="text-center">
        <ActionsForMemberFromGroupsTable
          id={permit?.permissionID}
          permit={permit}
          pageIndexForGroups={pageIndexForGroups}
          pageSizeForGroups={pageSizeForGroups}
          group={group}
        />
      </td>
    </>
  );
};

export default PermitsListTableRowGenratorForMemberInGroup;
