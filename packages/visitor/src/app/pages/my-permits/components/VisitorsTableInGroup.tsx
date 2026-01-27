import { useIntl } from "react-intl";
import { FC } from "react";
import { VisitorModel } from "../../../model/group-permission-details-model";
import { handlePermissionStatus } from "../../permit-applications/utils/permitApplicationUtil";

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
          {intl.locale == "ar"
            ? visitor?.permissionTypeAr
              ? visitor?.permissionTypeAr
              : intl.formatMessage({ id: "NotFound" })
            : visitor?.permissionTypeEn
            ? visitor?.permissionTypeEn
            : intl.formatMessage({ id: "NotFound" })}
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
          className={`badge ${
            handlePermissionStatus(visitor?.permissionStatus)?.className
          }`}
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
