import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../../../assets/images/dashboard/icon/search-normal2.svg";
import { Menu, Transition } from "@headlessui/react";
import ArrowDownSmall from "../../../../assets/images/dashboard/icon/arrow-down-small.svg";
import ArrowLeftSmall from "../../../../assets/images/dashboard/icon/arrow-left-small.svg";
import AddIcon from "../../../../assets/images/dashboard/icon/add-circle.svg";
import AddVehicleType from "./UI/AddVehicleTypeModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchVehicleTypesAction, fetchVehicleTypeDetailAction } from "../../../../redux/actions/fetchVehicleTypes";
import CouriersIcon from "../../../../assets/images/dashboard/icon/profile-2user4.svg";
import Edit from "../../../../assets/images/dashboard/icon/edit-black.svg";
import Delete from "../../../../assets/images/dashboard/icon/trash.svg";
import callAPI from "../../../../utils/api";

export default function CouriersConfigurations() {
  const [paginations, setPaginations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEditItem, setselectedEditItem] = useState(null);

  const dispatch = useDispatch();
  const { vehicleTypes } = useSelector((state) => state.vehicleTypes);

  useEffect(() => {
    dispatch(fetchVehicleTypesAction());
  }, []);

  const handleDeleteVehicleType = async (id) => {
    try {
      const response = await callAPI(`/api/admin/vehicle-type/${id}`, "DELETE", true);
      dispatch(fetchVehicleTypesAction());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100%] min-h-[400px] mt-6 relative bg-white rounded-[10px] pb-20 py-[22px] px-[16px]">
      <AddVehicleType
        show={showCreateModal}
        onClose={() => 
          {
            setShowCreateModal(false);
            setselectedEditItem(null);
          }
        }
        onConfirm={() => setShowCreateModal(false)}
        editData={selectedEditItem}
      />
      <div className="flex flex-row justify-between items-center">
        <div class="text-zinc-800 text-lg font-semibold font-rubik">
          Vehicle types
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-[10px] items-center">
            {/* <Dropdown /> */}
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
        <table class="w-full table-auto mb-24">
          <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Name
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Size capacity (H x W x L)
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Packages capacity
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left">
                <span className="text-slate-500 text-xs font-normal font-rubik">
                  Average speed
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
            {
              vehicleTypes?.length > 0 && (
            vehicleTypes?.map((item, idx) => (
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
                <td className="px-3 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item.max_height}cm x {item.max_width}cm x {item.max_length}
                    cm
                  </div>
                </td>
                <td className="px-6 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item.max_weight} kg
                  </div>
                </td>
                <td className="px-6 py-3 text-left">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item?.average_speed} km/h
                  </div>
                </td>
                <td className="px-6 py-3 text-left flex flex-row gap-1">
                  <div class="w-5 h-5 justify-center items-center inline-flex">
                    <div class="w-5 h-5 relative">
                      <img src={CouriersIcon} />
                    </div>
                  </div>
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                    {item.courier_count}
                  </div>
                </td>
                <td className="px-6 py-3 text-left font-bold text-xl">
                  <Menu>
                    <div className="">
                      <Menu.Button>. . .</Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-[120px] top-[38px] w-[158px] h-30 p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-2 inline-flex z-10">
                          <Menu.Item>
                            <button
                              className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                              onClick={async () => {
                                try {
                                  const itemDetails = await dispatch(fetchVehicleTypeDetailAction(item.id));
                                  setselectedEditItem(itemDetails.data);
                                  // Show the modal
                                  setShowCreateModal(true);
                                } catch (error) {
                                  console.error('Error fetching vehicle type detail:', error);
                                }
                              }}
                            >
                              <div className="w-6 h-6 bg-gray-100 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex">
                                <img src={Edit} className="w-4 h-4" />
                              </div>
                              <div className="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                                Edit
                              </div>
                            </button>
                          </Menu.Item>
                          <div className="w-full h-[1px] bg-[#D0D4D9]" />

                          <Menu.Item>
                            <button
                              onClick={() => handleDeleteVehicleType(item.id)}
                              className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                            >
                              <div
                                className={`w-6 h-6  bg-rose-100
                                 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex`}
                              >
                                <img src={Delete} className="w-4 h-4" />
                              </div>
                              <div
                                className={`
                                   "text-red-700"
                                 text-xs font-normal font-['Rubik'] leading-none`}
                              >
                                Delete
                              </div>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </div>
                  </Menu>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
