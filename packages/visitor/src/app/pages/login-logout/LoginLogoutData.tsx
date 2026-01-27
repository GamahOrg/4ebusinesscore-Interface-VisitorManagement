import { FC } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import LoginLogoutBody from "./components/LoginLogoutBody";

const LoginLogoutData: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "LoginAndLogout",
      name: cardName || serviceName,
    },
  ];

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  return (
    <>
      <div
        id="kt_toolbar_container"
        className="container-xxl d-flex flex-stack flex-wrap px-0 toolbar "
      >
        <DynamicToolbar
          defaultTitle={"LoginAndLogout"}
          extraTitle={serviceName || cardName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName || serviceName}
        />
      </div>

      <div className="content-section">
        <LoginLogoutBody />
      </div>
    </>
  );
};

export default LoginLogoutData;
