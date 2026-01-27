import { FC, useReducer } from "react";
import { useIntl } from "react-intl";
import { VisitorModel } from "../../../model/group-permission-details-model";
import { handlePermissionSource, handlePermissionStatus, handlePermissionType } from "../utils/permitApplicationUtil";

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
interface State {
    [key: number]: boolean;
}
type Action = { type: "toggle"; id: number };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "toggle":
            return { ...state, [action.id]: !state[action.id] };
        default:
            throw new Error();
    }
}
const initialState = {};


interface VisitorTableProps {
    visitor: VisitorModel;
    setPermitData: any
}

const VisitorsTable: FC<VisitorTableProps> = ({ visitor, setPermitData }) => {

    const intl = useIntl();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleToggle = (id: number) => {
        dispatch({ type: "toggle", id });
    };

    const toggleClicked = (id: number) => {
        setPermitData((prevData: any) =>
            prevData.map((item: any) =>
                item.id === id ? { ...item, clicked: !item.clicked } : item
            )
        );
    };

    return (
        <>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {visitor?.permissionNumber}#
                </div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {visitor?.vistorName || intl.formatMessage({ id: "NotFound" })}
                </div>
            </td>
            <td className="text-center">
                <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionType(visitor?.permissionType)?.className}`}>
                    {intl.locale == "ar" ? visitor?.permissionTypeAr ? visitor?.permissionTypeAr : intl.formatMessage({ id: "NotFound" }) : visitor?.permissionTypeEn ? visitor?.permissionTypeEn : intl.formatMessage({ id: "NotFound" })}
                </div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {visitor?.orgName}
                </div>
            </td>
            {/* <td className="text-center">
                <div className={`badge  fw-bolder d-block mb-1 fs-6 text-dark`}>
                    {visitor?.isParking ? intl.formatMessage({ id: "Found" }) : intl.formatMessage({ id: "NotFound" })}
                </div>
            </td> */}
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {visitor?.recivedVisiting || intl.formatMessage({ id: "NotFound" })}
                </div>
            </td>
            <td className="text-center">
                <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionStatus(visitor?.permissionStatus)?.className}`}>
                    {intl.formatMessage({ id: handlePermissionStatus(visitor?.permissionStatus)?.value })}
                </div>
            </td>
        </>
    );
};

export default VisitorsTable;
