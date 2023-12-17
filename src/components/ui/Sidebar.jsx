import React, { useContext, useEffect, useState } from 'react'
import UnoIcon from '../../assets/images/dashboard/icon/Logo.svg';
import DashIcon  from '../../assets/images/dashboard/icon/dashboard.svg';
import DashIconAdmin  from '../../assets/images/dashboard/icon/category-2.svg';
import DashIconInactive  from '../../assets/images/dashboard/icon/dashboard0.svg';
import InfoIcon  from '../../assets/images/dashboard/icon/information.svg';
import InfoIcon2  from '../../assets/images/dashboard/icon/information2.svg';
import InfoIconInactive  from '../../assets/images/dashboard/icon/information0.svg';
import PackageIcon  from '../../assets/images/dashboard/icon/box.svg';
import PackageIcon2  from '../../assets/images/dashboard/icon/box3.svg';
import Layer  from '../../assets/images/dashboard/icon/layer.svg';
import Sort  from '../../assets/images/dashboard/icon/sort.svg';
import LayerO  from '../../assets/images/dashboard/icon/layer-o.svg';
import SortO  from '../../assets/images/dashboard/icon/sort-o.svg';
import PackageIconInactive  from '../../assets/images/dashboard/icon/box0.svg';
import ArrowDown  from '../../assets/images/dashboard/icon/arrow-down-white.svg';
import ProfileIcon  from '../../assets/images/dashboard/icon/profile-2user.svg';
import ProfileIcon2  from '../../assets/images/dashboard/icon/profile-2user3.svg';
import ProfileIconInactive  from '../../assets/images/dashboard/icon/profile0.svg';
import SettingsIcon  from '../../assets/images/dashboard/icon/setting-2.svg';
import CustomerIcon  from '../../assets/images/dashboard/icon/people3Active.svg';
import CustomerIconInactive  from '../../assets/images/dashboard/icon/people3.svg';
import SettingsIconInactive  from '../../assets/images/dashboard/icon/setting0.svg';
import SettingsIcon2  from '../../assets/images/dashboard/icon/setting-3.svg';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../../context';
import { useSelector } from 'react-redux';


