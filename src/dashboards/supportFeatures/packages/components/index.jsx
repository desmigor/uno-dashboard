import React, { useState, Fragment, useEffect } from 'react'
import Tabs from './Tabs'
import AddCircle from '../../../../assets/images/dashboard/icon/add-circle.svg';
import Search from '../../../../assets/images/dashboard/icon/search-normal2.svg';
import Dropdown from './Dropdown';
import ArrowSquare from '../../../../assets/images/dashboard/icon/arrow-square-down.svg';
import Export from '../../../../assets/images/dashboard/icon/export.svg';
import ArrowSquare2 from '../../../../assets/images/dashboard/icon/arrow-square-down2.svg';
import Map1 from '../../../../assets/images/dashboard/icon/map12.png';
import Edit from '../../../../assets/images/dashboard/icon/edit-2.svg';
import ArrowDownSmall from '../../../../assets/images/dashboard/icon/arrow-down-small.svg';
import ArrowLeftSmall from '../../../../assets/images/dashboard/icon/arrow-left-small.svg';
import Close from '../../../../assets/images/dashboard/icon/close-circle2.svg';
import pickup_point from "../../../../assets/images/dashboard/icon/pickup_point.svg";
import startingPoint from "../../../../assets/images/dashboard/icon/starting_point.svg";
import packageCancelled from "../../../../assets/images/dashboard/icon/package-cancelled.svg";
import packageCompleted from "../../../../assets/images/dashboard/icon/package-completed.svg";
import packageOngoing from "../../../../assets/images/dashboard/icon/package-ongoing.svg";
import star from "../../../../assets/images/dashboard/icon/star.svg";
import starOut from "../../../../assets/images/dashboard/icon/star-o.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchPackageDetails, fetchPackagesCanceledAction, fetchPackagesCompletedAction, fetchPackagesOngoingAction } from '../../../../redux/actions/fetchPackagesAction';
import { Menu, Transition } from '@headlessui/react'
import CancelModal from './CancelModal';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import SuccessToast from '../../../../components/ui/SuccessToast';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 5.614818, // default latitude
  lng: -0.205874, // default longitude
};

const libraries = ['places'];

