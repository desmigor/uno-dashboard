import React from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CloseIcon from '../../../../assets/images/dashboard/icon/close-icon.svg';
import CancelIcon from '../../../../assets/images/dashboard/icon/closeBigImage.svg';
import { useDispatch, useSelector } from 'react-redux';
import { cancelPackage } from '../../../../redux/actions/fetchPackagesAction';
import Spinner from '../../../../components/ui/spinner';

const CancelModal = ({ isOpen, setIsOpen, id  }) => {
    const { loading } = useSelector((state) => state.fetchPackages);
    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(cancelPackage(id));
    }
  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[440px] h-[370px] flex-col justify-start bg-white rounded-2xl items-start inline-flex">
              <div className="w-full p-5">
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Package Cancelling</div>
                    <img src={CloseIcon} className='w-6 h-6' />
                </div>
                <img src={CancelIcon} className='w-[136px] h-[136px] mx-auto mt-[20px]' />
                <div className="w-[400px] text-center text-slate-500 text-sm font-normal font-['Rubik'] mt-5 leading-tight">After confirmation, this package will immediately be canceled. This action can’t be revoked.</div> 
              </div>
              <div className="w-full h-[90px] pl-[38px] pr-[39px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
                <div className="self-stretch justify-start items-start gap-[27px] inline-flex">
                    <div onClick={() => setIsOpen(false)} className="w-[168px] cursor-pointer h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex">
                        <div className="text-center text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Cancel</div>
                    </div>
                    <div onClick={handleCancel} className="w-[168px] cursor-pointer h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 flex">
                        {
                            loading ? <Spinner className={'fill-white'} /> : <div className="text-center text-white text-base font-normal font-['Rubik'] leading-tight">Confirm</div>
                        }
                    </div>
                </div> 
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

export default CancelModal