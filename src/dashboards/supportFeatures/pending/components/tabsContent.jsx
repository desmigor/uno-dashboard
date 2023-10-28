import React from "react";
import boxImage from "../../../../assets/images/dashboard/image/box.png";

export default function PendingTabsContent() {
  return (
    <div class="w-[612px] h-[162px] relative bg-white rounded-xl shadow border border-gray-100">
      <div class="left-[190px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            Size
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
            Medium
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            Package Add-ons
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
            Fragile
          </div>
        </div>
      </div>
      <div class="left-[388px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            Payment Method
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
            Credit Card
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            Amount
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
            $20.09
          </div>
        </div>
      </div>
      <div class="opacity-60 w-[165px] h-[169px] pt-4">
        <img src={boxImage} alt="box" className="overflow-hidden" />
      </div>
    </div>
  );
}
