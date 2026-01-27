import { useIntl } from "react-intl";
import { ActionsVisitors } from "./ActionsVisitors";
import { FC } from "react";
import { VisitorModel } from "../../../model/group-permission-details-model";
import { PermissionType } from "../../../model/permit-enums";
interface VisitorTableProps {
  visitor: VisitorModel;
  pageIndex?: number;
  pageSize?: number;
}

const VisitorsTableInGroup: FC<VisitorTableProps> = ({
  visitor,
  pageIndex,
  pageSize,
}) => {
  const intl = useIntl();
  const handlePermissionStatus = (status: number) => {
    switch (status) {
      case 0:
        return { className: "badge-light-warning", value: "Pendingg" };
      case 1:
        return { className: "badge-light-primary", value: "Continue" };
      case 2:
        return { className: "badge-light-success", value: "Approvedd" };
      case 3:
        return { className: "badge-light-danger", value: "Canceledd" };
      case 4:
        return { className: "badge-secondary", value: "Finished" };
      case 5:
        return { className: "badge-light-danger", value: "Rejectedd" };
      default:
        return { className: "", value: "Unknown" };
    }
  };

  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.permissionNumber}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.vistorName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {/* {visitor?.permissionType == PermissionType?.WorkingPermission
            ? intl.formatMessage({ id: "PermitWork" })
            : visitor?.permissionType == PermissionType?.PersonalPermission
              ? intl.formatMessage({ id: "PersonalVisit" })
              : ""} */}
          {intl.locale == "ar" ? visitor?.permissionTypeAr ? visitor?.permissionTypeAr : intl.formatMessage({ id: "NotFound" }) : visitor?.permissionTypeEn ? visitor?.permissionTypeEn : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.orgName}
        </div>
      </td>
      {/* <td className="text-center">
        <div
          className={`text-dark fw-bolder d-block mb-1 fs-6`}
        >
          {visitor?.isParking ? intl.formatMessage({ id: "Found" }) : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td> */}
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.recivedVisiting || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge ${handlePermissionStatus(visitor?.permissionStatus)?.className}`}
        >
          {intl.formatMessage({
            id: handlePermissionStatus(visitor?.permissionStatus)?.value,
          })}
        </div>
      </td>
      {/* <td className="text-center">
        <ActionsVisitors
          id={visitor?.vistorId}
          visitor={visitor}
          {...{
            pageIndex,
            pageSize,
          }}
        />
      </td> */}
    </>
  );
};

export default VisitorsTableInGroup;
