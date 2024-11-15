import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, width, height }) => {
  const options = {
    plugins: {
      responsive: true,
      legend: {
        display: false,
      },
    },
    cutout: '0%',
  };

  const finalData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        data: data.map(item => Math.round(item.usage)),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: width,
        height: height,
      }}
    >
      <Doughnut data={finalData} options={options} />
    </div>
  );
};

export default DoughnutChart;
