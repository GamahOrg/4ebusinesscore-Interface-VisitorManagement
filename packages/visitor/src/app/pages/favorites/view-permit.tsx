import { FC } from "react";
import { ViewSinglePermit } from "./components/ViewSinglePermit";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const ViewPermit: FC = () => {
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
      defaultName: "ViewPermit",
      name: cardName || serviceName,
    },
  ];

  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle="ViewPermit"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <ViewSinglePermit />
    </>
  );
};
export { ViewPermit };
