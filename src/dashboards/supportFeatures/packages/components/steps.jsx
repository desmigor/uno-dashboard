import ArrowLeft2 from '../../../../assets/images/dashboard/icon/arrow-left-thin-red.svg'
import ArrowLeft4 from '../../../../assets/images/dashboard/icon/arrow-left-white.svg'
import ArrowLeft3 from '../../../../assets/images/dashboard/icon/arrow-left.grayish.svg'
import AddCircle from '../../../../assets/images/dashboard/icon/add-circle2.svg'
import CloseCircle from '../../../../assets/images/dashboard/icon/close-circle-red.svg'
import Mtn from '../../../../assets/images/dashboard/icon/mtn.png'
import Voda from '../../../../assets/images/dashboard/icon/logoVoda.png'
import Money from '../../../../assets/images/dashboard/icon/Money.svg'
import TickOutile from '../../../../assets/images/dashboard/icon/tick-square-o.svg'
import TickChecked from '../../../../assets/images/dashboard/icon/tick-square.svg'
import ArrowDown from '../../../../assets/images/dashboard/icon/arrow-down-bold.svg'
import CheckDiscount from '../../../../assets/images/dashboard/icon/discount-shape.svg'
import LocationIcon from '../../../../assets/images/dashboard/icon/location.svg';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addPackagesPickupAddressAction } from '../../../../redux/actions/fetchPackagesAction'
import { fetchPackageAddOnsAction, fetchPackageSizesAction } from '../../../../redux/actions/fetchPackageSizesAction'
import callAPI from '../../../../utils/api'
import SuccessToast from '../../../../components/ui/SuccessToast'
import {clearPackagesStore} from '../../../../redux/actions/fetchPackagesAction'
import Spinner from '../../../../components/ui/spinner'

