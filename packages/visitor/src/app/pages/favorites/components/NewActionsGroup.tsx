import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VisitorsPermissionGroupModel } from "../../../model/visitior-permission-group-model";

type ActionProps = {
  id: string;
  permit: VisitorsPermissionGroupModel;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
};

export const NewActionsGroup: FC<ActionProps> = ({
  permit,
}) => {
  const intl = useIntl();
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  let [selectedId, setSelectedId] = useState(0);
  let arPermitSource = "";
  const permitSource = arPermitSource === "داخلي" ? "internal" : "entry";

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
            to={`/permits-list/view-group/visitor-workspace/${permit?.groupId}`}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewGroup" })}
              </div>
            </Dropdown.Item>
          </Link>

          {permit?.PermitStatus == 0 && (
            <>
          <Link
            to={`/permits-list/view-group/visitor-workspace/${permit?.groupId}`}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewGroup" })}
              </div>
            </Dropdown.Item>
          </Link>
              </>)}
          {permit?.PermitStatus == 1 && (
            <>
          <Link
            to={`/permits-list/view-group/visitor-workspace/${permit?.groupId}`}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewGroup" })}
              </div>
            </Dropdown.Item>
          </Link>
              </>)}
          {permit?.PermitStatus == 2 && (
            <>
          <Link
            to={`/permits-list/view-group/visitor-workspace/${permit?.groupId}`}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewGroup" })}
              </div>
            </Dropdown.Item>
          </Link>
              </>)}
          {permit?.PermitStatus == 3 && (
            <>
          <Link
            to={`/permits-list/view-group/visitor-workspace/${permit?.groupId}`}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewGroup" })}
              </div>
            </Dropdown.Item>
          </Link>
              </>)}
          {permit?.PermitStatus == 4 && (
            <>
          <Link
            to={`/permits-list/view-group/visitor-workspace/${permit?.groupId}`}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewGroup" })}
              </div>
            </Dropdown.Item>
          </Link>
          <Dropdown.Item
                as="button"
                onClick={() => {
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
              </>)}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
