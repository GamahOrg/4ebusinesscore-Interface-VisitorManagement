import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import EditExternalVisitorDataPopup from "../popup/EditExternalVisitorDataPopup";
import EditInternalVisitorDataPopup from "../popup/EditInternalVisitorDataPopup";
import CancelPermitVistorFromGroupPopup from "../popup/CancelPermitVistorFromGroupPopup";

type ActionProps = {
  id: string;
  visitor?: any;
  pageIndex?: number;
  pageSize?: number;
};

export const ActionsVisitors: FC<ActionProps> = ({
  visitor,
  pageIndex,
  pageSize,
}) => {
  const intl = useIntl();
  const [showCancel, setShowCancel] = useState(false);
  const [showEditForInternal, setShowEditForInternal] = useState(false);
  const [showEditForExternal, setShowEditForExternal] = useState(false);
  let [selectedVisitorId, setSelectedVisitorId] = useState("");

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
          <Dropdown.Item
            as="button"
            onClick={() => {
              setSelectedVisitorId(visitor?.vistorId as string);
              if (visitor?.permissionSource == 0) {
                setShowEditForInternal(true);
              } else if (visitor?.permissionSource == 1) {
                setShowEditForExternal(true);
              }
            }}
          >
            <div
              className="menu-link p-3 text-primary text-left"
              style={{ textAlign: "right" }}
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
              </span>

              {intl.formatMessage({ id: "Edit" })}
            </div>
          </Dropdown.Item>

          <Dropdown.Item
            as="button"
            onClick={() => {
              setShowCancel(true);
              setSelectedVisitorId(visitor?.vistorId as string);
            }}
          >
            <div
              className="menu-link p-3 px-4 text-danger text-left"
              style={{ textAlign: "right" }}
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <i className="far fa-times-circle"></i>
              </span>

              {intl.formatMessage({ id: "Cancel" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showEditForInternal && selectedVisitorId == visitor?.vistorId && (
        <div className="modal fade" aria-hidden="true">
          <EditInternalVisitorDataPopup
            show={showEditForInternal}
            handleClose={() => setShowEditForInternal(false)}
            visitor={visitor}
            {...{
              pageIndex,
              pageSize,
            }}
          />
        </div>
      )}
      {showEditForExternal && selectedVisitorId == visitor?.vistorId && (
        <div className="modal fade" aria-hidden="true">
          <EditExternalVisitorDataPopup
            show={showEditForExternal}
            handleClose={() => setShowEditForExternal(false)}
            visitor={visitor}
            {...{
              pageIndex,
              pageSize,
            }}
          />
        </div>
      )}
      {showCancel && visitor?.vistorId == selectedVisitorId && (
        <div className="modal fade" aria-hidden="true">
          <CancelPermitVistorFromGroupPopup
            show={showCancel}
            visitor={visitor}
            handleClose={() => setShowCancel(false)}
            {...{
              pageIndex,
              pageSize,
            }}
          />
        </div>
      )}
    </>
  );
};
