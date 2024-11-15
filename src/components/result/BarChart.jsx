import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ ChartData, width, height }) => {
  const options = {
    scales: {
      x: {
        ticks: {
          padding: 5,
        },
        grid: {
          drawBorder: false,
          display: true,
          drawTicks: false,
        },
      },
      y: {
        ticks: {
          padding: 5,
        },
        grid: {
          drawTicks: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (data) {
            return '사용 시간:' + data.formattedValue + '(분)';
          },
        },
      },
      datalabels: {
        formatter: function (value) {
          //custom money icon
          return '₺' + new Intl.NumberFormat('tr-TR').format(value);
        },
        color: 'white',
        font: {
          weight: 'bold',
          size: 14,
          family: 'poppins',
        },
      },
    },
  };
  // The following colors will be used sequentially for the chart bars
  const backgroundColors = ['#53D9D9', '#002B49', '#0067A0'];
  const data = {
    labels: ChartData.map(item => item.time),
    datasets: [
      {
        label: ChartData.map(item => item.usage),
        data: ChartData.map(item => item.usage),
        backgroundColor: backgroundColors,
        borderWidth: 1,
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
      <Bar data={data} options={options} width={width} height={height} />
    </div>
  );
};

export default BarChart;
