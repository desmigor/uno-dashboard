import React, { useContext, useState } from 'react'
import Logout from '../../assets/images/dashboard/icon/logout.svg'
import ArrowRight from '../../assets/images/dashboard/icon/arrow-right.svg'
import AppContext from '../../context'
import { useNavigate } from 'react-router-dom'

const LogoutModel = () => {
    const { setLoggedIn, setIsAdmin, isAdmin } = useContext(AppContext);
    const navigate = useNavigate();
  return (
    <div className='w-[275px] px-3 py-[14px] h-[120px] absolute z-10 top-[54px] rounded-lg right-[28px] bg-white shadow-xl flex flex-col'>
      <div className="w-[189px] h-[38px] justify-start items-center gap-3 inline-flex">
        <img className="w-8 h-8 rounded-full" src='https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww' />
        <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-black text-sm font-normal font-rubik leading-tight">Michael James</div>
            <div className="text-gray-400 text-xs font-normal font-rubik leading-none">michaeljames@gmail.com</div>
        </div>
      </div>
      <div className="w-[251px] h-[0px] border border-gray-100 mt-3 mb-2" />
      <div onClick={() => {
        setLoggedIn('not-logged-in');
        setIsAdmin(false);
        isAdmin ? navigate('/admin') : navigate('/support');
      }} className='flex flex-row items-center justify-between cursor-pointer h-9 rounded-md hover:bg-neutral-100'>
        <div className='flex flex-row gap-3 items-center '>
            <div className='flex items-center justify-center w-7 h-7 bg-neutral-100 rounded-full'>
                <img src={Logout} className='h-3.5 w-3.5 ml-[4px]' />
            </div>
            <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">Log Out</div> 
        </div>
        <img src={ArrowRight} className='h-5 w-5 ml-[4px]' />
      </div>
    </div>
  )
}

export default LogoutModel