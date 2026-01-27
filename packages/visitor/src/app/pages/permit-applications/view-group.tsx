import { FC } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import ViewGroupPermit from "./components/ViewGroupPermit";
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
const ViewGroup: FC = () => {
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
      defaultName: "ViewGroup",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar defaultTitle={"ViewGroup"} fixedTitle={true} extraTitle={""} breadcrumbItems={breadcrumbItems} showWorkspace={true} cardId={cardId} cardOption={cardName} extraState={partTitle} />
      <ViewGroupPermit id={permitId} permit={permitStatus} />
    </>
  );
};
export default ViewGroup;
