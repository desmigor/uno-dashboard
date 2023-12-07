import React from "react";

export default function CustomerTabContent({
  image,
  prop1,
  prop2,
  prop3,
  prop4,
}) {
  return (
    <div class="w-[100%] h-[162px] relative bg-white rounded-xl p-4 flex flex-row items-center gap-5 shadow border border-gray-100">
      <div class="w-[114px] justify-center items-center inline-flex">
        <img class="rounded-[100px] shadow border-2 border-white " src={image} />
      </div>
      <div className="flex flex-row gap-4">
        <div class="flex-col justify-start items-start gap-5 inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop1.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop1.value}
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop2.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop2.value}
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-5 inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop3.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop3.value}
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop4.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop4.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
