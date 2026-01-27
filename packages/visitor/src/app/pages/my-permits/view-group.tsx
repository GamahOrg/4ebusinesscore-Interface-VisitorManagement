import { FC } from "react";
import ViewGroupPermit from "./components/ViewGroupPermit";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const ViewGroup: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/my-permits",
      defaultName: "MyPermits",
      name: cardName || serviceName,
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
export default ViewGroup;
