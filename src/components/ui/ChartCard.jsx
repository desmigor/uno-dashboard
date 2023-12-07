import React, { Fragment } from "react";
import { Line } from "react-chartjs-2";
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
import { useDispatch } from "react-redux";
import {
  fetchRevenueAnalyticsAction,
  fetchDeliveryAnalyticsAction,
} from "../../redux/actions/fetchAnalyticsAction";
import { Tab } from "@headlessui/react";

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
      display: false,
      beginAtZero: false,
      grid: {
        display: true, // Remove x-axis grid lines
      },
      // configure behaviour of the display
      ticks: {
        position: "top",
        display: true,
        // display in horizontal, not vertical
        align: "center",
        // font
        font: {
          size: 8,
          family: "Rubik",
          weight: "400",
        },
        // padding
        padding: 0,
        // display in horizontal, not vertical
        maxRotation: 10,
      },
    },
    y: {
      beginAtZero: false,
      grid: {
        color: "rgba(0,0,0,0.1)", // Set color of the horizontal dashed lines
        borderColor: "rgba(0,0,0,0.1)", // Set border color of the horizontal dashed lines
        borderDash: [10, 1], // Set the dash pattern (10 units of line, 5 units of gap)
        drawBorder: true, // Remove the axis border line
        zeroLineColor: "transparent", // Remove x-axis grid lines
      },
      // ticks: {
      //   stepSize: 10000, // Set the step size to 10
      // },
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

function ChartCard({
  name,
  canceled,
  completed,
  data,
  filterByWeek,
  delivery = false,
}) {
  const dispatch = useDispatch();

  return (
    <div className="w-[60%] min-h-[425px] p-5 bg-white rounded-lg">
      <div className="h-5 w-full justify-between items-center flex">
        <div className="text-zinc-800 text-base font-semibold font-rubik leading-tight">
          {name}
        </div>
        <div className="justify-start items-center gap-8 flex">
          {completed && (
            <div className="justify-start items-center gap-1.5 flex mt-8">
              <div className="w-2 h-2 bg-red-800 rounded-[100px]" />
              <div className="text-red-800 text-xs font-normal font-rubik leading-none">
                Completed
              </div>
            </div>
          )}
          {canceled && (
            <div className="justify-start items-center gap-1.5 flex mt-8">
              <div className="w-2 h-2 bg-gray-400 rounded-[100px]" />
              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
                Canceled
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[300px] mt-[34px] w-full">
      <div className="justify-end items-center gap-8 flex">
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="w-2 h-2 bg-zinc-800 rounded-[100px]" />
            <div className="text-zinc-800 font-normal font-rubik leading-none">
              Filter
            </div>
          </div>
          <Tab.Group manual>
            <Tab.List className=" h-12 bg-neutral-100 rounded-[10px] border border-gray-100 justify-between items-center inline-flex">
              <Tab as={Fragment}>
                
                {({ selected }) => (
                  <div
                    class={
                      " h-9 px-[18px] py-1 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                      (selected ? " bg-white" : "")
                    }
                    onClick={() => {
                      dispatch(
                        delivery
                          ? fetchDeliveryAnalyticsAction()
                          : fetchRevenueAnalyticsAction()
                      );
                    }}
                  >
                    <div
                      class={
                        "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
                        (selected ? " text-zinc-800" : " text-slate-500")
                      }
                    >
                      By days
                    </div>
                  </div>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    class={
                      " h-9 px-[18px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                      (selected ? " bg-white" : "")
                    }
                    onClick={() => {
                      dispatch(
                        delivery
                          ? fetchDeliveryAnalyticsAction({ filter: "weekly" })
                          : fetchRevenueAnalyticsAction({ filter: "weekly" })
                      );
                    }}
                  >
                    <div
                      class={
                        "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
                        (selected ? " text-zinc-800" : " text-slate-500")
                      }
                    >
                      By weeks
                    </div>
                  </div>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    class={
                      " h-9 px-[8px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                      (selected ? " bg-white" : "")
                    }
                    onClick={() => {
                      dispatch(
                        delivery
                          ? fetchDeliveryAnalyticsAction({
                              filter: "monthly",
                            })
                          : fetchRevenueAnalyticsAction({ filter: "monthly" })
                      );
                    }}
                  >
                    <div
                      class={
                        "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
                        (selected ? " text-zinc-800" : " text-slate-500")
                      }
                    >
                      By months
                    </div>
                  </div>
                )}
              </Tab>
            </Tab.List>
          </Tab.Group>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartCard;
