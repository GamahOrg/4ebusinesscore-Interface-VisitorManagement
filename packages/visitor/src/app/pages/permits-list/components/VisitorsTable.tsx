import { FC } from "react";
import { useIntl } from "react-intl";
import { ActionsVisitors } from "./ActionsVisitors";
import { VisitorModel } from "../../../model/group-permission-details-model";
interface VisitorTableProps {
  visitor: VisitorModel;
  setPermitData: any;
}
const VisitorsTable: FC<VisitorTableProps> = ({ visitor, setPermitData }) => {
  const intl = useIntl();
  const handlePermissionStatus = (status: number) => {
    switch (status) {
      case 0:
        return { className: "badge-light-warning", value: "Pending" };
      case 1:
        return { className: "badge-light-primary", value: "Approved" };
      case 2:
        return { className: "badge-light-success", value: "Active" };
      case 3:
        return { className: "badge-light-danger", value: "Rejected" };
      case 4:
        return { className: "badge-secondary", value: "Expired" };
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
          {intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {visitor?.orgName}
        </div>
      </td>
      <td className="text-center">
        <div
          className={`badge ${visitor?.permissionSource === 0
              ? "badge-light-success"
              : visitor?.permissionSource === 1
                ? "badge-light-primary"
                : "badge-light-danger"
            } fw-bolder d-block mb-1 fs-6`}
        >
          {visitor?.permissionSource
            ? intl.formatMessage({ id: "External" })
            : intl.formatMessage({ id: "Internal" })}
        </div>
      </td>
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
      <td className="text-center">
        <ActionsVisitors id={visitor?.vistorId} />
      </td>
    </>
  );
};

export default VisitorsTable;
