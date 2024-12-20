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
import { fetchPackageDetails, fetchPackagesCanceledAction, fetchPackagesCanceledActionSearch, fetchPackagesCompletedAction, fetchPackagesCompletedActionSearch, fetchPackagesOngoingAction, fetchPackagesOngoingActionSearch } from '../../../../redux/actions/fetchPackagesAction';
import { Menu, Transition } from '@headlessui/react'
import CancelModal from './CancelModal';
import { GoogleMap, useLoadScript, InfoBox, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import SuccessToast from '../../../../components/ui/SuccessToast';
import GenerateReportPackages from './GenerateReport';
import { handleInputs } from '../../../../redux/slices/packageInputs';

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
  const [isOpen2, setIsOpen2] = useState(false);
  const [filterValue, setFilterValue] = useState({ name: "Time", value: "-created_at" });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { ongoings, canceled, completed, ongoingCounts, completedCounts, canceledCounts, selectedPackage } = useSelector((state) => state.fetchPackages);
  const navigate = useNavigate();
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBQDxtB9YM_5Z72vMaQyqIwyNfNG908JUs',
    libraries,
  });
  useEffect(() => {
    dispatch(fetchPackagesOngoingAction(1, 5));
    dispatch(fetchPackagesCompletedAction(1, 5));
    dispatch(fetchPackagesCanceledAction(1, 5));
  }, [])
  
  useEffect(() => {
    setPaginations(generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, currentPage, count));
  }, [table, currentPage, count])

  useEffect(() => {
    dispatch(table === 'ongoing' ? fetchPackagesOngoingActionSearch('', filterValue.value) : table === 'completed' ? fetchPackagesCompletedActionSearch('', filterValue.value) : fetchPackagesCanceledActionSearch('', filterValue.value))
  }, [filterValue])

  useEffect(() => {
    setPaginations(generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, currentPage, count));
  }, [])

  useEffect(() => {
    calculateRoute();
}, [selectedPackage]);

