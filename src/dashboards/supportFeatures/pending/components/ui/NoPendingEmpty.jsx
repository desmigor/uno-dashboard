import React from "react";
import Cube from "../../../../../assets/images/dashboard/icon/convert-3d-cube.svg";

export default function NoPendingEmpty() {
  return(
    <div class="w-[387px] h-[198px] flex-col justify-start items-center gap-1.5 inline-flex mt-40">
    <div class="w-[152px] h-[152px] justify-center items-center inline-flex">
        <div class="w-[152px] h-[152px] relative">
            <div class="w-[54.78px] h-[56.92px] left-[84.55px] top-[12.67px] absolute">
                <div class="w-[50.16px] h-[40.34px] left-[2.22px] top-[15.52px] absolute">
                </div>
            </div>
            <div class="w-[54.78px] h-[56.92px] left-[12.67px] top-[82.33px] absolute">
                <div class="w-[50.16px] h-[40.34px] left-[2.22px] top-[15.52px] absolute">
                    <img src={Cube} alt="" />
                </div>
            </div>
        </div>
    </div>
    <div class="text-center text-gray-300 text-base font-normal font-rubik leading-tight">Currently, there are no packages waiting resolution. <br/>Please check back again later!</div>
</div>
  );
}
