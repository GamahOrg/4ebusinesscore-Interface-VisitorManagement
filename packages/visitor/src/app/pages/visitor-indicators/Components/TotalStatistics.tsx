import React from "react";
import { useIntl } from "react-intl";

const TotalStatistics = () => {
  const intl = useIntl();
  const statisticsCards = [
    {
      icon: "fa-solid fa-arrow-down-wide-short fa-lg text-dark",
      title: intl.formatMessage({ id: "AllPermissions" }),
      percentage: 50,
      value: 4,
      cardClass: "dark",
    },
    {
      icon: "fa-solid fa-right-to-bracket fa-lg text-primary",
      title: intl.formatMessage({ id: "LoginPermissions" }),
      percentage: 50,
      value: 6,
      cardClass: "primary",
    },
    {
      icon: "fal fa-inbox-in fa-lg text-success",
      title: intl.formatMessage({ id: "InternalPermissions" }),
      percentage: 15,
      value: 6,
      cardClass: "success",
    },
    {
      icon: "fas bi-archive-fill fa-lg text-danger",
      title: intl.formatMessage({ id: "Archive" }),
      percentage: 76,
      value: 8,
      cardClass: "danger",
    },
  ];

  return (
    <div>
      <div className="row d-flex flex-wrap">
        {statisticsCards.map((card, index) => (
          <div className="col-sm-6 col-12 col-sm-4 col-lg" key={index}>
            <div
              className="p-5 rounded d-flex align-items-center shadow-sm"
              key={index}
            >
              <div className="w-100">
                <div className="d-flex flex-row align-items-center">
                  <div
                    className={`bg-${card.cardClass} bg-opacity-10 rounded-circle p-2 d-flex flex-column align-items-center justify-content-center w-30px h-30px`}
                  >
                    <i className={card.icon}> </i>
                  </div>
                  <span className="ms-3 fs-3">{card.title}</span>
                </div>
                <div className="d-flex align-items-center my-4">
                  <span className="h4 mb-0 fw-bolder">{card.value}</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <div
                    className={`bg-${card.cardClass} text-${card.cardClass} bg-opacity-10 rounded p-2 d-flex align-items-center justify-content-center w-70px`}
                  >
                    20%
                    <i className='fa-solid fa-square-up-right fa-lg mx-2'> </i>
                  </div>
                  <span className="text-gray-400 fs-6">{intl.formatMessage({ id: "ComaredByLastMonth" })}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalStatistics;
