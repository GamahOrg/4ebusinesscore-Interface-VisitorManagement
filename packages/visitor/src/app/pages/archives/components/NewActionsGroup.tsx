import { FC} from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { VisitorsPermissionGroupModel } from "../../../model/visitior-permission-group-model";
type ActionProps = {
  id: string;
  permit: VisitorsPermissionGroupModel;
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
          <Link
            state={{ cardName, serviceName }}
            to={`/permits-list/view-group-for-archive/visitor-workspace/${permit?.groupId}`}
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
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
