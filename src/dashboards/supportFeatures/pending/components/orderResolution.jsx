import { React, useState } from "react";
import ReturnIcon from "../../../../assets/images/dashboard/icon/refresh-2.svg";
import reassignIcon from "../../../../assets/images/dashboard/icon/arrow-swap-horizontal.svg";
import closeIcon from "../../../../assets/images/dashboard/icon/close-square.svg";
import Modal from "../../../../components/ui/Modal";
import ReassignModal from "./ui/PackageReassignModal";
import restoreIcon from "../../../../assets/images/dashboard/icon/receive-square.svg";
import restoreIconBig from "../../../../assets/images/dashboard/icon/receive-square(2).svg";

import ReturnIconModal from "../../../../assets/images/dashboard/icon/refresh-circle.svg";
import CancelIconModal from "../../../../assets/images/dashboard/icon/close-circle.svg";
import SuccessToast from "../../../../components/ui/SuccessToast";

export default function OrderResolution({ item }) {
  const [showReturnModal, setshowReturnModal] = useState(false);
  const [showCancelModal, setshowCancelModal] = useState(false);
  const [showReassignModal, setshowReassignModal] = useState(false);
  const [showRestoreModal, setshowRestoreModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [SelectedAction, setSelectedAction] = useState("");

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 30);
  };

  const handleModalConfirm = (isConfirmed) => async () => {
    console.log(here)
      handleShowToast();
      setshowReturnModal(false);
      setshowCancelModal(false);
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
        onConfirm={
          () => {
            handleShowToast();
            setshowReturnModal(false);
          }
        }
        issue_id={item.id}
        resolution_status={5}
        resolution_text={"Order Return"}
      />

      <Modal
        show={showCancelModal}
        onClose={() => setshowCancelModal(false)}
        title="Package Cancelling"
        image={CancelIconModal}
        content="After confirmation, this package will immediately be canceled. This action can’t be revoked."
        cancel={true}
        onConfirm={
          () => {
            handleShowToast();
            setshowCancelModal(false);
          }
        }
        issue_id={item.id}
        resolution_status={
          item.title == "can't pick up" ? 2 : 4
        }
        resolution_text={"Cancel"}
      />

      <ReassignModal
        show={showReassignModal}
        onClose={() => setshowReassignModal(false)}
        title="Package Return"
        image={CancelIconModal}
        content="After confirmation, this package will immediately be canceled. This action can’t be revoked."
        cancel={true}
        onConfirm={handleModalConfirm(true)}
        id={item.id}
      />

      <Modal
        show={showRestoreModal}
        onClose={() => setshowRestoreModal(false)}
        title="Package Restore"
        image={restoreIconBig}
        content="After confirmation, this package will immediately be restored to the previous stage. This action can’t be revoked."
        restore={true}
        onConfirm={
          () => {
            handleShowToast();
            setshowRestoreModal(false);
          }
        }
        id={item.id}
        issue_id={item.id}
        resolution_status={3}
        resolution_text={"Order Restored"}
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
            {item.issue_type_value} Reason
          </div>
          <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
            {item.title}
          </div>
        </div>
        <div class="self-stretch flex-col justify-start items-start gap-[7px] inline-flex">
          <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
            Select a resolution
          </div>
          <div class="justify-between w-full items-start gap-3.5 inline-flex">
            <button
            disabled={item.issue_type_value == "Order Reassignation"}
              className="group w-[24%]"
              onClick={() => setSelectedAction("return")}
            >
              <div
                class={
                  SelectedAction == "return"
                    ? "h-14 px-2 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-center items-center gap-1.5 flex"
                    : "h-14 px-2 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-center items-center gap-1.5 flex"
                }
              >
                <div class="w-5 h-5 justify-center items-center flex">
                  <div class="w-5 h-5 relative">
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
                    Return
                  </text>
                </div>
              </div>
            </button>

            <button
              className="group w-[24%]"
              onClick={() => setSelectedAction("reassign")}
            >
              <div
                class={
                  SelectedAction == "reassign"
                    ? "h-14 px-2 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-center items-center gap-1.5 flex"
                    : "h-14 px-2 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-center items-center gap-1.5 flex"
                }
              >
                <div class="w-5 h-5 justify-center items-center flex">
                  <div class="w-5 h-5 relative">
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
                    Reassign
                  </span>
                </div>
              </div>
            </button>
            <button
              className="group w-[24%]"
              onClick={() => setSelectedAction("restore")}
            >
              <div
                class={
                  SelectedAction == "restore"
                    ? "h-14 px-2 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-center items-center gap-1.5 flex"
                    : "h-14 px-2 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-center items-center gap-1.5 flex"
                }
              >
                <div class="w-7 h-7 justify-center items-center inline-flex">
                  <div class="w-7 h-7 mt-2 relative">
                    <img src={restoreIcon} alt="" />
                  </div>
                </div>
                <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight group-hover:text-red-800">
                  <span
                    className={
                      SelectedAction == "restore"
                        ? " text-red-800"
                        : "text-zinc-800 "
                    }
                  >
                    Restore
                  </span>
                </div>
              </div>
            </button>
            <button
              className="group w-[24%]"
              onClick={() => setSelectedAction("cancel")}
            >
              <div
                class={
                  SelectedAction == "cancel"
                    ? "h-14 px-2 py-3.5 rounded-[10px] bg-stone-100 border border-red-800 justify-center items-center gap-1.5 flex"
                    : "h-14 px-2 py-3.5 bg-white rounded-[10px] border border-gray-100  justify-center items-center gap-1.5 flex"
                }
              >
                <div class="w-5 h-5 justify-center items-center flex">
                  <div class="w-5 h-5 relative">
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
                    Cancel
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
            : SelectedAction == "restore"
            ? () => setshowRestoreModal(true)
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
