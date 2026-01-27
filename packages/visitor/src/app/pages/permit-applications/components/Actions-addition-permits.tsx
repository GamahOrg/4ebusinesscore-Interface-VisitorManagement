import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { ApprovalPopup } from "../popup/ApprovalPopup";
import { RejectPopup } from "../popup/RejectPopup";
import { Link } from "react-router-dom";

interface PermitData {
  id: number;
  GroupNumber: string;
  PermitNumber: string;
  VisitorName: string;
  WhatsAppNumber: string;
  Number: string;
  PermitReason: string;
  AuthorizingAuthority: string;
  PermitSource: string;
  visitReceiver: string;
  PermitDateStart: string;
  PermitDateEnd: string;
  PermitTimeStart: string;
  PermitTimeEnd: string;
  PermitStatus: string;
  Options: string;
  Persons?: PermitData[];
  clicked?: boolean;
}

type ActionProps = {
  id: Number;
  permit: PermitData;
};

export const ActionsAdditionPermits: FC<ActionProps> = ({ id, permit }) => {
  const intl = useIntl();
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
          <Link
            to={
              permit.Options == "Person"
                ? `/permits-list/view-permit/visitor-workspace/${id}`
                : `/permits-list/view-group/visitor-workspace/${id}`
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

      {showApproval && (
        <div className="modal fade" aria-hidden="true">
          <ApprovalPopup
            show={showApproval}
            handleClose={() => setShowApproval(false)}
            permit={permit}
          />
        </div>
      )}

      {showRejection && (
        <div className="modal fade" aria-hidden="true">
          <RejectPopup
            show={showRejection}
            handleClose={() => setShowRejection(false)}
            permit={permit}
          />
        </div>
      )}
    </>
  );
};
