import { useIntl } from "react-intl";
import { FC, useState } from "react";
import { Actions } from "./Actions";
import { ActionsPermitAmendment } from "./Actions-permit-amendment";
import { ViolationPopup } from "../popup/ViolationPopup";
import { ReasonPopup } from "../popup/ReasonPopup";
import {
  handleCancelReason,
  handlePermissionStatus,
  handlePermissionType,
} from "../utils/permitApplicationUtil";
import { Link } from "react-router-dom";
import { BuildingStatus } from "@4eplatform/shared/enums/enums";

const PermitsListTableRowGenratorForMember: FC<any> = ({
  permit,
  tabName,
  pageIndexMember,
  pageSizeMember,
}: {
  permit: any;
  tabName: any;
  type: any;
  pageIndexMember?: number;
  pageSizeMember?: number;
}) => {
  const intl = useIntl();
  const [showVoilation, setShowVoilation] = useState(false);
  const [showReason, setShowReason] = useState(false);

  return (
    <>
      <td className="text-center">
        <Link
          to={
            tabName === "PermitApplications"
              ? `/permissions-Permits/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName === "PermitCancellation"
              ? `/permits-cancellation/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName === "PermitRenewal"
              ? `/permits-renewal/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName == "PermitAmendment"
              ? `/permits-Amendmention/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName == "AdditionPermits"
              ? `/permits-amendments-applications/view-permit/visitor-workspace/${permit?.visitorId}`
              : "#"
          }
        >
          {" "}
          <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.permissionCode}#
          </div>
        </Link>
      </td>
      <td className="text-center">
        <Link
          to={
            tabName === "PermitApplications"
              ? `/permissions-Permits/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName === "PermitCancellation"
              ? `/permits-cancellation/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName === "PermitRenewal"
              ? `/permits-renewal/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName == "PermitAmendment"
              ? `/permits-amendments-applications/view-permit/visitor-workspace/${permit?.visitorId}`
              : tabName == "AdditionPermits"
              ? `/permits-addition/view-permit/visitor-workspace/${permit?.visitorId}`
              : "#"
          }
        >
          <div className="text-dark fw-bolder d-block mb-1 fs-6">
            {permit?.visitorName || intl.formatMessage({ id: "NotFound" })}
          </div>
        </Link>
      </td>
      {tabName == "PermitCancellation" && (
        <td className="text-center ">
          <div
            className={`badge fw-bolder d-block mb-1 fs-6 text-decoration-underline cursor-pointer ${
              handleCancelReason(permit?.cancelReason)?.className
            }`}
            onClick={() => {
              // setShowReason(true);
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
          {intl.locale == "ar"
            ? permit?.orgName
              ? permit?.orgName
              : intl.formatMessage({ id: "NotFound" })
            : permit?.orgNameEn
            ? permit?.orgNameEn
            : intl.formatMessage({ id: "NotFound" })}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 text-dark`}>
          {permit?.buildingType
            ? permit?.buildingType === BuildingStatus.Main
              ? intl.formatMessage({ id: "Major" })
              : intl.formatMessage({ id: "Sub" })
            : intl.formatMessage({ id: "NotFound" })}
        </div>
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

      {tabName === "PermitApplications" && (
        <td className="text-center">
          <Actions
            id={permit?.visitorId}
            permit={permit}
            tabName={tabName}
            type="Person"
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
          />
        </td>
      )}
      {tabName === "PermitRenewal" && (
        <td className="text-center">
          <Actions
            id={permit?.visitorId}
            permit={permit}
            tabName={tabName}
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
          />
        </td>
      )}

      {tabName === "PermitAmendment" && (
        <td className="text-center">
          <ActionsPermitAmendment
            type="Person"
            permit={permit}
            tabName={tabName}
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
          />
        </td>
      )}

      {tabName === "PermitCancellation" && (
        <td className="text-center">
          <Actions
            id={permit?.visitorId}
            permit={permit}
            tabName={tabName}
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
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
      {showReason && (
        <div className="modal fade" aria-hidden="true">
          <ReasonPopup
            show={showReason}
            handleClose={() => setShowReason(false)}
          />
        </div>
      )}
    </>
  );
};

export default PermitsListTableRowGenratorForMember;
