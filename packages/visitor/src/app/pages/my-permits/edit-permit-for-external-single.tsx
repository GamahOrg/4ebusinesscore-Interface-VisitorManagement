import { FC } from "react";
import EditEntryPermitSingle from "./components/EditEntryPermitSingle";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const EditPermitForExternalSingle: FC = (props) => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/my-permits",
      defaultName: "MyPermits",
      name: "",
    },
    {
      path: "",
      defaultName: "EditPermitDataSingle",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        fixedTitle={true}
        defaultTitle="EditPermitDataSingle"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
      />
      <EditEntryPermitSingle />
    </>
  );
};
export default EditPermitForExternalSingle;
