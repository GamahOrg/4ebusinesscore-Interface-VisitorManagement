import { FC, useReducer } from "react";
import { useIntl } from "react-intl";
import { handlePermissionSource, handlePermissionStatus, handlePermissionType } from "../utils/permitApplicationUtil";


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

export const PermitTableSomeGroupList: FC<any> = ({
  permit,
  setSelectedPermits,
}) => {

  const intl = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleToggle = (id: number) => {
    dispatch({ type: "toggle", id });
  };

  const toggleClicked = (id: number, isChecked: boolean) => {
    setSelectedPermits(prevData => {
      if (isChecked) {
        return [...prevData, id];
      } else {
        return prevData.filter(permitId => permitId !== id);
      }
    });
  };


  return (
    <>
      <td>
        <div className=" d-inline-block  me-4 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
          <input
            className="form-check-input widget-9-check xCheckBg"
            type="checkbox"
            id="Checkboxes1"
            onChange={(e) => toggleClicked(permit?.visitorId, e.target.checked)}
          />
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.permissionCode}#
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">
          {permit?.visitorName || intl.formatMessage({
            id: "NotFound"
          })}
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
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionSource(permit?.permissionSource)?.className}`}>
          {intl.formatMessage({ id: handlePermissionSource(permit?.permissionSource)?.value })}
        </div>
      </td>
      <td className="text-center">
        <div className="text-dark fw-bolder d-block mb-1 fs-6">{permit?.recivedName || intl.formatMessage({ id: "NotFound" })}</div>
      </td>
      <td className="text-center">
        <div className={`badge fw-bolder d-block mb-1 fs-6 ${handlePermissionStatus(permit?.permissionStatus)?.className}`}>
          {intl.formatMessage({ id: handlePermissionStatus(permit?.permissionStatus)?.value })}
        </div>
      </td>
    </>
  );
};
