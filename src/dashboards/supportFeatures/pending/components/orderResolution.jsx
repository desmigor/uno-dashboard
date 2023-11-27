import { React, useState } from "react";
import ReturnIcon from "../../../../assets/images/dashboard/icon/refresh-2.svg";
import reassignIcon from "../../../../assets/images/dashboard/icon/arrow-swap-horizontal.svg";
import closeIcon from "../../../../assets/images/dashboard/icon/close-square.svg";
import Modal from "../../../../components/ui/Modal";
import ReassignModal from "./ui/PackageReassignModal";

import ReturnIconModal from "../../../../assets/images/dashboard/icon/refresh-circle.svg";
import CancelIconModal from "../../../../assets/images/dashboard/icon/close-circle.svg";
import SuccessToast from "../../../../components/ui/SuccessToast";

export default function OrderResolution({item}) {
  const [showReturnModal, setshowReturnModal] = useState(false);
  const [showCancelModal, setshowCancelModal] = useState(false);
  const [showReassignModal, setshowReassignModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [SelectedAction, setSelectedAction] = useState("");

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 30);
  };

  const handleModalConfirm = (isConfirmed) => {
    if (isConfirmed) {
      handleShowToast();
    }
  };

  return (
    <div class="flex-col w-full justify-start items-start gap-4 flex">
      <Modal
        show={showReturnModal}
        onClose={() => setshowReturnModal(false)}
        title="Package Return"
        image={ReturnIconModal}
        content="After confirmation, this package will immediately be returned to the pickup address by the current courier. This action can’t be revoked."
        cancel={false}
        onConfirm={handleModalConfirm}
      />

      <Modal
        show={showCancelModal}
        onClose={() => setshowCancelModal(false)}
        title="Package Cancelling"
        image={CancelIconModal}
        content="After confirmation, this package will immediately be canceled. This action can’t be revoked."
        cancel={true}
        onConfirm={handleModalConfirm}
      />

      <ReassignModal
        show={showReassignModal}
        onClose={() => setshowReassignModal(false)}
        title="Package Return"
        image={CancelIconModal}
        content="After confirmation, this package will immediately be canceled. This action can’t be revoked."
        cancel={true}
        onConfirm={handleModalConfirm}
      />

      <SuccessToast
        text="The pending package has been successfully resolved"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div class="text-zinc-800 text-base font-semibold font-rubik leading-tight ">
        Order Resolution
      </div>

      <div class="w-[100%]  p-4 bg-white rounded-xl shadow border border-gray-100 flex-col justify-center items-start gap-3 flex mb-[16px]">
        <div class="self-stretch flex-col justify-start items-start gap-[5px] inline-flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            Cancellation reason
          </div>
          <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
            {item.subject}
          </div>
        </div>
        <div class="self-stretch flex-col justify-start items-start gap-[7px] inline-flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            Select a resolution
          </div>
          <div class="justify-between w-full items-start gap-3.5 inline-flex">
            <button
              className="group w-[33%]"
              onClick={() => setSelectedAction("return")}
            >
              <div
                class={
                  SelectedAction == "return"
                    ? "h-14 px-4 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-start items-center gap-1.5 flex"
                    : "h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-start items-center gap-1.5 flex"
                }
              >
                <div class="w-7 h-7 justify-center items-center flex">
                  <div class="w-7 h-7 relative">
                    <img src={ReturnIcon} />
                  </div>
                </div>
                <div class=" text-sm font-normal font-rubik leading-tight">
                  <text
                    className={
                      SelectedAction == "return"
                        ? " text-red-800"
                        : "text-zinc-800 "
                    }
                  >
                    Return package
                  </text>
                </div>
              </div>
            </button>

            <button
              className="group w-[33%]"
              onClick={() => setSelectedAction("reassign")}
            >
              <div
                class={
                  SelectedAction == "reassign"
                    ? "h-14 px-4 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-start items-center gap-1.5 flex"
                    : "h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-start items-center gap-1.5 flex"
                }
              >
                <div class="w-7 h-7 justify-center items-center flex">
                  <div class="w-7 h-7 relative">
                    <img src={reassignIcon} alt="" />
                  </div>
                </div>
                <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight group-hover:text-red-800">
                  <span
                    className={
                      SelectedAction == "reassign"
                        ? " text-red-800"
                        : "text-zinc-800 "
                    }
                  >
                    Reassign package
                  </span>
                </div>
              </div>
            </button>
            <button
              className="group w-[33%]"
              onClick={() => setSelectedAction("cancel")}
            >
              <div
                class={
                  SelectedAction == "cancel"
                    ? "h-14 px-4 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-start items-center gap-1.5 flex"
                    : "h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-start items-center gap-1.5 flex"
                }
              >
                <div class="w-7 h-7 justify-center items-center flex">
                  <div class="w-7 h-7 relative">
                    <img src={closeIcon} alt="" />
                  </div>
                </div>
                <div class="text-zinc-800 text-sm font-normal group-hover:text-red-800  font-rubik leading-tight">
                  <span
                    className={
                      SelectedAction == "cancel"
                        ? " text-red-800"
                        : "text-zinc-800 "
                    }
                  >
                    Cancel package
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="w-[100%] bg-white border-t border-gray-100 justify-center items-center inline-flex" />
      <div
        class={
          SelectedAction == ""
            ? "w-[312px] mx-auto h-[50px] px-[60px] py-[15px] bg-zinc-200 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
            : "w-[312px] mx-auto h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
        }
        onClick={
          SelectedAction == ""
            ? () => console.log("No action selected")
            : SelectedAction == "return"
            ? () => setshowReturnModal(true)
            : SelectedAction == "reassign"
            ? () => setshowReassignModal(true)
            : () => setshowCancelModal(true)
        }
      >
        <div class="text-center text-base font-normal font-rubik leading-tight cursor-pointer">
          <span
            className={SelectedAction == "" ? "text-gray-400" : "text-white"}
          >
            Proceed with Resolution
          </span>
        </div>
      </div>
    </div>
  );
}
