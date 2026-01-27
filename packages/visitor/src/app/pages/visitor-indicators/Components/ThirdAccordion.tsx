import React from "react";
import CustomBarChart from "./BarCharts";
import { useIntl } from "react-intl";

const PermissionStatus = () => {
  const intl = useIntl();

  const data = {
    labels: [
      'تحت المراحعه',
      "موافقة",
      "سارية",
      "مرفوضة",
      "ملغية",
      "متتهية",
    ],
    datasets: [
      {
        label: "",
        data: [10, 50, 40, 20, 4, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "#5C5454",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "#534A4A",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <CustomBarChart chartData={data} />;
};

export default PermissionStatus;
