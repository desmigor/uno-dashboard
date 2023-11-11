import React, { useState, useEffect } from "react";
import Tick from "../../assets/images/dashboard/icon/tick-circle2.svg";
import Close from "../../assets/images/dashboard/icon/add.svg";

function SuccessToast({ text, show, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-close the toast after 3000 milliseconds (3 seconds)
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);

      // Clear the timeout if the component unmounts before the timeout completes
      return () => clearTimeout(timeout);
    }
  }, [show, onClose]);

  return (
    // <div
    //   className={`${
    //     isVisible ? 'block' : 'hidden'
    //   } fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded-md`}
    // >
    <div class={`${
            isVisible ? 'block' : 'hidden'
          }
    w-[490px] h-11 p-2 m-4 fixed top-0 right-0  bg-green-100 rounded-lg border border-green-200 justify-start items-center gap-16 inline-flex`}>
      <div class="justify-start items-center gap-3 flex">
        <div class="w-8 h-7 px-1 py-0.5 bg-green-500 rounded-lg shadow-inner justify-center items-center flex">
          <div class="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
            <div class="w-6 h-6 relative">
                <img src={Tick} alt="" />
            </div>
          </div>
        </div>
        <div class="text-gray-700 text-sm font-normal font-rubik leading-tight">
          {text}
        </div>
      </div>
      <div class="justify-center items-center flex" onClick={
        () => {
          setIsVisible(false);
          onClose();
        }
      }>
        <div class="relative">
            <img src={Close} alt="" />
        </div>
      </div>
    </div>

    // </div>
  );
}

export default SuccessToast;
