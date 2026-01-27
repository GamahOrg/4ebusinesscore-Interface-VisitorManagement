import CustomBarChart from "./BarCharts";
import { useIntl } from "react-intl";

const PeakHours = () => {
  const intl = useIntl();

  const data = {
    labels: ["9-10", "10-11", "11-12", "12-1", "1-2", "2-3"],
    datasets: [
      {
        label: intl.formatMessage({ id: "PeakHours" }),
        data: [20, 60, 40, 10, 100, 30],
        backgroundColor: [
          "#36a2eb",
          "gray",
          "#36a2eb",
          "#36a2eb",
          "gray",
          "#36a2eb",
        ],
      },
    ],
  };
  return (
    <>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <label className="form-label fs-6 fw-bold">
          {intl.formatMessage({ id: "Management" })}
        </label>
        <select
          className="form-select form-select-solid fw-bolder"
          data-kt-select2="true"
          data-placeholder="Select option"
          data-allow-clear="true"
          data-kt-user-table-filter="role"
          data-hide-search="true"
        >
          <option value="">{intl.formatMessage({ id: "Management" })}</option>
          <option value="">إدارة المعرفة</option>
          <option value="">إدارة المالبه</option>
          <option value="">إدارة المشاريع</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="outputDate"
          className="form-label px-2  fontSz-6"
        >
          {intl.formatMessage({ id: "From" })}
        </label>
        <input
          id="outputDate"
          type="date"
          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
          placeholder={intl.formatMessage({ id: "From" })}
        />
      </div>
      <div>
        <label
          htmlFor="outputDate"
          className="form-label px-2  fontSz-6"
        >
          {intl.formatMessage({ id: "To" })}
        </label>
        <input
          id="outputDate"
          type="date"
          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
          placeholder={intl.formatMessage({ id: "To" })}
        />
      </div>
    </div>
      <CustomBarChart chartData={data} />
    </>
  );
};

export default PeakHours;
