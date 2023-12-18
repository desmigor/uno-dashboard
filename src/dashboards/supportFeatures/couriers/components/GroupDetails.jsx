import React, { Fragment, useEffect, useState } from 'react'
import RightArrow from '../../../../assets/images/dashboard/icon/arrow-right.svg';
import Money from "../../../../assets/images/dashboard/icon/money-recive.svg";
import Millage from "../../../../assets/images/dashboard/icon/milleage.svg";
import Box from "../../../../assets/images/dashboard/icon/box2.svg";
import Export from '../../../../assets/images/dashboard/icon/export.svg';
import Profile2 from "../../../../assets/images/dashboard/icon/profile-2user2.svg";
import Search from '../../../../assets/images/dashboard/icon/search-normal2.svg';
import ExportWhite from '../../../../assets/images/dashboard/icon/export-white.svg';
import GroupProfile from './GroupProfile';
import packageOngoing from "../../../../assets/images/dashboard/icon/user-search2.svg";
import ArrowDownSmall from '../../../../assets/images/dashboard/icon/arrow-down-small.svg';
import ArrowLeftSmall from '../../../../assets/images/dashboard/icon/arrow-left-small.svg';
import Star from '../../../../assets/images/dashboard/icon/star.svg';
import StarO from '../../../../assets/images/dashboard/icon/star-o.svg';
import { Doughnut } from 'react-chartjs-2';
import Oval from "../../../../assets/images/dashboard/icon/Oval.svg";
import Dot from "../../../../assets/images/dashboard/icon/Dot.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetailsAction, fetchGroupsCouriersActions } from '../../../../redux/actions/fetchCouriersAction';
import { Link, useParams } from 'react-router-dom';
import Dashcard from '../../../../components/ui/dashcard';
import { Menu, Transition } from '@headlessui/react';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from '../../../../components/ui/ReportPDF';
import GenerateReport from './GenerateReport';
  
