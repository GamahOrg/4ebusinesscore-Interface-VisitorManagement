import { useIntl } from "react-intl";
import LoginLogoutTable from "./LoginLogoutTable";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import QrCode from "../popup/qrCode";
import { useState } from "react";

const LoginLogoutBody = ({ }) => {
  const [ShowPopUp, setShowPopUp] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isTransit, setIsTransit] = useState(true);
  const [loginChecked, setLoginChecked] = useState(true);
  const [logoutChecked, setLogoutChecked] = useState(true);

  const getTransitStatus = () => {
    if (loginChecked && logoutChecked) return 3;
    if (loginChecked) return 0;
    if (logoutChecked) return 1;
    return 2;
  };

  const intl = useIntl();

  const handleShowPopupClick = () => {
    const hasPermission = false;
    if (!hasPermission) {
      setShowPopUp(true);
    }
  };

  const handleClose = () => {
    setShowPopUp(false);
  };


  return (
    <div>
      <div className="card card-xl-stretch mb-xl-8 px-10">
        <h3 className="mt-12">
          {intl.formatMessage({ id: "LoginAndLogout" })}
        </h3>
        <p className="mt-1 text-gray-600">
          {intl.formatMessage({ id: "ScanTheCodeToLogVisitorsInAndOut" })}
        </p>
        <div className="d-flex justify-content-between align-items-center my-5 w-100 flex-md-nowrap flex-wrap">
          <div className="d-flex gap-3 w-md-75 w-100 flex-md-nowrap flex-wrap">
            <div className="d-flex align-items-center position-relative w-100">
              <KTSVG
                path="/media/icons/duotune/general/gen021.svg"
                className="svg-icon-1 position-absolute text-muted mx-3"
              />

              <input
                type="text"
                name="search"
                className="form-control form-control-solid ps-10 pr-2"
                placeholder={intl.formatMessage({ id: "Search" })}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <input
              type="date"
              className="form-control form-control-solid"
              placeholder={intl.formatMessage({
                id: "Date",
              })}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="d-flex gap-2 px-2 border border-gray-300 border-1 rounded flex-md-nowrap flex-wrap">
              <div className="form-check form-check-custom form-check-solid py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  name="login"
                  checked={loginChecked}
                  onChange={(e) => setLoginChecked(e.target.checked)}
                />
                <label className="form-check-label">
                  {intl.formatMessage({ id: "Login" })}{" "}
                </label>
              </div>
              <div className="form-check form-check-custom form-check-solid py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  name="logout"
                  checked={logoutChecked}
                  onChange={(e) => setLogoutChecked(e.target.checked)}
                />
                <label className="form-check-label">
                  {intl.formatMessage({ id: "LogOut1" })}{" "}
                </label>
              </div>
              <div className="form-check form-check-custom form-check-solid py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  name="forbid"
                  checked={!isTransit}
                  onChange={(e) => setIsTransit(!e.target.checked)}
                />
                <label className="form-check-label">
                  {intl.formatMessage({ id: "Forbid" })}{" "}
                </label>
              </div>
            </div>
          </div>
          <button className="btn btn-primary px-3"
            onClick={handleShowPopupClick}>
            <i className="fas fa-qrcode" style={{ fontSize: "24px" }}></i>
          </button>
        </div>
        <LoginLogoutTable
          searchText={searchText}
          selectedDate={selectedDate}
          isTransit={isTransit}
          transitStatus={getTransitStatus()}
        />
      </div>
      <div>
        <QrCode
          show={ShowPopUp}
          handleClose={handleClose}
          handleCloseLogin={handleClose}
          searchText={searchText}
          selectedDate={selectedDate}
          isTransit={isTransit}
          transitStatus={getTransitStatus()}
        >
        </QrCode>
      </div>
    </div>

  );
};

export default LoginLogoutBody;
