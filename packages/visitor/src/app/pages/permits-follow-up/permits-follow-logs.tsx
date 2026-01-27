import { FC } from "react";
import { PermitFollowTabs } from "./components/PermitFollowTabs";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const PermitsFollowLogs: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/permits-list",
      defaultName: "PermitsList",
      name: "",
    },
    {
      path: "/permits-follow",
      defaultName: "FollowPermits",
      name: "",
    },
    {
      path: "",
      defaultName: `PermitFollow`,
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle={`PermitFollow`}
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <PermitFollowTabs />
    </>
  );
};

export default PermitsFollowLogs;
