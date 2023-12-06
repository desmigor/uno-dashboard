import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import Spinner from "../../../../../components/ui/spinner";
import callAPI from "../../../../../utils/api";
import { fetchVehicleTypesAction } from "../../../../../redux/actions/fetchVehicleTypes";

export default function AddVehicleType({ show, onClose, onConfirm, editData }) {
  if (!show) {
    return null;
  }
  const [vehicleTypeName, setVehicleTypeName] = useState(
    editData ? editData.name : ""
  );
  const [maxHeight, setMaxHeight] = useState(
    editData ? editData.max_height : ""
  );
  const [maxWeight, setMaxWeight] = useState(
    editData ? editData.max_weight : ""
  );
  const [maxWidth, setMaxWidth] = useState(
    editData ? editData.max_width : ""
  );
  const [maxLength, setMaxLength] = useState(
    editData ? editData.max_length : ""
  );
  const [averageSpeed, setAverageSpeed] = useState(
    editData ? editData.average_speed : ""
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSave = async (
    id=null,
  ) => {
    console.log(id);
    setLoading(true);
    try {
      const data = {
        max_weight: maxWeight,
        max_height: maxHeight,
        max_width: maxWidth,
        max_length: maxLength,
        average_speed: averageSpeed,
        name: vehicleTypeName,
      };
      console.log(data);
      const response = await callAPI(
        id ? `/api/admin/vehicle-type/${id}` :
        "/api/admin/vehicle-type/", 
        id ? "PUT" :
        "POST", 
        true, 
        data);
      console.log(response);
      dispatch(fetchVehicleTypesAction());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
        <div class="w-[280px] h-[760px] flex-col justify-start items-start inline-flex">
          <form class="h-[670px] p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-5 flex">
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
                  value={vehicleTypeName}
                  onChange={(e) => setVehicleTypeName(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter vehicle type name"
                />
              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  maximum height
                </div>
                <input
                  type="text"
                  id="maxHeight"
                  name="maxHeight"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter maximum height"
                />
              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  maximum Length
                </div>
                <input
                  type="text"
                  id="maxLength"
                  name="maxLength"
                  value={maxLength}
                  onChange={(e) => setMaxLength(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter maximum length"
                />
              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  maximum width
                </div>
                <input
                  type="text"
                  id="maxWidth"
                  name="maxWidth"
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter maximum width"
                />
              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Average speed
                </div>
                <input
                  type="text"
                  id="averageSpeed"
                  name="averageSpeed"
                  value={averageSpeed}
                  onChange={(e) => setAverageSpeed(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter average speed"
                />
              </div>
              <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  maximum weight
                </div>
                <input
                  type="text"
                  id="maxWeight"
                  name="maxWeight"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter maximum weight"
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
                disabled={
                  !vehicleTypeName ||
                  !maxHeight ||
                  !maxWeight ||
                  !maxWidth ||
                  !maxLength ||
                  !averageSpeed
                }
                class={`w-[168px] h-[50px] px-[60px] py-[15px] rounded-xl justify-center items-center gap-2.5 flex cursor-pointer 
                ${
                  vehicleTypeName &&
                  maxHeight &&
                  maxWeight &&
                  maxWidth &&
                  maxLength &&
                  averageSpeed
                    ? "bg-red-800 text-white"
                    : "bg-zinc-200 text-gray-400"
                }
                `}
                onClick={
                  editData
                    ? () => {
                        handleSave(
                          editData.id,
                        );
                      }
                    : () => {
                        handleSave();
                      }
                }
              >
                {loading ? (
                  <Spinner className={"fill-white"} />
                ) : (
                  <div className="text-center text-base font-normal font-rubik leading-tight">
                    Save
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
