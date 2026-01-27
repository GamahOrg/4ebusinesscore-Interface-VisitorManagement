import { FC } from "react";
import { useIntl } from "react-intl";
import { Nav, Row, Tab } from "react-bootstrap";
import { ServicesSettings } from "./ServicesSettings";
import NotificationsSettingsComponent from "./NotificationsSettingsComponent";
import { OrganizationalChart } from "./OrganizationalChart";
import { SystemNotifications } from "./SystemNotifications";
const VisitorSystemSettingsHome: FC = () => {
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
              <div className="card-body py-3">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="SystemCharacteristics"
                >
                  <Row>
                    <Nav variant="underline" className="standard">
                      <Nav.Item className="mb-10">
                        <Nav.Link
                          eventKey="SystemCharacteristics"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({ id: "SystemCharacteristics" })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="ServicesSettings"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({ id: "ServicesSettings" })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="BasicDataSettings"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({ id: "BasicDataSettings" })}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="NotificationsSettings"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({ id: "NotificationsSettings" })}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="SystemCharacteristics">
                        <NotificationsSettingsComponent />
                      </Tab.Pane>
                      <Tab.Pane eventKey="ServicesSettings">
                        <ServicesSettings />
                      </Tab.Pane>
                      <Tab.Pane eventKey="BasicDataSettings">
                        <OrganizationalChart />
                      </Tab.Pane>
                      <Tab.Pane eventKey="NotificationsSettings">
                        <SystemNotifications />
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

export { VisitorSystemSettingsHome };
