import { useIntl } from "react-intl";
import { FC, useState } from "react";
import {
  handleCancelReason,
  handlePermissionStatus,
  handlePermissionType,
} from "../utils/permitApplicationUtil";
import { ActionsPermitAmendment } from "./Actions-permit-amendment";
import { ViolationPopup } from "../popup/ViolationPopup";
import { BuildingStatus } from "@4eplatform/shared/enums/enums";

const PermitsListTableRowGenratorForMemberInGroup: FC<any> = ({
  permit,
  group,
  tabName,
  pageIndexGroup,
  pageSizeGroup,
}: {
  permit: any;
  group: any;
  tabName?: string;
  pageIndexGroup?: number;
  pageSizeGroup?: number;
}) => {
  const intl = useIntl();
  const [showVoilation, setShowVoilation] = useState(false);

  return (
    <>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"></div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6"></div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionCode}#
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.visitorName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">--</div>
      </td>
      {tabName == "PermitCancellation" && (
        <td className="text-center ">
          <div
            className={`badge fw-bolder d-block mb-1 fs-6 text-decoration-underline cursor-pointer ${
              handleCancelReason(permit?.cancelReason)?.className
            }`}
            onClick={() => {
              setShowVoilation(true);
            }}
          >
            {intl.formatMessage({
              id: handleCancelReason(permit?.cancelReason)?.value,
            })}
          </div>
        </td>
      )}
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
          {permit?.orgName || intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 text-dark`}>--</div>
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
          {permit?.recivedName || intl.formatMessage({ id: "NotFound" })}
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
      {tabName === "PermitAmendment" && (
        <td className="text-center">
          <ActionsPermitAmendment
            type="Group"
            permit={permit}
            tabName={tabName}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}
          />
        </td>
      )}
      {showVoilation && (
        <div className="modal fade" aria-hidden="true">
          <ViolationPopup
            show={showVoilation}
            handleClose={() => setShowVoilation(false)}
            permit={permit}
          />
        </div>
      )}
    </>
  );
};

export default PermitsListTableRowGenratorForMemberInGroup;
