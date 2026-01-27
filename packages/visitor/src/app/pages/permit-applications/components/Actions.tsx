import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { ApprovalPopup } from "../popup/ApprovalPopup";
import { RejectPopup } from "../popup/RejectPopup";
import { Link } from "react-router-dom";

type ActionProps = {
  id: Number | string;
  permit: any;
  tabName: string;
  type?: string;
  pageIndexMember?: number;
  pageSizeMember?: number;
  pageIndexGroup?: number;
  pageSizeGroup?: number;
};

export const Actions: FC<ActionProps> = ({ id, permit, tabName, type, pageIndexMember, pageSizeMember, pageIndexGroup, pageSizeGroup }) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);

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
          {/* <Link to={
            tabName === "PermitApplications"
              ? `/permits-applications/view-permit/visitor-workspace/${id}`
              : tabName === "PermitCancellation"
                ? `/permits-cancellation/view-permit/visitor-workspace/${id}`
                : "#"
          }> */}
          <Link
            to={
              tabName === "PermitApplications"
                ? `/permissions-Permits/view-permit/visitor-workspace/${id}`
                : tabName === "PermitCancellation"
                  ? `/permits-cancellation/view-permit/visitor-workspace/${id}`
                  : tabName === "PermitRenewal"
                    ? `/permits-renewal/view-permit/visitor-workspace/${id}`
                    : "#"
            }
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewDetails" })}
              </div>
            </Dropdown.Item>
          </Link>

          {permit?.permissionStatus === 0 && (<>

            <Dropdown.Item as="button" onClick={() => setShowApproval(true)}>
              <div
                className="menu-link p-3 text-success text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-check mx-2 fs-4 text-success "></i>

                {intl.formatMessage({ id: "AcceptRequest" })}
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setShowRejection(true)}>
              <div
                className="menu-link p-3 text-danger text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-times mx-2 fs-4 text-danger"></i>

                {intl.formatMessage({ id: "RequestRejection" })}
              </div>
            </Dropdown.Item>
          </>)}

        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      {showApproval && (
        <div className="modal fade" aria-hidden="true">
          <ApprovalPopup
            show={showApproval}
            handleClose={() => setShowApproval(false)}
            permit={permit}
            tabName={tabName}
            type={type}
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}

          />
        </div>
      )}
      {showRejection && (
        <div className="modal fade" aria-hidden="true">
          <RejectPopup
            show={showRejection}
            handleClose={() => setShowRejection(false)}
            permit={permit}
            tabName={tabName}
            type={type}
          />
        </div>
      )}
    </>
  );
};
