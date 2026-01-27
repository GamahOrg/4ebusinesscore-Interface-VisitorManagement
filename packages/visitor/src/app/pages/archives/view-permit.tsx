import { FC } from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { ViewSinglePermit } from "../permits-list/components/ViewSinglePermit";

const ViewPermitForArchive: FC = (props) => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/archive-favorites",
      defaultName: "Archive",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "ViewPermit",
      name: "",
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
export default ViewPermitForArchive;
