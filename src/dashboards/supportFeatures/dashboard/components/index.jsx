import React from 'react'
import Dashcard from '../../../../components/ui/dashcard'
import Profile from '../../../../assets/images/dashboard/icon/profile.svg';
import People from '../../../../assets/images/dashboard/icon/people.svg';
import BoxDashboard from '../../../../assets/images/dashboard/icon/Dashboardbox.svg';
import TickCircle from '../../../../assets/images/dashboard/icon/tick-circle.svg';
import TableCard from '../../../../components/ui/tableCard';

function Dashboard() {
  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 p-6'>
      <div className='w-full mx-auto flex flex-row justify-between items-center'>
        <h1 className='text-zinc-800 text-2xl font-bold font-rubik'>Welcome, Michael</h1>
        <h2 className="text-zinc-800 text-base font-normal font-rubik leading-tight">Today, Apr. 18 , 2023</h2>
      </div>
      <div className='w-full mx-auto mt-[24px] gap-5 flex flex-row'>
        <Dashcard icon={Profile} number={'222'} percentage={'16'} text={'Total Couriers'} iconBgColor={'bg-[#F4E7E7]'} />
        <Dashcard icon={People} number={'13,239'} percentage={'16'} text={'Total Customers'} iconBgColor={'bg-[#e1f1e6]'} />
        <Dashcard icon={BoxDashboard} number={'1233'} percentage={'12'} down={true} text={'Total Orders'} iconBgColor={'bg-[#cbe8f6]'} />
        <Dashcard icon={TickCircle} number={'292'} percentage={'16'} text={'Delivered Packages'} iconBgColor={'bg-[#fee6da]'} />
      </div>
      <div className='w-full mt-[20px] mx-auto flex flex-row gap-5'>
        <TableCard />
        <TableCard />
      </div>
    </div>
  )
}

export default Dashboard