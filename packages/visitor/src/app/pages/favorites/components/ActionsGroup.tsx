import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import RenewPermitPopup from "../popup/RenewPermitPopup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import AddVisitorPopup from "../popup/AddVisitorPopupA";

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

export const ActionsGroup: FC<ActionProps> = ({ id, permit }) => {
  const intl = useIntl();
  const [showRenew, setShowRenew] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  let arPermitSource = permit.PermitSource;
  const permitSource = arPermitSource === "داخلي" ? "internal" : "entry"


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
          {
            permit.PermitStatus === "سارية" && (
              <>
                <Link to={`/permits-list/view-group/visitor-workspace/${id}`}>
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
                <Dropdown.Item as="button" onClick={() => setShowAdd(true)}>
                  <div
                    className="menu-link p-3 text-success text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fal fa-plus-circle  mx-2 fs-4"></i>
                    {intl.formatMessage({ id: "AddVisitor" })}
                  </div>
                </Dropdown.Item>
                <Link to={`/permits-list/edit-permit/group/${permitSource}`}>
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
              </>
            )
          }
          {
            permit.PermitStatus === "منتهية" && (
              <>
                <Link to={`/permits-list/view-group/visitor-workspace/${id}`}>
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
                <Dropdown.Item as="button" onClick={() => setShowRenew(true)}>
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
                    className="menu-link p-3 text-warning text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fa-regular fa-star mx-1 fs-6 fa-fw"></i>
                    {intl.formatMessage({ id: "AddToFavorite" })}
                  </div>
                </Dropdown.Item>
                <Dropdown.Item as="button" >
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                    {intl.formatMessage({ id: "AddToArchive" })}
                  </div>
                </Dropdown.Item>
              </>
            )
          }
          {
            permit.PermitStatus === "ملغية" && (
              <>
                <Link to={`/permits-list/view-group/visitor-workspace/${id}`}>
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

              </>
            )
          }
          {
            permit.PermitStatus === "موافقة" && (
              <>
                <Link to={`/permits-list/view-group/visitor-workspace/${id}`}>
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

              </>
            )
          }


        </Dropdown.Menu>
      </Dropdown>
      {showRenew && (
        <div className="modal fade" aria-hidden="true">
          <RenewPermitPopup
            show={showRenew}
            handleClose={() => setShowRenew(false)}
          />
        </div>
      )}
      {showAdd && (
        <div className="modal fade" aria-hidden="true">
          <AddVisitorPopup
            show={showAdd}
            handleClose={() => setShowAdd(false)}
          />
        </div>
      )}
    </>
  );
};
