import { FC } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom"


type ActionProps = {
  id?: string;
  pageIndexForGroups?: number;
  pageSizeForGroups?: number;
};

export const GroupPermitActions: FC<ActionProps> = ({ id,pageIndexForGroups , pageSizeForGroups}) => {
  const intl = useIntl();
  let location = useLocation();
  let cardTitle = location?.state?.cardTitle || location?.state?.cardName
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
          to={`/security-and-breaches/view-group-violations/${id}`}
          state={{
            CardTitle:cardTitle,
          }}>
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
        </Dropdown.Menu>
      </Dropdown>
   
    </>
  );
};
