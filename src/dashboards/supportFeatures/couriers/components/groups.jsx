import React, { Fragment, useEffect, useRef, useState } from 'react'
import AddRed from '../../../../assets/images/dashboard/icon/add-red.svg';
import { Link } from 'react-router-dom';
import GroupProfile from './GroupProfile';
import MoreVertical from '../../../../assets/images/dashboard/icon/more_vertical.svg';
import CountryFlag from './CountryFlag';
import ArrowLeft from "../../../../assets/images/dashboard/icon/arrow-left.svg";
import Edit from "../../../../assets/images/dashboard/icon/edit-black.svg";
import Close from "../../../../assets/images/dashboard/icon/add-yellow.svg";
import Delete from "../../../../assets/images/dashboard/icon/trash.svg";
import DeleteInactive from "../../../../assets/images/dashboard/icon/trash-inactive.svg";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { fetchGroupsAction } from '../../../../redux/actions/fetchCouriersAction';
import { Menu, Transition } from '@headlessui/react'


const Groups = () => {
  const { groups } = useSelector(state => state.fetchCouriers);
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchGroupsAction());
  }, []);

  

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 py-6 overflow-y-auto pb-32'>
        <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">Courier Groups</div>
        <div className='mt-[22px]'>
          <div className='w-full flex flex-row flex-wrap gap-5'>
            <Link to={'/admin/dashboard/courier/groups/new'} className="cursor-pointer w-[364px] h-[270px] pt-9 relative bg-stone-100 rounded-[10px] outline-red-800 outline-dashed flex flex-col items-center outline-2 outline-offset-1">
              <div className='w-full flex items-center justify-center'>
                <div className="w-[62px] h-[62px] px-3 py-[7px] bg-red-800 bg-opacity-20 rounded-[100px] flex-col justify-center items-center gap-2.5 flex">
                  <img src={AddRed} className='w-[38px] h-[38px]' />
                </div>
              </div>
              <div className="w-[218px] h-[50px] mt-[27px] mx-auto py-[15px] rounded-xl border border-red-800 justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-red-800 text-base font-normal font-['Rubik'] leading-tight">Create New Group</div>
              </div>
              <div className="text-center text-gray-400 text-sm mt-[21px] font-normal font-rubik leading-relaxed">A new group will be displayed here.</div>
            </Link>
            {groups?.map((item, idx) => <div key={idx} className="relative w-[364px] h-[270px] px-3.5 py-4 bg-white rounded-[10px] shadow flex-col justify-start items-start gap-3 inline-flex">
              <div className='flex flex-row w-full items-center justify-between'>
                <div className='flex flex-row gap-4 items-center'>
                  <GroupProfile name={item.name} />
                  <div className="w-[145px] h-[45px] flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">{item.name}</div>
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">From {moment(item.created_at).format('MMM. DD, YYYY')}</div>
                  </div>
                </div>
                <Menu>
                  <div className=''>
                    <Menu.Button>
                      <img src={MoreVertical} className='w-4 h-4' />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-[37px] top-[15px] w-[158px] h-40 p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-2 inline-flex">
                          <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Group Actions</div>
                          <Menu.Item>
                          <button className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
                            <div className="w-6 h-6 bg-gray-100 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex">
                              <img src={Edit} className='w-4 h-4' />
                            </div>
                            <div className="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">Edit</div>
                          </button>
                          </Menu.Item>
                          <div className='w-full h-[1px] bg-[#D0D4D9]' />
                          <Menu.Item>
                          <button className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
                            <div className="w-6 h-6 bg-yellow-50 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex">
                              <img src={Close} className='w-10 h-10' />
                            </div>
                            <div className="text-amber-500 text-xs font-normal font-['Rubik'] leading-none">Deactivate</div>
                          </button>
                          </Menu.Item>
                          <div className='w-full h-[1px] bg-[#D0D4D9]' />
                          <Menu.Item>
                          <button disabled={item.courier_count > 0 ? true : false} className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
                            <div className={`w-6 h-6 ${item.courier_count > 0 ? 'opacity-30 bg-gray-100' : 'bg-rose-100'} rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex`}>
                              <img src={item.courier_count > 0 ? DeleteInactive : Delete} className='w-4 h-4' />
                            </div>
                            <div className={`${ item.courier_count > 0 ? 'text-zinc-200' : 'text-red-700'} text-xs font-normal font-['Rubik'] leading-none`}>Delete</div>
                          </button>
                          </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </div>
                </Menu>
              </div>
              <div className="w-full h-5 mt-4 justify-between items-start inline-flex">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Country</div>
                <div className="justify-start items-center gap-1.5 flex">
                  <CountryFlag countryName={item.country.name} />
                  <div className="text-right text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.country.name}</div>
                </div>
              </div>
              <div className="w-full h-5 justify-between items-start inline-flex">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Total Mileage</div>
                <div className="text-right text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.total_mileage}</div>
              </div>
              <div className="w-full h-5 justify-between items-start inline-flex">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Total Revenue</div>
                <div className="text-right text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">${item.total_revenue}</div>
              </div>
              <div className="w-full h-5 justify-between items-start inline-flex">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Status</div>
                <div className={`min-w-[60px] px-3 py-1.5 ${item.is_active ? 'bg-green-100' : 'bg-rose-100'} rounded justify-start items-center gap-2.5 flex`}>
                  <div className={`${item.is_active ? 'text-green-700' : 'text-red-700'} text-xs font-normal font-['Rubik'] leading-none`}>{item.is_active ? 'Active' : 'Deactivated'}</div>
                </div>
              </div>
              <div className="w-full h-[0px] border border-gray-100"></div>
                <div className="w-[332px] h-6 justify-between items-center inline-flex">
                  <div className="w-[74px] h-6 relative">
                      <div className="w-6 h-6 px-3 py-1 left-[50px] top-0 absolute bg-gray-100 rounded-[100px] border border-gray-300 justify-center items-center gap-2.5 inline-flex">
                          <div className="text-zinc-800 text-[10px] font-normal font-['Rubik'] leading-none">{item.courier_count}</div>
                      </div>
                      <img className="w-6 h-6 left-[30px] top-0 absolute rounded-[100px] border border-white" src="https://via.placeholder.com/24x24" />
                      <img className="w-6 h-6 left-[15px] top-0 absolute rounded-[100px] border border-white" src="https://via.placeholder.com/24x24" />
                      <img className="w-6 h-6 left-0 top-0 absolute rounded-[100px] border border-white" src="https://via.placeholder.com/24x24" />
                  </div>
                  <Link to={`/admin/dashboard/courier/groups/${item.id}`} className="justify-start items-center gap-1.5 flex cursor-pointer">
                      <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">View Group</div>
                      <img src={ArrowLeft} className='h-4 w-4' />
                  </Link>
              </div>
            </div>)}
          </div>
        </div>
    </div>
  )
}

export default Groups