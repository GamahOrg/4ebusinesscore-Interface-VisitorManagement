import React from "react";
import CustomLineChart from "./LineCharts";
import { useIntl } from "react-intl";

const TopRatingStatistics = () => {
  const intl = useIntl();

  const data = {
    labels: [
      intl.formatMessage({ id: "Meeting1" }),
      intl.formatMessage({ id: "Meeting2" }),
      intl.formatMessage({ id: "Meeting3" }),
      intl.formatMessage({ id: "Meeting4" }),
    ],
    datasets: [
      {
        label: "",
        data: [65, 59, 80, 55, 40],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return <CustomLineChart chartData={data} />;
};

export default TopRatingStatistics;
