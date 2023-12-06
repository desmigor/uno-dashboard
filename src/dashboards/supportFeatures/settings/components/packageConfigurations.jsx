import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "../../../../assets/images/dashboard/icon/more_vertical.svg";
import AddIcon from "../../../../assets/images/dashboard/icon/add-circle.svg";
import AddPackageSizeModal from "./UI/AddPackageSizeModal";
import AddPackageAddOn from "./UI/AddPackageAddOn";
import {
  fetchPackageSizesAction,
  fetchPackageAddOnsAction,
} from "../../../../redux/actions/fetchPackageSizesAction";
import { Menu, Transition } from "@headlessui/react";
import Edit from "../../../../assets/images/dashboard/icon/edit-black.svg";
import Close from "../../../../assets/images/dashboard/icon/add-yellow.svg";
import Delete from "../../../../assets/images/dashboard/icon/trash.svg";
import callAPI from "../../../../utils/api";

export default function PackageConfigurations() {
  const { packageSizes } = useSelector((state) => state.fetchPackageSizes);
  const { packageAddOns } = useSelector((state) => state.fetchPackageSizes);
  const dispatch = useDispatch();
  const [addSizeModal, setAddSizeModal] = useState(false);
  const [addOnModal, setAddOnModal] = useState(false);
  const [selectedEditItem, setselectedEditItem] = useState(null);

  useEffect(() => {
    dispatch(fetchPackageSizesAction());
    dispatch(fetchPackageAddOnsAction());
    // fetch package sizes using fetch method
  }, []);

  console.log({packageSizes});

  const handleDeletePackageAddOn = async (id) => {
    try {
      console.log(id);      
       const result = await callAPI(
        `/api/package-settings/package-addon/${id}`,
        "DELETE",
        true
      );
        console.log(result, 'ppppp');
      dispatch(fetchPackageAddOnsAction());
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePackageSize = async (id) => {
    try {
      console.log(id);

      const result = await callAPI(
        `/api/package-settings/package-size/${id}`,
        "DELETE",
        true
      );
      console.log(result);
      dispatch(fetchPackageSizesAction());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddPackageSizeModal
        show={addSizeModal}
        open={addSizeModal}
        onClose={() => {
          selectedEditItem ? setselectedEditItem(null) : null;
          setAddSizeModal(false);
        }}
        editData={selectedEditItem}
      />
      <AddPackageAddOn
        show={addOnModal}
        open={addOnModal}
        onClose={() => {
          selectedEditItem ? setselectedEditItem(null) : null;
          setAddOnModal(false);
        }}
        editData={selectedEditItem}
      />

      <div
        className={`w-[100%] h-[100%] relative bg-white rounded-lg p-6 mb-8`}
      >
        <div className="flex flex-row justify-between pb-2">
          <div className="text-zinc-800 text-lg font-semibold font-rubik ">
            Package sizes
          </div>
          <div
            className="h-10 px-[30px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer"
            onClick={setAddSizeModal}
          >
            <div className="text-center text-white text-sm font-normal font-rubik leading-tight">
              Add Size
            </div>
            <div className="w-5 h-5 justify-center items-center flex">
              <div className="w-5 h-5 relative">
                <img src={AddIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {packageSizes?.length > 0 &&
            packageSizes?.map((item, index) => (
              <div
                key={index}
                className="w-[340px] h-[200px] relative bg-white rounded-xl shadow border border-gray-100"
              >
                <div className="w-4 h-4 left-[324px] top-[10px] absolute">
                  <Menu>
                    <div className="">
                      <Menu.Button >
                        <img src={MenuIcon} className="w-4 h-4" />
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
                        <Menu.Items className="absolute right-[20px] top-[8px] w-[158px] h-30 p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-2 inline-flex z-10">
                          <Menu.Item>
                            <button
                              className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                              onClick={() => {
                                setselectedEditItem(item);
                                setAddSizeModal(true);
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
                              onClick={() => handleDeletePackageSize(item.id)}
                              className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                            >
                              <div
                                className={`w-6 h-6  bg-rose-100
                                 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex`}
                              >
                                <img
                                  src={
                                    item.courier_count > 0
                                      ? DeleteInactive
                                      : Delete
                                  }
                                  className="w-4 h-4"
                                />
                              </div>
                              <div
                                className={`${
                                  item.courier_count > 0
                                    ? "text-zinc-200"
                                    : "text-red-700"
                                } text-xs font-normal font-['Rubik'] leading-none`}
                              >
                                Delete
                              </div>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </div>
                  </Menu>
                </div>
                <div className="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-3 inline-flex">
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="text-zinc-800 text-sm font-semibold font-rubik] leading-tight">
                      {item.name}
                    </div>
                    <div className="w-[312px] h-[35px] text-gray-400 text-[13px] font-normal font-rubik] leading-tight overflow-auto">
                      {item.description}
                    </div>
                  </div>
                  <hr className="w-[312px] border border-gray-200 border-solid " />
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                        Base Price
                      </div>
                      <div className="text-right text-red-800 text-xs font-semibold font-rubik] leading-none">
                        {item.price} {item.currency_display}
                      </div>
                    </div>
                    {
                      item.price_per_km?.map((item, index) => (
                        <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                      {item.km} {item.title}
                      </div>
                      <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                        {(item.price_control).toFixed(2)} {item.currency_display}
                      </div>
                    </div>
                      ))
                    }
                    
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[100%] h-[100%] relative bg-white rounded-lg p-6 mb-12 ">
        <div
          className="flex flex-row justify-between pb-2"
          
        >
          <div className="text-zinc-800 text-lg font-semibold font-rubik ">
            Package add-ons
          </div>
          <div className="h-10 px-[30px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer"
          onClick={setAddOnModal}
          >
            <div className="text-center text-white text-sm font-normal font-rubik leading-tight">
              Add add-on
            </div>
            <div className="w-5 h-5 justify-center items-center flex">
              <div className="w-5 h-5 relative">
                <img src={AddIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {packageAddOns?.length > 0 &&
            packageAddOns.map((item, index) => (
              <div
                key={index}
                className="w-[340px] h-[126px] relative bg-white rounded-xl shadow border border-gray-100"
              >
                <div className="w-4 h-4 left-[324px] top-[10px] absolute">
                  <Menu>
                    <div className="">
                      <Menu.Button>
                        <img src={MenuIcon} className="w-4 h-4" />
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
                        <Menu.Items className="absolute right-[20px] top-[8px] w-[158px] h-30 p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-2 inline-flex z-10">
                          <Menu.Item>
                            <button
                              className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                              onClick={() => {
                                setselectedEditItem(item);
                                setAddOnModal(true);
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
                              className="w-full h-6 justify-start items-center gap-2.5 inline-flex"
                              onClick={() => handleDeletePackageAddOn(item.id)}
                            >
                              <div
                                className={`w-6 h-6  bg-rose-100 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex`}
                              >
                                <img src={Delete} className="w-4 h-4" />
                              </div>
                              <div
                                className={`${
                                  item.courier_count > 0
                                    ? "text-zinc-200"
                                    : "text-red-700"
                                } text-xs font-normal font-['Rubik'] leading-none`}
                              >
                                Delete
                              </div>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </div>
                  </Menu>
                </div>
                <div className="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-2 inline-flex">
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
                      {item.name}
                    </div>
                    <div className="w-[312px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-red-800 text-sm font-semibold font-rubik leading-tight">
                    {item.price} {item.currency_display}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
