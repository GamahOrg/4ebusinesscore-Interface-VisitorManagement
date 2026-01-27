import { FC } from "react";
import { useIntl } from "react-intl";
import { PermitsListDetails } from "./components/PermitsListDetails";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { setWorkspaceKey } from "@4eplatform/shared";

const MyPermits: FC = () => {
  const intl = useIntl();
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "MyPermits",
      name: "",
    },
  ];
  return (
    <>
      <div className="toolbar" id="kt_toolbar">
        <div
          id="kt_toolbar_container"
          className="container-xxl d-flex flex-stack flex-wrap p-0"
        >
          <DynamicToolbar
            fixedTitle={true}
            defaultTitle="MyPermits"
            extraTitle=""
            breadcrumbItems={breadcrumbItems}
            showWorkspace={true}
            cardOption={cardName || serviceName}
            cardId={id}
          />
          {/* <div className="d-flex align-items-center py-3 py-md-1 gap-3">
            <div className="d-flex align-items-center py-3 py-md-1">
              <Link
                to="/permits-follow"
                state={{ cardName, serviceName }}
                className="btn btn-primary"
              >
                {intl.formatMessage({ id: "FollowPermits" })}
              </Link>
            </div>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                variant="none"
                className="text-black  btn  bg-white d-flex justify-content-center align-items-center btn-custom btn-active-white btn-flex  btn-active-color-primary fw-bolder"
                id="dropdown-custom-2"
              >
                + {intl.formatMessage({ id: "Add" })}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button">
                  <Link
                    to="/request-entry-permit"
                    state={{ cardName, serviceName }}
                    onClick={() => {
                      setWorkspaceKey(201);
                    }}
                    className="btn  btn-active-color-primary"
                  >
                    {intl.formatMessage({ id: "AddEntryPermit" })}
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="button">
                  <Link
                    to="/request-internal-permit"
                    state={{ cardName, serviceName }}
                    onClick={() => {
                      setWorkspaceKey(200);
                    }}
                    className="btn  btn-active-color-primary"
                  >
                    {intl.formatMessage({ id: "AddInternalPermit" })}
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
        </div>
      </div>
      <PermitsListDetails />
    </>
  );
};
export default MyPermits;