function Sidebar() {
    const { userInfo } = useSelector((state) => state.auth);
    const [selected, setSelcted] = useState('Dashboard');
    const [selectedSubCourier, setSelectedSubCourier] = useState('All Couriers');
    const [expanded, setExpanded] = useState(false);
    const [path, setPath] = useState(false);
    
    const location = useLocation();

    useEffect(() => {
        setPath(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
        window.location.pathname.split("/")[window.location.pathname.split("/").length - 1] === 'groups' || window.location.pathname.split("/")[window.location.pathname.split("/").length - 1] === 'courier' && setExpanded(true)
    }, [location]);

    useEffect(() => {
        setPath(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
    }, []);

    useEffect(() => {
        if(path === 'dashboard'){
            setSelcted('Dashboard');
        }else if(path === 'pending'){
            setSelcted('Pending');
        }else if(path === 'package'){
            setSelcted('Packages');
        }else if(path === 'courier'){
            setSelcted('Couriers');
        }else if(path === 'settings'){
            setSelcted('Settings');
        }else if(path === 'customers'){
            setSelcted('Customers');
        }else if(path.length === 0){
            setSelcted('Dashboard');
        }else{
            setSelcted('Couriers');
        }
    }, [path]);


    const sidebarLinksSupport = [
        {
            name: "Dashboard",
            activeIcon: DashIcon,
            inactiveIcon: DashIconInactive,
            path: '/support/dashboard',
            pathName: "dashboard"
        },
        {
            name: "Pending",
            activeIcon: InfoIcon,
            inactiveIcon: InfoIconInactive,
            path: '/support/dashboard/pending',
            pathName: "pending"

        },
        {
            name: "Packages",
            activeIcon: PackageIcon,
            inactiveIcon: PackageIconInactive,
            path: '/support/dashboard/package',
            pathName: "package"

        },
        {
            name: "Couriers",
            activeIcon: ProfileIcon,
            inactiveIcon: ProfileIconInactive,
            path: '/support/dashboard/courier',
            pathName: "courier"

        },
        {
            name: "Settings",
            activeIcon: SettingsIcon,
            inactiveIcon: SettingsIconInactive,
            path: '/support/dashboard/settings',
            pathName: "settings",
        },
        
    ]

    const adminSidelinks = [
        {
            name: "Dashboard",
            activeIcon: DashIconAdmin,
            inactiveIcon: DashIconInactive,
            path: '/admin/dashboard',
            pathName: "dashboard"
        },
        {
            name: "Pending",
            activeIcon: InfoIcon2,
            inactiveIcon: InfoIconInactive,
            path: '/admin/dashboard/pending',
            pathName: "pending",
        },
        {
            name: "Packages",
            activeIcon: PackageIcon2,
            inactiveIcon: PackageIconInactive,
            path: '/admin/dashboard/package',
            pathName: "package"
        },
        {
            name: "Couriers",
            activeIcon: ProfileIcon2,
            inactiveIcon: ProfileIconInactive,
            path: '/admin/dashboard/courier',
            pathName: "courier"
        },
        {
            name: "Customers",
            activeIcon: CustomerIcon,
            inactiveIcon: CustomerIconInactive,
            path: '/admin/dashboard/customers',
            pathName: "customers"

        },
        {
            name: "Settings",
            activeIcon: SettingsIcon2,
            inactiveIcon: SettingsIconInactive,
            path: '/admin/dashboard/settings',
            pathName: 'settings'
        },
        
    ]

    const sidebarLinks = userInfo?.type?.id === 3 ? adminSidelinks : sidebarLinksSupport

  return (
    <div className={`xl:w-[228px] w-[80px] h-screen ${userInfo?.type?.id === 3 ? 'bg-[#23292E]' : 'bg-white' } relative flex flex-col items-center overflow-hidden`}>
        <img src={UnoIcon} alt='UNOSVG' className='w-10 h-10 mt-5 mx-auto' />
        <div className='mt-[30px] w-full flex flex-col items-center gap-[8px] justify-center'>
            {
                sidebarLinks.map((item, idx) => {
                    return(
                        <div className={`w-[196px] ${userInfo?.type?.id === 3 && item.name === 'Couriers' && expanded ? 'h-[178px]' : ''} ${userInfo?.type?.id === 3 && item.name === 'Couriers' && selected === item.name ? 'bg-neutral-600' : ''} rounded-[10px] flex-col justify-start items-start gap-2 inline-flex`}>
                            <Link onClick={() => {
                                setSelcted(item.name)
                                setExpanded(userInfo?.type?.id === 3 && item.name === 'Couriers' ? !expanded : false);
                            }} to={item.path} className={`cursor-pointer group ${userInfo?.type?.id !== 3 && selected === item.name && 'bg-rose-100'}  xl:w-[196px] w-[90%] h-[54px] px-4 py-[17px] ${userInfo?.type?.id === 3 ? 'hover:bg-[#3F4449]' : 'hover:bg-[#F2f2f2]'} ${selected === item.name && 'bg-rose-100' } rounded-xl ${selected === item.name && userInfo?.type?.id === 3 ? 'bg-gradient-to-br from-red-900 to-red-700' : userInfo?.type?.id !== 3 && 'border-0 border-red-900'}  xl:gap-[16px] xl:flex xl:flex-row xl:items-center`}>
                                <img src={selected === item.name ? item.activeIcon : item.inactiveIcon} className='w-5 h-5 mx-auto xl:mx-0' alt='DASHSVG' />
                                <span className={`${selected === item.name ? userInfo?.type?.id === 3 ? 'text-white' : 'text-red-800' : 'text-gray-400'} text-base hidden xl:flex font-normal font-rubik leading-tight`}>{item.name}</span>
                                <img src={ArrowDown} className={`${userInfo?.type?.id === 3 && item.name === 'Couriers' ? 'block' : 'hidden'} ${expanded ? 'rotate-0' : 'rotate-180'} w-5 h-5 ml-auto`} />
                            </Link>
                            {expanded && userInfo?.type?.id === 3 && item.name === 'Couriers' && <Link onClick={() => {
                                setSelectedSubCourier('All Couriers')
                            }} to={item.path} className={`w-[196px] h-[54px] px-4 py-[17px] ${selectedSubCourier === 'All Couriers' && 'bg-opacity-20 bg-white border-white border'} gap-4 flex rounded-[10px] flex-row justify-start items-center`}>
                                <img src={selectedSubCourier === 'All Couriers' ? Sort : SortO} className='w-5 h-5 mx-auto xl:mx-0' alt='DASHSVG' />
                                <span className={`${selectedSubCourier === 'All Couriers' ? 'text-white' : 'text-[#b5b7b9]'} text-base hidden xl:flex font-normal font-rubik leading-tight`}>All Couriers</span>
                            </Link>}
                            {expanded && userInfo?.type?.id === 3 && item.name === 'Couriers' && <Link onClick={() => {
                                setSelectedSubCourier('Groups')
                            }} to={`/admin/dashboard/courier/groups`} className={`w-[196px] h-[54px] px-4 py-[17px] ${selectedSubCourier === 'Groups' && 'bg-opacity-20 bg-white border-white border'} gap-4 flex rounded-[10px] flex-row justify-start items-center`}>
                                <img src={selectedSubCourier === 'Groups' ? LayerO : Layer } className='w-5 h-5 mx-auto xl:mx-0' alt='DASHSVG' />
                                <span className={`${selectedSubCourier === 'Groups' ? 'text-white' : 'text-[#b5b7b9]'} text-base hidden xl:flex font-normal font-rubik leading-tight`}>Groups</span>
                            </Link>}
                        </div>
                    )
                })
            }
        </div>
        <div className="text-center text-gray-300 text-xs font-normal font-rubik leading-none absolute bottom-[24px]">© UNO Support 2023</div>
    </div>
  )
}

export default Sidebar