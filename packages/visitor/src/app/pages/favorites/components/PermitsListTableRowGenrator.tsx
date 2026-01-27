import { Actions } from "./Actions";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { FC, useReducer } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ActionsGroup } from "./ActionsGroup";

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

const PermitsListTableRowGenrator: FC<any> = ({ permit, setPermitData }) => {
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
    PermitStatus,
    Options,
  } = permit;

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
      {permit.Options !== "Person" && (
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
              <Link
                to={""}
                className="d-flex justify-content-start flex-column"
              >
                <div className="text-primary fw-bolder text-hover-primary mb-1 fs-6">
                  {GroupNumber}
                </div>
              </Link>
            </div>
          </td>
        </>
      )}

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
      {permit.Options !== "Person" && (
        <td className="text-center">
          <div className="text-dark fw-bolder d-block mb-1 fs-6">{Number}</div>
        </td>
      )}
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
          className={`badge ${
            PermitSource === "داخلي"
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
        <div
          className={`badge ${
            PermitStatus === "موافقة" && "badge-light-success"
          }
          ${PermitStatus === "سارية" && "badge-light-primary"}
          ${PermitStatus === "منتهية" && "badge-secondary"}
          ${PermitStatus === "ملغية" && "badge-light-danger"}
          ${PermitStatus === "مرفوضة" && "badge-light-danger"}
          ${PermitStatus === "تحت المراجعة" && "badge-light-warning"}
            `}
        >
          {PermitStatus}
        </div>
      </td>
      {Options == "Person" ? (
        <td className="text-center">
          <Actions id={id} permit={permit} />
        </td>
      ) : (
        <td className="text-center">
          <ActionsGroup id={id} permit={permit} />
        </td>
      )}
    </>
  );
};

export default PermitsListTableRowGenrator;
