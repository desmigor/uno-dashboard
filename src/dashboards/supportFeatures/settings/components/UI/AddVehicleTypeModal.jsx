import React from "react";

export default function AddVehicleType({ show, onClose, onConfirm }) {
  if (!show) {
    return null;
  }
  const handleConfirm = () => {
    onConfirm(true);
    onClose();
  };
  const handleCancel = () => {
    onConfirm(false);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
      <div class="w-[449px] h-[472px] flex-col justify-start items-start inline-flex">
        <div class="h-[382px] p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-5 flex">
          <div class="flex-col justify-start items-start gap-5 flex">
            <div class="w-[409px] justify-between items-center inline-flex">
              <div class="text-zinc-800 text-lg font-semibold font-['Rubik']">
                Add vehicle type
              </div>
              <div class="w-6 h-6 justify-center items-center flex">
                <div class="w-6 h-6 relative"></div>
              </div>
            </div>
            <div class="w-[409px] text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
              Add details about the vehicle type
            </div>
            <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
              <div class="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                Vehicle type name
              </div>
              <div class="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                  Van
                </div>
              </div>
            </div>
            <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
              <div class="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                Size Capacity
              </div>
              <div class="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                <div>
                  <span className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                    40kg/400 m
                  </span>
                  <span className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                    3
                  </span>
                </div>
              </div>
            </div>
            <div class="h-[70px] flex-col justify-start items-start gap-1.5 flex">
              <div class="text-slate-500 text-xs font-normal font-['Rubik'] leading-none">
                Packages capacity
              </div>
              <div class="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                <div class="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                  Standard
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-[46.50px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
          <div class="self-stretch justify-center items-start gap-5 inline-flex">
            <div
              class="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
              onClick={handleCancel}
            >
              <div class="text-center text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Cancel
              </div>
            </div>
            <div
              class="w-[168px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 flex cursor-pointer"
              onClick={handleConfirm}
            >
              <div class="text-center text-white text-base font-normal font-['Rubik'] leading-tight">
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
