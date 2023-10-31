import React, { useEffect, useState } from 'react'
import UnoIcon from '../../assets/images/dashboard/icon/Logo.svg';
import DashIcon  from '../../assets/images/dashboard/icon/dashboard.svg';
import DashIconAdmin  from '../../assets/images/dashboard/icon/category-2.svg';
import DashIconInactive  from '../../assets/images/dashboard/icon/dashboard0.svg';
import InfoIcon  from '../../assets/images/dashboard/icon/information.svg';
import InfoIcon2  from '../../assets/images/dashboard/icon/information2.svg';
import InfoIconInactive  from '../../assets/images/dashboard/icon/information0.svg';
import PackageIcon  from '../../assets/images/dashboard/icon/box.svg';
import PackageIcon2  from '../../assets/images/dashboard/icon/box3.svg';
import PackageIconInactive  from '../../assets/images/dashboard/icon/box0.svg';
import ProfileIcon  from '../../assets/images/dashboard/icon/profile-2user.svg';
import ProfileIcon2  from '../../assets/images/dashboard/icon/profile-2user3.svg';
import ProfileIconInactive  from '../../assets/images/dashboard/icon/profile0.svg';
import SettingsIcon  from '../../assets/images/dashboard/icon/setting-2.svg';
import CustomerIcon  from '../../assets/images/dashboard/icon/people3Active.svg';
import CustomerIconInactive  from '../../assets/images/dashboard/icon/people3.svg';
import SettingsIconInactive  from '../../assets/images/dashboard/icon/setting0.svg';
import SettingsIcon2  from '../../assets/images/dashboard/icon/setting-3.svg';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [selected, setSelcted] = useState('Dashboard');
    const [isAdmin, setIsAdmin] = useState(true);

    const sidebarLinksSupport = [
        {
            name: "Dashboard",
            activeIcon: DashIcon,
            inactiveIcon: DashIconInactive,
            path: '/support'
        },
        {
            name: "Pending",
            activeIcon: InfoIcon,
            inactiveIcon: InfoIconInactive,
            path: '/support/pending'
        },
        {
            name: "Packages",
            activeIcon: PackageIcon,
            inactiveIcon: PackageIconInactive,
            path: '/support/package'
        },
        {
            name: "Couriers",
            activeIcon: ProfileIcon,
            inactiveIcon: ProfileIconInactive,
            path: '/support/courier'
        },
        {
            name: "Settings",
            activeIcon: SettingsIcon,
            inactiveIcon: SettingsIconInactive,
            path: '/support/settings'
        },
        
    ]

    const adminSidelinks = [
        {
            name: "Dashboard",
            activeIcon: DashIconAdmin,
            inactiveIcon: DashIconInactive,
            path: '/admin'
        },
        {
            name: "Pending",
            activeIcon: InfoIcon2,
            inactiveIcon: InfoIconInactive,
            path: '/admin/pending'
        },
        {
            name: "Packages",
            activeIcon: PackageIcon2,
            inactiveIcon: PackageIconInactive,
            path: '/admin/package'
        },
        {
            name: "Couriers",
            activeIcon: ProfileIcon2,
            inactiveIcon: ProfileIconInactive,
            path: '/admin/courier'
        },
        {
            name: "Customers",
            activeIcon: CustomerIcon,
            inactiveIcon: CustomerIconInactive,
            path: '/admin/courier'
        },
        {
            name: "Settings",
            activeIcon: SettingsIcon2,
            inactiveIcon: SettingsIconInactive,
            path: '/admin/settings'
        },
        
    ]

    const sidebarLinks = isAdmin ? adminSidelinks : sidebarLinksSupport

  return (
    <div className={`w-[228px] h-screen ${isAdmin ? 'bg-[#23292E]' : 'bg-white' } relative flex flex-col items-center overflow-hidden`}>
        <img src={UnoIcon} alt='UNOSVG' className='w-10 h-10 mt-5 mx-auto' />
        <div className='mt-[30px] w-full flex flex-col items-center gap-[8px] justify-center'>
            {
                sidebarLinks.map((item, idx) => {
                    return(
                        <Link onClick={() => setSelcted(item.name)} to={item.path} className={`cursor-pointer group hover:border hover:border-red-900 hover:bg-rose-100 w-[196px] h-[54px] px-4 py-[17px] ${isAdmin ? 'hover:bg-gradient-to-br hover:from-red-900 hover:to-red-700' : selected === item.name && 'bg-rose-100' } rounded-xl ${selected === item.name && isAdmin ? 'bg-gradient-to-br from-red-900 to-red-700' : !isAdmin && 'border border-red-900'}  gap-[16px] flex flex-row items-center`}>
                            <img src={selected === item.name ? item.activeIcon : item.inactiveIcon} className='w-5 h-5' alt='DASHSVG' />
                            <span className={`${selected === item.name ? isAdmin ? 'text-white' : 'text-red-800' : 'text-gray-400'} ${isAdmin ? 'group-hover:text-white' : 'group-hover:text-red-800'} text-base font-normal font-rubik leading-tight`}>{item.name}</span>
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