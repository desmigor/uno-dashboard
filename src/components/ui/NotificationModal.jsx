import React from 'react'
import Icon from '../../assets/images/dashboard/icon/close.svg';
import NotificationCard from './NotificationCard';

function NotificationModal() {
  return (
    <div className="w-[337px] h-[409px] absolute z-10 top-[54px] rounded-lg right-[75px] bg-white shadow-lg flex flex-col" >
        <div className='flex flex-row justify-between mt-5 mx-3'>
          <span className="text-zinc-800 text-base font-semibold font-rubik leading-tight">Notifications (3)</span>
          <div className='flex flex-row gap-[5px] items-center'>
            <img src={Icon} className='w-[19px] h-[19px]' />
            <span className="text-red-800 text-xs font-normal font-rubik leading-none">Clear all</span>
          </div>
        </div>
        <div className="w-[337px] h-[0px] border border-gray-100 mt-[21px]" /> 
        <NotificationCard />
    </div>
  )
}

export default NotificationModal