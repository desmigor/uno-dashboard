import React from 'react'
import Box from '../../assets/images/dashboard/icon/box-icon-notification.svg';
import Ellipse from '../../assets/images/dashboard/icon/Ellipse.svg';

function NotificationCard() {
  return (
    <div className='w-full flex flex-row items-start justify-between p-3 border-b border-gray-100'>
        <div className='flex flex-row items-start gap-2'>
            <div className='w-6 h-6 p-1 bg-gray-100 rounded-[100px] justify-center items-center flex flex-row'>
                <img src={Box} className='w-4 h-4' />
            </div>
            <div className='w-[203px] font-normal font-rubik flex gap-1 text-xs text-gray-400 items-start'>Important! Package TK-2314 waiting resolution.</div> 
        </div>
        <div className='flex flex-row gap-2 items-center mt-1'>
            <div className='w-2 h-2 bg-red-800 rounded-full' />
            <div className="text-red-800 text-xs font-normal font-rubik leading-none">Now</div> 
        </div>
    </div>
  )
}

export default NotificationCard