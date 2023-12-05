import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CloseIcon from '../../../../assets/images/dashboard/icon/close-icon.svg';
import DeactivateIcon from '../../../../assets/images/dashboard/icon/deactivate.svg';
import DeleteIcon from '../../../../assets/images/dashboard/icon/delete.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelPackage } from '../../../../redux/actions/fetchPackagesAction';
import Spinner from '../../../../components/ui/spinner';
import { fetchGroupDetailsAction, updateGroupAction } from '../../../../redux/actions/fetchCouriersAction';

const GroupActionModel = ({ isOpen, setIsOpen, id, text, action, item }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAction = () => {
      dispatch(fetchGroupDetailsAction(id)).then((res) => {
        setLoading(true);
        const payload = {
            name: res.data.name,
            country: res.data.country.id,
            owner_name: res.data.owner_name,
            owner_phone: res.data.owner_phone,
            owner_email: res.data.owner_email,
            deleted: action === 'delete' ? 1 : 0,
            is_active: action === 'deactivate' ? false : true,
        }
        dispatch(updateGroupAction(payload, id, navigate));
        setLoading(false);
        setIsOpen(false);
      })
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
                    <img onClick={() => setIsOpen(false)} src={CloseIcon} className='w-6 h-6 cursor-pointer' />
                </div>
                <img src={action === 'delete' ? DeleteIcon : DeactivateIcon} className='w-[136px] h-[136px] mx-auto mt-[20px]' />
                <div className="w-[400px] text-center text-slate-500 text-sm font-normal font-['Rubik'] mt-5 leading-tight">{text}</div> 
              </div>
              <div className="w-full h-[90px] pl-[38px] pr-[39px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
                <div className="self-stretch justify-start items-start gap-[27px] inline-flex">
                    <div onClick={() => setIsOpen(false)} className="w-[168px] cursor-pointer h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex">
                        <div className="text-center text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Cancel</div>
                    </div>
                    <div onClick={handleAction} className="w-[168px] cursor-pointer h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 flex">
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

export default GroupActionModel