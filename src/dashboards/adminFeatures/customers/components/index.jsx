import React, { useState, Fragment, useEffect } from 'react'
import Tabs from './Tabs'
import Search from '../../../../assets/images/dashboard/icon/search-normal2.svg';
// import Dropdown from './Dropdown';
import Export from '../../../../assets/images/dashboard/icon/export.svg';
import packageOngoing from "../../../../assets/images/dashboard/icon/user-search2.svg";
import ProfileP from "../../../../assets/images/dashboard/image/profilep.jpg";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react'
// import CancelModal from './CancelModal';
import AddCircle from '../../../../assets/images/dashboard/icon/add-circle.svg';
import SuccessToast from '../../../../components/ui/SuccessToast';
import Edit from "../../../../assets/images/dashboard/icon/edit-black.svg";
import Close from "../../../../assets/images/dashboard/icon/close-red.svg";
import Delete from "../../../../assets/images/dashboard/icon/trash.svg";
import DeleteInactive from "../../../../assets/images/dashboard/icon/trash-inactive.svg";
import MoreVertical from '../../../../assets/images/dashboard/icon/more_vertical.svg';
import ArrowDownSmall from '../../../../assets/images/dashboard/icon/arrow-down-small.svg';
import ArrowLeftSmall from '../../../../assets/images/dashboard/icon/arrow-left-small.svg';
import PlaceHolderImage from '../../../../assets/images/dashboard/image/image.png';
import { fetchAtWorkCouriers, fetchAvailableCouriers, fetchCouriersAction, fetchOfflineCouriers, fetchPausedCouriers } from '../../../../redux/actions/fetchCouriersAction';
import { fetchCustomersActiveAction, fetchCustomersSuspendedAction, searchCustomersActiveAction, searchCustomersSuspendedAction } from '../../../../redux/actions/fetchCustomersAction';
import SuspendCustomerModal from './SuspendCustomerModal';

