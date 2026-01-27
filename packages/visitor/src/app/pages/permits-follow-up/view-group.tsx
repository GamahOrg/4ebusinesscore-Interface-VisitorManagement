import { FC } from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import ViewGroupPermit from "../permits-list/components/ViewGroupPermit";

const ViewGroupForFollow: FC = () => {
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
      defaultName: "ViewGroup",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle="ViewGroup"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <ViewGroupPermit />
    </>
  );
};
export default ViewGroupForFollow;
