import { Bar } from 'react-chartjs-2';

const CustomBarChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
  }
  };
  return (
    <div>
      <Bar data={chartData} options={options}/>
    </div>
  );
};

export default CustomBarChart;
