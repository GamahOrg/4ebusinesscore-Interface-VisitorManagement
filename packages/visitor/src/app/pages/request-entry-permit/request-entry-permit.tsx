import { FC } from "react";
import { RequestAnEntryPermitHome } from "./components/RequestAnEntryPermitHome";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const RequestAnEntryPermit: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "",
      defaultName: "RequestAnEntryPermit",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle="RequestAnEntryPermit"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <RequestAnEntryPermitHome />
    </>
  );
};
export default RequestAnEntryPermit;
