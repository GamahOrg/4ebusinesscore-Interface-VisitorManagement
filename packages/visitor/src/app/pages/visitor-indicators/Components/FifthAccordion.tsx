import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useIntl } from "react-intl";

const PermissionsNumber = () => {
  const intl = useIntl();

  const data = {
    labels: [
      "تصريح فرد",
      "تصريح مجموعة",
    ],
    datasets: [
      {
        data: [200, 200],
        backgroundColor: ["#9A36EB", "#FF8263"],
        hoverBackgroundColor: ["#9A36EB", "#FF8263"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    width: 400,
    height: 400,
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PermissionsNumber;