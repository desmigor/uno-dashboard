import React from "react";

export default function LocationPointContent({
  image,
  prop1,
  prop2,
  prop3,
}) {
  return (
    <div class="w-[690px]  h-[162px] relative bg-white rounded-xl shadow border border-gray-100">
      <div class="left-[190px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            {prop1.title}
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
            {prop1.value}
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            {prop2.title}
          </div>
          <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
            {prop2.value}
          </div>
        </div>
      </div>
      <div class="left-[388px] top-[26px] absolute flex-col justify-start items-start gap-5 inline-flex">
        <div class="flex-col justify-start items-start gap-[5px] flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            {prop3.title}
          </div>
          <div class="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">
            {prop3.value}
          </div>
        </div>
        
      </div>
      <div class="w-[163px] h-[130px] relative rounded flex-col justify-start items-start flex m-4 ">
        <img
          class="w-[193px] h-[142px]"
          src={image}
        />  
         
      </div>
    </div>
  );
}
