import EmptyResolution from "../../../../../assets/images/dashboard/icon/judge.svg";

export default function NoOrderResoultion() {
  return (
    <div class="w-full h-[162px] py-[38px] bg-white rounded-xl shadow border border-gray-100 justify-center items-center inline-flex">
      <div class="self-stretch w-full flex-col justify-start items-center gap-1.5 inline-flex">
        <div class="w-[60px] h-[60px] justify-center items-center inline-flex">
          <div class="w-[60px] h-[60px] relative">
            <img src={EmptyResolution} alt="" />
          </div>
        </div>
        <div class="text-center text-gray-300 w-full text-sm font-normal font-rubik leading-tight">
          Package details will be displayed here
        </div>
      </div>
    </div>
  );
}
