import ArrowLeft2 from '../../../../assets/images/dashboard/icon/arrow-left-thin-red.svg'
import ArrowLeft4 from '../../../../assets/images/dashboard/icon/arrow-left-white.svg'
import ArrowLeft3 from '../../../../assets/images/dashboard/icon/arrow-left.grayish.svg'
import AddCircle from '../../../../assets/images/dashboard/icon/add-circle2.svg'
import Mtn from '../../../../assets/images/dashboard/icon/mtn.png'
import Voda from '../../../../assets/images/dashboard/icon/logoVoda.png'
import Money from '../../../../assets/images/dashboard/icon/Money.svg'
import TickOutile from '../../../../assets/images/dashboard/icon/tick-square-o.svg'
import TickChecked from '../../../../assets/images/dashboard/icon/tick-square.svg'
import ArrowDown from '../../../../assets/images/dashboard/icon/arrow-down-bold.svg'
import CheckDiscount from '../../../../assets/images/dashboard/icon/discount-shape.svg'
import LocationIcon from '../../../../assets/images/dashboard/icon/location.svg';
import * as Yup from 'yup';


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addPackagesPickupAddressAction } from '../../../../redux/actions/fetchPackagesAction'
import { fetchPackageAddOnsAction, fetchPackageSizesAction } from '../../../../redux/actions/fetchPackageSizesAction'
import callAPI from '../../../../utils/api'

