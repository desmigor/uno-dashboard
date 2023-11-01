import React from "react";

export default function PendingPackageContent({image, prop1, prop2, prop3, prop4}) {
  return (
    <div class="w-[100%]  h-[162px] relative bg-white rounded-xl shadow border border-gray-100">
      <div class="left-[190px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            {prop1.title}
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
            {prop1.value}
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            {prop2.title}
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
            {prop2.value}
          </div>
        </div>
      </div>
      <div class="left-[370px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            {prop3.title}
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
            {prop3.value}
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            {prop4.title}
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
            {prop4.value}
          </div>
        </div>
      </div>
      <div class="opacity-60 w-[165px] h-[169px] pt-4">
        <img src={image} alt="box" className="overflow-hidden" />
      </div>
    </div>
  );
}
