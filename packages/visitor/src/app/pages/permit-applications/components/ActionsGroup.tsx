import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { ApprovalPopup } from "../popup/ApprovalPopup";
import { ApprovalSomeGroupPopup } from "../popup/ApprovalSomeGroupPopup";
import { RejectionSomeGroupPopup } from "../popup/RejectionSomeGroupPopup";
import { RejectPopup } from "../popup/RejectPopup";
import { Link } from "react-router-dom";

type ActionProps = {
  id: Number | string;
  permit: any;
  tabName: string
  pageSizeGroup?: number;
  pageIndexGroup?: number;
};

export const ActionsGroup: FC<ActionProps> = ({ id, permit, tabName, pageIndexGroup, pageSizeGroup }) => {
  const intl = useIntl();
  const [showApproval, setShowApproval] = useState(false);
  const [showSomeApproval, setShowSomeApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [showSomeRejection, setShowSomeRejection] = useState(false);

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
          <Link to={
            `/permissions-Permits/view-group/visitor-workspace/${id}`}>
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

          {permit?.permissionDto[0]?.visitorDto[0]?.permissionStatus == 0 && (<>
            <Dropdown.Item as="button" onClick={() => setShowApproval(true)}>
              <div
                className="menu-link p-3 text-success "
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-users mx-2 fs-4 text-success "></i>
                <i className="fas fa-check mx-2 fs-4 text-success "></i>
                {intl.formatMessage({ id: "GroupAcceptance" })}
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setShowRejection(true)}>
              <div
                className="menu-link p-3 text-danger "
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-users mx-2 fs-4 text-danger "></i>
                <i className="fas fa-times mx-2 fs-4 text-danger"></i>

                {intl.formatMessage({ id: "GroupRejection" })}
              </div>
            </Dropdown.Item>

          </>)}
          {/* {tabName !== "PermitCancellation" && (
            <>
              <Dropdown.Item as="button" onClick={() => setShowSomeApproval(true)}>
                <div
                  className="menu-link p-3 text-Info "
                  style={{ textAlign: "right" }}
                >
                  <i className="fas fa-user mx-2 fs-4 text-Info "></i>
                  <i className="fas fa-check mx-2 fs-4 text-Info "></i>

                  {intl.formatMessage({ id: "AcceptSomeGroup" })}
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setShowSomeRejection(true)}>
                <div
                  className="menu-link p-3 text-Info "
                  style={{ textAlign: "right" }}
                >
                  <i className="fas fa-user mx-2 fs-4 text-Info "></i>
                  <i className="fas fa-times mx-2 fs-4 text-Info"></i>

                  {intl.formatMessage({ id: "RejectSomeGroup" })}
                </div>
              </Dropdown.Item>
            </>
          )} */}
        </Dropdown.Menu>
      </Dropdown>

      {showApproval && (
        <div className="modal fade" aria-hidden="true">
          <ApprovalPopup
            show={showApproval}
            handleClose={() => setShowApproval(false)}
            permit={permit}
            type="Group"
            tabName={tabName}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}
          />
        </div>
      )}
      {showSomeApproval && (
        <div className="modal fade" aria-hidden="true">
          <ApprovalSomeGroupPopup
            show={showSomeApproval}
            handleClose={() => setShowSomeApproval(false)}
            permit={permit}
            tabName={tabName}
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
            type="Group"
            tabName={tabName}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}
          />
        </div>
      )}
      {showSomeRejection && (
        <div className="modal fade" aria-hidden="true">
          <RejectionSomeGroupPopup
            show={showSomeRejection}
            handleClose={() => setShowSomeRejection(false)}
            permit={permit}
            tabName={tabName}
            pageIndexGroup={pageIndexGroup}
            pageSizeGroup={pageSizeGroup}
          />
        </div>
      )}
    </>
  );
};
