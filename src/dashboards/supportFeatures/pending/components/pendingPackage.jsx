import React from "react";
import pickup_point from "../../../../assets/images/dashboard/icon/pickup_point.svg";
import startingPoint from "../../../../assets/images/dashboard/icon/starting_point.svg";

export default function PendingPackage(active) {
  return (
    <div class="group">
    <div class="w-[460px] h-[186px] relative bg-white rounded-xl border mx-8 my-2 group-hover:border-red-800">
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
            <span className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight group-hover:text-red-800">
              #TK-0023{" "}
            </span>
          </div>
        </div>
        <div class="w-[71px] px-3 py-1.5 bg-stone-100 rounded justify-start items-center gap-2.5 flex group-hover:bg-stone-200">
          <div class="group-hover:text-red-800 text-slate-500 text-xs font-normal font-['Rubik'] leading-none">
            Pending
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
