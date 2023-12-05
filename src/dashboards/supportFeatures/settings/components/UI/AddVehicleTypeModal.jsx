import {useState} from "react";
import { Dialog } from "@headlessui/react";

export default function AddVehicleType({ show, onClose, onConfirm }) {
  if (!show) {
    return null;
  }
  const [vehicleTypeName, setVehicleTypeName] = useState("");
  const [sizeCapacity, setSizeCapacity] = useState("");
  const [packageCapacity, setPackageCapacity] = useState("");

  const handleConfirm = () => {
    onConfirm(true);
    onClose();
  };
  const handleCancel = () => {
    onConfirm(false);
    onClose();
  };

  return (
    <Dialog open={show ? true : false} onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
        <div class="w-[480px] h-[472px] flex-col justify-start items-start inline-flex">
          <form class="h-[382px] p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-5 flex">
            <div class="flex-col justify-start items-start gap-5 flex">
              <div class="w-[409px] justify-between items-center inline-flex">
                <div class="text-zinc-800 text-lg font-semibold font-rubik">
                  Add vehicle type
                </div>
                <div class="w-6 h-6 justify-center items-center flex">
                  <div class="w-6 h-6 relative"></div>
                </div>
              </div>
              <div class="w-[409px] text-slate-500 text-sm font-normal font-rubik leading-tight">
                Add details about the vehicle type
              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Vehicle type name
                </div>
                <input
                  type="text"
                  id="vehicleTypeName"
                  name="vehicleTypeName"
                  onChange={(e) => setVehicleTypeName(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter vehicle type name"
                />

              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Size Capacity
                </div>
                <input
                  type="text"
                  id="sizeCapacity"
                  name="sizeCapacity"
                  onChange={(e) => setSizeCapacity(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter size capacity"
                />

              </div>

              <div class="h-[70px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-xs font-normal font-rubik leading-none">
                  Packages capacity
                </div>
                <input
                  type="text"
                  id="packageCapacity"
                  name="packageCapacity"
                  onChange={(e) => setPackageCapacity(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter package capacity"
                />

              </div>
            </div>
          </form>
          <div class="px-[46.50px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
            <div class="self-stretch justify-center items-start gap-5 inline-flex">
              <div
                class="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={handleCancel}
              >
                <div class="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">
                  Cancel
                </div>
              </div>
              <button
              disabled={!vehicleTypeName || !sizeCapacity || !packageCapacity}
                class={`w-[168px] h-[50px] px-[60px] py-[15px] rounded-xl justify-center items-center gap-2.5 flex cursor-pointer 
                ${vehicleTypeName && sizeCapacity && packageCapacity ? "bg-red-800 text-white" : "bg-zinc-200 text-gray-400"}
                `}
                onClick={handleConfirm}
              >
                <div class="text-center  text-base font-normal font-rubik leading-tight">
                  Save
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
