import { React, useState } from "react";
import callAPI from "../../utils/api";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { fetchPendingAction } from "../../redux/actions/fetchPendingAction";
import Spinner from "../../components/ui/spinner.jsx";
import { set } from "date-fns";
import TickIcon from "../../assets/images/dashboard/icon/tick-circle3.svg";
import NoTickIcon from "../../assets/images/dashboard/icon/tick-circle-no.svg";

function Modal({
  title,
  content,
  image,
  show,
  onClose,
  cancel,
  restore = false,
  onConfirm,
  issue_id,
  resolution_status,
  resolution_text,
  settings_cancel = false,
}) {
  if (!show) {
    return null;
  }
  const [loading, setLoading] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState(0);

  const dispatch = useDispatch();

  const penalties = [
    {
      id: 1,
      name: "30% Fee",
      value: 30,
    },
    {
      id: 2,
      name: "50% Fee",
      value: 50,
    },
    {
      id: 3,
      name: "100% Fee",
      value: 100,
    },
  ];

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const result = await callAPI("/api/resolution/packages/", "PUT", true, {
        issue_id: issue_id,
        status: resolution_status,
        resolution: resolution_text,
      });
      dispatch(fetchPendingAction());
      setLoading(false);
      onConfirm(true);
      // onClose();
    } catch (error) {
      console.log(error);
      onClose();
      return;
    }
  };

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog open={true} onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
        <div className="w-[440px] h-[390px] flex-col justify-start items-start inline-flex bg-white rounded-2xl rounded-tr-2xl">
          <div className="h-[300px] p-5 flex-col justify-start items-start gap-5 flex">
            <div className="flex-col justify-start items-center gap-5 flex">
              <div className="w-[400px] justify-between items-center inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-rubik">
                  {title}
                </div>
              </div>
              <div
                className={
                  "w-[136px] h-[136px] p-[23px] rounded-[30px] shadow-inner justify-center items-center inline-flex" +
                  (cancel
                    ? " bg-red-700"
                    : restore
                    ? " bg-sky-500"
                    : " bg-green-600")
                }
              >
                <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                  <div className="w-[90px] h-[90px] relative">
                    <img src={image} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-[400px] text-center text-slate-500 text-sm font-normal font-rubik leading-tight">
                {content}
              </div>
            </div>
          </div>
          {cancel && !settings_cancel ? (
            <div className="flex-col justify-center items-center gap-3 inline-flex px-4 py-2">
              <div className="text-center text-red-800 text-sm font-semibold font-rubik leading-tight">
                Cancellation Penalty
              </div>
              <div className="justify-center items-start gap-5 inline-flex">
                {
                  penalties?.map((penalty) => {
                    return (
                      <div
                        className={
                          "h-[52px] p-3.5 bg-white rounded-[10px] border border-gray-100 justify-start items-center gap-1.5 flex" +
                          (selectedPenalty === penalty.id
                            ? " bg-stone-100 border-red-800"
                            : "")
                        }
                        onClick={() => setSelectedPenalty(penalty.id)}
                      >
                        <div className="w-6 h-6 justify-center items-center flex">
                          <div className="w-6 h-6 relative">
                            {selectedPenalty === penalty.id ? (
                              <img src={TickIcon} />
                            ) : (
                              <img src={NoTickIcon} />
                            )}
                          </div>
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                          {penalty.name}
                        </div>
                      </div>
                    );
                  }
                  )

                }
                
              </div>
            </div>
          ) : null}
          <div className="pl-[38px] pr-[39px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
            <div className="self-stretch justify-start items-start gap-[27px] inline-flex">
              <div
                className="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={handleClose}
              >
                <div className="text-center text-zinc-800 text-base font-normal font-rubik leading-tight cursor-pointer">
                  Cancel
                </div>
              </div>
              <div
                className="w-[168px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={
                  settings_cancel
                    ? () => {
                        onConfirm();
                      }
                    : handleConfirm
                }
              >
                {loading ? (
                  <Spinner className={"fill-white"} />
                ) : (
                  <div className="text-center text-white text-base font-normal font-rubik leading-tight">
                    Confirm
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
