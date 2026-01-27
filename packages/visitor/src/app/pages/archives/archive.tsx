import { FC } from "react";
import { PermitsListDetails } from "./components/PermitsListDetails";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const Archive: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "",
      defaultName: "Archive",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle="Archive"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <PermitsListDetails />
    </>
  );
};
export default Archive;
