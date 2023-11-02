import React, { useState } from 'react'
import SearchIcon from '../../assets/images/dashboard/icon/search-normal.svg'
import Notification from '../../assets/images/dashboard/icon/notification.svg';
import NotificationModal from './NotificationModal';
import LogoutModel from './LogoutModel';
import { useSelector } from 'react-redux';
import PlaceHolderImage from '../../assets/images/dashboard/image/image.png';

function Navbar() {
  const [notification, setNotification] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='w-full h-[62px] px-10 py-3 bg-white border-b border-gray-100 items-start gap-[539px] flex justify-between rela'>
        <div className='flex flex-row'>
            <input className="w-[460px] h-[38px] px-4 py-[13px] rounded-tl-[10px] rounded-bl-[10px] border border-zinc-200 justify-start items-center gap-2.5 inline-flex placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight" placeholder='Search tracking number' type='text' />
            <button className='w-[38px] h-[38px] p-[11px] bg-red-800 rounded-tr-[10px] rounded-br-[10px] justify-center items-center inline-flex'><img src={SearchIcon} alt='ICONSVG' className='w-[16px] h-[16px]' /></button>
        </div>
        <div className='w-24 h-9 justify-start items-start gap-6 inline-flex'>
            <div onClick={() => {
              setNotification(!notification)
              setLogoutModal(false);
            }} className='w-9 h-9 bg-gray-100 rounded-full cursor-pointer flex items-center justify-center'>
                <img src={Notification} alt='NOTIFICATIONSVG' className='w-5 h-5' />
            </div>
            <div onClick={() => {
              setLogoutModal(!logoutModal)
              setNotification(false);
            }} className='w-9 h-9 bg-gray-100 rounded-full cursor-pointer flex items-center justify-center'> 
              <img src={userInfo?.profile_photo_link ? userInfo?.profile_photo_link : PlaceHolderImage }  alt='NOTIFICATIONSVG' className='w-9 h-9 rounded-full object-cover' />
            </div>
        </div>

        {
          notification &&
          <NotificationModal />
        }
        {
          logoutModal &&
          <LogoutModel />
        }
    </div>
  )
}

export default Navbar