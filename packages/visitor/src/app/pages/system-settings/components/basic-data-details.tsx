import { FC } from "react";
import { useIntl } from "react-intl";

const BasicDataDetails: FC = () => {
  const intl = useIntl();

  interface IBasicDataDetails {
    id: number;
    name: string;
  }
  const optionsOne: IBasicDataDetails[] = [
    {
      id: 1,
      name: intl.formatMessage({ id: "CEOWorkspace" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "ProjectsManagement" }),
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "KnowledgeWorkspace" }),
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "CommitteesWorkspace" }),
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "TechnicalSupportManagement" }),
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "AdminPanelWorkspace" }),
    },
    {
      id: 7,
      name: intl.formatMessage({ id: "InstitutionalPerformance" }),
    },
  ];
  const optionsTwo: IBasicDataDetails[] = [
    {
      id: 1,
      name: intl.formatMessage({ id: "PmoReports" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "GeneralApproval" }),
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Risks" }),
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "ProblemsAndChallenges" }),
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "ChangeRequests" }),
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "FormsAndOperationsGuide" }),
    },
    {
      id: 7,
      name: intl.formatMessage({ id: "TrackRequests" }),
    },
  ];
  const optionsThree: IBasicDataDetails[] = [
    {
      id: 1,
      name: intl.formatMessage({ id: "ProjectFeasibility" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "ProjectDetails" }),
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "AddressesAndAppointments" }),
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "ClassificationField" }),
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "QuantitiesAreWorthIt" }),
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "GeneralProvisions" }),
    },
    {
      id: 7,
      name: intl.formatMessage({ id: "DocumentationAndPreparationOfOffers" }),
    },
  ];
  return (
    <>
      <div className="mb-4">
        <div className="card card-xl-stretch mb-xl-0">
          <div className="card-header px-3 pt-3 pb-2 mb-3  d-flex justify-content-between">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fs-4 fw-bolder  my-5 ">
                {intl.formatMessage({ id: "PleaseChooseFromTheFollowingData" })}{" "}
              </span>
            </h3>
          </div>
          <div className="card-body py-3 px-3">
            <div className="tab-content">
              <div className="row d-flex justify-content-center mx-5">
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <div className="d-flex flex-column mb-5 fv-row">
                    <label className="form-label px-2 fontSz-6">
                      <span>{intl.formatMessage({ id: "SystemName" })}</span>
                    </label>
                    <select
                      name="position"
                      data-control="select2"
                      data-placeholder="Select a position..."
                      className="form-select form-select-solid"
                    >
                      {optionsOne.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <div className="d-flex flex-column mb-5 fv-row">
                    <label className="form-label px-2 fontSz-6">
                      <span>{intl.formatMessage({ id: "Cardname" })}</span>
                    </label>
                    <select
                      name="position"
                      data-control="select2"
                      data-placeholder="Select a position..."
                      className="form-select form-select-solid"
                    >
                      {optionsTwo.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <div className="d-flex flex-column mb-5 fv-row">
                    <label className="form-label px-2 fontSz-6">
                      <span>{intl.formatMessage({ id: "ScreenName" })}</span>
                    </label>
                    <select
                      name="position"
                      data-control="select2"
                      data-placeholder="Select a position..."
                      className="form-select form-select-solid"
                    >
                      {optionsThree.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { BasicDataDetails };
