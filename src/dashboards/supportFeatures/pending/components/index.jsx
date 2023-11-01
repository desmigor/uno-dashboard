import {React} from "react";
import OrderResolution from "./orderResolution";
import PendingPackage from "./pendingPackage";
import MapImage from "../../../../assets/images/dashboard/image/map.png";
import PendingTabs from "./Tabs";
import NoPendingEmpty from "./ui/NoPendingEmpty";
import NoOrderResoultion from "./ui/OrderNoResolution";

function Pending() {
  return (
    <div className="bg-[#F8F9FA] h-screen pb-28 w-full overflow-auto">
      <div className="w-full  mx-auto flex flex-row gap-0">
        {/* Left Column */}
        <div className="w-[60%] min-h-[325px] content-center">
          <div className="p-4 w-full h-[125px] pl-[41px] pr-5 pt-0 pb-0 bg-white border-b border-gray-100 flex-col justify-end items-start gap-[18px] inline-flex">
            <div>
              <span className="text-zinc-800 text-2xl font-bold font-rubik">
                Pending Support{" "}
              </span>
              <span className="text-gray-400 text-base font-semibold font-rubik leading-tight">
                {" "}
                - 2 packages
              </span>
            </div>
            {/* Sort Filter by Date Dropdown */}
            <div className="flex flex-row gap-4 mt-4">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight mt-3">
                Sort by
              </div>
              <div className="">
                <select
                  id="sortDropdown"
                  className="block w-full h-10 px-4 py-2 border rounded-xl #ECEEF0  text-gray-400 text-sm font-normal font-rubik leading-tight"
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
                  className="w-full justify-center items-center flex h-10 px-4 py-2 border rounded-xl #ECEEF0 text-gray-300 text-sm font-normal font-rubik leading-tight"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <PendingPackage />
            <PendingPackage />
            <PendingPackage />
            <PendingPackage />

          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div class="h-[100%] px-10  pb-2 bg-white border-l border-gray-100 flex-col justify-center items-center inline-flex pt-5">
            <div class="self-stretch justify-center items-center gap-1 inline-flex"></div>
            <div class="self-stretch flex-col justify-start items-start gap-6 inline-flex">
              <div>
                <span className="text-gray-400 text-base font-normal font-rubik leading-tight">
                  Tracking ID:
                </span>
                <span className="text-gray-400 text-sm font-normal font-rubik leading-tight">
                  {" "}
                </span>
                <span className="text-zinc-800 text-base font-semibold font-rubik leading-tight">
                  #TK-0023{" "}
                </span>
              </div>
              <div class="w-[100%] h-[307px] relative rounded-xl">
                <img
                  class="w-[100%] h-[339px] left-0 top-[-8px] absolute rounded-xl"
                  src={MapImage}
                />

                <div class="p-3 left-[95px] top-[233px] absolute bg-white rounded-[10px] shadow flex-col justify-start items-start gap-2.5 inline-flex">
                  <div class="justify-start items-start gap-10 inline-flex">
                    <div class="justify-start items-start gap-1.5 flex">
                      <div class="w-4 h-4 justify-center items-center flex">
                        <div class="w-4 h-4 relative"></div>
                      </div>
                      <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                          Current location
                        </div>
                        <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
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
                          <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                            Distance left
                          </div>
                          <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                            12 km
                          </div>
                        </div>
                      </div>
                      <div class="justify-start items-start gap-1.5 flex">
                        <div class="w-4 h-4 justify-center items-center flex">
                          <div class="w-4 h-4 relative"></div>
                        </div>
                        <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                          <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                            Time left
                          </div>
                          <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                            30 min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-[30px] h-[30px] left-[11px] top-[111px] absolute">
                  <div class="w-[30px] h-[30px] left-0 top-0 absolute bg-black bg-opacity-20 rounded-full"></div>
                  <div class="w-[14.12px] h-[14.12px] left-[7.94px] top-[7.94px] absolute justify-start items-center gap-[7.06px] inline-flex">
                    <div class="w-[14.12px] h-[14.12px] relative">
                      <div class="w-[8.47px] h-[8.47px] left-[2.82px] top-[2.82px] absolute bg-red-800 rounded-full border-2 border-white"></div>
                      <div class="w-[14.12px] h-[14.12px] left-0 top-[-0px] absolute bg-red-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="w-[30px] h-[30px] left-[420px] top-[126px] absolute">
                  <div class="w-[30px] h-[30px] left-0 top-0 absolute bg-black bg-opacity-20 rounded-full"></div>
                  <div class="w-[14.12px] h-[14.12px] left-[7.94px] top-[7.94px] absolute justify-start items-center gap-[7.06px] inline-flex">
                    <div class="w-[14.12px] h-[14.12px] relative">
                      <div class="w-[8.47px] h-[8.47px] left-[2.82px] top-[2.82px] absolute bg-green-600 rounded-full border-2 border-white"></div>
                      <div class="w-[14.12px] h-[14.12px] left-0 top-0 absolute bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-col justify-start items-start gap-6 flex w-[100%]">
                <div class="flex-col justify-start items-start gap-4 flex w-[100%]">
                  <div class="text-zinc-800 text-base font-semibold font-rubik leading-tight mt-4">
                    Order Details
                  </div>
                  <PendingTabs />
                </div>
                <OrderResolution />
              </div>
              <div class="w-[691px] h-[90px] pl-[189px] pr-[190px] py-5 bg-white border-t border-gray-100 justify-center items-center inline-flex">
                <div class="w-[312px] h-[50px] px-[60px] py-[15px] bg-zinc-200 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                  <div class="text-center text-gray-400 text-base font-normal font-rubik leading-tight">
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
