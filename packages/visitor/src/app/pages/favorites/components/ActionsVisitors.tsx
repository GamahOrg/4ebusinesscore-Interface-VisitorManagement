import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditVisitorDataPopup from "../popup/EditVisitorDataPopup";
import CancelPermitPopup from "../popup/CancelPermitPopupSingle";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

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

export const ActionsVisitors: FC<ActionProps> = ({ id, permit }) => {
    const intl = useIntl();
    const [showApproval, setShowApproval] = useState(false);
    const [showSomeApproval, setShowSomeApproval] = useState(false);
    const [showRejection, setShowRejection] = useState(false);
    const [showSomeRejection, setShowSomeRejection] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
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
                    <Dropdown.Item as="button" onClick={() => setShowEdit(true)}>
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
                    <Dropdown.Item as="button" onClick={() => setShowCancel(true)}>
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
            {showEdit && (
                <div className="modal fade" aria-hidden="true">
                    <EditVisitorDataPopup
                        show={showEdit}
                        handleClose={() => setShowEdit(false)}
                    />
                </div>
            )}
            {showCancel && (
                <div className="modal fade" aria-hidden="true">
                    <CancelPermitPopup
                        show={showCancel}
                        handleClose={() => setShowCancel(false)}
                    />
                </div>
            )}
        </>
    );
};
