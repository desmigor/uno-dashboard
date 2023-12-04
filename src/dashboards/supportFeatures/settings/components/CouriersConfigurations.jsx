import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../../../assets/images/dashboard/icon/search-normal2.svg";
import { Menu, Transition } from "@headlessui/react";
import ArrowDownSmall from "../../../../assets/images/dashboard/icon/arrow-down-small.svg";
import ArrowLeftSmall from "../../../../assets/images/dashboard/icon/arrow-left-small.svg";
import AddIcon from "../../../../assets/images/dashboard/icon/add-circle.svg";
import AddVehicleType from "./UI/AddVehicleTypeModal";

export default function CouriersConfigurations() {
  const [paginations, setPaginations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const vehicle_types = [
    {
      name: "Bicycle",
      size: "20X20",
      capacit: "5kg",
      date: "Dec, 23m 2023",
      couriers: "12",
    },
    {
      name: "Motorcycle",
      size: "20X20",
      capacit: "5kg",
      date: "Dec, 23m 2023",
      couriers: "12",
    },
    {
      name: "Car",
      size: "20X20",
      capacit: "5kg",
      date: "Dec, 23m 2023",
      couriers: "12",
    },
    {
      name: "Van",
      size: "20X20",
      capacit: "5kg",
      date: "Dec, 23m 2023",
      couriers: "12",
    },
    {
      name: "Truck",
      size: "20X20",
      capacit: "5kg",
      date: "Dec, 23m 2023",
      couriers: "12",
    },
    {
      name: "Hoho",
      size: "20X20",
      capacit: "5kg",
      date: "Dec, 23m 2023",
      couriers: "12",
    },
  ];

  return (
    <div className="w-[100%] min-h-[400px] mt-6 relative bg-white rounded-[10px] pb-20 py-[22px] px-[16px]">
      <AddVehicleType
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={() => setShowCreateModal(false)}
      />
      <div className="flex flex-row justify-between items-center">
        <div class="text-zinc-800 text-lg font-semibold font-rubik">
          Vehicle types
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-[10px] items-center">
            {/* <Dropdown /> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courier ..."
                className="placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex"
              />
              <img
                src={Search}
                className="w-4 h-4 absolute top-[12px] left-[16px]"
              />
            </div>
          </div>
          <div
            class=" h-10 px-[60px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <div class="text-center text-white text-sm font-normal font-rubik leading-tight cursor-pointer">
              Add type
            </div>
            <div class="w-5 h-5 justify-center items-center flex">
              <div class="w-5 h-5 relative">
                <img src={AddIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-x-auto border border-gray-100 sm:rounded-lg mt-6">
        <table class="w-full table-auto">
          <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Name
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Size capacity
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Packages capacity
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Date created
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Couriers
                </span>
              </th>

              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicle_types?.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => {}}
                class={`relative border-b border-gray-100 cursor-pointer text-left`}
              >
                <th
                  scope="row"
                  class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="h-[52px] flex-row justify-start items-center gap-2.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                      {item.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item.size}
                  </div>
                </td>
                <td className="px-6 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item.capacit}
                  </div>
                </td>
                <td className="px-6 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item?.date}
                  </div>
                </td>
                <td className="px-6 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
                    {item.couriers}
                  </div>
                </td>
                <td className="px-6 py-3 text-left font-bold text-xl">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {vehicle_types?.length === 0 && <div></div>}
      <div className="mt-[20px] absolute bottom-3  w-[97.5%] flex items-center justify-between">
        <div className="w-[155px] h-[25px] justify-start items-center gap-2.5 inline-flex">
          <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">
            Rows per page
          </div>
          <Menu as="div">
            <Menu.Button className="w-[49px] h-[25px] cursor-pointer px-[9px] bg-white rounded-[20px] border border-gray-100 justify-start items-center gap-1 flex">
              <div className="text-center text-zinc-800 text-xs font-normal font-rubik leading-none">
                {/* {count} */}
              </div>
              <img src={ArrowDownSmall} className="w-3 h-3" />
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
              <Menu.Items className="absolute left-[121px] mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div
                  //   onClick={() => handleChangePage(5)}
                  className="px-1 py-1 cursor-pointer"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-none">
                        5
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div
                  //   onClick={() => handleChangePage(10)}
                  className="px-1 py-1 cursor-pointer"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-none">
                        10
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div
                  //   onClick={() => handleChangePage(15)}
                  className="px-1 py-1 cursor-pointer"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-none">
                        15
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div
                  //   onClick={() => handleChangePage(20)}
                  className="px-1 py-1 cursor-pointer"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-none">
                        20
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div
                  //   onClick={() => handleChangePage(25)}
                  className="px-1 py-1 cursor-pointer"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-none">
                        25
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="min-w-[415px] h-6 justify-end items-center gap-2.5 flex">
          <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">
            Results per page
          </div>
          <div className="flex flex-row gap-2.5">
            <button
              disabled={currentPage === 1 ? true : false}
              onClick={() => {
                // setCurrentPage(currentPage - 1);
                // if (table === "available") {
                //   dispatch(fetchAvailableCouriers(count, currentPage - 1));
                // } else if (table === "at-work") {
                //   dispatch(fetchAtWorkCouriers(count, currentPage - 1));
                // } else if (table === "paused") {
                //   dispatch(fetchPausedCouriers(count, currentPage - 1));
                // } else {
                //   dispatch(fetchOfflineCouriers(count, currentPage - 1));
                // }
              }}
              className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex"
            >
              <img src={ArrowLeftSmall} className="w-3 h-3" />
            </button>
            <div className="flex flex-row gap-2.5">
              {paginations.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    // setCurrentPage(item);
                    // if (table === "available") {
                    //   dispatch(fetchAvailableCouriers(count, item));
                    // } else if (table === "at-work") {
                    //   dispatch(fetchAtWorkCouriers(count, item));
                    // } else if (table === "paused") {
                    //   dispatch(fetchPausedCouriers(count, item));
                    // } else {
                    //   dispatch(fetchOfflineCouriers(count, item));
                    // }
                  }}
                  className={`w-6 h-6 px-[9px] ${
                    item === currentPage ? "bg-red-800" : "bg-white"
                  } rounded-[100px] cursor-pointer justify-center items-center gap-1 inline-flex`}
                >
                  <div
                    className={`${
                      item === currentPage ? "text-white" : "text-zinc-800"
                    } text-xs font-normal font-rubik leading-none`}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <button
              disabled={
                currentPage === paginations[paginations.length - 1]
                  ? true
                  : false
              }
              onClick={() => {
                // setCurrentPage(currentPage + 1);
                // if (table === "available") {
                //   dispatch(fetchAvailableCouriers(count, currentPage + 1));
                // } else if (table === "at-work") {
                //   dispatch(fetchAtWorkCouriers(count, currentPage + 1));
                // } else if (table === "paused") {
                //   dispatch(fetchPausedCouriers(count, currentPage + 1));
                // } else {
                //   dispatch(fetchOfflineCouriers(count, currentPage + 1));
                // }
              }}
              className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex"
            >
              <img src={ArrowLeftSmall} className="w-3 h-3 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
