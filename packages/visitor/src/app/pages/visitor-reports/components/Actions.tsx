import { FC } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
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

export const Actions: FC<ActionProps> = ({ id, permit }) => {
  const intl = useIntl();
  const { workspaceName } = useParams();

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
            to={`/permits-list/view-permit/visitor-workspace/${id}?intry=reports`}
            state={permit}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewPermit" })}
              </div>
            </Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
