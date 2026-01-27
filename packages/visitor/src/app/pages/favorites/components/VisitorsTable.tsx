import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { useLocation, useSearchParams } from "react-router-dom";
import { FC, useReducer, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ActionsVisitors } from "./ActionsVisitors";

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

const VisitorsTable: FC<any> = ({ permit, setPermitData }) => {
    const {
        id,
        GroupNumber,
        PermitNumber,
        VisitorName,
        WhatsAppNumber,
        Number,
        PermitReason,
        AuthorizingAuthority,
        PermitSource,
        visitReceiver,
        PermitDateStart,
        PermitDateEnd,
        PermitTimeStart,
        PermitTimeEnd,
        PermitStatus,
        Options,
        clicked,
    } = permit;

    const [modalFShow, setModalFShow] = useState<boolean>(false);

    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();
    let [projectTasksData, setProjectTasksData] = useState([
        {
            id: "1",
            duration: "50 يوم",
            taskName: "اسم المهمه",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "100%",
            cost: "50,000ر.س",
        },
        {
            id: "1.1",
            duration: "10 يوم",
            taskName: "الاسم الفرعي",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "70%",
            cost: "50,000ر.س",
        },
        {
            id: "2",
            duration: "50 يوم",
            taskName: "اسم المهمه",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "80%",
            cost: "50,000ر.س",
        },
        {
            id: "2.1",
            duration: "10 يوم",
            taskName: "الاسم الفرعي",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "70%",
            cost: "50,000ر.س",
        },
        {
            id: "2.1",
            duration: "10 يوم",
            taskName: "الاسم الفرعي",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "70%",
            cost: "50,000ر.س",
        },
        {
            id: "3",
            duration: "50 يوم",
            taskName: "اسم المهمه",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "50%",
            cost: "50,000ر.س",
        },
        {
            id: "3.1",
            duration: "50 يوم",
            taskName: "اسم المهمه",
            startDate: "25 Jun 2022",
            endDate: "14 Dec 2023",
            completionRate: "50%",
            cost: "50,000ر.س",
        },
    ]);
    let [staffTasksData, setstaffTasksData] = useState([
        {
            id: "1",
            duration: "50 يوم",
            info: "",
            task: "التفتيش علي العقارات",
            Date: "14 Dec 2023",
            completionRate: "100%",
            cost: "50,000ر.س",
        },
    ]);
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
            <td>
                <div
                    onClick={() => {
                        handleToggle(0);
                        toggleClicked(id);
                    }}
                    role="button"
                >
                    {state[0] && permit.Options == "Group" ? (
                        <IoIosArrowDown size={22} className="text-muted" />
                    ) : getCurrentSystemLanguage() == "ar" &&
                        permit.Options == "Group" ? (
                        <IoIosArrowBack size={22} className="text-muted" />
                    ) : permit.Options !== "Group" ? (
                        ""
                    ) : (
                        <IoIosArrowBack
                            size={22}
                            className="text-muted"
                            style={{ transform: "scale(-1)" }}
                        />
                    )}
                </div>
            </td>

            <td>
                <div className="d-flex align-items-center">
                    <Link to={""} className="d-flex justify-content-start flex-column">
                        <div className="text-primary fw-bolder text-hover-primary mb-1 fs-6">
                            {GroupNumber}
                        </div>
                    </Link>
                </div>
            </td>

            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {PermitNumber}
                </div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {VisitorName}
                </div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">{Number}</div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {PermitReason}
                </div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {AuthorizingAuthority}
                </div>
            </td>
            <td className="text-center">
                <div
                    className={`badge ${PermitSource === "داخلي"
                        ? "badge-light-success"
                        : PermitSource === "دخول"
                            ? "badge-light-primary"
                            : "badge-light-danger"
                        } fw-bolder d-block mb-1 fs-6`}
                >
                    {PermitSource}
                </div>
            </td>
            <td className="text-center">
                <div className="text-dark fw-bolder d-block mb-1 fs-6">
                    {visitReceiver}
                </div>
            </td>

            <td className="text-center">
                <div className={`badge ${PermitStatus === "موافقة"
                    && "badge-light-success"}
            ${PermitStatus === "سارية"
                && "badge-light-primary"}
            ${PermitStatus === "منتهية"
                && "badge-secondary"}
            ${PermitStatus === "ملغية"
                && "badge-light-danger"}
            ${PermitStatus === "مرفوضة"
                && "badge-light-danger"}
            ${PermitStatus === "تحت المراجعة"
                && "badge-light-warning"}
            `}>
                    {PermitStatus}
                </div>
            </td>
            <td className="text-center">
                <ActionsVisitors id={id} permit={permit} />
            </td>
        </>
    );
};

export default VisitorsTable;
