import { FC } from "react";
import { PermitsFollowDetails } from "./components/PermitsFollowDetails";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const PermitsFollow: FC = () => {
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
      path: "",
      defaultName: "FollowPermits",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle="FollowPermits"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <PermitsFollowDetails />
    </>
  );
};

export default PermitsFollow;
