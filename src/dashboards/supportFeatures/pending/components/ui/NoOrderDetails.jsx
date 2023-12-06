import React from "react";
import EmptyPackage from "../../../../../assets/images/dashboard/icon/clipboard-text.svg";

export default function NoPendingEmpty() {
  return (
    <div class="w-[100%] h-[162px] py-[38px] bg-white rounded-xl shadow border border-gray-100 justify-center items-center inline-flex">
    <div class="self-stretch flex-col justify-start items-center gap-1.5 inline-flex">
        <div class="w-[60px] h-[60px] justify-center items-center inline-flex">
            <div class="w-[60px] h-[60px] relative">
                    <img src={EmptyPackage} alt="" />
            </div>
        </div>
        <div class="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">Package details will be displayed here</div>
    </div>
</div>
  );
}
