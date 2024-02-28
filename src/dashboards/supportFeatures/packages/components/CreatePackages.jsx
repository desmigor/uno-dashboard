import React, { useEffect, useState } from 'react'
import ArrowLeft from '../../../../assets/images/dashboard/icon/arrow-left-black.svg'
import { Step1, Step2, Step3 } from './steps'
import { useDispatch, useSelector } from 'react-redux';
import { addAddresses, addPackageDetails, addSummary, handleInputs } from '../../../../redux/slices/packageInputs';
import { useParams } from 'react-router-dom';
import { fetchPackageDetails } from '../../../../redux/actions/fetchPackagesAction';

function CreatePackages() {
    const [current, setCurrent] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [inputs, setInputs] = useState([{ pickupAddress: '', dropAddress: '', pickup: {}, drop: {}, pickupSearch: [], deliverySearch: [], full_name_pickup: '', full_name_drop: '', phone_number_pickup: '', phone_number_drop: '', comment_pickup: '', comment_drop: '', choosenMethod: 0, size: 0, chosenAddons: [], distance: 0, price: 0, discount: 0, total: 0 }]);
    const { step, index, pickupLocation, dropLocation, inputss } = useSelector(state => state.packages);
    const dispatch = useDispatch()
    const { id } = useParams();
    
    useEffect(() => {
        setInputs(inputss);
        dispatch(addAddresses(inputss))
    }, []);

    useEffect(() => {
        dispatch(handleInputs(inputs));
    }, [inputs]);
    useEffect(() => {
        if(pickupLocation === null && typeof id === 'undefined'){
            console.log('');
        }else if(pickupLocation !== null && typeof id === 'undefined'){
            handleInputChange(parseInt(index), 'pickupAddress', pickupLocation?.formatted_address);
            handleInputChange(parseInt(index), 'dropAddress', dropLocation?.formatted_address);
            handleInputChange(parseInt(index), 'pickup', typeof id === 'undefined' ? pickupLocation : { lat: pickupLocation?.geometry?.location?.lat, lng: pickupLocation?.geometry?.location?.lng, formatted_address: pickupLocation?.formatted_address });
            handleInputChange(parseInt(index), 'drop', typeof id === 'undefined' ? dropLocation : { lat: dropLocation?.geometry?.location?.lat, lng: dropLocation?.geometry?.location?.lng, formatted_address: dropLocation?.formatted_address });
            handleInputChange(parseInt(index), 'choosenMethod', 1);

        }else if(pickupLocation !== null && typeof id !== 'undefined'){
            dispatch(fetchPackageDetails(id)).then((res) => {
                handleInputChange(parseInt(index), 'pickupAddress', pickupLocation?.formatted_address);
                handleInputChange(parseInt(index), 'dropAddress', dropLocation?.formatted_address);
                handleInputChange(parseInt(index), 'pickup', typeof id === 'undefined' ? pickupLocation : { lat: pickupLocation?.geometry?.location?.lat, lng: pickupLocation?.geometry?.location?.lng, formatted_address: pickupLocation?.formatted_address });
                handleInputChange(parseInt(index), 'drop', typeof id === 'undefined' ? dropLocation : { lat: dropLocation?.geometry?.location?.lat, lng: dropLocation?.geometry?.location?.lng, formatted_address: dropLocation?.formatted_address });
                handleInputChange(parseInt(index), 'full_name_pickup', res.pickup_contact_person);
                handleInputChange(parseInt(index), 'full_name_drop', res.drop_contact_person);
                handleInputChange(parseInt(index), 'phone_number_pickup', res.pickup_contact_phone);
                handleInputChange(parseInt(index), 'phone_number_drop', res.drop_contact_phone);
                handleInputChange(parseInt(index), 'comment_pickup', 'None');
                handleInputChange(parseInt(index), 'comment_drop', 'None');
                handleInputChange(parseInt(index), 'choosenMethod', res.payment_type_value === "Cash Upon Pickup" ? 1 : res.payment_type_value === "Cash Upon Delivery" ? 2 : 3);
                handleInputChange(parseInt(index), 'size', res.package_size);
                handleInputChange(parseInt(index), 'total', res.total_cost);
                handleInputChange(parseInt(index), 'chosenAddons', res.package_addons);
                handleInputChange(parseInt(index), 'total', res.total_cost);
            });  
        }else{
            dispatch(fetchPackageDetails(id)).then((res) => {
                handleInputChange(0, 'pickupAddress', res.pickup_open_address);
                handleInputChange(0, 'dropAddress', res.drop_open_address);
                handleInputChange(0, 'pickup', { lat: res.pickup_latitude, lng: res.pickup_longitude, formatted_address: res.pickup_open_address });
                handleInputChange(0, 'drop', { lat: res.drop_latitude, lng: res.drop_longitude, formatted_address: res.drop_open_address });
                handleInputChange(0, 'full_name_pickup', res.pickup_contact_person);
                handleInputChange(0, 'full_name_drop', res.drop_contact_person);
                handleInputChange(0, 'phone_number_pickup', res.pickup_contact_phone);
                handleInputChange(0, 'phone_number_drop', res.drop_contact_phone);
                handleInputChange(0, 'comment_pickup', 'None');
                handleInputChange(0, 'comment_drop', 'None');
                handleInputChange(0, 'choosenMethod', res.payment_type_value === "Cash Upon Pickup" ? 1 : res.payment_type_value === "Cash Upon Delivery" ? 2 : 3);
                handleInputChange(0, 'size', res.package_size);
                handleInputChange(0, 'total', res.total_cost);
                handleInputChange(0, 'chosenAddons', res.package_addons);
                handleInputChange(0, 'total', res.total_cost);
            })
        }
        }, []);

    const next = (nbr, data) => {
        setCurrent(nbr);
        dispatch(nbr === 1 || nbr === 2 ? addAddresses(data) : addSummary(data));
    }

    const handleInputChange = (index, field, value) => {
        setInputs(prevInputs => {
          const newInputs = [...prevInputs]; // Create a shallow copy of the inputs array
          const updatedInput = { ...newInputs[index] }; // Create a shallow copy of the object to be updated
          updatedInput[field] = value; // Update the specific field in the copied object
          newInputs[index] = updatedInput; // Replace the object in the copied array
          return newInputs; // Return the updated array
        });
    };
    
    const steps = [
        <Step1 next={next} isEdit={isEdit} inputs={inputs} setInputs={setInputs} handleInputChange={handleInputChange} id={id} />,
        <Step2 next={next} isEdit={isEdit} inputs={inputs} setInputs={setInputs} handleInputChange={handleInputChange} />,
        <Step3 setStep={setCurrent} setIsEdit={setIsEdit} inputs={inputs} setInputs={setInputs} handleInputChange={handleInputChange} id={id} />
    ]
  return (
    <div className='bg-neutral-50 h-screen w-full py-6 px-10 overflow-auto'>
        <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">Packages</div>
        <div className='mt-6 gap-[9px] flex flex-row items-center'>
            <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Packages</div> 
            <img src={ArrowLeft} className='w-4 h-4' />
            <div className="text-red-800 text-xs font-normal font-['Rubik'] leading-none">New packages</div>
        </div>
        <div className="w-full h-[55px] px-6 py-4 mt-6 bg-white rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="xl:px-[262px] px-[100px] justify-center items-center inline-flex">
                <div className="justify-center items-center gap-[34px] inline-flex">
                    <div className="justify-start items-center gap-2 flex">
                        <div className={`w-[23px] h-[23px] rounded-full border ${current === 1 || current === 0 || current === 2 ? 'bg-red-800' : 'border-black'} flex items-center justify-center relative`}>
                            <div className={`text-center ${current === 1 || current === 0 || current === 2 ? 'text-white' : 'text-zinc-800'} text-sm font-normal font-['Rubik'] leading-tight`}>1</div>
                        </div>
                        <div className={`text-center ${current === 1 || current === 0 || current === 2 ? 'text-red-800' : 'text-zinc-800'} text-sm font-normal font-['Rubik'] leading-tight`}>Addresses Details</div>
                    </div>
                    <div className="justify-start items-center gap-2 flex">
                        <div className={`w-[23px] h-[23px] rounded-full border ${current === 1 || current === 2 ? 'bg-red-800' : 'border-black'} flex items-center justify-center relative`}>
                            <div className={`text-center ${current === 1 || current === 2 ? 'text-white' : 'text-zinc-800'} text-sm font-normal font-['Rubik'] leading-tight`}>2</div>
                        </div>
                        <div className={`text-center ${current === 1 || current === 2  ? 'text-red-800' : 'text-zinc-800'} text-sm font-normal font-['Rubik'] leading-tight`}>Package Details & Payment</div>
                    </div>
                    <div className="justify-start items-center gap-2 flex">
                        <div className={`w-[23px] h-[23px] rounded-full border ${current === 2 ? 'bg-red-800' : 'border-black'} flex items-center justify-center relative`}>
                            <div className={`text-center ${current === 2 ? 'text-white' : 'text-zinc-800'} text-sm font-normal font-['Rubik'] leading-tight`}>3</div>
                        </div>
                        <div className={`text-center ${current === 2 ? 'text-red-800' : 'text-zinc-800'} text-sm font-normal font-['Rubik'] leading-tight`}>Order Summary</div>
                    </div>
                </div>
            </div>
        </div>
        {
            steps[current]
        }
    </div>
  )
}

export default CreatePackages