export const Step1 = ({ next, inputs, setInputs, handleInputChange, id }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const { addressDetails, packageDetailsPayment } = useSelector(state => state.packages);
    const [data, setData] = useState({
        pickup: {},
        delivery: {},
        fullNamePickup: '',
        phonePickup: '',
        commentPickup: '',
        fullNameDelivery: '',
        phoneDelivery: '',
        commentDelivery: '',
    });
    const [searchTextPickup, setSearchTextPickup] = useState(
        addressDetails? addressDetails?.pickup?.formatted_address : ''
    );
    const [searchTextDelivery, setSearchTextDelivery] = useState(
        addressDetails? addressDetails?.delivery?.formatted_address : ''
    );
    const [pickupSearch, setPickupSearch] = useState([]);
    const [deliverySearch, setDeliverySearch] = useState([]);
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        checkValidations(inputs).then((isValid) => {
            if (isValid) {
              // All data is valid
              setValidated(true);
              // Perform actions when data is valid
            } else {
              console.log('Data is invalid');
            }
          });
    }, [inputs])

    useEffect(() => {
      
    }, [addressDetails])

    const checkValidations = async (dataArray) => {
        const validations = dataArray.map(data => createValidationSchema().validate(data, { abortEarly: false }));
      
        try {
          await Promise.all(validations);
          // All data is valid
          return true;
        } catch (errors) {
          // Validation failed, errors contains validation error messages
          console.error(errors);
          return false;
        }
    };

    const createValidationSchema = () => {
        return Yup.object().shape({
          pickupAddress: Yup.string().required('Pickup address is required'),
          dropAddress: Yup.string().required('Delivery address is required'),
          pickup: Yup.object().shape({}).required('Pickup object is required'),
          drop: Yup.object().shape({}).required('Delivery object is required'),
          full_name_pickup: Yup.string().required('Full name for pickup is required'),
          full_name_drop: Yup.string().required('Full name for delivery is required'),
          phone_number_pickup: Yup.string().required('Phone number for pickup is required'),
          phone_number_drop: Yup.string().required('Phone number for delivery is required'),
          comment_pickup: Yup.string().required('Comment for pickup is required'),
          comment_drop: Yup.string().required('Comment for delivery is required'),
        });
      };
      

    const getPlaces = (addressToSearch, index, input) => {
        handleInputChange(index, 'pickupAddress', addressToSearch);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: addressToSearch,
                key: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
            },
        })
        .then(response => {
            handleInputChange(index, input, response.data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const getPlacesDelivery = (addressToSearch, index, input) => {
        handleInputChange(index, 'dropAddress', addressToSearch);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: addressToSearch,
                key: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
            },
        })
        .then(response => {
            handleInputChange(index, input, response.data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // const checkValidations = async () => {
    //     try {
    //         await validationSchema.validate(data, { abortEarly: false });
    //         // Validation passed, all data is valid
    //         setValidated(true);
    //       } catch (errors) {
    //         // Validation failed, errors contains validation error messages
    //         console.error(errors);
    //         return setValidated(false);
    //       }
    // }

    const handleSaveAddress = async () => {
            next(1, inputs);
    }
    
    const addInput = () => {
        if(inputs.length < 10){
            const newInput = [
                ...inputs,
                { pickupAddress: '', dropAddress: '', pickup: {}, drop: {}, pickupSearch: [], deliverySearch: [], full_name_pickup: '', full_name_drop: '', phone_number_pickup: '', phone_number_drop: '', comment_pickup: '', comment_drop: '', choosenMethod: 1, size: 0, chosenAddons: [], distance: 0, price: 0, discount: 0, total: 0 },
            ]
            setInputs(newInput);
        }else{
            toast.info("You've reached the maximum limit of address (10).", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    const removeInput = (index) => {
        const newInput = [...inputs];
        newInput.splice(index, 1);
        setInputs(newInput);
    }

    return (
<div className="w-full min-h-[891px] p-6 bg-white rounded-[10px] mt-6 flex-col justify-start items-start gap-8 inline-flex mb-24"> 
{    
    inputs.map((item, index) => <div key={index} className='w-[80%] mx-auto'>   
    <div className={`w-[295px] ${ index === 0 ? 'h-[45px]' : 'h-[10px]'} flex-col justify-start items-start gap-2 inline-flex`}>
       { index === 0 && <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Addresses</div>}
        {index === 0 && <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">You can add up to 10 delivery addresses in one order.</div>}
    </div>
       <div className='flex flex-row justify-between flex-wrap mt-[16px] w-full'>
        <div className="w-[48%] h-[74px] flex-col justify-start relative items-start gap-1.5 inline-flex ">
            <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Pickup Address</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
            <input value={item.pickupAddress} type='text' onChange={(e) => {
                handleInputChange(index, 'pickupAddress', e.target.value);
                getPlaces(e.target.value, index, 'pickupSearch')
            }} placeholder='Amasaman KG124'  className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
            <Link to={userInfo?.type?.id === 3 ? `/admin/dashboard/package/choose-address/${index}` : `/support/dashboard/package/choose-address/${index}` } className='flex flex-row items-center gap-[6px] mt-3 cursor-pointer'>
                <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight ">Choose address on map</div> 
                <img src={ArrowLeft2} className='w-4 h-4' />
            </Link>
            {item.pickupSearch.length > 0 && <div className={`w-full min-h-[52px] p-4 bg-white rounded-xl shadow border border-zinc-200 flex-col justify-start items-end gap-4 inline-flex absolute top-[89px] z-[99]`}> 
                   {item.pickupSearch.map((itm, idx) => <div key={idx} onClick={() => {
                    //    setData({ ...data, pickup: item });
                        handleInputChange(index, 'pickup', typeof id === 'undefined' ? itm : { lat: itm?.geometry?.location?.lat, lng: itm?.geometry?.location?.lng, formatted_address: itm?.formatted_address });
                        handleInputChange(index, 'pickupSearch', []);
                       handleInputChange(index, 'pickupAddress', itm?.formatted_address);
                   }} className={`h-[52px] w-full flex flex-row gap-[10px] items-center ${item.pickupSearch.length - 1 === idx ? '' : 'border-b'} pb-[17px] border-b-[#D0D4D9] cursor-pointer`}>
                       <img src={LocationIcon} className='w-[22px] h-[22px]' />
                       <div className="w-[296px] text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{itm?.formatted_address}</div>
                   </div>)}
               </div>}                        
        </div>
        <div className="w-[48%] h-[74px] flex-col justify-start items-start relative gap-1.5 inline-flex">
            <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Delivery Address</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
            <div className='flex flex-row items-center gap-3 w-full'>
                <input value={item.dropAddress} type='text' placeholder='Amasaman KG124' onChange={(e) => { 
                    handleInputChange(index, 'dropAddress', e.target.value);
                    getPlacesDelivery(e.target.value, index, 'deliverySearch');
                    }} className={`self-stretch ${ typeof id !== 'undefined' ? 'w-full' : 'w-[90%]'} h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex`} /> 
                { typeof id === 'undefined' && <img onClick={() => index === 0 ? addInput() : removeInput(index)} src={index === 0 ? AddCircle : CloseCircle} className='w-8 h-8 cursor-pointer' />}
            </div>
            <Link to={userInfo?.type?.id === 3 ? `/admin/dashboard/package/choose-address/${index}` : `/support/dashboard/package/choose-address/${index}` }  className='flex flex-row items-center gap-[6px] mt-3 cursor-pointer'>
                <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Choose address on map</div> 
                <img src={ArrowLeft2} className='w-4 h-4' />
            </Link>
            {item.deliverySearch.length > 0 && <div className={`w-full min-h-[52px] p-4 bg-white rounded-xl shadow border border-zinc-200 flex-col justify-start items-end gap-4 inline-flex absolute top-[89px] z-[99]`}> 
                   {item.deliverySearch.map((itm, idx) => <div key={idx} onClick={() => {
                    //    setData({ ...data, delivery: item });
                        handleInputChange(index, 'drop', typeof id === 'undefined' ? itm : {lat: itm?.geometry?.location?.lat, lng: itm?.geometry?.location?.lng, formatted_address: itm?.formatted_address});
                        handleInputChange(index, 'deliverySearch', []);
                        handleInputChange(index, 'dropAddress', itm?.formatted_address);
                   }} className={`h-[52px] w-full flex flex-row gap-[10px] items-center ${item.pickupSearch.length - 1 === idx ? '' : 'border-b'} pb-[17px] border-b-[#D0D4D9] cursor-pointer`}>
                       <img src={LocationIcon} className='w-[22px] h-[22px]' />
                       <div className="w-[296px] text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{itm?.formatted_address}</div>
                   </div>)}
               </div>}
        </div>
    </div>
</div>)
}
{inputs.map((item, index) => <div className='w-[80%] mx-auto mt-8'>
     <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Pickup Details{inputs.length === 1 ? '' : `: Package ${index + 1}`}</div>
     <div className='flex flex-row justify-between mt-[16px] w-full'>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input  value={item.full_name_pickup} onChange={(e) => handleInputChange(index, 'full_name_pickup', e.target.value)} type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={item.phone_number_pickup} onChange={(e) => handleInputChange(index, 'phone_number_pickup', e.target.value)} type='text' placeholder='+233-4823-321-312' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
     </div> 
     <div className="xl:w-[460px] w-[48%] h-[113px] mt-4 flex-col justify-start items-start gap-1.5 inline-flex">
         <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Comment</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
         <textarea value={item.comment_pickup} onChange={(e) => handleInputChange(index, 'comment_pickup', e.target.value)} placeholder='Leave a comment' className="self-stretch h-[87px] px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" ></textarea> 
     </div>
</div>)}
{inputs.map((item, index) => <div key={index} className='w-[80%] mx-auto mt-8'>
     <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery Details{inputs.length === 1 ? '' : `: Package ${index + 1}`}</div>
     <div className='flex flex-row justify-between mt-[16px] w-full'>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={item.full_name_drop} onChange={(e) => handleInputChange(index, 'full_name_drop', e.target.value)} type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={item.phone_number_drop} onChange={(e) => handleInputChange(index, 'phone_number_drop', e.target.value)} type='text' placeholder='+233-4823-321-312' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
     </div> 
     <div className="xl:w-[460px] w-[48%] h-[113px] mt-4 flex-col justify-start items-start gap-1.5 inline-flex">
         <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Comment</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
         <textarea value={item.comment_drop} onChange={(e) => handleInputChange(index, 'comment_drop', e.target.value)} placeholder='Leave a comment' className="self-stretch h-[87px] px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" ></textarea> 
     </div>
</div>)}
<div className='w-[80%] mx-auto'>
    <button disabled={!validated} onClick={handleSaveAddress} className={`w-[312px] h-[50px] ${validated ? 'bg-red-800' : 'bg-gray-100'} rounded-xl justify-center items-center gap-2.5 flex flex-row`}>
        <div className={`text-center ${validated ? 'text-white' : 'text-gray-400'} text-base font-normal font-['Rubik'] leading-tight"`}>Continue</div> 
        <img src={validated ? ArrowLeft4 : ArrowLeft3} className='w-4 h-4' />
    </button>
</div>
</div>
    )
}


export const Step2 = ({ next, inputs, setInputs }) => {
    const [choosenMethod, setChoosenMethod] = useState(1);
    const [size, setSize] = useState(0);
    const [chosenAddons, setChosenAddons] = useState([]);
    const [insulated, setInsulated] = useState(false);
    const { packageSizes, packageAddOns } = useSelector(state => state.fetchPackageSizes);
    const { addressDetails } = useSelector(state => state.packages);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPackageSizesAction());
        dispatch(fetchPackageAddOnsAction());
    }, [])

    useEffect(() => {
        if(packageSizes) {
            setSize(packageSizes[0]);
        }
        if (packageAddOns) {
            setChosenAddons(packageAddOns);
        }
    }, [packageSizes])



    const data = {
        insulated,
        size,
        choosenMethod,
        chosenAddons
    }

    const updateMethodForAll = (method) => {
        setInputs(prevInputs => (
            prevInputs.map(input => ({
              ...input,
              choosenMethod: method, // Update the 'size' field for each input object
            }))
        ));
    }

    const handleInputChange = (index, field, value) => {
        setInputs(prevInputs => {
          const updatedInputs = [...prevInputs];
          const updatedInput = { ...updatedInputs[index] };
      
          // Update the specific field for the input at the given index
          updatedInput[field] = value;
      
          // Update the inputs array with the modified input
          updatedInputs[index] = updatedInput;
          return updatedInputs;
        });
      };

      const handleSizeChange = (index, newSize) => {
        handleInputChange(index, 'size', newSize);
      };
      
      // Function to handle chosen addons selection
      const handleChosenAddonsChange = (index, newAddons) => {
        handleInputChange(index, 'chosenAddons', newAddons);  
      };

      console.log(inputs);

    return (
        <div className="w-full min-h-[884px] p-6 bg-white rounded-[10px] mt-6 flex-col justify-start overflow-y-auto items-start gap-8 inline-flex mb-24"> 
            <div className="w-full h-[91px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Payment Method</div> 
                <div className='w-full mt-4 flex flex-row gap-3.5'>
                    <button disabled={true} onClick={() => updateMethodForAll(3)} className={`w-[198px] h-[54px] rounded-[10px] border ${inputs[0].choosenMethod === 3 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <div className="w-[44px] h-[26px] relative rounded-[3px] bg-[#FFCB05] flex items-center justify-center">
                            <img className="w-8 h-[26px]" src={Mtn} />
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">MTN Mobile Money</div>
                    </button> 
                    {/* <div onClick={() => updateMethodForAll(2)} className={`w-[231px] h-[54px] bg-white rounded-[10px] border ${inputs[0].choosenMethod === 2 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <div className="w-[39px] h-[26px] pl-2.5 pr-[9px] py-[3px] bg-neutral-100 rounded-[3px] justify-center items-center inline-flex">
                            <img className="w-5 h-5" src={Voda} />
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Vodafone Mobile Money</div>
                    </div> */}
                    <div onClick={() => updateMethodForAll(1)} className={`w-[177px] h-[54px] bg-white rounded-[10px] border ${inputs[0].choosenMethod === 1 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <img className="w-[34px] h-[17px]" src={Money} />
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Pickup</div>
                    </div> 
                    <div onClick={() => updateMethodForAll(2)} className={`w-[186px] h-[54px] bg-white rounded-[10px] border ${inputs[0].choosenMethod === 2 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <img className="w-[34px] h-[17px]" src={Money} />
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Delivery</div>
                    </div> 
                </div>
            </div>
            {inputs?.map((item, index) => <div key={index} className="w-full flex-col justify-start items-start gap-4 inline-flex mt-8">
                <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery: Package {index + 1}</div> 
                <div className="text-slate-500 text-base font-semibold font-['Rubik'] leading-tight">Package Size</div> 
                <div className='flex flex-row flex-wrap gap-6 w-full'>
                    {packageSizes?.map((itm, idx) => <div key={idx} onClick={() => handleSizeChange(index, itm)} className={`xl:w-[345px] w-[35%] min-h-[106px] p-5 ${item?.size?.id === itm?.id ? 'border-red-800 bg-[#f9f3f3]' : 'border-zinc-200 bg-white'} rounded-2xl border flex-col cursor-pointer justify-start items-start gap-2.5 inline-flex`}>
                        <div className="self-stretch min-h-[66px]">
                            <div className='flex flex-row justify-between items-center'>
                                <div className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">{itm.name}</div>
                                <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">{itm.currency_display} {itm.price}</div>
                            </div>
                            <div className="mt-[9px] text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">{itm.description}</div>
                        </div>
                    </div>)}
                </div>
                <div className="w-full h-[88px] flex-col justify-start items-start gap-4 inline-flex">
                    <div className="text-slate-500 text-base font-semibold font-['Rubik'] leading-tight">Package Addons</div> 
                    <div className='flex flex-row flex-wrap gap-6'>
                        {packageAddOns?.map((itemz, idx) => <div onClick={() => {
                            const updatedAddons = [...item.chosenAddons]; // Create a copy

                            // Check if the clicked addon ID exists in the array
                            const addonIndex = updatedAddons.findIndex((i) => i?.id === itemz?.id);

                            if (addonIndex !== -1) {
                              updatedAddons.splice(addonIndex, 1);
                            } else {
                              updatedAddons.push(itemz);
                            }
                    
                            // // Update the state with the modified array
                            handleChosenAddonsChange(index, updatedAddons);
                        }} className={`min-w-[165px] px-5 cursor-pointer h-[52px] rounded-[10px] border ${item?.chosenAddons?.some(addon => addon['id'] === itemz.id) ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center items-center gap-1.5 inline-flex`}>
                            <img src={item?.chosenAddons?.some(addon => addon['id'] === itemz.id) ? TickChecked : TickOutile} />
                            <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{itemz.description}</div>
                        </div>)}
                    </div> 
                </div>
            </div>)}
            <button onClick={() => next(2, inputs)}  className="w-[312px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex mt-4">
                <div className="text-center text-white text-base font-normal font-['Rubik'] leading-tight">Proceed to Summary</div>
                <img src={ArrowLeft4} className='w-5 h-5' />
            </button>
        </div>
    )
}

export const Step3 = ({setStep, inputs, setInputs, id}) => {
    const [discountExpanded, setDiscountExpanded] = useState(false);
    const { addressDetails, packageDetailsPayment } = useSelector(state => state.packages);
    const [calculations, setCalculations] = useState({});
    const [discountCode, setDiscountCode] = useState(null);
    const [data, setData] = useState();
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth);
    const [toastText, setToastText] = useState("");
    const [toastSuccess, setToastSuccess] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [taxRate, setTaxRate] = useState(0);
    const [discountRatio , setDiscountRatio] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        if(typeof id === 'undefined') {
            addressDetails.map((item, idx) => handleCalculations(item?.pickup?.geometry?.location?.lat, item?.pickup?.geometry?.location?.lng, item?.drop?.geometry?.location?.lat, item?.drop?.geometry?.location?.lng, idx));
        }else{
            addressDetails.map((item, idx) => handleCalculations(item?.pickup?.lat, item?.pickup?.lng, item?.drop?.lat, item?.drop?.lng, idx));
        }
    }, []);

    useEffect(() => {
      const DistanceCalculationsDone = inputs.every(item => typeof item.distance !== 'undefined' && item.distance !== 0);
      const totalCostCalculationsDone = inputs.every(item => typeof item.total !== 'undefined' && item.total !== 0);

      if (DistanceCalculationsDone && totalCostCalculationsDone) {

        if(typeof id === 'undefined'){
            handleSendRequest();
        }else{
            handleSendRequestEdit();
        }
      }
    }, [inputs, taxRate, discountRatio], id, addressDetails);

    const subTotal = inputs.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);

    const getTaxes = async () => {
        try{
            const response = await callAPI(
                "/api/app-settings/",
                "GET",
                true,
            );
            setTaxRate(response.data.tax_rate);
            return response.data.tax_rate;
        }catch(error){
            console.log(error);
        }
    }


    function calculateTotalCost(distance, base_price, price_per_km) {
        const pricingStructure = price_per_km;
        let totalCost = 0;
        let remainingDistance = distance;
      

        pricingStructure?.forEach((segment, index) => {
          const segmentDistance = segment.km === "n" ? remainingDistance : Math.min(segment.km, remainingDistance);
          totalCost += segmentDistance * segment.price_control  * base_price;
          remainingDistance -= segmentDistance;
      
          if (remainingDistance <= 0) {
            return;
          }
        });
      
        return totalCost;
      }

      const handleInputChange = (index, field, value) => {
        setInputs(prevInputs => {
          const updatedInputs = [...prevInputs];
          const updatedInput = { ...updatedInputs[index] };
      
          updatedInput[field] = value;
      
          // Update the inputs array with the modified input
          updatedInputs[index] = updatedInput;
          return updatedInputs;
        });
      };

    const handleCalculations = (lat1, lon1, lat2, lon2, index) => {
        const R = 6371; // Radius of the earth in km
        const deg2rad = (deg) => {
            return deg * (Math.PI/180)
        }
        const dLat = deg2rad(lat2-lat1);  // deg2rad below
        const dLon = deg2rad(lon2-lon1); 
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c; // Distance in km
        const totalAddonsCost = addressDetails[index]?.chosenAddons?.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
        var totalCost = calculateTotalCost(d, addressDetails[index]?.size?.price, addressDetails[index]?.size?.price_per_km);

        handleInputChange(index, 'distance', d);
        handleInputChange(index, 'price', d * addressDetails[index]?.size?.price);
        handleInputChange(index, 'discount', 0);
        handleInputChange(index, 'total', totalCost + totalAddonsCost);
        // setCalculations(
        //     {
        //         distance: d,
        //         price: d * packageDetailsPayment?.size?.price,
        //         discount: 0,
        //         total: totalCost,

        //     }
        // )
    }
    const handleSendRequest = async () => {
        setLoading(true);
        const taxesPromise = getTaxes();
        const taxRate = await taxesPromise;

        const payload = [];
        inputs.map(async (item, idx) => {
            const saveAddress = async (
                pickup_address = true,
            ) => {
                const pick_up_data = {
                    title: "Address",
                    open_address: item?.pickup?.formatted_address,
                    landmark : "",
                    location : item?.pickup?.formatted_address,
                    latitude : item?.pickup?.geometry?.location?.lat,
                    longitude : item?.pickup?.geometry?.location?.lng,
                    contact_person : item?.full_name_pickup,
                    contact_phone : item?.phone_number_pickup,
                    contact_country : 1,
                    address_type : 1,
                    temporary : true
                }
                const delivery_data = {
                    title: "Address",
                    open_address: item?.drop?.formatted_address,
                    landmark : "",
                    location : item?.drop?.formatted_address,
                    latitude : item?.drop?.geometry?.location?.lat,
                    longitude : item?.drop?.geometry?.location?.lng,
                    contact_person : item?.full_name_drop,
                    contact_phone : item?.phone_number_drop,
                    contact_country : 1,
                    address_type : 1,
                    temporary : true
                }
                const response = await callAPI(
                    "/api/address/user-address/",
                    "POST",
                    true,
                    pickup_address ? pick_up_data : delivery_data
                );
                return response.data.id;
            }

            const calculatedCost = item.total - (item.total * (parseFloat(discountRatio)/ 100))
            const calculatedTaxes = calculatedCost * taxRate;
            const calculatedTotalCost = calculatedCost + calculatedTaxes;

            const input = {
                delivery_mode: null,
                relative_size: null,
                relative_weight: null,
                payment_type: item.choosenMethod,
                height: 10,
                length: 10,
                width: 10,
                weight: 10,
                distance_as_km: item?.distance,
                total_cost:  calculatedCost,
                frangible: true,
                package_details: "",
                pickup_contact_person: item?.full_name_pickup,
                pickup_contact_phone: item?.phone_number_pickup,
                pickup_contact_country: 1,
                pickup_latitude: item?.pickup?.geometry?.location?.lat,
                pickup_longitude: item?.pickup?.geometry?.location?.lng,
                pickup_open_address: item?.pickup?.formatted_address,
                drop_contact_person: item?.full_name_drop,
                drop_contact_phone: item?.phone_number_drop,
                drop_contact_country: 1,
                drop_latitude: item?.drop?.geometry?.location?.lat,
                drop_longitude: item?.drop?.geometry?.location?.lng,
                drop_open_address: item?.drop?.formatted_address,
                pickup_location_id: await saveAddress(true),
                drop_location_id: await saveAddress(false),
                insulated_food_container: false,
                payer_phone_no: null, //Payer phone number required for MTN MoMo payment
                payer_phone_country: null, //Payer phone number required for MTN MoMo payment
                price_per_km: item?.total / item?.distance,
                currency: 1,
                discount_code: discountCode,
                created_by_employee: true,
                package_size: item?.size?.id,
                package_addons: item?.chosenAddons?.map(itm => itm.id),
            }
            payload.push(input);
        });

        setData(payload);
        // setLoading(false); after three seconds
        setInterval(() => {
            setLoading(false);
        }
        , 3000);
    }    


    const handleSendRequestEdit = async () => {
        setLoading(true);
        const taxesPromise = getTaxes();
        const taxRate = await taxesPromise;

        const payload = [];
        inputs.map(async (item, idx) => {
            const saveAddress = async (
                pickup_address = true,
            ) => {
                const pick_up_data = {
                    title: "Address",
                    open_address: item?.pickup?.formatted_address,
                    landmark : "",
                    location : item?.pickup?.formatted_address,
                    latitude : item?.pickup?.lat,
                    longitude : item?.pickup?.lng,
                    contact_person : item?.full_name_pickup,
                    contact_phone : item?.phone_number_pickup,
                    contact_country : 1,
                    address_type : 1,
                    temporary : true
                }
                const delivery_data = {
                    title: "Address",
                    open_address: item?.drop?.formatted_address,
                    landmark : "",
                    location : item?.drop?.formatted_address,
                    latitude : item?.drop?.lat,
                    longitude : item?.drop?.lng,
                    contact_person : item?.full_name_drop,
                    contact_phone : item?.phone_number_drop,
                    contact_country : 1,
                    address_type : 1,
                    temporary : true
                }
                const response = await callAPI(
                    "/api/address/user-address/",
                    "POST",
                    true,
                    pickup_address ? pick_up_data : delivery_data
                );
                return response.data.id;
            }
            const calculatedCost = item.total - (item.total * (parseFloat(discountRatio)/ 100))
            const calculatedTaxes = calculatedCost * taxRate;
            const calculatedTotalCost = calculatedCost + calculatedTaxes;

            const input = {
                package_id: id,
                delivery_mode: null,
                relative_size: null,
                relative_weight: null,
                payment_type: item.choosenMethod,
                height: 10,
                length: 10,
                width: 10,
                weight: 10,
                distance_as_km: item?.distance,
                total_cost: calculatedTotalCost,
                frangible: true,
                package_details: "",
                pickup_contact_person: item?.full_name_pickup,
                pickup_contact_phone: item?.phone_number_pickup,
                pickup_contact_country: 1,
                pickup_latitude: typeof id === 'undefined' ? item?.pickup?.geometry?.location?.lat : item?.pickup?.lat,
                pickup_longitude: typeof id === 'undefined' ? item?.pickup?.geometry?.location?.lng : item?.pickup?.lng,
                pickup_open_address: item?.pickup?.formatted_address,
                drop_contact_person: item?.full_name_drop,
                drop_contact_phone: item?.phone_number_drop,
                drop_contact_country: 1,
                drop_latitude: typeof id === 'undefined' ? item?.drop?.geometry?.location?.lat : item?.drop?.lat,
                drop_longitude: typeof id === 'undefined' ? item?.drop?.geometry?.location?.lng : item?.drop?.lng,
                drop_open_address: item?.drop?.formatted_address,
                pickup_location_id: await saveAddress(true),
                drop_location_id: await saveAddress(false),
                insulated_food_container: false,
                payer_phone_no: null, //Payer phone number required for MTN MoMo payment
                payer_phone_country: null, //Payer phone number required for MTN MoMo payment
                price_per_km: item?.total / item?.distance,
                currency: 1,
                discount_code: discountCode,
                created_by_employee: true,
                package_size: item?.size?.id,
                package_addons: item?.chosenAddons?.map(itm => itm.id),
            }
            payload.push(input);
        });

        setData(payload);
        
        setInterval(() => {
          setLoading(false);
      }
      , 3000);
    }    
    
    const handleSave = async () => {
        try {
          setLoading(true);
        const result = await callAPI(
            "/api/delivery/package-delivery/",
            "POST",
            true,
            data
        );
        // add package to queue
        const queueResult = await callAPI(
            "/api/delivery/package-add-queue/",
            "POST",
            true,
              // package id for every created package result passing it as {package_id: 1}
              result.data.map((item) => ({ package_id: item.id })),
            
        );

        // clear redux store for packages
        dispatch(clearPackagesStore());
        setInputs([]);
        setLoading(false);

        navigate(userInfo?.type?.id === 3 ? '/admin/dashboard/package/' : '/support/dashboard/package/')
        setStep(0);
       } catch (error) {
        setLoading(false);
          setToastText(Array.isArray(error?.response?.data?.message) ? "You have an issue in your request check all inputs" : error?.response?.data?.message );
          setToastSuccess(false);
          setShowToast(true);
       }
    }

    const handleSaveEdit = async () => {
        try {
          setLoading(true);
            const result = await callAPI(
                `/api/packages/${id}/`,
                "PUT",
                true,
                data[0]
            );
            // clear redux store
            dispatch(clearPackagesStore());
            setInputs([]);
            setLoading(false);
            navigate(userInfo?.type?.id === 3 ? '/admin/dashboard/package/' : '/support/dashboard/package/')
            setStep(0);
       } catch (error) {
        setLoading(false);
        console.log(error)   
            setToastText(typeof(error?.response?.data?.message) == Array ? error?.response?.data?.message[0] : error?.response?.data?.message+ " Please try again");
            setToastSuccess(false);
            setShowToast(true);
       }
    }

    useEffect(() => {
        // This code will run every time discountRatio is updated
        if (discountRatio !== 0) {
            // Call the function that depends on the updated state
            if (typeof id === 'undefined') {
                handleSendRequest();
            } else {
                handleSendRequestEdit();
            }
        }
    }, [discountRatio, id]);

    const handleValidateDiscount = async () => {
        try {
            const result = await callAPI(
                "/api/discount/validate-code/",
                "POST",
                true,
                { code: discountCode }
            );
            setToastText("Discount code applied successfully");
            setToastSuccess(true);
            setShowToast(true);
            setDiscountRatio(result.data.discount_ratio);
            if(typeof id === 'undefined'){
                handleSendRequest();
            }else{
                handleSendRequestEdit();
            }

        } catch (error) {
            console.log(error)
            setToastText("Invalid discount code, The code you entered is invalid or has expired");
            setToastSuccess(false);
            setShowToast(true);
        }
    }


    return (
      <div className="w-full flex flex-row justify-between items-start mt-6 mb-24">
        <SuccessToast
          text={toastText}
          show={showToast}
          onClose={() => setShowToast(false)}
          success={toastSuccess}
        />
        <div className="xl:w-[70%] w-[60%] min-h-[789px] p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="w-full min-h-[117px] p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">
                Addresses
              </div>
              <button
                onClick={() => {
                  setStep(0);
                }}
                className="flex flex-row gap-1.5"
              >
                <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">
                  Back to Edit
                </div>
                <img src={ArrowLeft2} className="w-4 h-4" />
              </button>
            </div>
            {addressDetails.map((item, idx) => (
              <div
                key={idx}
                className="xl:w-[716px] w-full xl:justify-start items-start xl:gap-[73px] justify-between inline-flex"
              >
                <div className="xl:w-[370px] flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Pickup Address{" "}
                      {addressDetails.length > 1 ? `${idx + 1}` : ""}
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.pickup?.formatted_address}
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Delivery Address{" "}
                      {addressDetails.length > 1 ? `${idx + 1}` : ""}
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.drop?.formatted_address}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {addressDetails.map((item, idx) => (
            <div
              key={idx}
              className="w-full min-h-[188px] p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-5 inline-flex"
            >
              <div className="flex flex-row justify-between items-center w-full">
                <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">
                  Package Details & Payment{" "}
                  {addressDetails?.length > 1 ? `${idx + 1}` : ""}
                </div>
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                  className="flex flex-row gap-1.5"
                >
                  <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">
                    Back to Edit
                  </div>
                  <img src={ArrowLeft2} className="w-4 h-4" />
                </button>
              </div>
              <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Package Size
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.size?.name}
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Package Addons
                    </div>
                    {item?.chosenAddons?.map((itm, idex) => (
                      <div
                        key={idex}
                        className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight"
                      >
                        {itm.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-6 inline-flex">
                <div className="flex-col justify-start items-start gap-[5px] flex">
                  <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    Payment Method
                  </div>
                  <div className="flex flex-row gap-1.5">
                    <img className="w-[34px] h-[17px]" src={Money} />
                    <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                      {item?.choosenMethod === 1
                        ? "Cash on pickup"
                        : item?.choosenMethod === 2
                        ? "Cash on delivery"
                        : "MoMo"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {addressDetails?.map((item, idx) => (
            <div
              key={idx}
              className="w-full min-h-[194px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex"
            >
              <div className="flex flex-row justify-between items-center w-full">
                <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">
                  Pickup Details{" "}
                  {addressDetails?.length > 1 ? `${idx + 1}` : ""}
                </div>
                <button
                  onClick={() => {
                    setStep(0);
                  }}
                  className="flex flex-row gap-1.5"
                >
                  <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">
                    Back to Edit
                  </div>
                  <img src={ArrowLeft2} className="w-4 h-4" />
                </button>
              </div>
              <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Full Name
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.full_name_pickup}
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Phone Number
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.phone_number_pickup}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[65px] flex-col justify-start items-start gap-[5px] inline-flex">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                  Comment
                </div>
                <div className="xl:w-[624px] w-full text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                  {item?.comment_pickup}
                </div>
              </div>
            </div>
          ))}
          {addressDetails?.map((item, idx) => (
            <div
              key={idx}
              className="w-full min-h-[194px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex"
            >
              <div className="flex flex-row justify-between items-center w-full">
                <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">
                  Delivery Details{" "}
                  {addressDetails?.length > 1 ? `${idx + 1}` : ""}
                </div>
                <button
                  onClick={() => {
                    setStep(0);
                  }}
                  className="flex flex-row gap-1.5"
                >
                  <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">
                    Back to Edit
                  </div>
                  <img src={ArrowLeft2} className="w-4 h-4" />
                </button>
              </div>
              <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Full Name
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.full_name_drop}
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-start items-start gap-6 inline-flex">
                  <div className="flex-col justify-start items-start gap-[5px] flex">
                    <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                      Phone Number
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      {item?.phone_number_drop}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[65px] flex-col justify-start items-start gap-[5px] inline-flex">
                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                  Comment
                </div>
                <div className="xl:w-[624px] w-full text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                  {item?.comment_drop}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="xl:w-[28%] w-[38%] flex flex-col gap-6">
          <div className="w-full min-h-[343px] p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex">
            <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">
              Order Total
            </div>
            {inputs?.map((item, idx) => (
              <div key={idx}>
                <div className="w-full h-[22px] justify-between items-start inline-flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <div className="h-[22px] w-[22px] py-[3px] bg-gray-100 rounded-md justify-center items-center flex">
                      <div className="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                      Package
                    </div>
                  </div>
                  <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                    {item?.total?.toFixed(3)}
                    {item?.size?.currency_display}
                  </div>
                </div>
                <div className="w-full h-5 justify-between items-start inline-flex">
                  <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    {item?.size?.name}
                  </div>
                  <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    {item?.size?.price}
                    {item?.size?.currency_display}
                  </div>
                </div>
                <div className="w-full h-5 justify-between items-start inline-flex">
                  <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    Add-ons
                  </div>
                  <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    {item?.chosenAddons
                      ?.map((item, idx) => item.price)
                      .reduce((a, b) => a + b, 0)}
                    {item?.chosenAddons[0]?.currency_display}
                  </div>
                </div>
                <div className="w-full h-5 justify-between items-start inline-flex">
                  <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    Distance
                  </div>
                  <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    {item?.distance?.toFixed(3)} KM
                  </div>
                </div>
                <div className="w-full h-5 justify-between items-start inline-flex">
                  <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    Discount
                  </div>
                  <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                    {(item.total * (parseFloat(discountRatio) / 100)).toFixed(3)}{" "}
                    {item?.size?.currency_display}
                  </div>
                </div>
              </div>
            ))}
            <div className="border border-b-[#D0D4D9] w-full" />
            <div className="w-full h-5 justify-between items-start inline-flex">
              <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Subtotal
              </div>
              <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                {(
                  subTotal -
                  subTotal * (parseFloat(discountRatio) / 100)
                ).toFixed(3)}
                {inputs[0]?.size?.currency_display}
              </div>
            </div>
            <div className="w-full h-5 justify-between items-start inline-flex">
              <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Taxes & Other fees
              </div>
              <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                {(
                  ((subTotal - subTotal * (parseFloat(discountRatio) / 100)) *
                    taxRate)
                ).toFixed(3)}
              </div>
            </div>
            <div className="border border-b-[#D0D4D9] w-full" />
            <div className="w-full h-5 justify-between items-start inline-flex">
              <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                Total
              </div>
              <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                {(
                  subTotal -
                  subTotal * (parseFloat(discountRatio) / 100) +
                  ((subTotal - subTotal * (parseFloat(discountRatio) / 100)) *
                    taxRate)
                ).toFixed(3)}
                {inputs[0]?.size?.currency_display}
              </div>
            </div>
            <button
            disabled={loading && data ==undefined}  
              className="xl:w-[348px] w-full h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[18px] justify-center items-center gap-2.5 inline-flex"
              onClick={() => {
                if (typeof id === "undefined") {
                  handleSave();
                } else {
                  handleSaveEdit();
                }
              }}
            >
              {
                !loading && data!=undefined ?
              <div className="text-center text-white text-base font-semibold font-['Rubik'] leading-snug">
                {typeof id === "undefined"
                  ? "Request Delivery"
                  : "Edit Package"}
              </div>
              : <Spinner className={"fill-white"} />
            }
            </button>
          </div>
          <div
            className={`w-full ${
              discountExpanded ? "h-[228px]" : "h-[72px]"
            } p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex`}
          >
            <div
              onClick={() => setDiscountExpanded(!discountExpanded)}
              className=" cursor-pointer flex flex-row w-full justify-between items-center"
            >
              <div className="flex flex-row gap-2.5 items-center">
                <img src={CheckDiscount} className="w-6 h-6" />
                <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">
                  Add discount code
                </div>
              </div>
              <img
                src={ArrowDown}
                className={`w-6 h-6 ${discountExpanded && "-rotate-180"}`}
              />
            </div>
            {discountExpanded && (
              <div className="xl:w-[348px] w-full h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                  Discount Code
                </div>
                <input
                  type="text"
                  placeholder="SUPPORT@133"
                  className="placeholder:text-zinc-300 text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </div>
            )}
            {discountExpanded && (
              <button
                disabled={!discountCode}
                onClick={() => {
                  handleValidateDiscount();
                }}
                className={`xl:w-[348px] w-full h-[50px] px-[60px] py-[15px]  rounded-[18px] justify-center items-center gap-2.5 inline-flex ${
                  discountCode ? " bg-red-800" : "bg-zinc-200"
                }`}
              >
                <div className="text-centertext-base text-white font-semibold font-['Rubik'] leading-snug">
                  Apply Code
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    );
}