const GroupDetails = () => {
    const { groupCouriers, groupDetails } = useSelector(state => state.fetchCouriers);
    const [count, setCount] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginations, setPaginations] = useState([]);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchGroupsCouriersActions(id, currentPage, count));
        dispatch(fetchGroupDetailsAction(id));
    }, []);
    const data = {
        labels: ["Completed", "Canceled"],
        datasets: [
          {
            data: [groupDetails?.completed_deliveries?.total_count, groupDetails?.canceled_deliveries?.total_count],
            backgroundColor: ["#63C576", "#CF3434"],
            hoverBackgroundColor: ["#63C576", "#CF3434"],
            borderWidth: 1,
            borderColor: ["#63C576", "#CF3434"],
          },
        ],
    };
      
    const options = {
        cutout: "80%", // Adjust the size of the hole in the center (e.g., '70%' for a larger hole)
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

    useEffect(() => {
        setPaginations(generatePagination(groupDetails.courier_count, currentPage, count));
    }, [count, currentPage, groupDetails]);

    useEffect(() => {
        setPaginations(generatePagination(groupDetails.courier_count, 1, count));
    }, [groupDetails])

    const handleChangePage = (countNumber) => {
        setCount(countNumber);
        dispatch(fetchGroupsCouriersActions(id, currentPage, countNumber));
      }

    function generatePagination(count, currentPage, rowsPerPage) {
        const totalPages = Math.ceil(count / rowsPerPage); // Calculate total pages based on rowsPerPage
        const maxPagesToShow = 3; // Change this to adjust the number of pages displayed
      
        let pages = [];
      
        // If total pages are less than or equal to maxPagesToShow, display all pages
        if (totalPages <= maxPagesToShow) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
          return pages;
        }
        
    
        // Calculate start and end pages based on current page position
        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        let endPage = startPage + maxPagesToShow - 1;
      
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }
      
        // Add ellipsis if needed before the first page
        if (startPage > 2) {
          pages.push(1);
          pages.push('...');
        } else if (startPage === 2) {
          pages.push(1);
        }
      
        // Generate the page numbers within the visible range
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      
        // Add ellipsis for the last part if needed
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            pages.push('...');
          }
          pages.push(totalPages);
        }
      
        return pages;
      }

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 py-6 overflow-y-auto pb-32'>
        <div className='flex flex-row items-center justify-between'>
          <div>
            <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">Courier Groups</div>
            <div className="w-[166px] h-5 justify-start items-center gap-[9px] inline-flex mt-4">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Couriers</div>
                <img src={RightArrow} alt='SVG' className='w-3 h-3' />
                <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">View Group</div>
            </div> 
          </div>
          {/* <PDFDownloadLink document={<ReportPDF />}> */}
          <button onClick={() => setIsOpen(true)} className="w-[183px] h-12 py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-white text-base font-normal font-['Rubik'] leading-tight">Generate Report</div>
              <img src={ExportWhite} className='w-5 h-5' />
          </button>
          {/* </PDFDownloadLink> */}
        </div>
        <div className='flex w-full gap-5 mt-[23px] flex-row'>
          <div className="w-[50%] min-h-[212px] pl-4 pr-[49px] py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-[33px] inline-flex">
              <div className='flex flex-row gap-4 items-start'>
                  <GroupProfile name={groupDetails?.name} />
                  <div className='flex flex-col'>
                      <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">{groupDetails?.name}</div> 
                      <div className='flex flex-row items-center gap-1.5 mt-[6px]'>
                          <div className="text-amber-500 text-sm font-semibold font-['Rubik'] leading-tight">4.0</div> 
                          <img src={Star} className='w-3 h-3' />
                          <img src={Star} className='w-3 h-3' />
                          <img src={Star} className='w-3 h-3' />
                          <img src={Star} className='w-3 h-3' />
                          <img src={StarO} className='w-3 h-3' />
                      </div>
                  </div>
              </div>
              <div className="w-full justify-start items-start gap-[42px] inline-flex">
                  <div className="flex-col justify-start items-start gap-[17px] inline-flex">
                      <div className="flex-col justify-start items-start gap-1.5 flex">
                          <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Status</div>
                          <div className={`h-[19px] px-3 py-1.5 ${groupDetails?.is_active ? 'bg-green-100' : 'bg-rose-100'} rounded justify-start items-center gap-2.5 inline-flex`}>
                              <div className={`${groupDetails?.is_active ? 'text-green-700' : 'text-red-700'} text-xs font-normal font-['Rubik'] leading-none`}>{groupDetails?.is_active ? 'Active' : 'Offline'}</div>
                          </div>
                      </div>
                      <div className="flex-col justify-start items-start gap-2 flex">
                          <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Created on</div>
                          <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{moment(groupDetails?.created_at).format('DD MMM. YYYY')}</div>
                      </div>
                  </div>
                  <div className="justify-start items-start gap-[74px] flex">
                      <div className="flex-col justify-start items-start gap-[19px] inline-flex">
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Owner/Admin</div>
                              <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{groupDetails?.owner_name}</div>
                          </div>
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Country</div>
                              <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{groupDetails?.country?.name}</div>
                          </div>
                      </div>
                      <div className="flex-col justify-start items-start gap-[19px] inline-flex">
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{groupDetails?.owner_phone}</div>
                          </div>
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Email</div>
                              <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{groupDetails?.owner_email}</div>
                          </div>
                      </div>
                      {/* <div className="flex-col justify-start items-start gap-[19px] inline-flex">
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Vehicle Type</div>
                              <div className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">{courierDetals?.vehicle_name}</div>
                          </div>
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Total Deliveries</div>
                              <div className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">{courierDetals?.deliveries_count}</div>
                          </div>
                      </div> */}
                      {/* <div className="flex-col justify-start items-start gap-[19px] inline-flex">
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Capacity</div>
                              <div><span className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">40kg/400 m</span><span className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">3</span></div>
                          </div>
                          <div className="flex-col justify-start items-start gap-[5px] flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Packages</div>
                              <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Standard</div>
                          </div>
                      </div> */}
                  </div>
              </div>
          </div>
          <div className='w-[25%] min-h-[212px] px-4 py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-[13px] inline-flex'>
              <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">Deliveries</div>
              <div
                  style={{
                      width: "100px",
                      height: "100px",
                      alignSelf: "center",
                      position: 'relative',
                  }}
              >
                  <Doughnut data={data} options={options} />
                  <div className="text-center text-zinc-800 text-xs font-normal font-['Rubik'] leading-none absolute top-[44px] left-8">Orders</div>
              </div>
              <div className="w-full flex justify-between">
              <div className="flex flex-row gap-[8px]">
              <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <img
                      src={Dot}
                      className="w-2 h-2 absolute top-[4px] left-[4px]"
                    />
                  </div>
                  <span className="text-green-500 text-xs font-normal font-rubik">
                      Completed
                  </span>
                  </div>
                  <div className="flex flex-row gap-1">
                  <div className="text-zinc-800 text-xs font-normal font-rubik">

                      { groupDetails?.total_orders?.total_count === 0 ? 0 : 
                      (groupDetails?.completed_deliveries?.total_count/
                          groupDetails?.total_orders?.total_count * 100).toFixed(2)
                      }%{" "}
                  </div>
                  <div className="text-slate-500 text-xs font-normal font-rubik">
                      • {groupDetails?.completed_deliveries?.total_count?.toLocaleString()}
                  </div>
              </div>
              </div>
              <div className="w-full flex justify-between">
              <div className="flex flex-row gap-[8px]">
                  <div className="relative">
                    <div className="w-4 h-4 bg-rose-400 rounded-full" />
                    <img
                      src={Dot}
                      className="w-2 h-2 absolute top-[4px] left-[4px]"
                    />
                  </div>
                  <span className="text-rose-400 text-xs font-normal font-rubik">
                      Canceled
                  </span>
                  </div>
                  <div className="flex flex-row gap-1">
                  <div className="text-zinc-800 text-xs font-normal font-rubik">
                      {
                        groupDetails?.total_orders?.total_count === 0 ? 0 :
                      (groupDetails?.canceled_deliveries?.total_count/
                          groupDetails?.total_orders?.total_count * 100).toFixed(2)
                      }%{" "}
                  </div>
                  <div className="text-slate-500 text-xs font-normal font-rubik">
                      • {groupDetails?.canceled_deliveries?.total_count?.toLocaleString()}
                  </div>
              </div>
              </div>
          </div>
          <div className='w-[25%] min-h-[212px] pl-4 pr-[49px] py-4 bg-white rounded-[10px] flex-col justify-start items-start gap-[15px] inline-flex'>
              <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight mb-5">Top Couriers</div>
              {
                groupDetails?.top_couriers?.map((item, idx) => <div className="w-full h-[38px] justify-start items-center gap-3 inline-flex">
                  <img className="w-9 h-9 rounded-[100px] object-cover" src={item.profile_photo_link} />
                  <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                      <div className="justify-start items-center gap-1.5 inline-flex">
                          <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.full_name}</div>
                      </div>
                      <div className="text-slate-500 text-xs font-normal font-['Rubik'] leading-none">${item.total_revenue}</div>
                  </div>
                </div>)
              }
              {groupDetails?.top_couriers?.length === 0 && 
                <div className='w-full'>
                  <img src={packageOngoing} className='w-[69px] h-[69px] mx-auto' /> 
                  <h1 className="text-center text-gray-300 text-sm font-normal font-['Rubik'] leading-tight mt-[8px]">No couriers added yet</h1>
                </div>
              }
          </div>
        </div>
        <div className="w-full mx-auto mt-[24px] gap-5 flex flex-row">
        <Dashcard
          icon={Money}
          number={groupDetails?.total_revenue?.total_count?.toFixed()}
          percentage={groupDetails?.total_revenue?.total_count?.toFixed()}
          text={"Total Revenue"}
          iconBgColor={"bg-[#F4E7E7]"}
        />
        <Dashcard
          icon={Millage}
          number={groupDetails.total_mileage?.total_count?.toFixed()}
          percentage={groupDetails.total_mileage?.total_count?.toFixed(3)}
          text={"Total Milleage"}
          iconBgColor={"bg-[#cce8f6]"}
        />
        <Dashcard
          icon={Profile2}
          number={groupDetails.courier_count?.toFixed()}
          percentage={groupDetails.courier_count?.toFixed(3)}
          text={"Total Couriers"}
          iconBgColor={"bg-rose-100"}
        />
        <Dashcard
          icon={Box}
          number={groupDetails.total_orders?.total_count?.toFixed()}
          percentage={groupDetails.total_orders?.total_rate?.toFixed(3)}
          text={"Total Orders"}
          iconBgColor={"bg-yellow-400 bg-opacity-20"}
        />
      </div>
      <div className='w-[100%] min-h-[400px] mt-6 relative bg-white rounded-[10px] pb-20 py-[22px] px-[16px]'>
        <div className='flex flex-row justify-between items-center'>
          <div className="text-zinc-800 text-lg font-semibold font-rubik">Available Couriers</div> 
          <div className='flex flex-row gap-[10px] items-center'>
            {/* <Dropdown /> */}
            <div className='relative'>
              <input type='text' placeholder='Search courier ...' className='placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex' />
              <img src={Search} className='w-4 h-4 absolute top-[12px] left-[16px]' />
            </div>
          </div>
        </div>
      <div className='relative w-full overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Name</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Phone</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Email</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Country</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Vehicle Type</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Action</span>
                </th>
            </tr>
        </thead>
        <tbody >
            {groupCouriers?.map((item, idx) => <tr key={idx} onClick={() => {
              }} class={`relative border-b border-gray-100 cursor-pointer text-left`}>
                <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="h-[52px] flex-row justify-start items-center gap-2.5 inline-flex">
                    <img className="w-[34px] h-[34px] rounded-[100px] object-cover" src={item.profile_photo_link || PlaceHolderImage} />
                    <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.full_name}</div> 
                  </div>
                </th>
                <td className='px-6 py-3 text-left'>
                  <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.phone_number}</div> 
                </td>
                <td className='px-6 py-3 text-left'>
                  <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.email}</div> 
                </td>
                <td className='px-6 py-3 text-left'>
                  <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item?.country?.name}</div>
                </td>
                <td className='px-6 py-3 text-left'>
                  <div className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">{item.vehicle_name}</div>
                </td>
                <td className='px-6 py-3 text-left'>
                  <div className={`w-[66px] h-[19px] px-3 py-1.5 ${item.is_active ? 'bg-green-100' : item.is_paused ? 'bg-yellow-50' : 'bg-rose-100'} rounded justify-start items-center gap-2.5 inline-flex`}>
                      <div className={`${item.is_active ? 'text-green-700' : item.is_paused ? 'text-amber-500' : 'text-red-700'} text-xs font-normal font-['Rubik'] leading-none`}>{item.is_active ? 'Online' : item.is_paused ? 'Paused' : 'Offline'}</div>
                  </div>
                </td>
                <td className='px-6 py-3 text-left'>
                  <Link to={`/admin/dashboard/courier/${item.id}`} className='flex flex-row gap-[6px]'>
                    <span className={`text-red-800 underline text-sm font-normal font-rubik leading-none`}>View</span> 
                    <img src={Export} alt='SVGEXPORT' className='w-3 h-3' />
                  </Link>
                </td>
            </tr>)}
        </tbody>
    </table>
        </div>
        {
          groupCouriers?.length === 0 &&
          <div>
            <img src={packageOngoing} className='w-[152px] h-[152px] mx-auto mt-10 mb-3' />
            <div className="text-center text-gray-300 text-base font-normal font-['Rubik'] leading-tight">Currently, there are no couriers available.</div>           
          </div> 
        }
        <div className='mt-[20px] absolute bottom-3  w-[97.5%] flex items-center justify-between'>
          <div className="w-[155px] h-[25px] justify-start items-center gap-2.5 inline-flex">
            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Rows per page</div> 
            <Menu as="div">
              <Menu.Button className="w-[49px] h-[25px] cursor-pointer px-[9px] bg-white rounded-[20px] border border-gray-100 justify-start items-center gap-1 flex">
                <div className="text-center text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">{count}</div>
                <img src={ArrowDownSmall} className='w-3 h-3' />
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
                <Menu.Items className="absolute left-[121px] mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div onClick={() => handleChangePage(5)} className="px-1 py-1 cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="text-center text-zinc-800 text-sm font-normal font-['Rubik'] leading-none">5</div>
                      )}
                    </Menu.Item>
                  </div>
                  <div onClick={() => handleChangePage(10)} className="px-1 py-1 cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="text-center text-zinc-800 text-sm font-normal font-['Rubik'] leading-none">10</div>
                      )}
                    </Menu.Item>
                  </div>
                  <div onClick={() => handleChangePage(15)} className="px-1 py-1 cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="text-center text-zinc-800 text-sm font-normal font-['Rubik'] leading-none">15</div>
                      )}
                    </Menu.Item>
                  </div>
                  <div onClick={() => handleChangePage(20)} className="px-1 py-1 cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="text-center text-zinc-800 text-sm font-normal font-['Rubik'] leading-none">20</div>
                      )}
                    </Menu.Item>
                  </div>
                  <div onClick={() => handleChangePage(25)} className="px-1 py-1 cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="text-center text-zinc-800 text-sm font-normal font-['Rubik'] leading-none">25</div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="min-w-[415px] h-6 justify-end items-center gap-2.5 flex">
            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Results per page</div>   
            <div className='flex flex-row gap-2.5'>
              <button disabled={currentPage === 1 ? true : false} onClick={() => {
                setCurrentPage(currentPage - 1)
                dispatch(fetchGroupsCouriersActions(id, currentPage - 1, count));
              }} className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex">
                <img src={ArrowLeftSmall} className='w-3 h-3' />
              </button> 
              <div className='flex flex-row gap-2.5'>
                {paginations.map((item, idx) => 
                <div key={idx} onClick={() => {
                  setCurrentPage(item);
                    dispatch(fetchGroupsCouriersActions(id, item, count));
                }} className={`w-6 h-6 px-[9px] ${ item === currentPage ? "bg-red-800" : "bg-white" } rounded-[100px] cursor-pointer justify-center items-center gap-1 inline-flex`}>
                  <div className={`${ item === currentPage ? "text-white" : "text-zinc-800" } text-xs font-normal font-['Rubik'] leading-none`}>{item}</div>
                </div> )}
              </div>
              <button disabled={currentPage === paginations[paginations.length - 1] ? true : false} onClick={() => {
                setCurrentPage(currentPage + 1)
                dispatch(fetchGroupsCouriersActions(id, currentPage + 1, count));
              }} className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex">
                <img src={ArrowLeftSmall} className='w-3 h-3 rotate-180' />
              </button> 
            </div>      
          </div> 
        </div>
      </div>
      <GenerateReport isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </div>
  )
}

export default GroupDetails