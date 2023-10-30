import { React, useState } from "react";
import ReturnIcon from "../../../../assets/images/dashboard/icon/refresh-2.svg";
import ReturnRedIcon from "../../../../assets/images/dashboard/icon/refresh-2-red.svg";
import reassignIcon from "../../../../assets/images/dashboard/icon/arrow-swap-horizontal.svg";
import closeIcon from "../../../../assets/images/dashboard/icon/close-square.svg";
import Modal from "../../../../components/ui/Modal";
import ReturnIconModal from "../../../../assets/images/dashboard/icon/refresh-circle.svg";
import CancelIconModal from "../../../../assets/images/dashboard/icon/close-circle.svg";
import SuccessToast from "../../../../components/ui/SuccessToast";

export default function OrderResolution() {
  const [showReturnModal, setshowReturnModal] = useState(false);
  const [showCancelModal, setshowCancelModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    // Optional: Clear the toast after a certain duration
    setTimeout(() => {
      setShowToast(false);
    }, 30);
  };

  const handleModalConfirm = (isConfirmed) => {
    if (isConfirmed) {
      handleShowToast();
    }
  }

  return (
    <div class="flex-col justify-start items-start gap-4 flex">
      <Modal
        show={showReturnModal}
        onClose={() => setshowReturnModal(false)}
        title="Package Cancelling"
        image={ReturnIconModal}
        content="After confirmation, this package will immediately be returned to the pickup address by the current courier. This action can’t be revoked."
        cancel={false}
        onConfirm={handleModalConfirm}
      />

      <Modal
        show={showCancelModal}
        onClose={() => setshowCancelModal(false)}
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

      <div class="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight ">
        Order Resolution
      </div>

      <div class="w-[690px]  p-4 bg-white rounded-xl shadow border border-gray-100 flex-col justify-center items-start gap-3 flex">
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
            <button class="group" onClick={() => setshowReturnModal(true)}>
              <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 group-hover:border-red-800 group-hover:bg-stone-100  justify-start items-center gap-1.5 flex">
                <div class="w-7 h-7 justify-center items-center flex">
                  <div class="w-7 h-7 relative">
                    <img
                      src={ReturnIcon}
                      onMouseOver={(e) => {
                        e.currentTarget.src = ReturnRedIcon;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.src = ReturnIcon;
                      }}
                    />
                  </div>
                </div>
                <div class="text-zinc-800 group-hover:text-red-800 text-sm font-normal font-['Rubik'] leading-tight">
                  Return package
                </div>
              </div>
            </button>

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
            <button class="group" onClick={() => setshowCancelModal(true)}>
              <div class="h-14 px-4 py-3.5 bg-white rounded-[10px] border border-gray-100 group-hover:border-red-800 justify-start items-center gap-1.5 flex">
                <div class="w-7 h-7 justify-center items-center flex">
                  <div class="w-7 h-7 relative">
                    <img src={closeIcon} alt="" />
                  </div>
                </div>
                <div class="text-zinc-800 text-sm font-normal group-hover:text-red-800  font-['Rubik'] leading-tight">
                  Cancel package
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
