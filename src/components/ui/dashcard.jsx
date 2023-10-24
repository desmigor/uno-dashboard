import React from 'react';
import Up from '../../assets/images/dashboard/icon/arrow.svg'
import Down from '../../assets/images/dashboard/icon/arrow2.svg'

function Dashcard({ icon, text, number, percentage, iconBgColor, down }) {
  return (
    <div className='w-[45%] h-[96px] rounded-lg bg-white p-3 cursor-pointer'>
        <div className='flex flex-row gap-[8px] items-center'>
            <div className={`w-[24px] h-[24px] ${iconBgColor} rounded-full flex justify-center items-center`}>
                <img src={icon} className='h-3.5 w-3.5' />
            </div>
            <span className={`text-gray-400 text-sm font-normal font-rubik leading-tight`}>{text}</span>
        </div>
        <div className='flex flex-row items-center justify-between mt-[15px]'>
            <h1 className={`text-zinc-800 text-[28px] font-semibold font-rubik`}>{number}</h1>
            <div>
                <div className='gap-[6px] flex flex-row items-center justify-end'>
                    <img src={down === true ? Down : Up} />
                    <h1 className={`${down === true ? 'text-red-700' : 'text-green-600'} text-[10px] font-normal font-rubik`}>{percentage} %</h1>
                </div>
                <h1 className={`text-gray-300 text-[10px] font-normal font-rubik mt-[2px]`}>vs last 7 days</h1>
           </div>
        </div>
    </div>
  )
}

export default Dashcard