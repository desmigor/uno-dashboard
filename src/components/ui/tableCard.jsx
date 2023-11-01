import React from 'react'
import ArrowLeft from '../../assets/images/dashboard/icon/arrow-left.svg';
import ArrowLeftGray from '../../assets/images/dashboard/icon/arrow-left-gray.svg';
import Export from '../../assets/images/dashboard/icon/export.svg';
import Person from '../../assets/images/dashboard/image/profilep.jpg'
import Ghana from '../../assets/images/dashboard/image/ghana.png'
import Cube from '../../assets/images/dashboard/icon/cube.png'
import MapImage from '../../assets/images/dashboard/image/map.png'
import Truck from '../../assets/images/dashboard/icon/truck-fast.svg'
import UserSearch from '../../assets/images/dashboard/icon/user-search.svg'

function TableCard({ type, name, data }) {
  return (
    <div className='w-[49.2%] min-h-[325px] p-6 bg-white rounded-lg'>
        <div className='flex flex-row justify-between items-center'>
            <h1 className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}>{name}</h1>
            {
                type === 'map' ? null : 
                <button className='w-[73px] flex flex-row gap-[12px]'>
                    <h1 className={`${data?.length > 0 ? 'text-red-800' : 'text-gray-400'} text-xs font-normal font-rubik leading-none`}>Show All</h1> 
                    <img src={data.length > 0 ? ArrowLeft : ArrowLeftGray} className='w-[13px] h-[13px]' />
                </button>
            }
        </div>
        <div className='mt-[17px]'>
            {
                type === 'pending' ?
            <div class={`relative overflow-x-auto ${data.length > 0 ? 'shadow-sm' : ''}  sm:rounded-lg`}>
                    {data.length === 0 ?
                    <div className='flex flex-col items-center justify-center mt-[54px] gap-3'>
                        <img src={Cube} alt='ALTICON' className='w-[100px] h-[100px]' />
                        <div className="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">There are no pending resolutions yet</div> 
                    </div>
                        :
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
                        {data?.map((item, idx) => <tr key={idx} class="bg-white border-b hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1">
                                <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.date}</span>
                                <span className="text-gray-400 text-xs font-normal font-rubik leading-none">{item.time}</span>
                            </th>
                            <td class="px-6 py-4">
                                <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.tracking}</span> 
                            </td>
                            <td class="px-6 py-4">
                                <div className='flex flex-row gap-[6px]'>
                                    <span className="text-red-800 text-sm font-normal font-rubik underline">{item.courier}</span> 
                                    <img src={Export} alt='SVGEXPORT' className='' />
                                </div>
                            </td>
                            <td class="py-4">
                                <button className="w-[93px] group hover:bg-red-800 h-7 px-[60px] py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
                                    <span className="text-center text-red-800 group-hover:text-white text-sm font-normal font-rubik leading-tight">View</span>
                                </button> 
                            </td>
                        </tr>)}
                    </tbody>
                    </table>}
            </div>
            : type === 'ongoing' ?
            <div class={`relative overflow-x-auto ${data?.length > 0 ? 'shadow-sm' : ''}  sm:rounded-lg`}>
                {data.length === 0 ?
                    <div className='flex flex-col items-center justify-center mt-[54px] gap-3'>
                        <img src={Truck} alt='ALTICON' className='w-[100px] h-[100px]' />
                        <div className="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">There are no ongoing packages</div> 
                    </div>
                        :
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-100 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Tracking #</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Courier</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Status</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, idx) => <tr key={idx} class="bg-white border-b hover:bg-gray-50">
                                <th class="px-6 py-4">
                                    <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.tracking}</span> 
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1">
                                <div className='flex flex-row items-center gap-2'>
                                    <img className="w-[34px] h-[34px] rounded-[100px] object-cover" src={Person} /> 
                                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.courier}</div> 
                                </div>
                                </th>
                                <td class="px-6 py-4">
                                    <div className={`min-w-[106px] h-[19px] px-3 py-1.5 ${item.status === 'ongoing' ? 'bg-yellow-50' : 'bg-gray-100'} rounded justify-start items-center gap-2.5 inline-flex`}>
                                        <span className={`${item.status === 'ongoing' ? 'text-amber-500' : 'text-slate-500'} text-xs font-normal font-rubik leading-none`}>{item.status === 'ongoing' ? 'Ongoing delivery' : 'Waiting delivery'}</span> 
                                    </div>
                                </td>
                                <td class="py-4">
                                    <button className="w-[93px] group hover:bg-red-800 h-7 px-[60px] py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
                                        <span className="text-center text-red-800 group-hover:text-white text-sm font-normal font-rubik leading-tight">View</span>
                                    </button> 
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                }
            </div>
            : type === 'courier' ?
            <div class={`relative overflow-x-auto ${data.length > 0 ? 'shadow-sm' : ''}  sm:rounded-lg`}>
                {data.length === 0 ?
                    <div className='flex flex-col items-center justify-center mt-[54px] gap-3'>
                        <img src={UserSearch} alt='ALTICON' className='w-[100px] h-[100px]' />
                        <div className="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">There are no available couriers</div> 
                    </div>
                        :
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-100 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Name</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Courier Type</span> 
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span className="text-slate-500 text-xs font-normal font-rubik leading-none">Phone Number</span> 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data.map((item, idx) => 
                        <tr key={idx} class="bg-white border-b hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1">
                                <div className='flex flex-row items-center gap-2'>
                                    <img className="w-[34px] h-[34px] rounded-[100px] object-cover" src={Person} /> 
                                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.name}.</div> 
                                </div>
                            </th>
                            <td class="px-6 py-4">
                                <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.courierType}</span> 
                            </td>
                            <td class="px-6 py-4">
                                <div className='flex flex-row gap-[10px] items-center'>
                                    <img src={Ghana} alt='SVGCOUNTRY' className='w-[25px] h-[25px] rounded-full' />
                                    <span className="text-red-800 text-sm font-normal font-rubik underline">{item.phoneNumber}</span> 
                                </div>
                            </td>
                        </tr>)
                        }
                    </tbody>
                </table>
                }
            </div>
            :
            <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
                <img src={MapImage} className='w-full h-[320px] object-cover'  />
            </div>
            }
        </div>
    </div>
  )
}

export default TableCard