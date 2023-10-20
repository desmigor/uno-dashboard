import React, { useState } from 'react'
import UnoIcon from '../../assets/images/dashboard/icon/Logo.svg';
import DashIcon  from '../../assets/images/dashboard/icon/dashboard.svg';
import DashIconInactive  from '../../assets/images/dashboard/icon/dashboard0.svg';
import InfoIcon  from '../../assets/images/dashboard/icon/information.svg';
import InfoIconInactive  from '../../assets/images/dashboard/icon/information0.svg';
import PackageIcon  from '../../assets/images/dashboard/icon/box.svg';
import PackageIconInactive  from '../../assets/images/dashboard/icon/box0.svg';
import ProfileIcon  from '../../assets/images/dashboard/icon/profile-2user.svg';
import ProfileIconInactive  from '../../assets/images/dashboard/icon/profile0.svg';
import SettingsIcon  from '../../assets/images/dashboard/icon/setting-2.svg';
import SettingsIconInactive  from '../../assets/images/dashboard/icon/setting0.svg';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [selected, setSelcted] = useState('Pending');

    const sidebarLinks = [
        {
            name: "Dashboard",
            activeIcon: DashIcon,
            inactiveIcon: DashIconInactive,
            path: '/'
        },
        {
            name: "Pending",
            activeIcon: InfoIcon,
            inactiveIcon: InfoIconInactive,
            path: 'pending'
        },
        {
            name: "Packages",
            activeIcon: PackageIcon,
            inactiveIcon: PackageIconInactive,
            path: 'package'
        },
        {
            name: "Couriers",
            activeIcon: ProfileIcon,
            inactiveIcon: ProfileIconInactive,
            path: 'courier'
        },
        {
            name: "Settings",
            activeIcon: SettingsIcon,
            inactiveIcon: SettingsIconInactive,
            path: 'settings'
        },
        
    ]
  return (
    <div className='w-[228px] h-screen bg-white relative flex flex-col items-center'>
        <img src={UnoIcon} alt='UNOSVG' className='w-10 h-10 mt-5 mx-auto' />
        <div className='mt-[30px] w-full flex flex-col items-center gap-[8px] justify-center'>
            {
                sidebarLinks.map((item, idx) => {
                    return(
                        <Link to={item.path}>
                            <div className={`cursor-pointer group hover:border hover:border-red-900 hover:bg-rose-100 w-[196px] h-[54px] px-4 py-[17px] ${selected === item.name ? 'bg-rose-100' : 'bg-white'} rounded-xl ${selected === item.name && 'border border-red-900'}  gap-[16px] flex flex-row items-center`}>
                                <img src={selected === item.name ? item.activeIcon : item.inactiveIcon} className='w-5 h-5' alt='DASHSVG' />
                                <span className={`${selected === item.name ? 'text-red-800' : 'text-gray-400'} group-hover:text-red-800 text-base font-normal font-rubik leading-tight`}>{item.name}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
        <div className="text-center text-gray-300 text-xs font-normal font-rubik leading-none absolute bottom-[24px]">© UNO Support 2023</div>
    </div>
  )
}

export default Sidebar