function Packages() {
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(5);
  const [table, setTable] = useState('ongoing');
  const [id, setId] = useState(null);
  const [paginations, setPaginations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { ongoings, canceled, completed, ongoingCounts, completedCounts, canceledCounts, selectedPackage } = useSelector((state) => state.fetchPackages);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPackagesOngoingAction(1, 5));
    dispatch(fetchPackagesCompletedAction(1, 5));
    dispatch(fetchPackagesCanceledAction(1, 5));
  }, [])
  
  useEffect(() => {
    console.log(generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, currentPage, count), 'KLL::')
    setPaginations(generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, currentPage, count));
  }, [table, currentPage, count])

  useEffect(() => {
    setPaginations(generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, currentPage, count));
  }, [])


  const handleChangePage = (countNumber) => {
    setCount(countNumber);
    dispatch(fetchPackagesOngoingAction(1, countNumber)); 
    dispatch(fetchPackagesCanceledAction(1, countNumber)); 
    dispatch(fetchPackagesCompletedAction(1, countNumber)); 
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
    libraries,
  });

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 py-6 overflow-y-auto pb-32'>
      <div>
        <span className="text-zinc-800 text-2xl font-bold font-rubik">Packages</span>
      </div>
      <div className='mt-[24px] flex flex-row justify-between items-center'>
        <Tabs paginate={() => generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, 1, count)} table={table} ongoingCount={ongoingCounts} canceledCount={canceledCounts} completedCount={completedCounts} setTable={setTable} />
        <Link to={userInfo?.type?.id === 3 ? '/admin/dashboard/package/new' : '/support/dashboard/package/new'} className='w-[183px] h-12 py-[15px] bg-red-800 flex flex-row rounded-[10px] justify-center items-center gap-2.5'>
          <div className="text-center text-white text-base font-normal font-rubik leading-tight">Create Package</div> 
          <img src={AddCircle} className='w-5 h-5' />
        </Link>
      </div>
      <div className='w-[100%] min-h-[400px] mt-6 relative bg-white rounded-[10px] pb-20 py-[22px] px-[16px]'>
        <div className='flex flex-row justify-between items-center'>
          <div className="text-zinc-800 text-lg font-semibold font-rubik">{table === 'ongoing' ? 'Ongoing Packages' : table === 'completed' ? 'Completed packages' : 'Canceled Packages'}</div> 
          <div className='flex flex-row gap-[10px] items-center w-[528px]'>
            <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">Sort by</div>
            <Dropdown />
            <div className='relative'>
              <input type='text' placeholder='Search package ...' className='placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex' />
              <img src={Search} className='w-4 h-4 absolute top-[12px] left-[16px]' />
            </div>
          </div>
        </div>
        {ongoings?.length > 0 && table === 'ongoing' && <div className='relative w-full overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Time</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Tracking #</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Customer</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Courier</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Size</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Time Left</span>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'></span>
                </th>
            </tr>
        </thead>
        {ongoings?.map((item, idx) => <tbody key={idx}>
            <tr onClick={() => {
                setSelected(selected === idx ? null : idx)
                dispatch(fetchPackageDetails(item.id));
              }} class={` ${selected === idx && 'bg-gray-50'} h-[70px] relative border-b border-gray-100 cursor-pointer text-left`}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{moment(item.created_at).format("DD-MM-YYYY")}</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">{moment(item.created_at).format("HH:MM")}</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-left">{item.id}</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-left">{item?.customer}</div>
                </td>
                <td class="px-6 py-4">
                  <button disabled={item.courier ? false : true} onClick={() => {
                    navigate(userInfo?.type?.id === 3 ? `/admin/dashboard/courier/${item.courier?.id}` : `/support/dashboard/courier/${item.courier?.id}`)
                  }} className='flex flex-row gap-[6px]'>
                    <span className={`${item.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{item.courier ? item.courier.full_name : 'Not mentioned'}</span> 
                    {item.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                  </button>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">{item.relative_size === 1 ? "Small" : item.relative_size === 2 ? "Medium" : "Large" }</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight text-left">{item.currency_value} {item.total_cost}</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 ${item.package_status === 4 || item.package_status === 5 ? 'bg-blue-50' : item.package_status === 3 ? 'bg-gray-100' : 'bg-yellow-50'} rounded justify-start items-center gap-2.5 inline-flex`}>
                      <span className={`${item.package_status === 4 || item.package_status === 5 ? 'text-sky-600' : item.package_status === 3 ? 'text-slate-500' : 'text-amber-500'} text-xs font-normal font-rubik leading-none`}>{item.package_status_value}</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight">{item.time_left.time ? item.time_left.time : '-'}</div> 
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full min-h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[18px]'>
                <div className='flex flex-row gap-4 w-full items-center'>
                  {/* <img className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]" src={Map1} /> */}
                  <div className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]">
                      {loadError && <div>Error loading maps</div>}
                      {!isLoaded ? <div>Loading maps</div> :
                          <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              zoom={10}
                              center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                              options={{
                                  zoomControl: false,
                                  mapTypeControl: false,
                                  fullscreenControl: false,
                                  streetViewControl: false,
                              }}
                          >
                              <Marker position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}  />
                          </GoogleMap>
                      }
                  </div>
                  <div className='flex flex-row w-full xl:w-[84%]'>
                  <div class="w-4 h-[10px] relative mt-16">
                    <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                      <img src={pickup_point} alt="" />
                    </div>
                    <div class="w-4 h-4 left-0 top-[63px] absolute justify-start items-center gap-2 inline-flex">
                      <img src={startingPoint} alt="" />
                    </div>
                    <div class="h-[38px] left-[7px] top-[21px] absolute origin-top-left border-dashed border-[1px] border-slate-400"></div>
                  </div>
                  <div class="w-full h-full mt-[10px]">
                    <table class="table-auto w-full">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Addresses</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Customer</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Delivery point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Pickup point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Courier</div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody className='mt-[17px] '>
                        <tr>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">(Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.payment_type}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[88px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.drop_contact_person}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-20 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_contact_person}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[100px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <button disabled={item.courier ? false : true} onClick={() => {
                                navigate(userInfo?.type?.id === 3 ? `/admin/dashboard/courier/${item.courier?.id}` : `/support/dashboard/courier/${item.courier?.id}`)
                              }} className='flex flex-row gap-[6px]'>
                                <span className={`${selectedPackage?.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{selectedPackage?.courier ? selectedPackage?.courier.full_name : 'Not mentioned'}</span> 
                                {selectedPackage.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                              </button>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">(Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.customer?.phone_number}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.drop_contact_phone}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.pickup_contact_phone}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.courier ? selectedPackage?.courier?.phone_number : '-'}</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='px-4 mt-[12px] flex flex-row gap-4 pb-[22px]'>
                      <Link to={userInfo?.type?.id === 3 ? `/admin/dashboard/package/update/${item.id}` : `/admin/dashboard/package/update/${item.id}`} className='w-40 h-[42px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex'>
                        <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">Edit Package</div> 
                        <img src={Edit} className='w-[17px] h-4' />
                      </Link>
                      <button onClick={() => {
                        setIsOpen(true)
                      }} className='w-40 h-[42px] py-[15px] rounded-[10px] border border-red-700 justify-center items-center gap-2.5 flex'>
                        <div className="text-center text-red-700 text-sm font-normal font-rubik leading-tight">Cancel Package</div> 
                        <img src={Close} className='w-5 h-5' />
                      </button>
                    </div>
                  </div>
                  </div>
                  </div>
              </td>
            </tr>}
        </tbody>)}
    </table>
        </div>}
        {
          table === 'ongoing' && ongoings?.length === 0 &&
          <div>
            <img src={packageOngoing} className='w-[152px] h-[152px] mx-auto mt-10 mb-3' />
            <div className="text-center text-gray-300 text-base font-normal font-['Rubik'] leading-tight">Currently, there are no ongoing packages. <br/>Please check back again later!</div>           
          </div> 
        }
        {completed?.length > 0 && table === 'completed' && <div className='relative overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Time
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Tracking #
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Courier
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Size
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Rating</span>
                </th>
                <th scope="col"class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'></span>
                </th>
            </tr>
        </thead>
        {completed?.map((item, idx) => <tbody key={idx}>
            <tr onClick={() => {
                setSelected(selected === idx ? null : idx)
                dispatch(fetchPackageDetails(item.id));
              }} class={` ${selected === idx && 'bg-gray-50'} h-[70px] relative border-b border-gray-100 cursor-pointer text-left`}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{moment(item.created_at).format('DD-MM-YYYY')}</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">{moment(item.created_at).format("HH:MM")}</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.id}</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.customer}</div>
                </td>
                <td class="px-6 py-4">
                <button disabled={item.courier ? false : true} onClick={() => {
                    navigate(userInfo?.type?.id === 3 ? `/admin/dashboard/courier/${item.courier?.id}` : `/support/dashboard/courier/${item.courier?.id}`)
                  }} className='flex flex-row gap-[6px]'>
                    <span className={`${item.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{item.courier ? item.courier.full_name : 'Not mentioned'}</span> 
                    {item.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                </button>
                </td>
                <td class="px-6 py-4">
                <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">{item.relative_size === 1 ? "Small" : item.relative_size === 2 ? "Medium" : "Large" }</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight">{item.currency_value} {item.total_cost}</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 bg-green-100 rounded justify-center items-center gap-2.5 inline-flex mx-auto `}>
                      <span className={`text-green-700 text-xs font-normal font-rubik leading-none`}>{item.package_status_value}</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  {item.customer_rating ? <div className='flex flex-row gap-[6px]'>
                    <img src={item.customer_rating >= 1 ? star : starOut} className='w-4 h-4' />
                    <img src={item.customer_rating >= 2 ? star : starOut} className='w-4 h-4' />
                    <img src={item.customer_rating >= 3 ? star : starOut} className='w-4 h-4' />
                    <img src={item.customer_rating >= 4 ? star : starOut} className='w-4 h-4' />
                    <img src={item.customer_rating === 5 ? star : starOut} className='w-4 h-4' />
                  </div> : <div className='text-zinc-800 text-xs font-normal font-rubik leading-none'>No ratings</div>}
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[18px]'>
                <div className='flex flex-row gap-4 w-full items-center'>
                  {/* <img className="w-[16%] h-[190px] rounded-md mt-[-12px]" src={Map1} /> */}
                  <div className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]">
                      {loadError && <div>Error loading maps</div>}
                      {!isLoaded ? <div>Loading maps</div> :
                          <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              zoom={10}
                              center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                              options={{
                                  zoomControl: false,
                                  mapTypeControl: false,
                                  fullscreenControl: false,
                                  streetViewControl: false,
                              }}
                          >
                              <Marker position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}  />
                          </GoogleMap>
                      }
                  </div>
                  <div className='flex flex-row w-[84%]'>
                  <div class="w-4 h-[10px] relative mt-16">
                    <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                      <img src={pickup_point} alt="" />
                    </div>
                    <div class="w-4 h-4 left-0 top-[63px] absolute justify-start items-center gap-2 inline-flex">
                      <img src={startingPoint} alt="" />
                    </div>
                    <div class="h-[38px] left-[7px] top-[21px] absolute origin-top-left border-dashed border-[1px] border-slate-400"></div>
                  </div>
                  <div class="w-full h-full mt-[10px]">
                    <table class="table-auto w-full">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Addresses</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Customer</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Delivery point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Pickup point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Courier</div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody className='mt-[17px] '>
                        <tr>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">(Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.payment_type}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[88px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.drop_contact_person}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-20 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_contact_person}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[100px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <button disabled={item.courier ? false : true} onClick={() => {
                                  navigate(userInfo?.type?.id === 3 ? `/admin/dashboard/courier/${item.courier?.id}` : `/support/dashboard/courier/${item.courier?.id}`)
                                }} className='flex flex-row gap-[6px]'>
                                <span className={`${selectedPackage?.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{selectedPackage?.courier ? selectedPackage?.courier.full_name : 'Not mentioned'}</span> 
                                {selectedPackage.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                              </button>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">(Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.customer?.phone_number}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.drop_contact_phone}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.pickup_contact_phone}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.courier ? selectedPackage?.courier?.phone_number : '-'}</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </div>
                  </div>
              </td>
            </tr>}
        </tbody>)}
    </table>
        </div>}
        {
          table === 'completed' && completed?.length === 0 &&
          <div>
            <img src={packageCompleted} className='w-[152px] h-[152px] mx-auto mt-10 mb-3' />
            <div className="text-center text-gray-300 text-base font-normal font-['Rubik'] leading-tight">Currently, there are no completed packages. <br/>Please check back again later!</div>  
          </div> 
        }
        {canceled?.length > 0 && table === 'canceled' && <div className='relative overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
        <table class="w-full table-auto">
        <thead class="w-full h-8 relative bg-gray-50 rounded-tl-md rounded-tr-md border border-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Time
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Tracking #
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Courier
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  Size
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                    <span className='text-slate-500 text-xs font-normal font-rubik'>Amount</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Status</span>
                </th>
                <th scope="col" class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Canceled by</span>
                </th>
                <th scope="col"class="px-6 py-3 text-slate-500 text-xs font-normal font-rubik text-left">
                  <span className='text-slate-500 text-xs font-normal font-rubik'></span>
                </th>
            </tr>
        </thead>
        {canceled?.map((item, idx) => <tbody key={idx}>
            <tr onClick={() => {
              setSelected(selected === idx ? null : idx)
              dispatch(fetchPackageDetails(item.id));
            }} class={` ${selected === idx && 'bg-gray-50'} h-[70px] relative border-b border-gray-100 cursor-pointer text-left`}>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="w-[77px] h-[38px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{moment(item.created_at).format('DD-MM-YYYY')}</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">{moment(item.created_at).format("HH:MM")}</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.id}</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.customer}</div>
                </td>
                <td class="px-6 py-4">
                <button disabled={item.courier ? false : true} onClick={() => {
                    navigate(userInfo?.type?.id === 3 ? `/admin/dashboard/courier/${item.courier?.id}` : `/support/dashboard/courier/${item.courier?.id}`)
                  }} className='flex flex-row gap-[6px]'>
                    <span className={`${item.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{item.courier ? item.courier.full_name : 'Not mentioned'}</span> 
                    {item.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                  </button>
                </td>
                <td class="px-6 py-4">
                <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">{item.relative_size === 1 ? "Small" : item.relative_size === 2 ? "Medium" : "Large" }</div> 
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight">{item.currency_value} {item.total_cost}</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] h-[19px] px-3 py-1.5 bg-rose-100 rounded justify-center items-center gap-2.5 inline-flex mx-auto `}>
                      <span className={`text-red-700 text-xs font-normal font-rubik leading-none`}>{item.package_status_value}</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Courier</div> 
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[18px]'>
                <div className='flex flex-row gap-4 w-full items-center'>
                  {/* <img className="w-[16%] h-[190px] rounded-md mt-[-12px]" src={Map1} /> */}
                  <div className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]">
                      {loadError && <div>Error loading maps</div>}
                      {!isLoaded ? <div>Loading maps</div> :
                          <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              zoom={10}
                              center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                              options={{
                                  zoomControl: false,
                                  mapTypeControl: false,
                                  fullscreenControl: false,
                                  streetViewControl: false,
                              }}
                          >
                              <Marker position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}  />
                          </GoogleMap>
                      }
                  </div>
                  <div className='flex flex-row w-[84%]'>
                  <div class="w-4 h-[10px] relative mt-16">
                    <div class="w-4 h-4 left-0 top-0 absolute justify-start items-center gap-2 inline-flex">
                      <img src={pickup_point} alt="" />
                    </div>
                    <div class="w-4 h-4 left-0 top-[63px] absolute justify-start items-center gap-2 inline-flex">
                      <img src={startingPoint} alt="" />
                    </div>
                    <div class="h-[38px] left-[7px] top-[21px] absolute origin-top-left border-dashed border-[1px] border-slate-400"></div>
                  </div>
                  <div class="w-full h-full mt-[10px]">
                    <table class="table-auto w-full">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Addresses</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Customer</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Delivery point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Pickup point</div> 
                          </th>
                          <th class="px-4 py-2">
                            <div className="text-red-800 text-sm font-semibold font-rubik leading-tight text-start">Courier</div> 
                          </th>
                        </tr>
                      </thead>
                      <tbody className='mt-[17px] '>
                        <tr>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">(Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.payment_type}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[88px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.drop_contact_person}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-20 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_contact_person}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[100px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Name</div>
                              <button disabled={item.courier ? false : true} onClick={() => {
                                navigate(userInfo?.type?.id === 3 ? `/admin/dashboard/courier/${item.courier?.id}` : `/support/dashboard/courier/${item.courier?.id}`)
                              }} className='flex flex-row gap-[6px]'>
                                <span className={`${selectedPackage?.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{selectedPackage?.courier ? selectedPackage?.courier.full_name : 'Not mentioned'}</span> 
                                {selectedPackage.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                              </button>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[135px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">(Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.customer?.phone_number}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.drop_contact_phone}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.pickup_contact_phone}</div>
                            </div>
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="w-[121px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Phone</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.courier ? selectedPackage?.courier?.phone_number : '-'}</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* <div className="w-[221px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Cancellation reason</div>
                      <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">There was no one at the pickup address</div>
                    </div>  */}
                  </div>
                  </div>
                  </div>
              </td>
            </tr>}
        </tbody>)}
    </table>
        </div>}
        {
          table === 'canceled' && canceled?.length === 0 &&
          <div>
            <img src={packageCancelled} className='w-[152px] h-[152px] mx-auto mt-10 mb-3' />
            <div className="text-center text-gray-300 text-base font-normal font-['Rubik'] leading-tight mt-1.5">Currently, there are no ongoing packages. <br/>Please check back again later!</div> 
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
                if (table === 'ongoing') {
                  dispatch(fetchPackagesOngoingAction(currentPage - 1, count));
                } else if (table === 'completed') {
                  dispatch(fetchPackagesCompletedAction(currentPage - 1, count));
                } else {
                  dispatch(fetchPackagesCanceledAction(currentPage - 1, count));
                }
              }} className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex">
                <img src={ArrowLeftSmall} className='w-3 h-3' />
              </button> 
              <div className='flex flex-row gap-2.5'>
                {paginations.map((item, idx) => 
                <div key={idx} onClick={() => {
                  setCurrentPage(item);
                  if (table === 'ongoing') {
                    dispatch(fetchPackagesOngoingAction(item, count));
                  } else if (table === 'completed') {
                    dispatch(fetchPackagesCompletedAction(item, count));
                  } else {
                    dispatch(fetchPackagesCanceledAction(item, count));
                  }
                }} className={`w-6 h-6 px-[9px] ${ item === currentPage ? "bg-red-800" : "bg-white" } rounded-[100px] cursor-pointer justify-center items-center gap-1 inline-flex`}>
                  <div className={`${ item === currentPage ? "text-white" : "text-zinc-800" } text-xs font-normal font-['Rubik'] leading-none`}>{item}</div>
                </div> )}
              </div>
              <button disabled={currentPage === paginations[paginations.length - 1] ? true : false} onClick={() => {
                setCurrentPage(currentPage + 1);
                if (table === 'ongoing') {
                  dispatch(fetchPackagesOngoingAction(currentPage + 1, count));
                } else if (table === 'completed') {
                  dispatch(fetchPackagesCompletedAction(currentPage + 1, count));
                } else {
                  dispatch(fetchPackagesCanceledAction(currentPage + 1, count));
                }
              }} className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex">
                <img src={ArrowLeftSmall} className='w-3 h-3 rotate-180' />
              </button> 
            </div>      
          </div> 
        </div>
      </div>
      <CancelModal isOpen={isOpen} setIsOpen={setIsOpen} id={selectedPackage?.id} />
    </div>
  )
}

export default Packages