function Customers() {
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(5);
  const [table, setTable] = useState('active');
  const [paginations, setPaginations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { customersActive, customersActiveCounts, customersSuspended, customersSuspendedCounts } = useSelector((state) => state.fetchCustomers);
  const [searchText, setSearchText] = useState('');
  const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [item, setItem] = useState({});

  useEffect(() => {
    dispatch(fetchCustomersActiveAction(currentPage, count));
    dispatch(fetchCustomersSuspendedAction(currentPage, count));
  }, []);

  useEffect(() => {
    setPaginations(generatePagination(table === 'active' ? customersActiveCounts : customersSuspendedCounts, currentPage, count));
  }, [table, currentPage, count])

  useEffect(() => {
    setPaginations(generatePagination(table === 'active' ? customersActiveCounts : customersSuspendedCounts, 1, count));
  }, [])

  const customersArray = table === 'active' ? customersActive : customersSuspended;

  const handleChangePage = (countNumber) => {
    setCount(countNumber);
    dispatch(fetchCustomersActiveAction(1, countNumber));
    dispatch(fetchCustomersSuspendedAction(1, countNumber));
  }

  const handleSearch = (text) => {  
    setSearchText(text);
    dispatch(table === 'active' ? searchCustomersActiveAction(1, 5, text) : searchCustomersSuspendedAction(1, 5, text) );
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
        <span className="text-zinc-800 text-2xl font-bold font-rubik">Customers</span>
      </div>
      <div className='mt-[24px] flex flex-row justify-between items-center'>
        <Tabs paginate={() => generatePagination(table === 'active' ? customersActiveCounts : customersSuspendedCounts, 1,count)} table={table} activeCounts={customersActiveCounts} suspendedCounts={customersSuspendedCounts} setTable={setTable} />
       <Link to={'/admin/dashboard/customers/new'} className='w-[183px] h-12 py-[15px] bg-red-800 flex flex-row rounded-[10px] justify-center items-center gap-2.5'>
          <div className="text-center text-white text-base font-normal font-rubik leading-tight">Add Customer</div> 
          <img src={AddCircle} className='w-5 h-5' />
        </Link>
      </div>
      <div className='w-[100%] min-h-[400px] mt-6 relative bg-white rounded-[10px] pb-20 py-[22px] px-[16px]'>
        <div className='flex flex-row justify-between items-center'>
          <div className="text-zinc-800 text-lg font-semibold font-rubik">{table === 'active' ? 'Active' : 'Suspended'} Customers</div> 
          <div className='flex flex-row gap-[10px] items-center'>
            {/* <Dropdown /> */}
            <div className='relative'>
              <input type='text' value={searchText} onChange={(e) => handleSearch(e.target.value)} placeholder='Search courier ...' className='placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight w-[328px] h-10 pr-4 pl-10 py-[13px] rounded-xl border border-gray-100 justify-start items-center inline-flex' />
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
                  <span className='text-slate-500 text-xs font-normal font-rubik'>Total spent</span>
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
            {customersArray?.map((item, idx) => <tr key={idx} onClick={() => {
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
                  <div className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">{item.total_spent?.toFixed(2)}</div>
                </td>
                <td className='px-6 py-3 text-left z-0'>
                  <div className={`min-w-[66px] h-[19px] px-3 py-1.5 ${item.is_active ? 'bg-green-100' : 'bg-rose-100'} rounded justify-start items-center gap-2.5 inline-flex`}>
                      <div className={`${item.is_active ? 'text-green-700' :  'text-red-700'} text-xs font-normal font-['Rubik'] leading-none`}>{item.is_active ? 'Online' : 'Suspended'}</div>
                  </div>
                </td>
                <td className='px-6 py-3 text-left'>
                <Menu>
                  <div className=''>
                    <Menu.Button>
                      <img src={MoreVertical} className='w-4 h-4 rotate-90 z-0' />
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
                      <Menu.Items className="absolute z-50 right-[37px] top-[15px] w-[158px] h-30 p-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-2 inline-flex">
                          <Menu.Item>
                          <Link to={`/admin/dashboard/customers/update/${item.id}`} className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
                            <div className="w-6 h-6 bg-gray-100 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex">
                              <img src={Edit} className='w-4 h-4' />
                            </div>
                            <div className="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">Edit</div>
                          </Link>
                          </Menu.Item>
                          <div className='w-full h-[1px] bg-[#D0D4D9]' />
                          <Menu.Item>
                          {table === 'active' ? <button onClick={() => {
                            setIsOpen(true);
                            setItem(item);
                            setText(`After confirmation, ${item.full_name} will be automatically suspended and they won’t be able to log in their account`)
                          }} className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
                            <div className="w-6 h-6 bg-rose-100 rounded-[52.96px] flex-col justify-center items-center gap-[5.30px] inline-flex">
                              <img src={Close} className='w-10 h-10' />
                            </div>
                            <div className="text-red-700 text-xs font-normal font-['Rubik'] leading-none">Suspend</div>
                          </button> :
                           <button className="w-[132px] h-[42px] px-[60px] py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Reactivate</div>
                           </button>
                          }
                          </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </div>
                </Menu>
                </td>
            </tr>)}
        </tbody>
    </table>
        </div>
        {
          customersArray?.length === 0 &&
          <div>
            <img src={packageOngoing} className='w-[152px] h-[152px] mx-auto mt-10 mb-3' />
            <div className="text-center text-gray-300 text-base font-normal font-['Rubik'] leading-tight">{table === 'available' ? 'Currently, there are no couriers available.' : table === 'at-work' ? 'Currently, there are no couriers at work.' : table === 'paused' ? 'Currently, there are no paused couriers.' : 'Currently, there are no offline couriers.'}</div>           
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
                if (table === 'active') {
                  dispatch(fetchCustomersActiveAction(currentPage - 1, count));
                } else {
                  dispatch(fetchCustomersSuspendedAction(currentPage - 1, count));
                } 
              }} className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex">
                <img src={ArrowLeftSmall} className='w-3 h-3' />
              </button> 
              <div className='flex flex-row gap-2.5'>
                {paginations.map((item, idx) => 
                <div key={idx} onClick={() => {
                  setCurrentPage(item);
                  if (table === 'active') {
                    dispatch(fetchCustomersActiveAction(item, count));
                  } else {
                    dispatch(fetchCustomersSuspendedAction(item, count));
                  } 

                }} className={`w-6 h-6 px-[9px] ${ item === currentPage ? "bg-red-800" : "bg-white" } rounded-[100px] cursor-pointer justify-center items-center gap-1 inline-flex`}>
                  <div className={`${ item === currentPage ? "text-white" : "text-zinc-800" } text-xs font-normal font-['Rubik'] leading-none`}>{item}</div>
                </div> )}
              </div>
              <button disabled={currentPage === paginations[paginations.length - 1] ? true : false} onClick={() => {
                setCurrentPage(currentPage + 1)
                if (table === 'active') {
                  dispatch(fetchCustomersActiveAction(currentPage + 1, count));
                } else {
                  dispatch(fetchCustomersSuspendedAction(currentPage + 1, count));
                } 
              }} className="w-6 h-6 cursor-pointer bg-white rounded-[100px] border border-gray-100 justify-center items-center gap-1 inline-flex">
                <img src={ArrowLeftSmall} className='w-3 h-3 rotate-180' />
              </button> 
            </div>      
          </div> 
        </div>
      </div>
      {/* <CancelModal isOpen={isOpen} setIsOpen={setIsOpen} id={selectedPackage?.id} /> */}
      <SuspendCustomerModal id={id} isOpen={isOpen} setIsOpen={setIsOpen} text={text} item={item} />

    </div>
  )
}

export default Customers