async function calculateRoute() {
  if(selectedPackage === null){
    return false;
  }

  const directionsService = new window.google.maps.DirectionsService();
  const originLatLng = new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude);
  const destinationLatLng = new google.maps.LatLng(selectedPackage?.drop_latitude, selectedPackage?.drop_longitude);
  const results = await directionsService.route({
    origin: originLatLng,
    destination: destinationLatLng,
    provideRouteAlternatives: false,
    travelMode: window.google.maps.TravelMode.DRIVING,
  });
  setDirectionsResponse(null);
  setDirectionsResponse(results);
}

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

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full px-10 py-6 overflow-y-auto pb-32'>
      <div>
        <span className="text-zinc-800 text-2xl font-bold font-rubik">Packages</span>
      </div>
      <div className='mt-[24px] flex flex-row justify-between items-center'>
        <Tabs paginate={() => generatePagination(table === 'ongoing' ? ongoingCounts : table === 'completed' ? completedCounts : canceledCounts, 1, count)} table={table} ongoingCount={ongoingCounts} canceledCount={canceledCounts} completedCount={completedCounts} setTable={setTable} />
        <Link onClick={() => { 
          dispatch(handleInputs([{ pickupAddress: '', dropAddress: '', pickup: {}, drop: {}, pickupSearch: [], deliverySearch: [], full_name_pickup: '', full_name_drop: '', phone_number_pickup: '', phone_number_drop: '', comment_pickup: '', comment_drop: '', choosenMethod: 0, size: 0, chosenAddons: [], distance: 0, price: 0, discount: 0, total: 0 }]))
         }} to={userInfo?.type?.id === 3 ? '/admin/dashboard/package/new' : '/support/dashboard/package/new'} className='w-[183px] h-12 py-[15px] bg-red-800 flex flex-row rounded-[10px] justify-center items-center gap-2.5'>
          <div className="text-center text-white text-base font-normal font-rubik leading-tight">Create Package</div> 
          <img src={AddCircle} className='w-5 h-5' />
        </Link>
      </div>
      <div className='w-[100%] min-h-[400px] mt-6 relative bg-white rounded-[10px] pb-20 py-[22px] px-[16px]'>
        <div className='flex flex-row justify-between items-center'>
          <div className="text-zinc-800 text-lg font-semibold font-rubik">{table === 'ongoing' ? 'Ongoing Packages' : table === 'completed' ? 'Completed packages' : 'Canceled Packages'}</div> 
          <div className='flex flex-row gap-[10px] items-center'>
            <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">Sort by</div>
            <Dropdown setDropdownValue={setFilterValue} />
            <div className='relative'>
              <input type='text' onChange={(e) => dispatch(table === 'ongoing' ? fetchPackagesOngoingActionSearch(e.target.value, filterValue.value) : table === 'completed' ? fetchPackagesCompletedActionSearch(e.target.value, filterValue.value) : fetchPackagesCanceledActionSearch(e.target.value, filterValue.value))} placeholder='Search package ...' className='placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex' />
              <img src={Search} className='w-4 h-4 absolute top-[12px] left-[16px]' />
            </div>
            { table !== 'ongoing' && <button onClick={() => setIsOpen2(true)} className="w-[186px] h-10 py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-red-800 text-base font-normal font-['Rubik'] leading-tight">Generate Report</div>
              <img src={Export} alt='SVGEXPORT' className='w-5 h-5' />
            </button>}
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
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.created_at.toString().slice(0, 10)}</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">{item.created_at.toString().slice(11, 16)}</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight text-left">{item.sr_number}</div> 
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
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">{item.package_size_name }</div> 
                </td>
                <td class="px-2 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight text-left">{item.total_prices.toFixed(2)} {item.currency_value}</div> 
                </td>
                <td class="px-6 py-4 h-[75px]">
                  <div className={`min-w-[106px] px-3 py-1.5 ${
                                item.package_status === 2 || item.package_status === 1 
                                  ? "bg-gray-50":
                                  item.package_status === 3
                                  ? "bg-green-100"
                                  : "bg-gray-100"
                              } rounded justify-start items-center gap-2.5 inline-flex`}>
                      <span className={`${
                                  item.package_status === 1
                                    ? "text-amber-600"
                                    : item.package_status === 2
                                    ? "text-yellow-500"
                                    : item.package_status === 3
                                    ? "text-green-600"
                                    : item.package_status === 4
                                    ? "text-yellow-800"
                                    : item.package_status === 5
                                    ? "text-green-400"
                                    : item.package_status === 6
                                    ? "text-blue-500"
                                    : item.package_status === 7
                                    ? "text-red-500"
                                    : "text-red-500"
                                } text-xs font-normal font-rubik leading-none`}>{item.package_status_value}</span> 
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight">{item?.time_left?.time ? item?.time_left?.time : '-'}</div> 
                </td>
                <td class="px-6 py-4">
                  <img src={selected === idx ? ArrowSquare2 : ArrowSquare} className='w-5 h-5' />
                </td>
            </tr>
            {selected === idx && <tr className='w-full min-h-[239px] border-b border-gray-100'>
              <td colSpan={9} className='px-[0px]'>
                <div className='flex flex-col-reverse gap-4 w-full items-center'>
                  {/* <img className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]" src={Map1} /> */}
                  <div className="w-full h-[490px] rounded-md mt-[-12px]">
                      {loadError && <div>Error loading maps</div>}
                      {!isLoaded ? <div>Loading maps</div> :
                          // <GoogleMap
                          //     mapContainerStyle={mapContainerStyle}
                          //     zoom={10}
                          //     center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                          //     options={{
                          //         zoomControl: false,
                          //         mapTypeControl: false,
                          //         fullscreenControl: false,
                          //         streetViewControl: false,
                          //     }}
                          // >
                          //     <Marker position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}  />
                          // </GoogleMap>
                          <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                    options={{
                        zoomControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                    }}
                >
                    {selectedPackage && <InfoBox

                        position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                        options={{ closeBoxURL: "", enableEventPropagation: true, maxWidth: 100 }}
                    >
                        <div>
                            <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-4 border border-red-800 rounded-full flex items-center justify-center" >
                                    <div className="w-[9.60px] h-[9.60px] bg-red-800 rounded-full" />
                                </div>
                            </div>
                        </div>
                        </div>
                    </InfoBox>}
                    {selectedPackage && <InfoBox
                        position={new google.maps.LatLng(selectedPackage?.drop_latitude, selectedPackage?.drop_longitude)}
                        options={{ closeBoxURL: "",enableEventPropagation: true, maxWidth: 100,  }}
                    >
                        <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center" >
                                    <div className="w-[9.60px] h-[9.60px] bg-green-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </InfoBox>}
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} options={{
                            suppressMarkers: true,
                            polylineOptions: {
                                strokeColor: '#1EC10F',
                                strokeWeight: 10
                            }
                        }}  />
                    )}
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
                          <th class="px-2 py-2">
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
                          <td class="px-2 py-2 text-left">
                            <div className="min-w-[335px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex ml-3">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">(Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.payment_type_value}</div>
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
                                {selectedPackage?.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                              </button>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-2 py-2 text-left">
                            <div className="min-w-[335px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex ml-3">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">(Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.drop_open_address}</div>
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
                      <Link to={userInfo?.type?.id === 3 ? `/admin/dashboard/package/update/${item.id}` : `/support/dashboard/package/update/${item.id}`} className='w-40 h-[42px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex'>
                        <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">Edit Package</div> 
                        <img src={Edit} className='w-[17px] h-4' />
                      </Link>
                      <button onClick={() => {
                        setIsOpen(true)
                        setSelected(null)
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
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.created_at.toString().slice(0, 10)}</div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">{item.created_at.toString().slice(11, 16)}</div>
                  </div>
                </th>
                <td class="px-6 py-4 ">
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.sr_number}</div> 
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
                <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">{item.package_size_name}</div> 
                </td>
                <td class="px-2 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight">{item.total_prices.toFixed(2)} {item.currency_value}</div> 
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
              <div className='flex flex-col-reverse gap-4 w-full items-center'>
                  {/* <img className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]" src={Map1} /> */}
                  <div className="w-full h-[490px] rounded-md mt-[-12px]">
                      {loadError && <div>Error loading maps</div>}
                      {!isLoaded ? <div>Loading maps</div> :
                          <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          zoom={15}
                          center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                          options={{
                              zoomControl: false,
                              mapTypeControl: false,
                              fullscreenControl: false,
                              streetViewControl: false,
                          }}
                      >
                          {selectedPackage && <InfoBox
      
                              position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                              options={{ closeBoxURL: "", enableEventPropagation: false, maxWidth: 100 }}
                          >
                              <div>
                                  <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                                  <div className="w-4 h-4 relative">
                                      <div className="w-4 h-4 border border-red-800 rounded-full flex items-center justify-center" >
                                          <div className="w-[9.60px] h-[9.60px] bg-red-800 rounded-full" />
                                      </div>
                                  </div>
                              </div>
                              </div>
                          </InfoBox>}
                          {selectedPackage && <InfoBox
                              position={new google.maps.LatLng(selectedPackage?.drop_latitude, selectedPackage?.drop_longitude)}
                              options={{ closeBoxURL: "", maxWidth: 100,  }}
                          >
                              <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                                  <div className="w-4 h-4 relative">
                                      <div className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center" >
                                          <div className="w-[9.60px] h-[9.60px] bg-green-600 rounded-full" />
                                      </div>
                                  </div>
                              </div>
                          </InfoBox>}
                          {directionsResponse && (
                              <DirectionsRenderer directions={directionsResponse} options={{
                                  suppressMarkers: true,
                                  polylineOptions: {
                                      strokeColor: '#1EC10F',
                                      strokeWeight: 10
                                  }
                              }}  />
                          )}
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
                          <th class="px-2 py-2">
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
                          <td class="px-2 py-2 text-left">
                            <div className="min-w-[335px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex ml-3">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">(Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.payment_type_value}</div>
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
                                {selectedPackage?.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                              </button>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-2 py-2 text-left">
                            <div className="min-w-[335px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex ml-3">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">(Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.drop_open_address}</div>
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
        {canceled?.length > 0 && table === 'cancelled' && <div className='relative overflow-x-auto border border-gray-100 sm:rounded-lg mt-6'>
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
                    <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                      {item.created_at.toString().slice(0, 10)}
                    </div>
                    <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
                      {item.created_at.toString().slice(11, 16)}
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4 "> 
                  <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">{item.sr_number}</div> 
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
                <div className="text-zinc-800 text-sm font-normal font-rubic leading-tight text-left">{item.package_size_name}</div> 
                </td>
                <td class="px-2 py-4">
                  <div className="text-zinc-800 text-sm font-semibold font-rubic leading-tight">{item.total_prices} {item.currency_value}</div> 
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
              <div className='flex flex-col-reverse gap-4 w-full items-center'>
                  {/* <img className="xl:w-[16%] w-[10%] hidden xl:block h-[10%] xl:h-[190px] rounded-md mt-[-12px]" src={Map1} /> */}
                  <div className="w-full h-[490px] rounded-md mt-[-12px]">
                      {loadError && <div>Error loading maps</div>}
                      {!isLoaded ? <div>Loading maps</div> :
                          <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          zoom={15}
                          center={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                          options={{
                              zoomControl: false,
                              mapTypeControl: false,
                              fullscreenControl: false,
                              streetViewControl: false,
                          }}
                      >
                          {selectedPackage && <InfoBox
      
                              position={new google.maps.LatLng(selectedPackage?.pickup_latitude, selectedPackage?.pickup_longitude)}
                              options={{ closeBoxURL: "", enableEventPropagation: false, maxWidth: 100 }}
                          >
                              <div>
                                  <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                                  <div className="w-4 h-4 relative">
                                      <div className="w-4 h-4 border border-red-800 rounded-full flex items-center justify-center" >
                                          <div className="w-[9.60px] h-[9.60px] bg-red-800 rounded-full" />
                                      </div>
                                  </div>
                              </div>
                              </div>
                          </InfoBox>}
                          {selectedPackage && <InfoBox
                              position={new google.maps.LatLng(selectedPackage?.drop_latitude, selectedPackage?.drop_longitude)}
                              options={{ closeBoxURL: "", maxWidth: 100,  }}
                          >
                              <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                                  <div className="w-4 h-4 relative">
                                      <div className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center" >
                                          <div className="w-[9.60px] h-[9.60px] bg-green-600 rounded-full" />
                                      </div>
                                  </div>
                              </div>
                          </InfoBox>}
                          {directionsResponse && (
                              <DirectionsRenderer directions={directionsResponse} options={{
                                  suppressMarkers: true,
                                  polylineOptions: {
                                      strokeColor: '#1EC10F',
                                      strokeWeight: 10
                                  }
                              }}  />
                          )}
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
                          <th class="px-2 py-2">
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
                          <td class="px-2 py-2 text-left">
                            <div className="min-w-[335px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex ml-3">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">(Pickup point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.pickup_open_address}</div>
                            </div> 
                          </td>
                          <td class="px-4 py-2 text-left">
                            <div className="min-w-24 h-[37px] flex-col justify-start items-start gap-[5px] inline-flex">
                              <div className="text-gray-400 text-xs font-normal font-rubik leading-none">Payment Method</div>
                              <div className="text-zinc-800 text-xs font-semibold font-rubik leading-none">{selectedPackage?.payment_type_value}</div>
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
                                <span className={`${selectedPackage?.courier ? 'text-red-800 underline' : 'text-gray-400'} text-sm font-normal font-rubik leading-none`}>{selectedPackage?.courier ? selectedPackage?.courier?.full_name : 'Not mentioned'}</span> 
                                {selectedPackage?.courier ? <img src={Export} alt='SVGEXPORT' className='w-3 h-3' /> : null}
                              </button>
                            </div> 
                          </td>
                        </tr>
                        <tr className='mt-[24px]'>
                          <td class="px-2 py-2 text-left">
                            <div className="min-w-[335px] h-[37px] flex-col justify-start items-start gap-[5px] inline-flex ml-3">
                              <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">(Delivery point)</div>
                              <div className="text-zinc-800 text-xs font-semibold font-['Rubik'] leading-none">{selectedPackage?.drop_open_address}</div>
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
      <GenerateReportPackages isOpen={isOpen2} setIsOpen={setIsOpen2} page={currentPage} status={table} count={table === "completed" ? completedCounts : canceledCounts} />
    </div>
  )
}

export default Packages