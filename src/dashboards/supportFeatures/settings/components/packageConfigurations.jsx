import React from "react";
import MenuIcon from "../../../../assets/images/dashboard/icon/more_vertical.svg";

export default function PackageConfigurations() {
  return (
    <div>
      <div>
        <div class="text-zinc-800 text-lg font-semibold font-rubik">
          Package sizes
        </div>
        <div class="w-[350px] h-[126px] relative bg-white rounded-xl shadow border border-gray-100">
          <div class="w-4 h-4 left-[324px] top-[10px] absolute">
            <div class="w-[21.33px] h-[21.33px] left-[-2.67px] top-[-2.67px] absolute">
              <img src={MenuIcon} />
            </div>
          </div>
          <div class="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-2 inline-flex">
            <div class="flex-col justify-start items-start gap-1.5 flex">
              <div class="w-[103.04px] text-zinc-800 text-sm font-semibold font-rubik leading-tight">
                Small Package
              </div>
              <div class="w-[318px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                Maximum size should be 20X20 and maximum weight should be 5 kg.
              </div>
            </div>
            <div class="text-red-800 text-sm font-semibold font-rubik leading-tight">
              $6.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
