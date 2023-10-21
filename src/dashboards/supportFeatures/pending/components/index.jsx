import React from "react";

function Pending() {
  return (
    <div class="w-[521px] h-[125px] pl-[41px] pr-5 pt-[23px] pb-4 bg-white border-b border-gray-100 flex-col justify-end items-start gap-[18px] inline-flex">
      <div>
        <span className="text-zinc-800 text-2xl font-bold font-rubik">
          Pending Support{" "}
        </span>
        <span class="text-gray-400 text-base font-semibold font-rubik leading-tight">
          - 10 packages
        </span>
      </div>
      <div class="justify-start items-start gap-3 inline-flex">
        <div class="justify-start items-center gap-2.5 flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            Sort by
          </div>
          <div class="w-[119px] h-10 px-3 bg-white rounded-xl border border-gray-100 justify-between items-center flex">
            <div class="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">
              Time
            </div>
            <div class="w-3 h-3 justify-center items-center flex">
              <div class="w-3 h-3 relative"></div>
            </div>
          </div>
        </div>
        <div class="w-[272px] h-10 px-4 py-[13px] bg-white rounded-xl border border-gray-100 justify-start items-center gap-2.5 flex">
          <div class="w-4 h-4 justify-center items-center flex">
            <div class="w-4 h-4 relative"></div>
          </div>
          <div class="text-gray-300 text-sm font-normal font-rubik leading-tight">
            Search package
          </div>
        </div>
      </div>
      <div class="w-[460px] h-[186px] relative bg-white rounded-xl border border-red-800">
        <div class="left-[16px] top-[56px] absolute justify-start items-start gap-4 inline-flex">
          <div class="w-4 h-[110px] relative">
            <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-[9.60px] h-[9.60px] left-[3.20px] top-[3.20px] absolute bg-red-800 rounded-full"></div>
                <div class="w-4 h-4 left-0 top-0 absolute bg-red-800 rounded-full"></div>
              </div>
            </div>
            <div class="w-4 h-4 left-0 top-[94px] absolute justify-start items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-[9.60px] h-[9.60px] left-[3.20px] top-[3.20px] absolute bg-green-600 rounded-full"></div>
                <div class="w-4 h-4 left-0 top-0 absolute bg-green-600 rounded-full"></div>
              </div>
            </div>
            <div class="w-[70px] h-[0px] left-[7px] top-[21px] absolute origin-top-left rotate-90 border-2 border-slate-400"></div>
          </div>
          <div class="flex-col justify-start items-start gap-9 inline-flex">
            <div class="flex-col justify-start items-start gap-[5px] flex">
              <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                Pickup point
              </div>
              <div class="text-zinc-800 text-xs font-semibold font-rubik leading-none">
                PPR3+JG6, Amasaman
              </div>
            </div>
            <div class="flex-col justify-start items-start gap-[5px] flex">
              <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                Delivery point
              </div>
              <div class="text-zinc-800 text-xs font-semibold font-rubik leading-none">
                PPR3+JG6, Amasaman
              </div>
            </div>
          </div>
        </div>
        <div class="left-[378px] top-[56px] absolute flex-col justify-start items-end gap-0.5 inline-flex">
          <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
            17-04-2023
          </div>
          <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
            09:32
          </div>
        </div>
        <div class="left-[378px] top-[129px] absolute flex-col justify-start items-end gap-0.5 inline-flex">
          <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
            17-04-2023
          </div>
          <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
            09:32
          </div>
        </div>
        <div class="w-[428px] left-[16px] top-[16px] absolute justify-between items-center inline-flex">
          <div class="justify-start items-center gap-1 flex">
            <div>
              <span className="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Tracking ID:{" "}
              </span>
              <span className="text-red-800 text-sm font-semibold font-rubik leading-tight">
                #TK-0023{" "}
              </span>
            </div>
          </div>
          <div class="w-[71px] px-3 py-1.5 bg-stone-200 rounded justify-start items-center gap-2.5 flex">
            <div class="text-red-800 text-xs font-normal font-rubik leading-none">
              Pending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending;
