import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Curved Line Chart',
        fill: true,
        lineTension: 0.4,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: '#981D1D',
        data: [12, 32, 30, 30, 40, 23, 25],
      },
    ],
  };
  
  
  const options = {
    scales: {
      x: {
        beginAtZero: false,
        grid: {
            display: false, // Remove x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
            color: 'rgba(0,0,0,0.1)', // Set color of the horizontal dashed lines
            borderColor: 'rgba(0,0,0,0.1)', // Set border color of the horizontal dashed lines
            borderDash: [10, 1], // Set the dash pattern (10 units of line, 5 units of gap)
            drawBorder: true, // Remove the axis border line
            zeroLineColor: 'transparent',// Remove x-axis grid lines
        },
        ticks: {
          stepSize: 10, // Set the step size to 10
        },
      },
    },
    cubicInterpolationMode: 'monotone',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

function ChartCard({ name, canceled, completed }) {
  return (
    <div className='w-[60%] min-h-[325px] p-5 bg-white rounded-lg'>
        <div className="h-5 w-full justify-between items-center flex">
            <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">{name}</div>
            <div className="justify-start items-start gap-[15px] flex">
                {completed && <div className="justify-start items-center gap-1.5 flex">
                    <div className="w-2 h-2 bg-red-800 rounded-[100px]" />
                    <div className="text-red-800 text-xs font-normal font-['Rubik'] leading-none">Completed</div>
                </div>}
                {canceled && <div className="justify-start items-center gap-1.5 flex">
                    <div className="w-2 h-2 bg-gray-400 rounded-[100px]" />
                    <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Canceled</div>
                </div>}
            </div>
        </div>
        <div className='h-[300px] mt-[34px] w-full'>
            <Line data={data} options={options} />
        </div>
    </div>
  )
}

export default ChartCard