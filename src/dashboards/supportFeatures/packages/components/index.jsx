import React, { useState } from 'react'
import Tabs from './Tabs'
import AddCircle from '../../../../assets/images/dashboard/icon/add-circle.svg';
import Search from '../../../../assets/images/dashboard/icon/search-normal2.svg';
import Dropdown from './Dropdown';
import ArrowSquare from '../../../../assets/images/dashboard/icon/arrow-square-down.svg';
import Export from '../../../../assets/images/dashboard/icon/export.svg';
import ArrowSquare2 from '../../../../assets/images/dashboard/icon/arrow-square-down2.svg';
import Map1 from '../../../../assets/images/dashboard/icon/map12.png';
import Edit from '../../../../assets/images/dashboard/icon/edit-2.svg';
import ArrowDownSmall from '../../../../assets/images/dashboard/icon/arrow-down-small.svg';
import Close from '../../../../assets/images/dashboard/icon/close-circle2.svg';
import pickup_point from "../../../../assets/images/dashboard/icon/pickup_point.svg";
import startingPoint from "../../../../assets/images/dashboard/icon/starting_point.svg";
import star from "../../../../assets/images/dashboard/icon/star.svg";
import starOut from "../../../../assets/images/dashboard/icon/star-o.svg";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Packages() {
  const [selected, setSelected] = useState(null);
  const [table, setTable] = useState('ongoing');
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 py-6'>
      <div>
        <span className="text-zinc-800 text-2xl font-bold font-rubik">Packages</span>
      </div>
      <div className='mt-[24px] flex flex-row justify-between items-center'>
        <Tabs setTable={setTable} />
        <Link to={userInfo?.type?.id === 3 ? '/admin/dashboard/package/new' : '/support/dashboard/package/new'} className='w-[183px] h-12 py-[15px] bg-red-800 flex flex-row rounded-[10px] justify-center items-center gap-2.5'>
          <div className="text-center text-white text-base font-normal font-rubik leading-tight">Create Package</div> 
          <img src={AddCircle} className='w-5 h-5' />
        </Link>
      </div>
      <div className='w-[100%] min-h-[400px] max-h-[650px] mt-6 relative bg-white rounded-[10px] py-[22px] px-[16px]'>
        <div className='flex flex-row justify-between items-center'>
          <div className="text-zinc-800 text-lg font-semibold font-rubik">{table === 'ongoing' ? 'Ongoing Packages' : table === 'completed' ? 'Completed packages' : 'Canceled Packages'}</div> 
          <div className='flex flex-row gap-[10px] items-center w-[528px]'>
            <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">Sort by</div>
            <Dropdown />
            <div className='relative'>
              <input type='text' placeholder='Search package ...' className='placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex' />
              <img src={Search} className='w-4 h-4 absolute top-[12px] left-[16px]' />
            </div>
          </div>
        </div>
        {table === 'ongoing' && <div className='relative overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Time</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Tracking #</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Customer</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Courier</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Size</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Time Left</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'></span>
                </th>
            </tr>
        </thead>
        {[1,2,3].map((item, idx) => <tbody onClick={() => setSelected(selected === idx ? null : idx)}>
            <tr class={` ${selected === idx && 'bg-gray-50'} h-[70px] relative border-b border-gray-100 cursor-pointer text-left`}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">17-04-2022</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:32</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-left">TK-0023</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-left">Michael James</div>
                </td>
                <td class="px-6 py-4">
                  <div className='flex flex-row gap-[6px]'>
                    <span className="text-red-800 text-sm font-normal font-rubik underline leading-none">James Locker</span> 
                    <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">Medium</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight text-left">$25.43</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 bg-yellow-50 rounded justify-start items-center gap-2.5 inline-flex`}>
                      <span className={`text-amber-500 text-xs font-normal font-rubik leading-none`}>Ongoing delivery</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight">12 min</div> 
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[18px]'>
                <div className='flex flex-row gap-4 w-full items-center'>
                  <img className="w-[16%] h-[190px] rounded-md mt-[-12px]" src={Map1} />
                  <div className='flex flex-row w-[84%]'>
                  <div class="w-4 h-[10px] relative mt-16">
                    <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                      <img src={pickup_point} alt="" />
                    </div>
                    <div class="w-4 h-4 left-0 top-[63px] absolute justify-start items-center gap-2 inline-flex">
                      <img src={startingPoint} alt="" />
                    </div>
                    <div class="h-[38px] left-[7px] top-[21px] absolute origin-top-left border-dashed border-[1px] border-slate-400"></div>
                  </div>
                  <div class="w-full h-full mt-[10px]">
                    <table class="table-auto w-full">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Addresses</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Customer</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Delivery point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Pickup point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Courier</div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody className='mt-[17px]'>
                        <tr>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:40 (Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">PPR3+JG6, Amasaman</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Credit Card</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[88px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Michael James</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-20 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Milly Mankoro</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[100px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className='flex flex-row gap-[6px]'>
                                <span className="text-red-800 text-xs font-semibold font-rubik underline leading-none">James Locker</span> 
                                <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                              </div>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">10:20 (Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">PPR3+JG6, Amasaman</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='px-4 mt-[12px] flex flex-row gap-4 pb-[22px]'>
                      <button className='w-40 h-[42px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex'>
                        <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">Edit Package</div> 
                        <img src={Edit} className='w-[17px] h-4' />
                      </button>
                      <button className='w-40 h-[42px] py-[15px] rounded-[10px] border border-red-700 justify-center items-center gap-2.5 flex'>
                        <div className="text-center text-red-700 text-sm font-normal font-rubik leading-tight">Cancel Package</div> 
                        <img src={Close} className='w-5 h-5' />
                      </button>
                    </div>
                  </div>
                  </div>
                  </div>
              </td>
            </tr>}
        </tbody>)}
    </table>
        </div>}
        {table === 'completed' && <div className='relative overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Time
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Tracking #
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Courier
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Size
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Rating</span>
                </th>
                <th scope="col"class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'></span>
                </th>
            </tr>
        </thead>
        {[1,2,3].map((item, idx) => <tbody onClick={() => setSelected(selected === idx ? null : idx)}>
            <tr class={` ${selected === idx && 'bg-gray-50'} h-[70px] relative border-b border-gray-100 cursor-pointer text-left`}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">17-04-2022</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:32</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">TK-0023</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">Michael James</div>
                </td>
                <td class="px-6 py-4">
                  <div className='flex flex-row gap-[6px]'>
                    <span className="text-red-800 text-sm font-normal font-rubik underline leading-none">James Locker</span> 
                    <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight">Medium</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight">$25.43</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 bg-green-100 rounded justify-center items-center gap-2.5 inline-flex mx-auto `}>
                      <span className={`text-green-700 text-xs font-normal font-rubik leading-none`}>Completed</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className='flex flex-row gap-[6px]'>
                    <img src={star} className='w-4 h-4' />
                    <img src={star} className='w-4 h-4' />
                    <img src={star} className='w-4 h-4' />
                    <img src={star} className='w-4 h-4' />
                    <img src={starOut} className='w-4 h-4' />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[18px]'>
                <div className='flex flex-row gap-4 w-full items-center'>
                  <img className="w-[16%] h-[190px] rounded-md mt-[-12px]" src={Map1} />
                  <div className='flex flex-row w-[84%]'>
                  <div class="w-4 h-[10px] relative mt-16">
                    <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                      <img src={pickup_point} alt="" />
                    </div>
                    <div class="w-4 h-4 left-0 top-[63px] absolute justify-start items-center gap-2 inline-flex">
                      <img src={startingPoint} alt="" />
                    </div>
                    <div class="h-[38px] left-[7px] top-[21px] absolute origin-top-left border-dashed border-[1px] border-slate-400"></div>
                  </div>
                  <div class="w-full h-full mt-[10px]">
                    <table class="table-auto w-full">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Addresses</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Customer</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Delivery point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Pickup point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Courier</div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody className='mt-[17px]'>
                        <tr>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:40 (Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">PPR3+JG6, Amasaman</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Credit Card</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[88px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Michael James</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-20 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Milly Mankoro</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[100px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className='flex flex-row gap-[6px]'>
                                <span className="text-red-800 text-xs font-semibold font-rubik underline leading-none">James Locker</span> 
                                <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                              </div>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">10:20 (Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">PPR3+JG6, Amasaman</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </div>
                  </div>
              </td>
            </tr>}
        </tbody>)}
    </table>
        </div>}
        {table === 'canceled' && <div className='relative overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Time
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Tracking #
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Courier
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Size
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Canceled by</span>
                </th>
                <th scope="col"class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'></span>
                </th>
            </tr>
        </thead>
        {[1,2,3].map((item, idx) => <tbody onClick={() => setSelected(selected === idx ? null : idx)}>
            <tr class={` ${selected === idx && 'bg-gray-50'} h-[70px] relative border-b border-gray-100 cursor-pointer text-left`}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">17-04-2022</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:32</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">TK-0023</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">Michael James</div>
                </td>
                <td class="px-6 py-4">
                  <div className='flex flex-row gap-[6px]'>
                    <span className="text-red-800 text-sm font-normal font-rubik underline leading-none">James Locker</span> 
                    <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight">Medium</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight">$25.43</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 bg-rose-100 rounded justify-center items-center gap-2.5 inline-flex mx-auto `}>
                      <span className={`text-red-700 text-xs font-normal font-rubik leading-none`}>Canceled</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Courier</div> 
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[18px]'>
                <div className='flex flex-row gap-4 w-full items-center'>
                  <img className="w-[16%] h-[190px] rounded-md mt-[-12px]" src={Map1} />
                  <div className='flex flex-row w-[84%]'>
                  <div class="w-4 h-[10px] relative mt-16">
                    <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                      <img src={pickup_point} alt="" />
                    </div>
                    <div class="w-4 h-4 left-0 top-[63px] absolute justify-start items-center gap-2 inline-flex">
                      <img src={startingPoint} alt="" />
                    </div>
                    <div class="h-[38px] left-[7px] top-[21px] absolute origin-top-left border-dashed border-[1px] border-slate-400"></div>
                  </div>
                  <div class="w-full h-full mt-[10px]">
                    <table class="table-auto w-full">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Addresses</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Customer</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Delivery point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Pickup point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Courier</div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody className='mt-[17px]'>
                        <tr>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">09:40 (Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">PPR3+JG6, Amasaman</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Credit Card</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[88px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Michael James</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-20 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">Milly Mankoro</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[100px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className='flex flex-row gap-[6px]'>
                                <span className="text-red-800 text-xs font-semibold font-rubik underline leading-none">James Locker</span> 
                                <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                              </div>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">10:20 (Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">PPR3+JG6, Amasaman</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">+233-4823-321-312</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="w-[221px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Cancellation reason</div>
                      <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">There was no one at the pickup address</div>
                    </div> 
                  </div>
                  </div>
                  </div>
              </td>
            </tr>}
        </tbody>)}
    </table>
        </div>}
        <div className='mt-[20px] w-full flex items-center justify-between'>
          <div className="w-[155px] h-[25px] justify-start items-center gap-2.5 inline-flex">
            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Rows per page</div> 
            <div className="w-[49px] h-[25px] cursor-pointer px-[9px] bg-white rounded-[20px] border border-gray-100 justify-start items-center gap-1 flex">
              <div className="text-center text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">20</div>
                <img src={ArrowDownSmall} className='w-3 h-3' />
              </div>
          </div>
          <div className="w-[415px] h-6 justify-start items-center gap-2.5 inline-flex">
            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Results per page</div>   
            
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Packages