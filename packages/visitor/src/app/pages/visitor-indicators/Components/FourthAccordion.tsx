import React from "react";
import CustomLineChart from "./LineCharts";

const MoreVisited = () => {
  const data = {
    labels: [
      "إدازة المعرفة",
      "إدارة المالية",
      "إدارة المستودعات",
      "إدارة الموارد البشرية",
      "إدارة الاستثمار",
    ],
    datasets: [
      {
        label: "",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return <CustomLineChart chartData={data} />;
};

export default MoreVisited;
