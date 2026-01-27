import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useIntl } from "react-intl";
import { PermitApplicationsTable } from "./permit-applications-table";
import { PermitAmendmentRequests } from "./permit-amendment-requests";
import { AdditionPermitsRequests } from "./addition-permits-requests";
import { PermitCancellationRequests } from "./permit-cancellation-requests";
import { RenewalPermitsRequests } from "./renewal-permits-requests";

export const Tabs = () => {
  const intl = useIntl();

  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8 position-relative">
              <div className="card-header px-3 pt-3 pb-2 mb-3">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fs-4 my-5 ">
                    {intl.formatMessage({ id: "PermitApplications" })}
                  </span>
                  <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                    {intl.formatMessage({
                      id: "AllPermitApplicationsAwaitingApproval",
                    })}
                  </span>
                </h3>
              </div>
              <div className="card-body py-3">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="PermitApplications"
                >
                  <Row>
                    <Nav variant="underline" className="standard">
                      <Nav.Item className="mb-10">
                        <Nav.Link
                          eventKey="PermitApplications"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({ id: "PermitApplications" })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="PermitAmendmentRequests"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({
                            id: "PermitAmendmentRequests",
                          })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="AdditionPermitsRequests"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({
                            id: "AdditionPermitsRequests",
                          })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="PermitCancellationRequests"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({
                            id: "PermitCancellationRequests",
                          })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="UpdatePermissionsRequests"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({
                            id: "UpdatePermissionsRequests",
                          })}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="PermitApplications">
                        <PermitApplicationsTable
                          tabName={"PermitApplications"}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="PermitAmendmentRequests">
                        <PermitAmendmentRequests tabName={"PermitAmendment"} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="AdditionPermitsRequests">
                        <AdditionPermitsRequests tabName={"AdditionPermits"} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="PermitCancellationRequests">
                        <PermitCancellationRequests
                          tabName={"PermitCancellation"}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="UpdatePermissionsRequests">
                        <RenewalPermitsRequests tabName={"PermitRenewal"} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Row>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
