import Courier from "../../../../assets/images/dashboard/image/delivery-guy.png";
import StartVector from "../../../../assets/images/dashboard/icon/Vector.svg";
import NewWindow from "../../../../assets/images/dashboard/icon/export.svg";

export default function CourierTabContent() {
  return (
    <div class="w-[100%]  h-[162px] pl-[22px] pr-[47px] pt-[22px] pb-6 bg-white rounded-xl shadow border border-gray-100 justify-start items-center gap-8 inline-flex">
      <div class="w-[109px] h-[116px] relative flex-col justify-start items-start flex">
        <div class="w-[105px] h-[105px] rounded-[100px] shadow border-2 border-white justify-center items-center inline-flex">
          <img class="w-[105px] h-[105px]n rounded-full" src={Courier} />
        </div>
        <div class="w-[45px] px-1.5 mx-8 py-1 bg-yellow-50 rounded-[100px] border border-amber-500 flex-col justify-center items-start gap-2.5 inline-flex">
          <div class="justify-start items-center gap-1 inline-flex">
            <img src={StartVector} alt="" />
            <div class="text-amber-500 text-xs font-semibold font-rubik leading-none">
              4.9
            </div>
          </div>
        </div>
      </div>
      <div class="self-stretch justify-start items-start gap-[60px] inline-flex">
        <div class="flex-col justify-start items-start gap-[19px] inline-flex">
          <div class="flex-col justify-start items-start gap-2 flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              Name
            </div>
            <div class="justify-start items-center gap-1.5 inline-flex">
              <div class="text-red-800 text-sm font-normal font-rubik underline">
                James Locker
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
              Phone
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              +233-4823-321-312
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[19px] inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              Country
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              Ghana
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              Vehicle Type
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              Van
            </div>
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-[19px] inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              Total Trips
            </div>
            <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
              23
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              Total Revenue
            </div>
            <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
              $505
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
