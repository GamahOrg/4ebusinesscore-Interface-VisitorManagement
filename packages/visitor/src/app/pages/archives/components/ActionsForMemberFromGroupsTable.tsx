import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import RenewPermitForMembersInGroupsTablePopup from "../popup/RenewPermitForMembersInGroupsTablePopup";
import AddExternalVisitorForMembersInGroupsTablePopup from "../popup/AddExternalVisitorForMembersInGroupsTablePopup";
import AddInternalVisitorForMembersInGroupsTablePopup from "../popup/AddInternalVisitorForMembersInGroupsTablePopup";
import { RemoveFromArchiveMembersInGroupsTablePopup } from "../popup/RemoveFromArchiveMembersInGroupsTablePopup";
import { ModifiedVisitorDtoModel } from "../../../model/visitior-permission-group-model";
import { Link,  useLocation } from "react-router-dom";
import {
  PermissionSource,
  PermissionStatus,
} from "../../../model/permit-enums";
type ActionProps = {
  id: string;
  visitor: ModifiedVisitorDtoModel;
  pageIndexForGroups?: number;
  pageSizeForGroups?: number;
  permit?: any;
};

export const ActionsForMemberFromGroupsTable: FC<ActionProps> = ({
  id,
  visitor,
  pageIndexForGroups,
  pageSizeForGroups,
  permit,
}) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showRenew, setShowRenew] = useState(false);
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  let [selectedId, setSelectedId] = useState("");
  let [showArchive, setShowArchive] = useState(false);
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {visitor?.permissionStatus === PermissionStatus?.InProgress && (
            <>
              <Link
                state={{ cardName, serviceName }}
                to={`/permits-list/view-permit-for-archive/visitor-workspace/${visitor?.permissionCode}/${visitor?.visitorId}`}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                    {intl.formatMessage({ id: "ViewPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-success text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    if (
                      visitor?.permissionSource == PermissionSource?.Internal
                    ) {
                      setShowAddInternalVisitor(true);
                    } else if (
                      visitor?.permissionSource == PermissionSource?.External
                    ) {
                      setShowAddExternalVisitor(true);
                    }
                  }}
                >
                  <i className="fal fa-plus-circle  mx-2 fs-4"></i>
                  {intl.formatMessage({ id: "AddVisitor" })}
                </div>
              </Dropdown.Item>
              <Link
                state={{ cardName, serviceName }}
                to={
                  permit?.permissionSource == PermissionSource?.Internal
                    ? `/permits-list/edit-internal-permit/single/${permit?.vistorId}`
                    : permit?.permissionSource == PermissionSource?.External
                      ? `/permits-list/edit-external-permit/single/${permit?.vistorId}`
                      : ""
                }
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-primary text-left"
                    style={{ textAlign: "right" }}
                  >
                    <span className="svg-icon svg-icon-3 me-2">
                      <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                    </span>
                    {intl.formatMessage({ id: "EditPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-muted text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    setShowArchive(true);
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "UnArchive" })}
                </div>
              </Dropdown.Item>
            </>
          )}
          {visitor?.permissionStatus === PermissionStatus?.Finshed && (
            <>
              <Link
                to={`/permits-list/view-permit-for-archive/visitor-workspace/${visitor?.permissionCode}/${visitor?.visitorId}?type=member`}
                state={{ permit, cardName, serviceName }}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                    {intl.formatMessage({ id: "ViewPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>

              <Dropdown.Item
                as="button"
                onClick={() => {
                  setShowRenew(true);
                  setSelectedId(id);
                }}
              >
                <div
                  className="menu-link p-3 text-success text-left"
                  style={{ textAlign: "right" }}
                >
                  <i className="fas fa-sync mx-2 fs-4"></i>

                  {intl.formatMessage({ id: "RenewPermit" })}
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-muted text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    setShowArchive(true);
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "UnArchive" })}
                </div>
              </Dropdown.Item>
            </>
          )}
          {visitor?.permissionStatus == PermissionStatus?.Canceled && (
            <>
              <Link
                to={`/permits-list/view-permit-for-archive/visitor-workspace/${visitor?.permissionCode}/${visitor?.visitorId}?type=member`}
                state={{ permit, cardName, serviceName }}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                    {intl.formatMessage({ id: "ViewPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-muted text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    setShowArchive(true);
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "UnArchive" })}
                </div>
              </Dropdown.Item>
            </>
          )}

          {visitor?.permissionStatus == PermissionStatus?.Approved && (
            <>
              <Link
                to={`/permits-list/view-permit-for-archive/visitor-workspace/${visitor?.permissionCode}/${visitor?.visitorId}?type=member`}
                state={{ permit, cardName, serviceName }}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                    {intl.formatMessage({ id: "ViewPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-muted text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    setShowArchive(true);
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "UnArchive" })}
                </div>
              </Dropdown.Item>
            </>
          )}
          {visitor?.permissionStatus == PermissionStatus?.Rejected && (
            <>
              <Link
                to={`/permits-list/view-permit-for-archive/visitor-workspace/${visitor?.permissionCode}/${visitor?.visitorId}?type=member`}
                state={{ permit, cardName, serviceName }}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                    {intl.formatMessage({ id: "ViewPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-muted text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    setShowArchive(true);
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "UnArchive" })}
                </div>
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      {showRenew && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <RenewPermitForMembersInGroupsTablePopup
            show={showRenew}
            handleClose={() => setShowRenew(false)}
            visitor={visitor}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
            }}
          />
        </div>
      )}
      {showAddExternalVisitor && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <AddExternalVisitorForMembersInGroupsTablePopup
            show={showAddExternalVisitor}
            visitor={visitor}
            handleClose={() => setShowAddExternalVisitor(false)}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
            }}
          />
        </div>
      )}
      {showAddInternalVisitor && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <AddInternalVisitorForMembersInGroupsTablePopup
            show={showAddInternalVisitor}
            handleClose={() => setShowAddInternalVisitor(false)}
            visitor={visitor}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
            }}
          />
        </div>
      )}
      {showArchive && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <RemoveFromArchiveMembersInGroupsTablePopup
            show={showArchive}
            handleClose={() => setShowArchive(false)}
            visitor={visitor}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
            }}
          />
        </div>
      )}
    </>
  );
};
