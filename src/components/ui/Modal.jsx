import { React, useState } from "react";
import callAPI from "../../utils/api";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { fetchPendingAction } from "../../redux/actions/fetchPendingAction";
import Spinner from "../../components/ui/spinner.jsx";
import { set } from "date-fns";

function Modal({
  title,
  content,
  image,
  show,
  onClose,
  cancel,
  onConfirm,
  issue_id,
  resolution_status,
  resolution_text,
}) {
  if (!show) {
    return null;
  }
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    try {
      setLoading(true);
      console.log(resolution_status);
      const result = await callAPI("/api/resolution/packages/", "PUT", true, {
        issue_id: issue_id,
        status: resolution_status,
        resolution: resolution_text,
      });
      console.log("result : ");
      console.log(result);
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
                class={
                  "w-[136px] h-[136px] p-[23px] rounded-[30px] shadow-inner justify-center items-center inline-flex" +
                  (cancel ? " bg-red-700" : " bg-green-600")
                }
              >
                <div class="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                  <div class="w-[90px] h-[90px] relative">
                    <img src={image} alt="" />
                  </div>
                </div>
              </div>
              <div class="w-[400px] text-center text-slate-500 text-sm font-normal font-rubik leading-tight">
                {content}
              </div>
            </div>
          </div>
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
                onClick={handleConfirm}
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
