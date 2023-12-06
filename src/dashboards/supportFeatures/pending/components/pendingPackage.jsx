import React from "react";
import pickupPoint from "../../../../assets/images/dashboard/icon/pickup_point.svg";
import startingPoint from "../../../../assets/images/dashboard/icon/starting_point.svg";

export default function PendingPackage({
  selected,
  tracking_id,
  pickup_point,
  delivery_point,
  time,
  onClick,
}) {
  return (
    <div class="group xl:w-[520px] w-[90%]">
      <div
        class={`xl:w-[520px] w-[100%] h-[220px] relative bg-white rounded-xl border my-2 ${
          selected ? "border-red-800" : ""
        }`
      }
        onClick={onClick}
      >
        <div class="left-[16px] w-[97%] top-[20px] absolute justify-start items-start gap-4 inline-flex">
          <div class="w-4 h-[110px] mt-12 relative">
            <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
              <img src={pickupPoint} alt="" />
            </div>
            <div class="w-4 h-4 left-0 top-[94px] absolute justify-start items-center gap-2 inline-flex">
              <img src={startingPoint} alt="" />
            </div>
            <div class="w-[70px] h-[0px] left-[8px] top-[21px] absolute origin-top-left rotate-90 border-dashed border-[1px] border-slate-400"></div>
          </div>
          <div class="flex-col w-[90%] justify-start items-start gap-9 inline-flex">
          <div className="w-full h-5 justify-between items-center inline-flex">
            <div className="justify-start items-center gap-1 flex">
              <div><span className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Tracking ID: </span><span className="text-red-800 text-sm font-semibold font-['Rubik'] leading-tight">{tracking_id}</span></div>
            </div>
            <div className="w-[71px] px-3 py-1.5 bg-stone-200 rounded justify-start items-center gap-2.5 flex">
              <div className="text-red-800 text-xs font-normal font-['Rubik'] leading-none">Pending</div>
            </div>
          </div> 
            <div className="flex w-full flex-row items-center justify-between">
              <div class="flex-col w-[70%] justify-start items-start gap-[5px] flex">
                <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                  Pickup point
                </div>
                <div class="text-zinc-800 text-xs font-semibold font-rubik leading-none">
                  {pickup_point}
                </div>
              </div>
              <div class="flex-col w-[30%] justify-start items-end gap-0.5 inline-flex">
                <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                  {time?.split("T")[0]}
                </div>
                <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                  {time?.split("T")[1].split(".")[0]}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <div class="flex-col justify-start items-start gap-[5px] flex">
                <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                  Delivery point
                </div>
                <div class="text-zinc-800 text-xs font-semibold font-rubik leading-none">
                  {delivery_point}
                </div>
              </div>
              <div class="flex-col justify-start items-end gap-0.5 inline-flex">
                <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                  {time?.split("T")[0]}
                </div>
                <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                  {time?.split("T")[1].split(".")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
