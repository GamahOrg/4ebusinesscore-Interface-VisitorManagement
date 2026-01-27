import { FC } from "react";
import { useIntl } from "react-intl";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import StepperOne from "./Stepper";
import StepperGroup from "./StepperGroup";
const RequestAnInternalPermitHome: FC = () => {
    const intl = useIntl();

    return (
        <>
            <div className="card card-xl-stretch mb-xl-8">
                <div className="card-body pt-0 mt-8">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Nav variant="underline" className="standard">
                                <Nav.Item className="mb-10">
                                    <Nav.Link eventKey="first" className="fw-bolder fs-5">
                                        {intl.formatMessage({ id: "One" })}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className="fw-bolder fs-5">
                                        {intl.formatMessage({ id: "Group" })}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <StepperOne />
                                    <div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div>
                                    <StepperGroup />
                                    </div>
                                </Tab.Pane>                             
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </>
    );
};
export { RequestAnInternalPermitHome };
