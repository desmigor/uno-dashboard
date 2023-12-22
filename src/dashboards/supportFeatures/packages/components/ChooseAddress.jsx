import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../../../components/ui/Navbar'
import { GoogleMap, useLoadScript, InfoBox, DirectionsRenderer } from '@react-google-maps/api';
import LocationIcon from '../../../../assets/images/dashboard/icon/location.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeLocation } from '../../../../redux/slices/packageInputs';
import { useNavigate, useParams } from 'react-router-dom'; 
import RedPinIcon from '../../../../assets/images/dashboard/icon/red-pin.svg';
import GreenPinIcon from '../../../../assets/images/dashboard/icon/green-pin.svg';

const libraries = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    cursor: 'crosshair'
};
const center = {
    lat: -1.9347657, // default latitude
    lng: 30.0419674, // default longitude
};

function ChooseAddress() {
    const [pickup, setPickup] = useState();
    const [firstClick, setFirstClick] = useState(true);
    const [delivery, setDelivery] = useState();
    const [searchTextPickup, setSearchTextPickup] = useState('');
    const [searchTextDelivery, setSearchTextDelivery] = useState('');
    const [pickupSearch, setPickupSearch] = useState([]);
    const [deliverySearch, setDeliverySearch] = useState([]);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [duration, setDuration] = useState('');
    const originRef = useRef();
    const destiantionRef = useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { index } = useParams();
    const { userInfo } = useSelector(state => state.auth);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
        libraries,
    });

    useEffect(() => {
        calculateRoute();
    }, [delivery]);

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

    async function calculateRoute() {
        if (originRef.current.value === "" || destiantionRef.current.value === "") {
            alert('No Data')
          return;
        }
        const directionsService = new window.google.maps.DirectionsService();
        const originLatLng = new google.maps.LatLng(pickup?.geometry?.location?.lat, pickup?.geometry?.location?.lng);
        const destinationLatLng = new google.maps.LatLng(delivery?.geometry?.location?.lat, delivery?.geometry?.location?.lng);
        const results = await directionsService.route({
          origin: searchTextPickup,
          destination: searchTextDelivery,
          provideRouteAlternatives: false,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDuration(results?.routes[0].legs[0].duration.text);
        setDirectionsResponse(null);
        setDirectionsResponse(results);
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

    const handleLocationConfirm = () => {
        const payload = {
            pickup,
            drop: delivery,
            index,
        }
        dispatch(storeLocation(payload));
        navigate(-1);
    }

    const handleClick = async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY`
              );
              const data = await response.json();
        
              if (data.results && data.results.length > 0) {
                const address = data.results[0];
                if(firstClick === true) {
                    setPickup(address);
                    setSearchTextPickup(address.formatted_address);
                    setFirstClick(false)
                }else{
                    setDelivery(address);
                    setSearchTextDelivery(address.formatted_address);
                }
                // Do something with the address, like displaying it
              }
        } catch (error) {
            
        }
    }

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    

  return (
    <div className='w-full h-screen relative'>
        <Navbar map={true} />
        <div className='flex flex-row h-[93%] w-full'>
            <div className="w-[428px] px-8 py-6 relative bg-white border-r border-gray-100">
                <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">Choose Addresses</div> 
                <div className="w-[364px] h-[67px] flex-col justify-start items-start gap-1.5 inline-flex mt-8">
                    <div className="justify-start items-center gap-2 inline-flex">
                        <div className="justify-start items-center gap-2 flex">
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-4 border border-red-800 rounded-full flex items-center justify-center" >
                                    <div className="w-[9.60px] h-[9.60px] bg-red-800 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Pickup Address</div>
                    </div>
                    <div className="w-[364px] text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Enter the pickup address below and it will be displayed on the map.</div>
                </div>
                <div className="w-[364px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex mt-8">
                    <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Search on the map</div>
                    <input ref={originRef} type='text' value={searchTextPickup}  onChange={(e) => getPlaces(e.target.value)} placeholder='Amasaman KG124' className="placeholder:text-gray-300 focus:outline-none focus:border focus:border-red-800 focus:ring-0 text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" />
                </div>
                <div className="w-[364px] h-[67px] flex-col justify-start items-start gap-1.5 inline-flex mt-8">
                    <div className="justify-start items-center gap-2 inline-flex">
                        <div className="justify-start items-center gap-2 flex">
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center" >
                                    <div className="w-[9.60px] h-[9.60px] bg-green-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery Address</div>
                    </div>
                    <div className="w-[364px] text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Enter the delivery address below and it will be displayed on the map.</div>
                </div>
                <div className="w-[364px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex mt-8">
                    <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Search on the map</div>
                    <input ref={destiantionRef} value={searchTextDelivery}  onChange={(e) => getPlacesDelivery(e.target.value)} type='text' placeholder='Amasaman KG124' className="placeholder:text-gray-300 focus:outline-none focus:border focus:border-red-800 focus:ring-0 text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" />
                </div>
                <button onClick={handleLocationConfirm} className={`w-[364px] h-[50px] px-[60px] py-[15px] ${pickup && delivery ? 'bg-red-800' : 'bg-zinc-200'} rounded-xl justify-center items-center gap-2.5 inline-flex absolute bottom-8 left-8`}>
                    <div className={`text-center ${pickup && delivery ? 'text-white' : 'text-gray-400'} text-base font-normal font-['Rubik'] leading-tight`}>Confirm Addresses</div>
                </button>
                {pickupSearch.length > 0 && <div className={`w-[364px] min-h-[52px] p-4 bg-white rounded-xl shadow border border-zinc-200 flex-col justify-start items-end gap-4 inline-flex absolute top-[269px] left-8`}> 
                    {pickupSearch.map((item, idx) => <div key={idx} onClick={() => {
                        setPickup(item)
                        setPickupSearch([]);
                        setSearchTextPickup(item?.formatted_address);
                    }} className={`h-[52px] w-full flex flex-row gap-[10px] items-center ${pickupSearch.length - 1 === idx ? '' : 'border-b'} pb-[17px] border-b-[#D0D4D9] cursor-pointer`}>
                        <img src={LocationIcon} className='w-[22px] h-[22px]' />
                        <div className="w-[296px] text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item?.formatted_address}</div>
                    </div>)}
                </div>}
                {deliverySearch.length > 0 && <div className={`w-[364px] min-h-[52px] p-4 bg-white rounded-xl shadow border border-zinc-200 flex-col justify-start items-end gap-4 inline-flex absolute top-[472px] left-8`}> 
                    {deliverySearch.map((item, idx) => <div key={idx} onClick={() => {
                        setDelivery(item)
                        setDeliverySearch([]);
                        setSearchTextDelivery(item?.formatted_address);
                        calculateRoute()
                    }} className={`h-[52px] w-full flex flex-row gap-[10px] items-center ${pickupSearch.length - 1 === idx ? '' : 'border-b'} pb-[17px] border-b-[#D0D4D9] cursor-pointer`}>
                        <img src={LocationIcon} className='w-[22px] h-[22px]' />
                        <div className="w-[296px] text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">{item?.formatted_address}</div>
                    </div>)}
                </div>}
            </div>
            <div className='h-[100%] w-[90%]'>
                <GoogleMap
                      key={mapKey}
                    mapContainerStyle={mapContainerStyle}
                    onClick={handleClick}
                    zoom={15}
                    center={pickup ? { lat: pickup?.geometry?.location?.lat, lng: pickup?.geometry?.location?.lng } : center}
                    options={{
                        zoomControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                    }}
                >
                    {pickup && <InfoBox
                        position={{ lat: pickup?.geometry?.location?.lat, lng: pickup?.geometry?.location?.lng }}
                        options={{ closeBoxURL: "", enableEventPropagation: false }}
                    >
                        <div>   
                        <img src={RedPinIcon} alt="Pin Icon" className="w-[52px] h-[52px]" />
                            {directionsResponse && <div className="w-[49px] h-[49px] relative">
                                <div className="w-[49px] h-[49px] left-0 top-0 absolute bg-red-800 rounded-full" />
                                <div className="w-[21px] h-8 left-[14px] top-[9px] absolute">
                                    <div className="left-0 top-0 absolute text-white text-base font-semibold font-['Rubik'] leading-snug">{duration.split(" ")[0]}</div>
                                    <div className="left-0 top-[16px] absolute text-white text-xs font-normal font-['Rubik'] leading-none">{duration.split(" ")[1]}</div>
                                </div>
                            </div>}
                        </div>
                    </InfoBox>}
                    {delivery && <InfoBox
                        position={{ lat: delivery?.geometry?.location?.lat, lng: delivery?.geometry?.location?.lng }}
                        options={{ closeBoxURL: "", enableEventPropagation: false }}
                    >
                        <div className=" bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                            <img src={GreenPinIcon} alt="Pin Icon" className="w-[52px] h-[52px]" /> 
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
            </div>
        </div>
    </div>
  )
}

export default ChooseAddress