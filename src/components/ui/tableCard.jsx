import React from 'react'
import ArrowLeft from '../../assets/images/dashboard/icon/arrow-left.svg';
import Export from '../../assets/images/dashboard/icon/export.svg';

function TableCard() {
  return (
    <div className='w-[49.2%] h-[325px] p-6 bg-white rounded-lg'>
        <div className='flex flex-row justify-between items-center'>
            <h1 className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}>Pending Resolution</h1>
            <div className='w-[73px] flex flex-row gap-[12px]'>
                <h1 className="text-red-800 text-xs font-normal font-rubik leading-none">Show All</h1> 
                <img src={ArrowLeft} className='w-[13px] h-[13px]' />
            </div>
        </div>
        <div className='mt-[17px]'>
            <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-100 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Time</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Tracking #</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Courier</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1">
                                <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">17-04-2022</span>
                                <span className="text-gray-400 text-xs font-normal font-rubik leading-none">09:32</span>
                            </th>
                            <td class="px-6 py-4">
                                <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">TK-0023</span> 
                            </td>
                            <td class="px-6 py-4">
                                <div className='flex flex-row gap-[6px]'>
                                    <span className="text-red-800 text-sm font-normal font-rubik underline">Mike Jeremy</span> 
                                    <img src={Export} alt='SVGEXPORT' className='' />
                                </div>
                            </td>
                            <td class="py-4">
                                <button className="w-[93px] h-7 px-[60px] py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
                                    <span className="text-center text-red-800 text-sm font-normal font-rubik leading-tight">View</span>
                                </button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TableCard