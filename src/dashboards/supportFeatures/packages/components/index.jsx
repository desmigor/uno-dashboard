import React from 'react'
import Tabs from './Tabs'
import AddCircle from '../../../../assets/images/dashboard/icon/add-circle.svg';
import Search from '../../../../assets/images/dashboard/icon/search-normal2.svg';
import Dropdown from './Dropdown';

function Packages() {
  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 py-6'>
      <div>
        <span className="text-zinc-800 text-2xl font-bold font-rubik">Packages</span>
      </div>
      <div className='mt-[24px] flex flex-row justify-between items-center'>
        <Tabs />
        <button className='w-[183px] h-12 py-[15px] bg-red-800 flex flex-row rounded-[10px] justify-center items-center gap-2.5'>
          <div className="text-center text-white text-base font-normal font-rubik leading-tight">Create Package</div> 
          <img src={AddCircle} className='w-5 h-5' />
        </button>
      </div>
      <div className='w-[100%] min-h-[400px] max-h-[650px] mt-6 relative bg-white rounded-[10px] py-[22px] px-[16px]'>
        <div className='flex flex-row justify-between items-center'>
          <div className="text-zinc-800 text-lg font-semibold font-rubik">Ongoing Packages</div> 
          <div className='flex flex-row gap-[10px] items-center w-[528px]'>
            <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">Sort by</div>
            <Dropdown />
            <div className='relative'>
              <input type='text' placeholder='Search package ...' className='placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex' />
              <img src={Search} className='w-4 h-4 absolute top-[12px] left-[16px]' />
            </div>
          </div>
        </div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-6'>
        <table class="w-full">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Time</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Tracking #</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Customer</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Courier</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Size</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 ">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Time Left</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="h-[70px] relative border-b border-gray-100">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">17-04-2022</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:32</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-center">TK-0023</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-center">Michael James</div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-center">Michael James</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-center">Medium</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight text-center">$25.43</div> 
                </td>
                <td class="px-6 py-4 flex items-center justify-center h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 bg-yellow-50 rounded justify-start items-center gap-2.5 inline-flex mx-auto `}>
                      <span className={`text-amber-500 text-xs font-normal font-rubik leading-none`}>Ongoing delivery</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-center">12 min</div> 
                </td>
            </tr>
        </tbody>
    </table>
    </div>
      </div>
    </div>
  )
}

export default Packages