export const Step1 = ({ next }) => {
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
        checkValidations()
    }, [data])

    useEffect(() => {
        if (addressDetails) {
            setData({
                pickup: addressDetails?.pickup,
                delivery: addressDetails?.delivery,
                fullNamePickup: addressDetails?.fullNamePickup,
                phonePickup: addressDetails?.phonePickup,
                commentPickup: addressDetails?.commentPickup,
                fullNameDelivery: addressDetails?.fullNameDelivery,
                phoneDelivery: addressDetails?.phoneDelivery,
                commentDelivery: addressDetails?.commentDelivery,
            })
        }
    }, [addressDetails])

    const validationSchema = Yup.object().shape({
        pickup: Yup.object().shape({}).required(),
        delivery: Yup.object().shape({}).required(),
        fullNamePickup: Yup.string().required(),
        phonePickup: Yup.string().required(),
        commentPickup: Yup.string().required(),
        fullNameDelivery: Yup.string().required(),
        phoneDelivery: Yup.string().required(),
        commentDelivery: Yup.string().required(),
    });

    const getPlaces = (addressToSearch) => {
        setSearchTextPickup(addressToSearch);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: addressToSearch,
                key: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
            },
        })
        .then(response => {
            setPickupSearch(response.data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const getPlacesDelivery = (addressToSearch) => {
        setSearchTextDelivery(addressToSearch);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: addressToSearch,
                key: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
            },
        })
        .then(response => {
            setDeliverySearch(response.data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const checkValidations = async () => {
        try {
            await validationSchema.validate(data, { abortEarly: false });
            // Validation passed, all data is valid
            setValidated(true);
          } catch (errors) {
            // Validation failed, errors contains validation error messages
            console.error(errors);
            return setValidated(false);
          }
    }

    const handleSaveAddress = async () => {
        try {
            const pickup = {
                formatted_address: data.pickup.formatted_address,
                coment: data.commentPickup,
                country: "Ghana",
                name: data.fullNamePickup,
                phone: data.phonePickup,
                latitude: data.pickup.geometry.location.lat,
                longitude: data.pickup.geometry.location.lng,
            }
            const drop = {
                formatted_address: data.delivery.formatted_address,
                coment: data.commentDelivery,
                country: "Ghana",
                name: data.fullNameDelivery,
                phone: data.phoneDelivery,
                latitude: data.delivery.geometry.location.lat,
                longitude: data.delivery.geometry.location.lng,
            }
            dispatch(addPackagesPickupAddressAction(pickup, drop));
            next(1, data)
        } catch (error) {
            
        }
    }


    return (
<div className="w-full min-h-[891px] p-6 bg-white rounded-[10px] mt-6 flex-col justify-start items-start gap-8 inline-flex mb-24"> 
<div className='w-[80%] mx-auto'>   
     <div className="w-[295px] h-[45px] flex-col justify-start items-start gap-2 inline-flex">
         <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Addresses</div>
         <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">You can add up to 10 delivery addresses in one order.</div>
     </div>
        <div className='flex flex-row justify-between flex-wrap mt-[16px] w-full'>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start relative items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Pickup Address</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={searchTextPickup} type='text' onChange={(e) => getPlaces(e.target.value)} placeholder='Amasaman KG124'  className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
             <Link to={userInfo?.type?.id === 3 ? '/admin/dashboard/package/choose-address' : '/support/dashboard/package/choose-address' } className='flex flex-row items-center gap-[6px] mt-3 cursor-pointer'>
                 <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight ">Choose address on map</div> 
                 <img src={ArrowLeft2} className='w-4 h-4' />
             </Link>
             {pickupSearch.length > 0 && <div className={`w-full min-h-[52px] p-4 bg-white rounded-xl shadow border border-zinc-200 flex-col justify-start items-end gap-4 inline-flex absolute top-[89px]`}> 
                    {pickupSearch.map((item, idx) => <div key={idx} onClick={() => {
                        setData({ ...data, pickup: item });
                        console.log(item);
                        setPickupSearch([]);
                        setSearchTextPickup(item?.formatted_address);
                    }} className={`h-[52px] w-full flex flex-row gap-[10px] items-center ${pickupSearch.length - 1 === idx ? '' : 'border-b'} pb-[17px] border-b-[#D0D4D9] cursor-pointer`}>
                        <img src={LocationIcon} className='w-[22px] h-[22px]' />
                        <div className="w-[296px] text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item?.formatted_address}</div>
                    </div>)}
                </div>}                        
         </div>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start relative gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Delivery Address</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             {/* <div className='flex flex-row items-center gap-3 '> */}
                 <input value={searchTextDelivery} type='text' placeholder='Amasaman KG124' onChange={(e) => getPlacesDelivery(e.target.value)} className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
                 {/* <img src={AddCircle} className='w-8 h-8 cursor-pointer' /> */}
             {/* </div> */}
             <Link to={userInfo?.type?.id === 3 ? '/admin/dashboard/package/choose-address' : '/support/dashboard/package/choose-address' } className='flex flex-row items-center gap-[6px] mt-3 cursor-pointer'>
                 <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Choose address on map</div> 
                 <img src={ArrowLeft2} className='w-4 h-4' />
             </Link>  
             {deliverySearch.length > 0 && <div className={`w-full min-h-[52px] p-4 bg-white rounded-xl shadow border border-zinc-200 flex-col justify-start items-end gap-4 inline-flex absolute top-[89px]`}> 
                    {deliverySearch.map((item, idx) => <div key={idx} onClick={() => {
                        setData({ ...data, delivery: item });
                        setDeliverySearch([]);
                        setSearchTextDelivery(item?.formatted_address);
                    }} className={`h-[52px] w-full flex flex-row gap-[10px] items-center ${pickupSearch.length - 1 === idx ? '' : 'border-b'} pb-[17px] border-b-[#D0D4D9] cursor-pointer`}>
                        <img src={LocationIcon} className='w-[22px] h-[22px]' />
                        <div className="w-[296px] text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item?.formatted_address}</div>
                    </div>)}
                </div>}
         </div>
     </div>
</div>
<div className='w-[80%] mx-auto mt-8'>
     <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Pickup Details</div>
     <div className='flex flex-row justify-between mt-[16px] w-full'>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={data.fullNamePickup} onChange={(e) => setData({ ...data, fullNamePickup: e.target.value })} type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={data.phonePickup} onChange={(e) => setData({ ...data, phonePickup: e.target.value })} type='text' placeholder='+233-4823-321-312' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
     </div> 
     <div className="xl:w-[460px] w-[48%] h-[113px] mt-4 flex-col justify-start items-start gap-1.5 inline-flex">
         <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Comment</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
         <textarea value={data.commentPickup} onChange={(e) => setData({ ...data, commentPickup: e.target.value })} placeholder='Leave a comment' className="self-stretch h-[87px] px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" ></textarea> 
     </div>
</div>
<div className='w-[80%] mx-auto mt-8'>
     <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery Details</div>
     <div className='flex flex-row justify-between mt-[16px] w-full'>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={data.fullNameDelivery} onChange={(e) => setData({ ...data, fullNameDelivery: e.target.value })} type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
         <div className="xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input value={data.phoneDelivery} onChange={(e) => setData({ ...data, phoneDelivery: e.target.value })} type='text' placeholder='+233-4823-321-312' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
     </div> 
     <div className="xl:w-[460px] w-[48%] h-[113px] mt-4 flex-col justify-start items-start gap-1.5 inline-flex">
         <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Comment</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
         <textarea value={data.commentDelivery} onChange={(e) => setData({ ...data, commentDelivery: e.target.value })} placeholder='Leave a comment' className="self-stretch h-[87px] px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" ></textarea> 
     </div>
</div>
<div className='w-[80%] mx-auto'>
    <button disabled={!validated} onClick={handleSaveAddress} className={`w-[312px] h-[50px] ${validated ? 'bg-red-800' : 'bg-gray-100'} rounded-xl justify-center items-center gap-2.5 flex flex-row`}>
        <div className={`text-center ${validated ? 'text-white' : 'text-gray-400'} text-base font-normal font-['Rubik'] leading-tight"`}>Continue</div> 
        <img src={validated ? ArrowLeft4 : ArrowLeft3} className='w-4 h-4' />
    </button>
</div>
</div>
    )
}


export const Step2 = ({ next }) => {
    const [choosenMethod, setChoosenMethod] = useState(0);
    const [size, setSize] = useState(0);
    const [chosenAddons, setChosenAddons] = useState([]);
    const [insulated, setInsulated] = useState(false);
    const { packageSizes, packageAddOns } = useSelector(state => state.fetchPackageSizes);
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


    console.log(chosenAddons);

    const data = {
        insulated,
        size,
        choosenMethod,
        chosenAddons
    }

    return (
        <div className="w-full min-h-[884px] p-6 bg-white rounded-[10px] mt-6 flex-col justify-start overflow-y-auto items-start gap-8 inline-flex mb-24"> 
            <div className="w-full h-[91px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Payment Method</div> 
                <div className='w-full mt-4 flex flex-row gap-3.5'>
                    <div onClick={() => setChoosenMethod(1)} className={`w-[198px] h-[54px] rounded-[10px] border ${choosenMethod === 1 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <div className="w-[44px] h-[26px] relative rounded-[3px] bg-[#FFCB05] flex items-center justify-center">
                            <img className="w-8 h-[26px]" src={Mtn} />
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">MTN Mobile Money</div>
                    </div> 
                    <div onClick={() => setChoosenMethod(2)} className={`w-[231px] h-[54px] bg-white rounded-[10px] border ${choosenMethod === 2 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <div className="w-[39px] h-[26px] pl-2.5 pr-[9px] py-[3px] bg-neutral-100 rounded-[3px] justify-center items-center inline-flex">
                            <img className="w-5 h-5" src={Voda} />
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Vodafone Mobile Money</div>
                    </div>
                    <div onClick={() => setChoosenMethod(3)} className={`w-[177px] h-[54px] bg-white rounded-[10px] border ${choosenMethod === 3 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <img className="w-[34px] h-[17px]" src={Money} />
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Pickup</div>
                    </div> 
                    <div onClick={() => setChoosenMethod(4)} className={`w-[186px] h-[54px] bg-white rounded-[10px] border ${choosenMethod === 4 ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center cursor-pointer items-center gap-1.5 inline-flex`}>
                        <img className="w-[34px] h-[17px]" src={Money} />
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Delivery</div>
                    </div> 
                </div>
            </div>
            <div className="w-full h-[91px] flex-col justify-start items-start gap-4 inline-flex mt-8">
                <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery: Package 1</div> 
                <div className="text-slate-500 text-base font-semibold font-['Rubik'] leading-tight">Package Size</div> 
                <div className='flex flex-row flex-wrap gap-6 w-full'>
                    {packageSizes?.map((item, idx) => <div key={idx} onClick={() => setSize(item)} className={`xl:w-[345px] w-[35%] min-h-[106px] p-5 ${size.id === item.id ? 'border-red-800 bg-[#f9f3f3]' : 'border-zinc-200 bg-white'} rounded-2xl border flex-col cursor-pointer justify-start items-start gap-2.5 inline-flex`}>
                        <div className="self-stretch min-h-[66px]">
                            <div className='flex flex-row justify-between items-center'>
                                <div className="text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">{item.name}</div>
                                <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">{item.currency_display} {item.price}</div>
                            </div>
                            <div className="mt-[9px] text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">{item.description}</div>
                        </div>
                    </div>)}
                </div>
                <div className="w-full h-[88px] flex-col justify-start items-start gap-4 inline-flex">
                    <div className="text-slate-500 text-base font-semibold font-['Rubik'] leading-tight">Package Addons</div> 
                    <div className='flex flex-row flex-wrap gap-6'>
                        {packageAddOns?.map((item, idx) => <div onClick={() => {
                            const updatedAddons = [...chosenAddons];

                            // Check if the clicked addon ID exists in the array
                            const addonIndex = updatedAddons.indexOf(item.id);
        
                            // If the addon is already selected, remove it; otherwise, add it
                            if (addonIndex !== -1) {
                                updatedAddons.splice(addonIndex, 1);
                            } else {
                                updatedAddons.push(item);
                            }
        
                            // Update the state with the modified array
                            setChosenAddons(updatedAddons);
                        }} className={`min-w-[165px] px-5 cursor-pointer h-[52px] rounded-[10px] border ${chosenAddons.includes(item) ? 'border-red-800 bg-[#f9f3f3]' : 'border-gray-100 bg-white'} justify-center items-center gap-1.5 inline-flex`}>
                            <img src={chosenAddons.includes(item) ? TickChecked : TickOutile} />
                            <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item.description}</div>
                        </div>)}
                    </div> 
                </div>
                <button onClick={() => next(2, data)}  className="w-[312px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex mt-4">
                    <div className="text-center text-white text-base font-normal font-['Rubik'] leading-tight">Proceed to Summary</div>
                    <img src={ArrowLeft4} className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}

export const Step3 = ({setStep}) => {
    const [discountExpanded, setDiscountExpanded] = useState(false);
    const { addressDetails, packageDetailsPayment } = useSelector(state => state.packages);
    const [calculations, setCalculations] = useState({});
    const [discountCode, setDiscountCode] = useState(null);

    useEffect(() => {
        handleCalculations(addressDetails?.pickup?.geometry?.location?.lat, addressDetails?.pickup?.geometry?.location?.lng, addressDetails?.delivery?.geometry?.location?.lat, addressDetails?.delivery?.geometry?.location?.lng);
    }, [])

    function calculateTotalCost(distance, base_price) {
        const pricingStructure = packageDetailsPayment?.size?.price_per_km;
        let totalCost = 0;
        let remainingDistance = distance;
      
        pricingStructure.forEach((segment, index) => {
          const segmentDistance = segment.km === "n" ? remainingDistance : Math.min(segment.km, remainingDistance);
          totalCost += segmentDistance * segment.price_control  * base_price;
          remainingDistance -= segmentDistance;
      
          if (remainingDistance <= 0) {
            return;
          }
        });
      
        return totalCost;
      }

    const handleCalculations = (lat1, lon1, lat2, lon2) => {
        console.log(lat1, lon1, lat2, lon2);
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
        console.log(d);
        var totalCost = calculateTotalCost(d, packageDetailsPayment?.size?.price);

        setCalculations(
            {
                distance: d,
                price: d * packageDetailsPayment?.size?.price,
                discount: 0,
                total: totalCost,

            }
        )
    }

    const saveAddress = async (
        pickup_address = true,
    ) => {
        const pick_up_data = {
            title: "Address",
            open_address: addressDetails?.pickup?.formatted_address,
            landmark : "",
            location : addressDetails?.pickup?.formatted_address,
            latitude : addressDetails?.pickup?.geometry?.location?.lat,
            longitude : addressDetails?.pickup?.geometry?.location?.lng,
            contact_person : addressDetails?.fullNamePickup,
            contact_phone : addressDetails?.phonePickup,
            contact_country : 1,
            address_type : 1,
            temporary : true
        }
        const delivery_data = {
            title: "Address",
            open_address: addressDetails?.delivery?.formatted_address,
            landmark : "",
            location : addressDetails?.delivery?.formatted_address,
            latitude : addressDetails?.delivery?.geometry?.location?.lat,
            longitude : addressDetails?.delivery?.geometry?.location?.lng,
            contact_person : addressDetails?.fullNameDelivery,
            contact_phone : addressDetails?.phoneDelivery,
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
        console.log(response);
        console.log(response.data.id);
        return response.data.id;
    }


    const handleSendRequest = async () => {
        const data = [ {
            delivery_mode: null,
            relative_size: null,
            relative_weight: null,
            payment_type: 1,
            height: 10,
            length: 10,
            width: 10,
            weight: 10,
            distance_as_km: calculations?.distance,
            total_cost:  calculations?.total,
            frangible: true,
            package_details: "",
            pickup_contact_person: addressDetails?.fullNamePickup,
            pickup_contact_phone: addressDetails?.phonePickup,
            pickup_contact_country: 1,
            pickup_latitude: addressDetails?.pickup?.geometry?.location?.lat,
            pickup_longitude: addressDetails?.pickup?.geometry?.location?.lng,
            pickup_open_address: addressDetails?.pickup?.formatted_address,
            drop_contact_person: addressDetails?.fullNameDelivery,
            drop_contact_phone: addressDetails?.phoneDelivery,
            drop_contact_country: 1,
            drop_latitude: addressDetails?.delivery?.geometry?.location?.lat,
            drop_longitude: addressDetails?.delivery?.geometry?.location?.lng,
            drop_open_address: addressDetails?.delivery?.formatted_address,
            pickup_location_id: await saveAddress(true),
            drop_location_id: await saveAddress(false),
            insulated_food_container: false,
            payer_phone_no: null, //Payer phone number required for MTN MoMo payment
            payer_phone_country: null, //Payer phone number required for MTN MoMo payment
            price_per_km: calculations?.total / calculations?.distance,
            currency: 1,
            discount_code: discountCode,
            created_by_employee: true,
            package_size: packageDetailsPayment?.size?.id,
            package_addons: packageDetailsPayment?.chosenAddons?.map(item => item.id),
        }]

        console.log(data);
       try {
        result = await callAPI(
            "/api/delivery/package-delivery/",
            "POST",
            true,
            data
        );
        console.log(result);   
       } catch (error) {
        console.log(error)
       }

    }    
    
    console.log(addressDetails, packageDetailsPayment)

    return (
        <div className='w-full flex flex-row justify-between items-start mt-6 mb-24'>
            <div className='xl:w-[70%] w-[60%] h-[789px] p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex'>
                <div className="w-full h-[117px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Addresses</div> 
                        <button onClick={() => { setStep(0); }} className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                        <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Pickup Address</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.pickup?.formatted_address}</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Delivery Address</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.delivery?.formatted_address}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full h-[188px] p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-5 inline-flex"> 
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Package Details & Payment</div> 
                        <button onClick={() => { setStep(1); }} className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                        <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Package Size</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{packageDetailsPayment?.size.name}</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Package Addons</div>
                                {
                                    packageDetailsPayment?.chosenAddons?.map((item, idx) => <div key={idx} className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{item.name}</div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-6 inline-flex">
                        <div className="flex-col justify-start items-start gap-[5px] flex">
                            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Payment Method</div>
                            <div className="flex flex-row gap-1.5">
                                <img className="w-[34px] h-[17px]" src={Money} />
                                <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{packageDetailsPayment?.choosenMethod === 3 ? "Cash on delivery" : "MoMo"}</div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[194px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Pickup Details</div> 
                        <button onClick={() => { setStep(0); }} className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                        <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Full Name</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.fullNamePickup}</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.phonePickup}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[65px] flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Comment</div>
                        <div className="xl:w-[624px] w-full text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.commentPickup}</div>
                    </div> 
                </div>
                <div className="w-full h-[194px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Delivery Details</div> 
                        <button onClick={() => { setStep(0); }} className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="xl:w-[716px] w-full h-[45px] xl:justify-start items-start xl:gap-[73px] justify-between inline-flex">
                        <div className="xl:w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Full Name</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.fullNameDelivery}</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.phoneDelivery}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[65px] flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Comment</div>
                        <div className="xl:w-[624px] w-full text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">{addressDetails?.commentDelivery}</div>
                    </div> 
                </div>
            </div>
            <div className='xl:w-[28%] w-[38%] flex flex-col gap-6'>
                <div className='w-full min-h-[343px] p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex'>
                    <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Order Total</div>
                    <div className="w-full h-[22px] justify-between items-start inline-flex">
                        <div className="justify-start items-center gap-1.5 flex">
                            <div className="h-[22px] w-[22px] py-[3px] bg-gray-100 rounded-md justify-center items-center flex">
                                <div className="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">1</div>
                            </div>
                            <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Package</div>
                        </div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                            {
                                packageDetailsPayment?.size?.price
                            }
                            {
                                packageDetailsPayment?.size?.currency_display
                            }
                        </div>
                    </div>
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">{
                            packageDetailsPayment?.size?.name
                        }</div>
                        <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                            {
                                packageDetailsPayment?.size?.price
                            }
                            {
                                packageDetailsPayment?.size?.currency_display
                            }
                        </div>
                    </div>
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Add-ons</div>
                        <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                            {
                                packageDetailsPayment?.chosenAddons?.map((item, idx) => item.price).reduce((a, b) => a + b, 0)
                            }
                            {
                                packageDetailsPayment?.chosenAddons[0]?.currency_display
                            }
                        </div>
                    </div>
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Distance</div>
                        <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                            {
                                calculations?.distance?.toFixed(3)
                            } KM
                        </div>
                    </div>
                    <div className='border border-b-[#D0D4D9] w-full' />
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Subtotal</div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                            {
                                calculations?.total?.toFixed(1)
                            } 
                            {
                                packageDetailsPayment?.size?.currency_display
                            }
                        </div>
                    </div> 
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Taxes & Other fees</div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">0</div>
                    </div>
                    <div className='border border-b-[#D0D4D9] w-full' />
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">Total</div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                            {
                               calculations?.total?.toFixed(1)
                            }
                        </div>
                    </div>
                    <button className="xl:w-[348px] w-full h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[18px] justify-center items-center gap-2.5 inline-flex"
                    onClick={
                        () => {
                            handleSendRequest();
                        }
                    }
                    >
                        
                        <div className="text-center text-white text-base font-semibold font-['Rubik'] leading-snug">Request Delivery</div>
                    </button>
                </div>
                <div className={`w-full ${discountExpanded ? 'h-[228px]' : 'h-[72px]'} p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex`}> 
                    <div onClick={() => setDiscountExpanded(!discountExpanded)} className=' cursor-pointer flex flex-row w-full justify-between items-center'>
                        <div className='flex flex-row gap-2.5 items-center'>
                            <img src={CheckDiscount} className='w-6 h-6' />
                            <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Add discount code</div> 
                        </div>
                        <img src={ArrowDown} className={`w-6 h-6 ${discountExpanded && '-rotate-180' }`} />
                    </div>
                    {discountExpanded && <div className="xl:w-[348px] w-full h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Discount Code</div>
                        <input type='text' placeholder='SUPPORT@133' className="placeholder:text-zinc-300 text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" 
                        value={discountCode}
                        onChange = {(e) => setDiscountCode(e.target.value)
                        }
                        />
                    </div>}
                    {discountExpanded && <button className="xl:w-[348px] w-full h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[18px] justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-white text-base font-semibold font-['Rubik'] leading-snug">Apply Code</div>
                    </button>}
                </div>
            </div>
        </div>
    )
}
