import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { Tabs } from "./components/tabs";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { PermitAmendmentRequests } from "./components/permit-amendment-requests";
import { AdditionPermitsRequests } from "./components/addition-permits-requests";
import { PermitCancellationRequests } from "./components/permit-cancellation-requests";
import { RenewalPermitsRequests } from "./components/renewal-permits-requests";
import { PermitApplicationsTable } from "./components/permit-applications-table";
import { useIntl } from "react-intl";

const PermitApplications = () => {
  const intl = useIntl();
  const location = useLocation();
  let cardName = location?.state?.cardTitle
  let cardId = location?.state?.cardId
  let partTitle = location?.state?.partTitle || location?.state?.extraState

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "PermitsManager",
      name: "",
    },
  ];

  const [tabName, setTabName] = useState("PermitApplications")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <DynamicToolbar defaultTitle={"PermitsManager"} fixedTitle={true} extraTitle={""} breadcrumbItems={breadcrumbItems} showWorkspace={true} cardId={cardId} cardOption={cardName} extraState={partTitle} />
      {/* <Tabs /> */}

      <div className="card mb-5 mb-xl-8 position-relative">
        <div className="card-header px-3 pt-3 pb-2 mb-3">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fs-4 my-5 ">
              {intl.formatMessage({ id: "PermitsManager" })}
            </span>
            <span className="mt-1 fw-semibold fs-6 text-muted my-5">
              {intl.formatMessage({
                id: "AllPermitsApprovalsAwaitingApproval",
              })}
            </span>
          </h3>
        </div>
        <div className="card-body py-3" >      {tabName === "PermitApplications" && <PermitApplicationsTable
          tabName={tabName} setTabName={setTabName} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        />
        }
          {tabName === "PermitAmendment" && <PermitAmendmentRequests tabName={tabName} setTabName={setTabName} />}
          {tabName === "AdditionPermits" && <AdditionPermitsRequests tabName={tabName} setTabName={setTabName} />}
          {
            tabName === "PermitCancellation" && <PermitCancellationRequests
              tabName={tabName} setTabName={setTabName}
            />
          }
          {tabName === "PermitRenewal" && <RenewalPermitsRequests tabName={tabName} setTabName={setTabName} />}</div >
      </div>















    </>
  );
};

export default PermitApplications;
