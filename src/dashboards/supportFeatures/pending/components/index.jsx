import React from "react";
import startingPoint from "../../../../assets/images/dashboard/icon/starting_point.svg";
import pickup_point from "../../../../assets/images/dashboard/icon/pickup_point.svg";

function Pending() {
  return (
    <div className="bg-[#F8F9FA] h-[93%] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Left Column */}
        <div>
          <div className="p-4 w-[521px] h-[125px] pl-[41px] pr-5 pt-[23px] pb-4 bg-white border-b border-gray-100 flex-col justify-end items-start gap-[18px] inline-flex">
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
                  className="block w-full h-10 px-4 py-2 border rounded-xl #ECEEF0  text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight"
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
          <div className>
            <div class="w-[460px] h-[186px] relative bg-white rounded-xl border border-red-800 mx-8 my-4">
              <div class="left-[16px] top-[56px] absolute justify-start items-start gap-4 inline-flex">
                <div class="w-4 h-[110px] relative">
                  <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                    <img src={pickup_point} alt="" />
                  </div>
                  <div class="w-4 h-4 left-0 top-[94px] absolute justify-start items-center gap-2 inline-flex">
                    <img src={startingPoint} alt="" />
                  </div>
                  <div class="w-[70px] h-[0px] left-[8px] top-[21px] absolute origin-top-left rotate-90 border-dashed border-[1px] border-slate-400"></div>
                </div>
                <div class="flex-col justify-start items-start gap-9 inline-flex">
                  <div class="flex-col justify-start items-start gap-[5px] flex">
                    <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                      Pickup point
                    </div>
                    <div class="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">
                      PPR3+JG6, Amasaman
                    </div>
                  </div>
                  <div class="flex-col justify-start items-start gap-[5px] flex">
                    <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                      Delivery point
                    </div>
                    <div class="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">
                      PPR3+JG6, Amasaman
                    </div>
                  </div>
                </div>
              </div>
              <div class="left-[378px] top-[56px] absolute flex-col justify-start items-end gap-0.5 inline-flex">
                <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                  17-04-2023
                </div>
                <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                  09:32
                </div>
              </div>
              <div class="left-[378px] top-[129px] absolute flex-col justify-start items-end gap-0.5 inline-flex">
                <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                  17-04-2023
                </div>
                <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                  09:32
                </div>
              </div>
              <div class="w-[428px] left-[16px] top-[16px] absolute justify-between items-center inline-flex">
                <div class="justify-start items-center gap-1 flex">
                  <div>
                    <span className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Tracking ID:{" "}
                    </span>
                    <span className="text-red-800 text-sm font-semibold font-['Rubik'] leading-tight">
                      #TK-0023{" "}
                    </span>
                  </div>
                </div>
                <div class="w-[71px] px-3 py-1.5 bg-stone-200 rounded justify-start items-center gap-2.5 flex">
                  <div class="text-red-800 text-xs font-normal font-['Rubik'] leading-none">
                    Pending
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[460px] h-[186px] relative bg-white rounded-xl mx-8 my-4">
              <div class="left-[16px] top-[56px] absolute justify-start items-start gap-4 inline-flex">
                <div class="w-4 h-[110px] relative">
                  <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                    <img src={pickup_point} alt="" />
                  </div>
                  <div class="w-4 h-4 left-0 top-[94px] absolute justify-start items-center gap-2 inline-flex">
                    <img src={startingPoint} alt="" />
                  </div>
                  <div class="w-[70px] h-[0px] left-[8px] top-[21px] absolute origin-top-left rotate-90 border-dashed border-[1px] border-slate-400"></div>
                </div>
                <div class="flex-col justify-start items-start gap-9 inline-flex">
                  <div class="flex-col justify-start items-start gap-[5px] flex">
                    <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                      Pickup point
                    </div>
                    <div class="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">
                      PPR3+JG6, Amasaman
                    </div>
                  </div>
                  <div class="flex-col justify-start items-start gap-[5px] flex">
                    <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                      Delivery point
                    </div>
                    <div class="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">
                      PPR3+JG6, Amasaman
                    </div>
                  </div>
                </div>
              </div>
              <div class="left-[378px] top-[56px] absolute flex-col justify-start items-end gap-0.5 inline-flex">
                <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                  17-04-2023
                </div>
                <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                  09:32
                </div>
              </div>
              <div class="left-[378px] top-[129px] absolute flex-col justify-start items-end gap-0.5 inline-flex">
                <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                  17-04-2023
                </div>
                <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
                  09:32
                </div>
              </div>
              <div class="w-[428px] left-[16px] top-[16px] absolute justify-between items-center inline-flex">
                <div class="justify-start items-center gap-1 flex">
                  <div>
                    <span className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Tracking ID:{" "}
                    </span>
                    <span className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
                      #TK-0023{" "}
                    </span>
                  </div>
                </div>
                <div class="w-[71px] px-3 py-1.5 bg-gray-100 rounded justify-start items-center gap-2.5 flex">
                  <div class="text-slate-500 text-xs font-normal font-['Rubik'] leading-none">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div class="w-[692px] h-[1010px] px-10 pt-6 pb-[117px] bg-white border-l border-gray-100 flex-col justify-start items-start gap-4 inline-flex">
    <div class="self-stretch justify-start items-center gap-1 inline-flex">
        <div><span className="text-gray-400 text-base font-normal font-['Rubik'] leading-tight">Tracking ID:</span><span className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight"> </span><span className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">#TK-0023 </span></div>
    </div>
    <div class="self-stretch flex-col justify-start items-start gap-6 inline-flex">
        <div class="w-[612px] h-[307px] relative rounded-xl">
            <img class="w-[612px] h-[339px] left-0 top-[-8px] absolute" src="https://via.placeholder.com/612x339" />
            <div class="w-[30px] h-[60px] left-[570px] top-[12px] absolute rounded-xl shadow flex-col justify-center items-start inline-flex">
                <div class="self-stretch grow shrink basis-0 p-[5px] bg-white rounded-tl rounded-tr justify-center items-center inline-flex">
                    <div class="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                        <div class="w-5 h-5 relative">
                        </div>
                    </div>
                </div>
                <div class="self-stretch grow shrink basis-0 p-[5px] bg-white rounded-bl rounded-br border-t border-gray-100 justify-center items-center inline-flex">
                    <div class="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                        <div class="w-5 h-5 relative">
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[30px] h-[30px] pl-[3px] pr-[1.54px] pt-0.5 pb-[2.54px] left-[570px] top-[122px] absolute bg-white rounded shadow justify-center items-center inline-flex">
                <div class="grow shrink basis-0 self-stretch origin-top-left rotate-45 justify-center items-center inline-flex">
                    <div class="w-[18px] h-[18px] relative">
                    </div>
                </div>
            </div>
            <div class="w-[30px] h-[30px] p-[5px] left-[570px] top-[88px] absolute bg-white rounded shadow justify-center items-center inline-flex">
                <div class="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                    <div class="w-5 h-5 relative">
                    </div>
                </div>
            </div>
            <div class="w-[30px] h-[30px] left-[141px] top-[68px] absolute">
                <div class="w-[30px] h-[30px] left-0 top-0 absolute bg-white rounded-full border-2 border-green-600"></div>
                <div class="w-[18.95px] h-[18.95px] pl-[1.89px] pr-[1.88px] pt-[1.58px] pb-[1.61px] left-[5.53px] top-[5.53px] absolute justify-center items-center inline-flex"></div>
            </div>
            <div class="p-3 left-[95px] top-[233px] absolute bg-white rounded-[10px] shadow flex-col justify-start items-start gap-2.5 inline-flex">
                <div class="justify-start items-start gap-10 inline-flex">
                    <div class="justify-start items-start gap-1.5 flex">
                        <div class="w-4 h-4 justify-center items-center flex">
                            <div class="w-4 h-4 relative">
                            </div>
                        </div>
                        <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                            <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">Current location</div>
                            <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">PPR3+JG6, Amasaman</div>
                        </div>
                    </div>
                    <div class="justify-start items-start gap-10 flex">
                        <div class="justify-start items-start gap-1.5 flex">
                            <div class="w-4 h-4 justify-center items-center flex">
                                <div class="w-4 h-4 relative">
                                </div>
                            </div>
                            <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                                <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">Distance left</div>
                                <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">12 km</div>
                            </div>
                        </div>
                        <div class="justify-start items-start gap-1.5 flex">
                            <div class="w-4 h-4 justify-center items-center flex">
                                <div class="w-4 h-4 relative">
                                </div>
                            </div>
                            <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                                <div class="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">Time left</div>
                                <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">30 min</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 left-[48px] top-[116px] absolute bg-white rounded-md shadow flex-col justify-start items-start gap-2.5 inline-flex">
                <div class="flex-col justify-start items-start flex">
                    <div class="text-gray-400 text-[10px] font-normal font-['Rubik'] leading-none">Goawa Ln</div>
                    <div class="text-zinc-800 text-[10px] font-normal font-['Rubik'] leading-none">Ghana, Accra</div>
                </div>
            </div>
            <div class="p-2 left-[383px] top-[158px] absolute bg-white rounded-md shadow flex-col justify-start items-start gap-2.5 inline-flex">
                <div class="flex-col justify-start items-start flex">
                    <div class="text-gray-400 text-[10px] font-normal font-['Rubik'] leading-none">Stanbic Height</div>
                    <div class="text-zinc-800 text-[10px] font-normal font-['Rubik'] leading-none">Ghana, Accra</div>
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
        <div class="flex-col justify-start items-start gap-6 flex">
            <div class="flex-col justify-start items-start gap-4 flex">
                <div class="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">Order Details</div>
                <div class="flex-col justify-start items-start gap-6 flex">
                    <div class="w-[612px] p-1.5 bg-neutral-100 rounded-[10px] border border-gray-100 justify-between items-center inline-flex">
                        <div class="px-[22px] py-2 bg-white rounded-md shadow justify-start items-center gap-2.5 flex">
                            <div class="text-center text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Package</div>
                        </div>
                        <div class="px-[22px] py-2 rounded-md justify-start items-start gap-2.5 flex">
                            <div class="text-center text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Customer</div>
                        </div>
                        <div class="px-[22px] py-2 rounded-md justify-start items-start gap-2.5 flex">
                            <div class="text-center text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Delivery Point</div>
                        </div>
                        <div class="px-[22px] py-2 rounded-md justify-start items-start gap-2.5 flex">
                            <div class="text-center text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Pickup Point</div>
                        </div>
                        <div class="px-[22px] py-2 rounded-md justify-start items-start gap-2.5 flex">
                            <div class="text-center text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Courier</div>
                        </div>
                    </div>
                    <div class="w-[612px] h-[162px] relative bg-white rounded-xl shadow border border-gray-100">
                        <div class="left-[190px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
                            <div class="flex-col justify-start items-start gap-[5px] flex">
                                <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Size</div>
                                <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">Medium</div>
                            </div>
                            <div class="flex-col justify-start items-start gap-[5px] flex">
                                <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Package Add-ons</div>
                                <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">Fragile</div>
                            </div>
                        </div>
                        <div class="left-[388px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
                            <div class="flex-col justify-start items-start gap-[5px] flex">
                                <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Payment Method</div>
                                <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">Credit Card</div>
                            </div>
                            <div class="flex-col justify-start items-start gap-[5px] flex">
                                <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Amount</div>
                                <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">$20.09</div>
                            </div>
                        </div>
                        <div class="opacity-60 w-[165px] h-[169px] left-[-25px] top-[18px] absolute">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col justify-start items-start gap-4 flex">
                <div class="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">Order Resolution</div>
                <div class="p-4 bg-white rounded-xl shadow border border-gray-100 flex-col justify-center items-start gap-3 flex">
                    <div class="self-stretch flex-col justify-start items-start gap-[5px] inline-flex">
                        <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Cancellation reason</div>
                        <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">The courier had an accident on the way</div>
                    </div>
                    <div class="self-stretch flex-col justify-start items-start gap-[7px] inline-flex">
                        <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Select a resolution</div>
                        <div class="justify-start items-start gap-3.5 inline-flex">
                            <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex">
                                <div class="w-7 h-7 justify-center items-center flex">
                                    <div class="w-7 h-7 relative">
                                    </div>
                                </div>
                                <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Return package</div>
                            </div>
                            <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex">
                                <div class="w-7 h-7 justify-center items-center flex">
                                    <div class="w-7 h-7 relative">
                                    </div>
                                </div>
                                <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Reassign package</div>
                            </div>
                            <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex">
                                <div class="w-7 h-7 justify-center items-center flex">
                                    <div class="w-7 h-7 relative">
                                    </div>
                                </div>
                                <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cancel package</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Pending;
