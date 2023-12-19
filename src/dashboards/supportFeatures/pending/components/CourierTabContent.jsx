import Courier from "../../../../assets/images/dashboard/image/delivery-guy.png";
import StartVector from "../../../../assets/images/dashboard/icon/Vector.svg";
import NewWindow from "../../../../assets/images/dashboard/icon/export.svg";

export default function CourierTabContent({
  image,
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  rating,
}) {
  return (
    <div class="w-[100%]  h-[162px] pl-[22px] pr-[47px] pt-[22px] pb-6 bg-white rounded-xl shadow border border-gray-100 justify-start items-center gap-8 inline-flex">
      <div class="w-[109px] h-[116px] relative flex-col justify-start items-start flex">
        <div class="w-[105px] h-[105px] rounded-[100px] shadow border-2 border-white justify-center items-center inline-flex">
          <img class="w-[105px] h-[105px] rounded-full" src={image} />
        </div>
        <div class="w-[45px] px-1.5 mx-8 py-1 bg-yellow-50 rounded-[100px] border border-amber-500 flex-col justify-center items-start gap-2.5 inline-flex">
          <div class="justify-start items-center gap-1 inline-flex">
            <img src={StartVector} alt="" />
            <div class="text-amber-500 text-xs font-semibold font-rubik leading-none">
              {rating}
            </div>
          </div>
        </div>
      </div>
      <div class="self-stretch justify-start items-start gap-[60px] inline-flex">
        <div class="flex-col justify-start items-start gap-[19px] inline-flex">
          <div class="flex-col justify-start items-start gap-2 flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              {prop1.title}
            </div>
            <div class="justify-start items-center gap-1.5 inline-flex">
              <div class="text-red-800 text-sm font-normal font-rubik underline">
                {prop1.value}
              </div>
              <div class="w-3 h-3 justify-center items-center flex">
                <div class="w-3 h-3 relative">
                  <img src={NewWindow} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              {prop2.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop2.value}
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[19px] inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              {prop3.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop3.value}
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              {prop4.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop4.value}
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[19px] inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              {prop5.title}
            </div>
            <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
              {prop5.value}
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              {prop6.title}
            </div>
            <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
              {prop6.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
