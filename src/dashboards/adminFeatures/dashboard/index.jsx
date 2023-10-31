import React, { useEffect } from 'react'
import NameComponent from '../../../components/ui/NameComponent'
import Dashcard from '../../../components/ui/dashcard'
import Money from '../../../assets/images/dashboard/icon/money-recive.svg';
import Millage from '../../../assets/images/dashboard/icon/milleage.svg';
import Box from '../../../assets/images/dashboard/icon/box2.svg';
import People from '../../../assets/images/dashboard/icon/People2.svg';
import Profile from '../../../assets/images/dashboard/icon/profile-2user2.svg';
import Oval from '../../../assets/images/dashboard/icon/Oval.svg';
import Dot from '../../../assets/images/dashboard/icon/Dot.svg';
import Person from '../../../assets/images/dashboard/image/profilep.jpg';
import ChartCard from '../../../components/ui/ChartCard';
import ArrowLeft from '../../../assets/images/dashboard/icon/arrow-left.svg';
import { topCouriers } from '../../../data';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Blue', 'Yellow', 'Green', 'Red'],
    datasets: [
        {
            data: [60, 20, 10, 10],
            backgroundColor: ['#FF5733', '#33B5E5', '#F18F01', '#D0D4D9'],
            hoverBackgroundColor: ['#FF5733', '#33B5E5', '#F18F01', '#D0D4D9'],
            borderWidth: 1,
            borderColor: ['#FF5733', '#33B5E5', '#F18F01', '#D0D4D9']
        },

    ],
    
};

const options = {
    cutout: '80%', // Adjust the size of the hole in the center (e.g., '70%' for a larger hole)
    maintainAspectRatio: false, // Ensure the chart maintains its aspect ratio
    responsive: true, // Make the chart responsive to different screen sizes
    width: 120, // Set the width of the chart
    height: 120, 
    plugins: {
        legend: {
          display: false, // Set to true to display the legend
        },
    },
};

function AdminDashboard() {

    useEffect(() => {

    }, []);
  return (
    <div className='bg-[#F8F9FA] h-screen w-full pb-20 px-10 p-6 overflow-auto'>
        <NameComponent name='Micheal' date={'Today, 02 March 2023'} />
        <div className='w-full mx-auto mt-[24px] gap-5 flex flex-row'>
            <Dashcard icon={Money} number={'90,434'} percentage={'16'} text={'Total Revenue'} iconBgColor={'bg-[#F4E7E7]'} />
            <Dashcard icon={Millage} number={'230,032'} percentage={'16'} text={'Total Milleage'} iconBgColor={'bg-[#cce8f6]'} />
            <Dashcard icon={Profile} number={'222'} percentage={'16'} text={'Total Customers'} iconBgColor={'bg-rose-100'} />
            <Dashcard icon={People} number={'13,239'} percentage={'16'} text={'Total Customers'} iconBgColor={'bg-green-400 bg-opacity-20'} />
            <Dashcard icon={Box} number={'1,233'} percentage={'16'} text={'Total Orders'} iconBgColor={'bg-yellow-400 bg-opacity-20'} />
        </div>
        <div className='w-full mt-[20px] mx-auto flex flex-row gap-5'>
            <ChartCard name={"Revenue Analytics"} canceled={false} completed={true} />
            <div className='w-[270px] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex'>
                <div className='flex w-full flex-row justify-between items-center'>
                    <h1 className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}>Top Couriers</h1>
                    <button className='w-[73px] flex flex-row gap-[12px]'>
                        <h1 className={`text-red-800 text-xs font-normal font-rubik leading-none`}>Show All</h1> 
                        <img src={ArrowLeft} className='w-[13px] h-[13px]' />
                    </button>
                </div>
                <div className='flex flex-col gap-[15px] mt-[16px]'>
                    {
                        topCouriers.map((item, idx) => 
                            <div key={idx} className='flex flex-row gap-[12px] items-center'>
                                <img className="w-9 h-9 rounded-[100px] object-cover" src={Person} />
                                <div className='flex flex-col'>
                                    <span className='text-zinc-800 text-sm font-normal font-rubik'>{item.name}</span>
                                    <span className="text-slate-500 text-xs font-normal font-rubik">{item.amount}</span>
                                </div> 
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='w-[270px] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex'>
                <div className='flex flex-row w-full justify-between items-center'>
                    <h1 className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}>Groups Revenue</h1>
                    <button className='w-[73px] flex flex-row gap-[12px]'>
                        <h1 className={`text-red-800 text-xs font-normal font-rubik leading-none`}>Show All</h1> 
                        <img src={ArrowLeft} className='w-[13px] h-[13px]' />
                    </button>
                </div>
                <div style={{ width: '120px' , height: '120px', marginTop: 22, alignSelf: 'center' }}>
                    <Doughnut data={data} options={options} />
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">Accra Group</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">60% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">New Delhi Group</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">20% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">Dubai</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">10% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">Other</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">10% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
            </div>
        </div>
        <div className='w-full mt-[20px] mx-auto flex flex-row gap-5'>
            <ChartCard name={"Delivery Analytics"} canceled={true} completed={true} />
            <div className='w-[270px] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex'>
                <div className='flex w-full flex-row justify-between items-center'>
                    <h1 className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}>New Customers</h1>
                    <button className='w-[73px] flex flex-row gap-[12px]'>
                        <h1 className={`text-red-800 text-xs font-normal font-rubik leading-none`}>Show All</h1> 
                        <img src={ArrowLeft} className='w-[13px] h-[13px]' />
                    </button>
                </div>
                <div className='flex flex-col gap-[15px] mt-[16px]'>
                    {
                        topCouriers.map((item, idx) => 
                            <div key={idx} className='flex flex-row gap-[12px] items-center'>
                                <img className="w-9 h-9 rounded-[100px] object-cover" src={Person} />
                                <div className='flex flex-col'>
                                    <span className='text-zinc-800 text-sm font-normal font-rubik'>{item.name}</span>
                                    <span className="text-slate-500 text-xs font-normal font-rubik">{item.amount}</span>
                                </div> 
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='w-[270px] min-h-[326px] px-4 py-5 bg-white rounded-lg flex-col justify-start items-start gap-4 flex'>
                <div className='flex flex-row w-full justify-between items-center'>
                    <h1 className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}>Groups Mileage</h1>
                    <button className='w-[73px] flex flex-row gap-[12px]'>
                        <h1 className={`text-red-800 text-xs font-normal font-rubik leading-none`}>Show All</h1> 
                        <img src={ArrowLeft} className='w-[13px] h-[13px]' />
                    </button>
                </div>
                <div style={{ width: '120px' , height: '120px', marginTop: 22, alignSelf: 'center' }}>
                    <Doughnut data={data} options={options} />
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">Accra Group</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">60% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">New Delhi Group</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">20% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">Dubai</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">10% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-row gap-[8px]">
                        <div className='relative'>
                            <img src={Oval} className='w-4 h-4' />
                            <img src={Dot} className='w-2 h-2 absolute top-[4px] left-[4px]' />
                        </div>
                        <span className="text-slate-500 text-xs font-normal font-rubik">Other</span>
                    </div>
                    <div className='flex flex-row gap-1'><div className="text-zinc-800 text-xs font-normal font-rubik">10% </div><div className="text-slate-500 text-xs font-normal font-rubik">• 6,000</div></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard