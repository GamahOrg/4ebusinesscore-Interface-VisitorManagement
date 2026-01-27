import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { useLocation } from "react-router-dom";
import { FC, useReducer, useState } from "react";
import { useIntl } from "react-intl";
import { ViolationPopup } from "../popup/ViolationPopup";
import { ReasonPopup } from "../popup/ReasonPopup";
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
  CancellationReason?: string;
}
interface Itable {
  permit: any;
  tabName: string;
  setPermitData: any;
  type?: any;
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

const PermitTableList: FC<Itable> = ({ permit, setPermitData, tabName, type }) => {
  const {
    id,
    CancellationReason,
  } = permit;

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

  const [showVoilation, setShowVoilation] = useState(false);
  const [showReason, setShowReason] = useState(false);

  return (
    <>
      {type == "Group" && (
        <td>
          <div
            onClick={() => {
              handleToggle(0);
              toggleClicked(id);
            }}
            role="button"
          >
            {state[0] && type == "Group" ? (
              <IoIosArrowDown size={22} className="text-muted" />
            ) : getCurrentSystemLanguage() == "ar" &&
              type == "Group" ? (
              <IoIosArrowBack size={22} className="text-muted" />
            ) : type !== "Group" ? (
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
      )}

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionCode}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.visitorName}
        </div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionType(permit?.permissionType)?.className}`}>
          {intl.formatMessage({ id: handlePermissionType(permit?.permissionType)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.orgName}</div>
      </td>
      <td className="text-center">
        <div className={`badge  fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionSource)?.className}`}>
          {intl.formatMessage({ id: handlePermissionSource(permit?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.recivedName}</div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionStatus(permit?.permissionStatus)?.className}`}>
          {intl.formatMessage({ id: handlePermissionStatus(permit?.permissionStatus)?.value })}
        </div>
      </td>
      {tabName == "PermitCancellation" && (
        <td className="text-center">
          <div
            onClick={
              CancellationReason === "Violation"
                ? () => setShowVoilation(true)
                : () => setShowReason(true)
            }
            className={`badge cursor-pointer text-decoration-underline   ${CancellationReason === "Violation"
              ? "badge-light-danger"
              : "badge-light-primary"
              } fw-bolder d-block mb-1 fs-6`}
          >
            {intl.formatMessage({ id: CancellationReason })}
          </div>
        </td>
      )}

      {showVoilation && (
        <div className="modal fade" aria-hidden="true">
          <ViolationPopup
            show={showVoilation}
            handleClose={() => setShowVoilation(false)}
          />
        </div>
      )}
      {showReason && (
        <div className="modal fade" aria-hidden="true">
          <ReasonPopup
            show={showReason}
            handleClose={() => setShowReason(false)}
          />
        </div>
      )}
    </>
  );
};

export default PermitTableList;
