import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeliveryGirl from "../../../../../assets/images/dashboard/image/delivery-girl.png";
import DeliveryGuy from "../../../../../assets/images/dashboard/image/delivery-guy(2).png";
import DeliveryGuy3 from "../../../../../assets/images/dashboard/image/delivery-guy(3).png";
import NoCourier from "../../../../../assets/images/dashboard/icon/user-search.svg";
import ProfileNone from "../../../../../assets/images/dashboard/image/image.png";
import StartVector from "../../../../../assets/images/dashboard/icon/Vector.svg";
import { Dialog } from "@headlessui/react";
import callAPI from "../../../../../utils/api";

import { fetchMatchCouriersAction } from "../../../../../redux/actions/fetchBestMatchedCouriersAction";

function ReassignModal({ show, onClose, cancel, onConfirm, id }) {
  if (!show) {
    return null;
  }

  const handleClose = () => {
    onConfirm(false);
    onClose();
  };

  const handleNotifyViaSMS = () => {
    // dispatch(notifyViaSMSAction(id));
  };

  const [SelectedIndex, setSelectedIndex] = useState();
  const { couriers } = useSelector((state) => state.fetchMatchCouriers);
  // 10 min timer after notify via sms is clicked
  const [timer, setTimer] = useState(1000);
  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(fetchMatchCouriersAction(id));
  }, []);

  const handlePackageReassign = async (courier_id) => {
    const data = {
      issue_id: id,
      status: 6,
      resolution: "Reassigned",
      new_courier: courier_id,
    };
    try {
      const result = await callAPI(
        `/api/resolution/packages/`,
        "PUT",
        true,
        data
      );
      onConfirm(true);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Dialog open={show ? true : false} onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
        <div class="w-[540px] h-[479px] flex-col justify-start items-start inline-flex ">
          <div class="h-[388px] p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-6 flex">
            <div class="flex-col justify-start items-start gap-1.5 flex">
              <div class="w-[500px] justify-between items-center inline-flex">
                <div class="text-zinc-800 text-lg font-semibold font-rubik">
                  Package Resolution
                </div>
                <div class="w-6 h-6 justify-center items-center flex">
                  <div class="w-6 h-6 relative"></div>
                </div>
              </div>
              <div class="w-[500px] text-slate-500 text-sm font-normal font-rubik leading-tight">
                This package needs to be reassigned. The closest new couriers
                will be highlighted.
              </div>
            </div>
            <div class="flex-col justify-start items-start gap-3 overflow-auto">
              <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
                Best matched couriers
              </div>
              {couriers.length != 0 ? (
                couriers.map((courier, index) => (
                  <div
                    className={
                      SelectedIndex == index
                        ? "w-[500px] h-[105px] relative rounded-xl shadow bg-stone-50 border border-red-800"
                        : "w-[500px] h-[105px] relative rounded-xl shadow bg-white"
                    }
                    key={index}
                  >
                    <div class="left-[101px] top-[43px] absolute justify-start items-center gap-3 inline-flex">
                      <div class="flex-col justify-start items-start gap-1.5 inline-flex">
                        <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                          {courier.full_name}
                        </div>
                        <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                          {courier.phone_number}
                        </div>
                      </div>
                    </div>
                    <div class="left-[101px] top-[16px] absolute justify-start items-start gap-2 inline-flex">
                      <div
                        class={
                          !courier.is_offline && !courier.is_paused
                            ? "w-[60px] px-3 py-1.5 bg-green-100 rounded justify-start items-center gap-2.5 flex"
                            : courier.is_paused
                            ? "w-[66px] h-[19px] px-3 py-1.5 bg-yellow-50 rounded justify-start items-center gap-2.5 inline-flex"
                            : "w-[61px] h-[19px] px-3 py-1.5 bg-rose-100 rounded justify-start items-center gap-2.5 inline-flex"
                        }
                      >
                        <div
                          class={
                            !courier.is_offline && !courier.is_paused
                              ? "text-green-700  text-xs font-normal font-rubik leading-none"
                              : courier.is_paused
                              ? "text-amber-500  text-xs font-normal font-rubik leading-none"
                              : "text-red-700  text-xs font-normal font-rubik leading-none"
                          }
                        >
                          {!courier.is_offline && !courier.is_paused
                            ? "Online"
                            : courier.is_paused
                            ? "Paused"
                            : "Ofline"}
                        </div>
                      </div>
                      <div class="w-[100px] px-2 py-1.5 bg-gray-100 rounded justify-start items-center gap-2.5 flex">
                        <div class="text-slate-500 text-xs font-normal font-rubik leading-none">
                          {/* courier.distance rounded to 2 decimal places */}
                          {parseFloat(courier.distance).toFixed(2)} km away
                        </div>
                      </div>
                    </div>
                    {
                      // 10 min timer after notify via sms is clicked
                      courier.last_sms_date &&
                        courier.last_sms_date + 600000 > Date.now() && (
                          <div class="text-right pt-4 pr-4">
                            <span className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                              Resend SMS in{" "}
                            </span>
                            <span className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">
                              {timer / 100} min
                            </span>
                          </div>
                        )
                    }

                    <div
                      class={
                        courier.is_paused
                          ? "w-[180px] h-10 px-[20px] py-[15px] left-[300px] top-[49px] absolute bg-zinc-200 rounded-lg justify-center items-center gap-2.5 inline-flex"
                          : courier.is_offline
                          ? "w-[180px] h-10 px-[20px] py-[15px] left-[300px] top-[49px] absolute bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex"
                          : "w-[130px] h-10 px-[60px] py-[15px] left-[354px] top-[49px] absolute bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex"
                      }
                      onClick={() => {
                        if (!courier.is_offline && !courier.is_paused) {
                          setSelectedIndex(index);
                        } else if (courier.is_paused) {
                          setSelectedIndex(index);
                        } else if (courier.is_offline) {
                          handleNotifyViaSMS(index);
                        }
                      }}
                    >
                      <div class="text-center text-white text-sm font-normal font-rubik leading-tight cursor-pointer">
                        {!courier.is_offline && !courier.is_paused
                          ? "Select"
                          : courier.is_paused
                          ? "Notify via SMS"
                          : "Notify via SMS"}
                      </div>
                    </div>
                    <div class="w-[70px] h-[73px] left-[16px] top-[16px] absolute">
                      <img
                        class="w-[70px] h-[70px] left-0 top-0 absolute rounded-[121.67px]"
                        src={
                          courier.profile_photo_link
                            ? courier.profile_photo_link
                            : ProfileNone
                        }
                      />
                      <div class="w-[46px] px-1.5 py-1 left-[12px] top-[53px] absolute bg-yellow-50 rounded-[100px] border border-amber-500 flex-col justify-center items-start gap-2.5 inline-flex">
                        <div class="justify-start items-center gap-1 inline-flex">
                          <img src={StartVector} alt="" />
                          <div class="text-amber-500 text-xs font-semibold font-rubik leading-none">
                            {courier.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div class="w-[285px] h-[131px] flex-col justify-start items-center gap-[11px] inline-flex mx-24 mt-10">
                  <div class="w-20 h-20 justify-center items-center inline-flex">
                    <div class="w-20 h-20 relative">
                      <img src={NoCourier} alt="" />
                    </div>
                  </div>
                  <div class="w-[285px] text-center text-gray-300 text-sm font-normal font-rubik leading-tight">
                    Currently, there are no available couriers! Check back
                    later.
                  </div>
                </div>
              )}
              {}
            </div>
          </div>
          <div class="pl-[34px] pr-[33px] pt-[21px] pb-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
            <div class="self-stretch justify-start items-start gap-[31px] inline-flex">
              <div
                class="w-[221px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={handleClose}
              >
                <div class="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">
                  Cancel
                </div>
              </div>
              <button
                disabled={SelectedIndex == undefined}
                class={`w-[221px] h-[50px] px-[60px] py-[15px]  rounded-[10px] justify-center items-center gap-2.5 flex cursor-pointer ${
                  SelectedIndex == undefined
                    ? "text-gray-400 bg-zinc-200 disabled"
                    : "text-white bg-red-800 enabled"
                }`}
                onClick={
                  SelectedIndex == undefined
                    ? () => console.log("No courier selected")
                    : () => handlePackageReassign(couriers[SelectedIndex].id)
                }
              >
                <div class="text-center text-base font-normal font-rubik leading-tight ">
                  Confirm
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ReassignModal;
