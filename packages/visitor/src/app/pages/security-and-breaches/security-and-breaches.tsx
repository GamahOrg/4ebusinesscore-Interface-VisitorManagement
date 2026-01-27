import { FC } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { SecurityAndBreachesHome } from "./components/SecurityAndBreachesHome";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import {useLocation} from "react-router-dom"


const SecurityAndBreaches: FC = () => {
  const intl = useIntl();
  let location = useLocation();
  let cardName = location?.state?.cardTitle || location?.state?.serviceName
  let cardId = location?.state?.cardId
  const breadcrumbItems = [
    { path: '', defaultName: 'SecurityAndBreaches', name: cardName },
]
  return (
    <>
      <div className="d-flex flex-stack flex-wrap flex-sm-nowrap justify-content-between align-items-center"
      >
      <DynamicToolbar
      defaultTitle={"SecurityAndBreaches"} 
      extraTitle={cardName}
        breadcrumbItems={breadcrumbItems} 
        showWorkspace={true} 
        cardId={cardId}
        cardOption={cardName} />

        <div className="d-flex align-items-center py-3 py-md-1 gap-3">
          <div className="d-flex align-items-center py-3 py-md-1">
            <Link
              state={{
                cardTitle: cardName,
              }}
              to="/security-and-breaches/add-violation"
              className="btn btn-bg-white btn-active-color-primary"
            >
              {intl.formatMessage({ id: "AddViolation" })}
            </Link>
          </div>
        </div>
      </div>

      <SecurityAndBreachesHome />
    </>
  );
};
export default SecurityAndBreaches;
