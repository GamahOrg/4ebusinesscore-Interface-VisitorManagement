import { FC } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { ViewSinglePermit } from "./components/ViewSinglePermit";
import { useLocation } from 'react-router-dom';

interface PermitData {
  id: number;
  GroupNumber: string;
  PermitNumber: string;
  VisitorName: string;
  WhatsAppNumber: string;
  Number: string;
  PermitReason: string;
  AuthorizingAuthority: string;
  PermitSource: string;
  visitReceiver: string;
  PermitDateStart: string;
  PermitDateEnd: string;
  PermitTimeStart: string;
  PermitTimeEnd: string;
  PermitStatus: string;
  Options: string;
  Persons?: PermitData[];
  clicked?: boolean;
}


const ViewPermit: FC = () => {
  const { search } = window.location;
  const queryParams = new URLSearchParams(search);
  const entryPoint = queryParams.get("intry");
  const location = useLocation();
  let cardName = location?.state?.cardTitle
  let cardId = location?.state?.cardId
  let partTitle = location?.state?.partTitle || location?.state?.extraState

  const permitStatus = location.state?.PermitStatus;
  const permitId = location.state?.id;




  const breadcrumbItems = [
    {
      path: "/permissions-Permits",
      defaultName: "PermitsManager",
      name: "",
    },
    {
      path: "",
      defaultName: "ViewPermit",
      name: "",
    },
  ];


  return (
    <>
      <DynamicToolbar defaultTitle={"ViewPermit"} fixedTitle={true} extraTitle={""} breadcrumbItems={breadcrumbItems} showWorkspace={true} cardId={cardId} cardOption={cardName} extraState={partTitle} />
      <ViewSinglePermit id={permitId} permit={permitStatus} />
    </>
  );
};
export default ViewPermit;
