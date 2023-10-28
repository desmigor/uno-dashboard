import ReturnIcon from "../../../../assets/images/dashboard/icon/refresh-2.svg";
import reassignIcon from "../../../../assets/images/dashboard/icon/arrow-swap-horizontal.svg";
import closeIcon from "../../../../assets/images/dashboard/icon/close-square.svg";

export default function OrderResolution() {
  return (
    <div class="flex-col justify-start items-start gap-4 flex">
      <div class="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight ">
        Order Resolution
      </div>

      <div class="p-4 bg-white rounded-xl shadow border border-gray-100 flex-col justify-center items-start gap-3 flex">
        <div class="self-stretch flex-col justify-start items-start gap-[5px] inline-flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            Cancellation reason
          </div>
          <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
            The courier had an accident on the way
          </div>
        </div>
        <div class="self-stretch flex-col justify-start items-start gap-[7px] inline-flex">
          <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
            Select a resolution
          </div>
          <div class="justify-start items-start gap-3.5 inline-flex">
            <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex">
              <div class="w-7 h-7 justify-center items-center flex">
                <div class="w-7 h-7 relative">
                    <img src={ReturnIcon} alt="" />
                </div>
              </div>
              <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                Return package
              </div>
            </div>
            <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex">
              <div class="w-7 h-7 justify-center items-center flex">
                <div class="w-7 h-7 relative">
                    <img src={reassignIcon} alt="" />
                </div>
              </div>
              <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                Reassign package
              </div>
            </div>
            <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex">
              <div class="w-7 h-7 justify-center items-center flex">
                <div class="w-7 h-7 relative">
                    <img src={closeIcon} alt="" />
                </div>
              </div>
              <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                Cancel package
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
