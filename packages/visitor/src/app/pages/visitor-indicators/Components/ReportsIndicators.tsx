import { FC } from "react";
import { useIntl } from "react-intl";
import TotalStatistics from "./TotalStatistics";
import { Accordion } from "react-bootstrap";
import MoreVisited from "./FourthAccordion";
import PermissionStatus from "./ThirdAccordion";
import PermissionType from "./SecondAccordion";
import PermissionsNumber from "./FifthAccordion";
import PeakHours from "./PeakHours";

const ReportsIndicators: FC = () => {
  const intl = useIntl();

  const EN_LANG = "en";
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = selectedLang && JSON.parse(selectedLang).selectedLang;
  } catch (err) {
  }

  const statisticsData = [
    {
      id: "1",
      title: intl.formatMessage({ id: "TotalsStatistics" }),
      content: <TotalStatistics />,
      cols: "mb-3 col-12",
    },
    {
      id: "2",
      title: intl.formatMessage({ id: "PermissionsStatus" }),
      content: <PermissionStatus />,
      cols: "mb-3 col-12 col-md-6",
    },
    {
      id: "3",
      title: intl.formatMessage({ id: "MoreManegamentVisited" }),
      content: <MoreVisited />,
      cols: "mb-3 col-12 col-md-6",
    },
    {
      id: "4",
      title: intl.formatMessage({ id: "PermissiionsType" }),
      content: <PermissionType />,
      cols: "mb-3 col-12 col-md-6",
    },
    {
      id: "5",
      title: intl.formatMessage({ id: "PermossionsNumber" }),
      content: <PermissionsNumber />,
      cols: "mb-3 col-12 col-md-6",
    },
    {
      id: "6",
      title: intl.formatMessage({ id: "PeakHours" }),
      content: <PeakHours />,
      cols: "mb-3 col-12 col-md-6",
    },
  ];

  return (
    <div className="card card-xl-stretch mb-xl-8">
      <div className="card-body pt-0 mt-8">
        <div className="row">
          {statisticsData.map((item, index) => (
            <div className={item.cols} key={item.id}>
              <Accordion defaultActiveKey={`${index + 1}`}>
                <Accordion.Item
                  eventKey={item.id}
                  className={`standards-accordion-button ${
                    index != 0 ? "mt-5" : "mb-3"
                  }`}
                  key={index}
                >
                  <Accordion.Header
                    className={`border-${
                      selectedLang == EN_LANG ? "start" : "end"
                    } d-flex border-primary border-4 border-bottom-0 bg-transparent`}
                  >
                    <span className="text-primary h3 fw-bolder d-flex align-items-center">
                      <i
                        className={`fa-solid fa-angle-${
                          selectedLang == EN_LANG ? "right" : "left"
                        } fs-2x mx-2`}
                      ></i>
                      {intl.formatMessage({ id: item.title })}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>{item.content}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ReportsIndicators };
