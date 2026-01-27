import { FC } from "react";
import { useIntl } from "react-intl";
import { PermitsFollowTable } from "./PermitsFollowTable";

export const PermitsFollowDetails: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3">
                <h2 className="text-dark mb-3 fs-2 mt-10">
                  {intl.formatMessage({ id: "FollowPermits" })}
                </h2>
                <span className="text-muted fs-6">
                  {intl.formatMessage({
                    id: "ImportantInformationPermitsFollow",
                  })}
                </span>
                <PermitsFollowTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
