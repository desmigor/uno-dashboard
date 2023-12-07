import React, { useEffect, useState } from "react";
import {
  format,
  addWeeks,
  addMonths,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import { Menu } from "@headlessui/react";
import NameComponent from "../../../components/ui/NameComponent";
import Dashcard from "../../../components/ui/dashcard";
import Money from "../../../assets/images/dashboard/icon/money-recive.svg";
import Millage from "../../../assets/images/dashboard/icon/milleage.svg";
import Box from "../../../assets/images/dashboard/icon/box2.svg";
import People from "../../../assets/images/dashboard/icon/people2.svg";
import Profile from "../../../assets/images/dashboard/icon/profile-2user2.svg";
import Oval from "../../../assets/images/dashboard/icon/Oval.svg";
import Dot from "../../../assets/images/dashboard/icon/Dot.svg";
import ChartCard from "../../../components/ui/ChartCard";
import ArrowLeft from "../../../assets/images/dashboard/icon/arrow-left.svg";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ProfileNone from "../../../assets/images/dashboard/image/image.png";

import { fetchTotalsAction } from "../../../redux/actions/fetchTotalsAction";
import { fetchCouriersAction } from "../../../redux/actions/fetchCouriersAction";
import { fetchCustomersAction } from "../../../redux/actions/fetchCustomersAction";
import { fetchDeliveryAnalyticsAction } from "../../../redux/actions/fetchAnalyticsAction";
import { fetchRevenueAnalyticsAction } from "../../../redux/actions/fetchAnalyticsAction";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Blue", "Yellow", "Green", "Red"],
  datasets: [
    {
      data: [60, 20, 10, 10],
      backgroundColor: ["#FF5733", "#33B5E5", "#F18F01", "#D0D4D9"],
      hoverBackgroundColor: ["#FF5733", "#33B5E5", "#F18F01", "#D0D4D9"],
      borderWidth: 1,
      borderColor: ["#FF5733", "#33B5E5", "#F18F01", "#D0D4D9"],
    },
  ],
};

const options = {
  cutout: "80%", // Adjust the size of the hole in the center (e.g., '70%' for a larger hole)
  maintainAspectRatio: false, // Ensure the chart maintains its aspect ratio
  responsive: true, // Make the chart responsive to different screen sizes
  width: 120, // Set the width of the chart
  height: 120,
  plugins: {
    legend: {
      display: false, // Set to true to display the legend
    },
  },
};

function AdminDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const { totals } = useSelector((state) => state.fetchTotals);
  const { couriers } = useSelector((state) => state.fetchCouriers);
  const { customers } = useSelector((state) => state.fetchCustomers);
  const [couriersSorted, setCouriersSorted] = useState([]);
  const {
    revenueAnalytics,
    deliveryAnalytics
  } = useSelector((state) => state.analytics);
  const [filteredRevenueAnalytics, setFilteredRevenueAnalytics] =
    useState();
  // const deliveryAnalytics = [
  //   {
  //     total_delivery: 4,
  //     package_status: 6,
  //     date: "2023-12-07 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-06 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 13,
  //     package_status: 7,
  //     date: "2023-12-06 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 7,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },

  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 10,
  //     package_status: 6,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-05 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-03 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-02 00:00:00+00:00",
  //   },
  //   {
  //     total_delivery: 1,
  //     package_status: 6,
  //     date: "2023-12-01 00:00:00+00:00",
  //   },
  // ];

  // const groupByWeek = (data, revenue = true) => {
  //   const groupedData = {};
  //   console.log("inside group week");

  //   data.forEach((item) => {
  //     const date = new Date(item.date);
  //     const weekStart = startOfWeek(date);
  //     const weekKey = format(weekStart, "yyyy-MM-dd");

  //     if (!groupedData[weekKey]) {
  //       groupedData[weekKey] = {
  //         date_from: weekStart.toISOString(),
  //         date_to: addWeeks(weekStart, 1).toISOString(),
  //         total_delivery: 0,
  //         package_status: item.package_status,
  //       };
  //     }

  //     groupedData[weekKey].total_delivery += item.total_delivery;
  //   });
  //   // Convert the object back to an array
  //   const result = Object.values(groupedData);
  //   console.log("Grouped by week:", result);
  //   revenue ? setFilteredRevenueAnalytics(groupedData) : null;
  // };

  // const groupByMonth = (data) => {
  //   const groupedData = {};

  //   data.forEach((item) => {
  //     const date = new Date(item.date);
  //     const monthStart = startOfMonth(date);
  //     const monthKey = format(monthStart, "yyyy-MM-dd");

  //     if (!groupedData[monthKey]) {
  //       groupedData[monthKey] = {
  //         date_from: monthStart.toISOString(),
  //         date_to: addMonths(monthStart, 1).toISOString(),
  //         total_delivery: 0,
  //         package_status: item.package_status ? item.package_status : null,
  //       };
  //     }

  //     groupedData[monthKey].total_delivery += item.total_delivery;
  //   });

  //   // Convert the object back to an array
  //   const result = Object.values(groupedData);
  //   console.log("Grouped by month:", result);
  // };

  const status6Data = deliveryAnalytics.filter(
    (item) => item.package_status === 6
  );
  const status7Data = deliveryAnalytics.filter(
    (item) => item.package_status === 7
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalsAction({ admin: true }));
    dispatch(fetchCouriersAction({ top: true }));
    dispatch(fetchCustomersAction());
    dispatch(fetchDeliveryAnalyticsAction());
    dispatch(fetchRevenueAnalyticsAction());
  }, []);

  useEffect(() => {
    const sortedCouriers = [...couriers].sort(
      (a, b) => b.total_cost - a.total_cost
    );
    setCouriersSorted(sortedCouriers);
    // groupByWeek(deliveryAnalytics);
    // groupByMonth(deliveryAnalytics);
  }, []);

  return (
    <div className="bg-[#F8F9FA] h-screen w-full pb-20 px-10 p-6 overflow-auto">
      <NameComponent
        name={userInfo?.full_name?.split(" ")[0]}
        date={`Today, ${moment().format("DD MMMM YYYY")}`}
      />
      <div className="w-full mx-auto mt-[24px] gap-5 flex flex-row">
        <Dashcard
          icon={Money}
          number={totals.total_revenue?.total_count.toFixed()}
          percentage={totals.total_revenue?.total_rate.toFixed(3)}
          text={"Total Revenue"}
          iconBgColor={"bg-[#F4E7E7]"}
        />
        <Dashcard
          icon={Millage}
          number={totals.total_mileage?.total_count.toFixed()}
          percentage={totals.total_mileage?.total_rate.toFixed(3)}
          text={"Total Milleage"}
          iconBgColor={"bg-[#cce8f6]"}
        />
        <Dashcard
          icon={Profile}
          number={totals.total_couriers?.total_count.toFixed()}
          percentage={totals.total_couriers?.total_rate.toFixed(3)}
          text={"Total Couriers"}
          iconBgColor={"bg-rose-100"}
        />
        <Dashcard
          icon={People}
          number={totals.total_customers?.total_count.toFixed()}
          percentage={totals.total_customers?.total_rate.toFixed(3)}
          text={"Total Customers"}
          iconBgColor={"bg-green-400 bg-opacity-20"}
        />
        <Dashcard
          icon={Box}
          number={totals.total_orders?.total_count.toFixed()}
          percentage={totals.total_orders?.total_rate.toFixed(3)}
          text={"Total Orders"}
          iconBgColor={"bg-yellow-400 bg-opacity-20"}
        />
      </div>
      <div className="w-full mt-[20px] mx-auto flex flex-row gap-5">
        {Object.keys(revenueAnalytics).length > 0 && (
          <ChartCard
            name={"Revenue Analytics"}
            canceled={false}
            completed={true}
            data={{
              labels:
                Object.keys(revenueAnalytics).length > 0
                  ? revenueAnalytics?.map((item) => item.date.slice(0, 10))
                  : [],
              datasets: [
                {
                  label: "Curved Line Chart",
                  fill: true,
                  lineTension: 0.4,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "#981D1D",
                  data:
                    Object.keys(revenueAnalytics).length > 0
                      ? revenueAnalytics?.map((item) => item.total_revenue)
                      : [],
                },
              ],
            }}
            // filterByMonth={groupByMonth(revenueAnalytics)}
            // filterByWeek={groupByWeek(revenueAnalytics)}
          />
        )}
        <div className="w-[20%] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex">
          <div className="flex w-full flex-row justify-between items-center">
            <h1
              className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}
            >
              Top Couriers
            </h1>
            <Link
              to={"/admin/dashboard/courier"}
              className="w-[73px] flex flex-row gap-[12px]"
            >
              <h1
                className={`text-red-800 text-xs font-normal font-rubik leading-none`}
              >
                Show All
              </h1>
              <img src={ArrowLeft} className="w-[13px] h-[13px]" />
            </Link>
          </div>
          <div className="flex flex-col gap-[15px] mt-[16px]">
            {couriersSorted?.length < 1
              ? null
              : couriersSorted?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row gap-[12px] items-center"
                  >
                    <img
                      className="w-9 h-9 rounded-[100px] object-cover"
                      src={
                        item.profile_photo_link
                          ? item.profile_photo_link
                          : ProfileNone
                      }
                    />
                    <div className="flex flex-col">
                      <span className="text-zinc-800 text-sm font-normal font-rubik">
                        {item.full_name}
                      </span>
                      <span className="text-slate-500 text-xs font-normal font-rubik">
                        {item.total_cost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="w-[20%] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex">
          <div className="flex flex-row w-full justify-between items-center">
            <h1
              className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}
            >
              Groups Revenue
            </h1>
            <Link
              to={"/admin/dashboard/courier/groups"}
              className="w-[73px] flex flex-row gap-[12px]"
            >
              <h1
                className={`text-red-800 text-xs font-normal font-rubik leading-none`}
              >
                Show All
              </h1>
              <img src={ArrowLeft} className="w-[13px] h-[13px]" />
            </Link>
          </div>
          <div
            style={{
              width: "120px",
              height: "120px",
              marginTop: 22,
              alignSelf: "center",
            }}
          >
            <Doughnut data={data} options={options} />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#33b5e5] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                Accra Group
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                60%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#ff5734] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                New Delhi Group
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                20%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#f18f00] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                Dubai
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                10%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#d0d4d9] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                Other
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                10%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[20px] mx-auto flex flex-row gap-5">
        <ChartCard
          name={"Delivery Analytics"}
          canceled={true}
          completed={true}
          data={{
            labels:
              Object.keys(deliveryAnalytics).length > 0
                ? deliveryAnalytics?.map((item) => item.date.slice(0, 10))
                : [],
            datasets: [
              {
                label: "Completed",
                fill: true,
                lineTension: 0.4,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#981D1D",
                data:
                  Object.keys(deliveryAnalytics).length > 0
                    ? deliveryAnalytics?.map(
                        (item) =>
                          item.package_status == 6 && item.total_delivery
                      )
                    : [],
              },
              {
                label: "Canceled",
                fill: true,
                lineTension: 0.4,
                backgroundColor: "rgba(75,92,192,0.2)",
                borderColor: "#98A5AF",
                data:
                  Object.keys(deliveryAnalytics).length > 0
                    ? deliveryAnalytics?.map((item) =>
                        item.package_status == 7 ? item.total_delivery : 0
                      )
                    : [],
              },
            ],
          }}
        />
        <div className="w-[20%] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex">
          <div className="flex w-full flex-row justify-between items-center">
            <h1
              className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}
            >
              New Customers
            </h1>
            <Link
              to={`/admin/dashboard/customers`}
              className="w-[73px] flex flex-row gap-[12px]"
            >
              <h1
                className={`text-red-800 text-xs font-normal font-rubik leading-none`}
              >
                Show All
              </h1>
              <img src={ArrowLeft} className="w-[13px] h-[13px]" />
            </Link>
          </div>
          <div className="flex flex-col gap-[15px] mt-[16px]">
            {customers?.length < 1
              ? null
              : customers?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row gap-[12px] items-center"
                  >
                    <img
                      className="w-9 h-9 rounded-[100px] object-cover"
                      src={
                        item.profile_photo_link
                          ? item.profile_photo_link
                          : ProfileNone
                      }
                    />
                    <div className="flex flex-col">
                      <span className="text-zinc-800 text-sm font-normal font-rubik">
                        {item.full_name}
                      </span>
                      <span className="text-slate-500 text-xs font-normal font-rubik">
                        {moment(item.active_date).fromNow()}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="w-[20%] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex">
          <div className="flex flex-row w-full justify-between items-center">
            <h1
              className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}
            >
              Groups Mileage
            </h1>
            <Link
              to={`/admin/dashboard/courier/groups`}
              className="w-[73px] flex flex-row gap-[12px]"
            >
              <h1
                className={`text-red-800 text-xs font-normal font-rubik leading-none`}
              >
                Show All
              </h1>
              <img src={ArrowLeft} className="w-[13px] h-[13px]" />
            </Link>
          </div>
          <div
            style={{
              width: "120px",
              height: "120px",
              marginTop: 22,
              alignSelf: "center",
            }}
          >
            <Doughnut data={data} options={options} />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#33b5e5] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                Accra Group
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                60%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#ff5734] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                New Delhi Group
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                20%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#f18f00] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                Dubai
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                10%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-row gap-[8px]">
              <div className="relative">
                <div className="w-4 h-4 bg-[#d0d4d9] rounded-full" />
                <img
                  src={Dot}
                  className="w-2 h-2 absolute top-[4px] left-[4px]"
                />
              </div>
              <span className="text-slate-500 text-xs font-normal font-rubik">
                Other
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-zinc-800 text-xs font-normal font-rubik">
                10%{" "}
              </div>
              <div className="text-slate-500 text-xs font-normal font-rubik">
                • 6,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
