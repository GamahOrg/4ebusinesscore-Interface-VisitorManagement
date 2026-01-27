import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { ApprovalPopup } from "../popup/ApprovalPopup";
import { RejectPopup } from "../popup/RejectPopup";
import { ModificationsPopupAmendment } from "../popup/ModificationsPopupAmendment";
import { Link } from "react-router-dom";

type ActionProps = {
  permit: any;
  type?: string;
  tabName?: string;
  pageIndexMember?: number;
  pageSizeMember?: number;
  pageIndexGroup?: number;
  pageSizeGroup?: number;

};

export const ActionsPermitAmendment: FC<ActionProps> = ({ permit, type, tabName, pageIndexGroup, pageSizeGroup, pageIndexMember, pageSizeMember }) => {
  const intl = useIntl();
  const [showApproval, setShowApproval] = useState(false);
  const [showModifications, setShowModifications] = useState(false);
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
          <Dropdown.Item as="button" onClick={() => setShowModifications(true)}>
            <div
              className="menu-link p-3 text-Info "
              style={{ textAlign: "right" }}
            >
              <i className="fas fa-eye mx-2 fs-4 text-Info "></i>

              {intl.formatMessage({ id: "ViewModifications" })}
            </div>
          </Dropdown.Item>
          <Link
            // to={
            //   type == "One"
            //     ? `/permits-amendments-applications/view-permit/visitor-workspace/${permit?.visitorId}`
            //     : `/permits-amendments-applications/view-Group/visitor-workspace/${permit?.visitorId}`
            // }
            to={
              `/permits-amendments-applications/view-permit/visitor-workspace/${permit?.visitorId}`
            }
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-Info "
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-Info "></i>

                {intl.formatMessage({ id: "ViewDetails" })}
              </div>
            </Dropdown.Item>
          </Link>
          <Dropdown.Item as="button" onClick={() => setShowApproval(true)}>
            <div
              className="menu-link p-3 text-success "
              style={{ textAlign: "right" }}
            >
              <i className="fas fa-check mx-2 fs-4 text-success "></i>

              {intl.formatMessage({ id: "AcceptRequest" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => setShowRejection(true)}>
            <div
              className="menu-link p-3 text-danger "
              style={{ textAlign: "right" }}
            >
              <i className="fas fa-times mx-2 fs-4 text-danger"></i>

              {intl.formatMessage({ id: "RequestRejection" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showModifications && (
        <div className="modal fade" aria-hidden="true">
          <ModificationsPopupAmendment
            show={showModifications}
            handleClose={() => setShowModifications(false)}
            permit={permit}
            type={type}
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}
          />
        </div>
      )}
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
            pageIndexMember={pageIndexMember}
            pageSizeMember={pageSizeMember}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}
          />
        </div>
      )}
    </>
  );
};
