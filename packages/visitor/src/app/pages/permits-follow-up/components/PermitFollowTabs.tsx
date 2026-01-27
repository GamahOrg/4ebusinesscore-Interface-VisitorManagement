import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useIntl } from "react-intl";
import PermitFollow from "./PermitFollow";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const PermitFollowTabs = () => {
  const intl = useIntl();
  let { permitId } = useParams();
  let location = useLocation();
  let permitInfo = location?.state?.permit;
  let [permitDetails, setPermitDetails] = useState<any>({});
  useEffect(() => {
    setPermitDetails(permitInfo);
  }, [permitInfo]);
  let [navLink, setNavLink] = useState("");
  let [isMemberOrGroup, setIsMemberOrGroup] = useState<string>("member");
  useEffect(() => {
    if (location?.search == "?type=member") {
      setIsMemberOrGroup("member");
    } else {
      setIsMemberOrGroup("group");
    }
  }, [location]);
  useEffect(() => {
    if (isMemberOrGroup == "member") {
      setNavLink(
        `/permits-list/view-permit-for-follow/visitor-workspace/${permitId}/${permitInfo?.vistorId}`
      );
    } else {
      setNavLink(`/permits-list/view-group-for-follow/visitor-workspace/${permitId}`);
    }
  }, [isMemberOrGroup, permitId, permitInfo]);

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
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3 d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="text-dark mb-3 fs-2 mt-10">
                    {intl.formatMessage({ id: "FollowPermit" })}
                  </h2>
                  <span className="text-muted fs-6">
                    {intl.formatMessage({
                      id: "ImportantInformationPermitsFollow",
                    })}
                  </span>
                </div>
                <Link
                  to={navLink}
                  className="btn btn-primary w-auto fw-bolder mx-1 text-center mw-100"
                >
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="fa-solid fa-eye"></i>
                  </span>
                  {intl.formatMessage({ id: "ViewDetails" })}
                </Link>
              </div>
              <div className="card-body py-3">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="PermitFollow"
                >
                  <Row>
                    <Nav variant="underline" className="standard">
                      <Nav.Item className="mb-10">
                        <Nav.Link
                          eventKey="PermitFollow"
                          className="fw-bolder fs-5"
                        >
                          {intl.formatMessage({ id: "PermitFollow" })}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="PermitFollow">
                        <PermitFollow
                          tabName={"PermitFollow"}
                          isMemberOrGroup={isMemberOrGroup}
                          permitDetails={permitDetails}
                        />
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
