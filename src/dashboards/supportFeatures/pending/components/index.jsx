import React from "react";
import OrderResolution from "./orderResolution";
import PendingPackage from "./pendingPackage";
import MapImage from "../../../../assets/images/dashboard/image/map.png";
import PendingTabs from "./Tabs";

function Pending() {
  return (
    <div className="bg-[#F8F9FA] h-[93%] w-full">
      <div className=" grid grid-flow-col gap-3 ">
        {/* Left Column */}
        <div className="w-full col-span-1 content-center">
          <div className="p-4 w-full h-[125px] pl-[41px] pr-5 pt-[120px] pb-4 bg-white border-b border-gray-100 flex-col justify-end items-start gap-[18px] inline-flex">
            <div>
              <span className="text-zinc-800 text-2xl font-bold font-['Rubik']">
                Pending Support{" "}
              </span>
              <span className="text-gray-400 text-base font-semibold font-['Rubik'] leading-tight">
                {" "}
                - 2 packages
              </span>
            </div>
            {/* Sort Filter by Date Dropdown */}
            <div className="flex flex-row gap-4 mt-4">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight mt-3">
                Sort by
              </div>
              <div className="">
                <select
                  id="sortDropdown"
                  className="block w-full h-10 px-4 py-2 border rounded-xl #ECEEF0  text-gray-400 text-sm font-normal font-['Rubik'] leading-tight"
                >
                  <option value="time">Time</option>
                  <option value="amount">amount</option>
                </select>
              </div>
              {/* Search Bar */}
              <div className="">
                <input
                  type="text"
                  placeholder=" Search package"
                  className="w-full justify-center items-center flex h-10 px-4 py-2 border rounded-xl #ECEEF0 text-gray-300 text-sm font-normal font-['Rubik'] leading-tight"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <PendingPackage />
            <PendingPackage />
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col md:flex-row justify-center items-center col-span-4">
          <div class="w-full h-[1010px] px-10 pt-6 pb-[117px] bg-white border-l border-gray-100 flex-col justify-center items-center gap-4 inline-flex">
            <div class="self-stretch justify-center items-center gap-1 inline-flex">
              <div>
                <span className="text-gray-400 text-base font-normal font-['Rubik'] leading-tight">
                  Tracking ID:
                </span>
                <span className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                  {" "}
                </span>
                <span className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                  #TK-0023{" "}
                </span>
              </div>
            </div>
            <div class="self-stretch flex-col justify-start items-start gap-6 inline-flex">
              <div class="w-[612px] h-[307px] relative rounded-xl">
                <img
                  class="w-[612px] h-[339px] left-0 top-[-8px] absolute"
                  src={MapImage}
                />
                <div class="p-3 left-[95px] top-[233px] absolute bg-white rounded-[10px] shadow flex-col justify-start items-start gap-2.5 inline-flex">
                  <div class="justify-start items-start gap-10 inline-flex">
                    <div class="justify-start items-start gap-1.5 flex">
                      <div class="w-4 h-4 justify-center items-center flex">
                        <div class="w-4 h-4 relative"></div>
                      </div>
                      <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                          Current location
                        </div>
                        <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                          PPR3+JG6, Amasaman
                        </div>
                      </div>
                    </div>
                    <div class="justify-start items-start gap-10 flex">
                      <div class="justify-start items-start gap-1.5 flex">
                        <div class="w-4 h-4 justify-center items-center flex">
                          <div class="w-4 h-4 relative"></div>
                        </div>
                        <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                          <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                            Distance left
                          </div>
                          <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                            12 km
                          </div>
                        </div>
                      </div>
                      <div class="justify-start items-start gap-1.5 flex">
                        <div class="w-4 h-4 justify-center items-center flex">
                          <div class="w-4 h-4 relative"></div>
                        </div>
                        <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                          <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                            Time left
                          </div>
                          <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                            30 min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-col justify-start items-start gap-6 flex">
                <div class="flex-col justify-start items-start gap-4 flex">
                  <div class="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight mt-4">
                    Order Details
                  </div>
                  <PendingTabs />
                </div>
                <OrderResolution />
              </div>
              <div class="w-[691px] h-[90px] pl-[189px] pr-[190px] py-5 bg-white border-t border-gray-100 justify-center items-center inline-flex">
                <div class="w-[312px] h-[50px] px-[60px] py-[15px] bg-zinc-200 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                  <div class="text-center text-gray-400 text-base font-normal font-['Rubik'] leading-tight">
                    Proceed with Resolution
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending;
