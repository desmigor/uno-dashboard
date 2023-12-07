import React, { Fragment } from "react";
import { Line } from "react-chartjs-2";
import { Menu, Transition } from "@headlessui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
        color: "rgba(0,0,0,0.1)", // Set color of the horizontal dashed lines
        borderColor: "rgba(0,0,0,0.1)", // Set border color of the horizontal dashed lines
        borderDash: [10, 1], // Set the dash pattern (10 units of line, 5 units of gap)
        drawBorder: true, // Remove the axis border line
        zeroLineColor: "transparent", // Remove x-axis grid lines
      },
      ticks: {
        stepSize: 10, // Set the step size to 10
      },
    },
    y1: {
      beginAtZero: true,
      grid: {
        color: "rgba(0,0,0,0.1)", // Set color of the horizontal dashed lines
        borderColor: "rgba(0,0,0,0.1)", // Set border color of the horizontal dashed lines
        borderDash: [10, 1], // Set the dash pattern (10 units of line, 5 units of gap)
        drawBorder: true, // Remove the axis border line
        zeroLineColor: "transparent", // Remove x-axis grid lines
      },
      ticks: {
        stepSize: 10, // Set the step size to 10
      },
    },
  },
  cubicInterpolationMode: "monotone",
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

function ChartCard({ name, canceled, completed, data, filterByWeek, filterByMonth }) {
  return (
    <div className="w-[60%] min-h-[325px] p-5 bg-white rounded-lg">
      <div className="h-5 w-full justify-between items-center flex">
        <div className="text-zinc-800 text-base font-semibold font-rubik leading-tight">
          {name}
        </div>
        <div className="justify-start items-start gap-[15px] flex">
          <Menu>
            <div className="">
              <Menu.Button>
                <div className="flex flex-row px-2 font-rubik text-sm">
                  <div>Filter :</div>
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="w-[158px] h-30 p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-2 inline-flex z-10">
                  <Menu.Item>
                    <button
                      className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                      onClick={() => {}}
                    >
                      <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">
                        By week
                      </div>
                    </button>
                  </Menu.Item>

                  <div className="w-full h-[1px] bg-[#D0D4D9]" />
                  <Menu.Item>
                    <button
                      className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                      onClick={() => {}}
                    >
                      <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">
                        By Month
                      </div>
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
          {completed && (
            <div className="justify-start items-center gap-1.5 flex">
              <div className="w-2 h-2 bg-red-800 rounded-[100px]" />
              <div className="text-red-800 text-xs font-normal font-rubik leading-none">
                Completed
              </div>
            </div>
          )}
          {canceled && (
            <div className="justify-start items-center gap-1.5 flex">
              <div className="w-2 h-2 bg-gray-400 rounded-[100px]" />
              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
                Canceled
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[300px] mt-[34px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartCard;
