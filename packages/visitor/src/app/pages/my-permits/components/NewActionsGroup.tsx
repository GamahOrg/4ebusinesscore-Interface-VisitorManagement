import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { GroupModel } from "../../../model/permission-list-model";
import RenewPermitForGroupInTablePopup from "../popup/RenewPermitForGroupInTablePopup";
import AddInternalVisitorForGroupInTablePopup from "../popup/AddInternalVisitorForGroupInTablePopup";
import AddExternalVisitorForGroupInGroupsTablePopup from "../popup/AddExternalVisitorForGroupInGroupsTablePopup";
import moment from "moment";
import { ReminderPopupGroup } from "../popup/ReminderPopupGroup";

type ActionProps = {
  id: string;
  permit: GroupModel;
  pageSizeForGroups: number;
  pageIndexForGroups: number;
};

export const NewActionsGroup: FC<ActionProps> = ({
  id,
  permit,
  pageIndexForGroups,
  pageSizeForGroups,
}) => {
  const intl = useIntl();
  const [showRenew, setShowRenew] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  let [showReminder, setShowReminder] = useState(false);
  let [selectedId, setSelectedId] = useState("");
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const isClosingDate = (startDate: any, startTime: any): boolean => {
    try {
      const inputDateTime = moment(
        `${startDate} ${startTime}`,
        "MM/DD/YYYY HH:mm",
      );

      const now = moment();

      const diffHours = inputDateTime.diff(now, "hours", true);

      return diffHours >= 0 && diffHours <= 24;
    } catch (error) {
      console.error("Error parsing date/time:", error);
      return false;
    }
  };

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
            state={{ cardName, serviceName }}
            to={`/my-permits/view-group/visitor-workspace/${permit?.id}`}
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
          {permit?.permissionListDto[0]?.permissionStatus == 0 && (
            <Dropdown.Item
              as="button"
              disabled={
                !isClosingDate(
                  permit?.permissionListDto[0]?.stratDate,
                  permit?.permissionListDto[0]?.stratTime,
                ) || permit?.permissionListDto[0]?.isReminder
              }
            >
              <div
                className={`menu-link p-3 ${
                  isClosingDate(
                    permit?.permissionListDto[0]?.stratDate,
                    permit?.permissionListDto[0]?.stratTime,
                  ) && !permit?.permissionListDto[0]?.isReminder
                    ? "text-warning"
                    : "text-muted"
                }  text-left`}
                style={{ textAlign: "right" }}
                onClick={() => {
                  setSelectedId(id);
                  setShowReminder(true);
                }}
              >
                <i className="fa-regular fa-calendar mx-1 fs-6 fa-fw"></i>
                {intl.formatMessage({ id: "Reminder" })}
              </div>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {showRenew && (
        <div className="modal fade" aria-hidden="true">
          <RenewPermitForGroupInTablePopup
            show={showRenew}
            handleClose={() => setShowRenew(false)}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
            }}
            group={permit}
          />
        </div>
      )}
      {showAddInternalVisitor && (
        <div className="modal fade" aria-hidden="true">
          <AddInternalVisitorForGroupInTablePopup
            show={showAddInternalVisitor}
            handleClose={() => setShowAddInternalVisitor(false)}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
              permit,
            }}
          />
        </div>
      )}
      {showAddExternalVisitor && (
        <div className="modal fade" aria-hidden="true">
          <AddExternalVisitorForGroupInGroupsTablePopup
            show={showAddExternalVisitor}
            handleClose={() => setShowAddExternalVisitor(false)}
            {...{
              pageSizeForGroups,
              pageIndexForGroups,
              permit,
            }}
          />
        </div>
      )}
      {showReminder && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <ReminderPopupGroup
            show={showReminder}
            handleClose={() => setShowReminder(false)}
            permit={permit}
          />
        </div>
      )}
    </>
  );
};
