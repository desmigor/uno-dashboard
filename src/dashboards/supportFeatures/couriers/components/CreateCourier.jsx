import React, { useEffect } from 'react'
import RightArrow from '../../../../assets/images/dashboard/icon/arrow-right.svg';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { addCourierAction, createGroupAction, fetchDetailsCouriers, fetchGroupsAction, fetchVehiclesAction, updateCourierAction } from '../../../../redux/actions/fetchCouriersAction';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../components/ui/spinner';
import * as Yup from 'yup';
import GroupProfile from './GroupProfile';
import { useParams } from 'react-router-dom';

const groups = [
    { name: 'Accra' },
    { name: 'United Arabs Emirates' },
    { name: 'Turnkey' },
    { name: 'India' },
    { name: 'Rwanda' },
];

const CreateCourier = () => {
    const [data, setData] = useState({
        fullName: '',
        phone: '',
        email: '',
        group: {id: 0, name: 'Select Group'},
        vehicle: {id: 0, name: 'Select Vehicle'},
        country: {id: 0, name: 'Select Country'},
    });
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const { groups, loading, vehicles, countries } = useSelector(state => state.fetchCouriers);
    const { id } = useParams();


    useEffect(() => {
        dispatch(fetchGroupsAction());
        dispatch(fetchVehiclesAction());
        if(typeof id !== 'undefined'){
            dispatch(fetchDetailsCouriers(id)).then((res) => {
                setData({ ...data, fullName: res.data.full_name, phone: res.data.phone_number, email: res.data.email, group: { id: res.data.courier_group, name: res.data.courier_group_name }, vehicle: res.data.vehicle_type, country: res.data.country });
            });
        }
    }, []);

    useEffect(() => {
        checkValidations();
    }, [data]);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().email().required(),
        group: Yup.object().shape({
            id: Yup.number().min(1).required(),
            name: Yup.string().required(),
        }).required(),
        vehicle: Yup.object().shape({
            id: Yup.number().min(1).required(),
            name: Yup.string().required(),
        }).required(),
        country: Yup.object().shape({
            id: Yup.number().min(1).required(),
            name: Yup.string().required(),
        }).required()
    });

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

    const handleAddGroup = () => {
        const payload = {
            full_name : data.fullName,
            phone_number : data.phone,
            country: data.country.id,
            vehicle_type: data.vehicle.id,
            language: 1,
            email: data.email,
            courier_group: data.group.id,
            image_base64: "data:image/jpeg;base64,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"
        }
        const payloadUpdates = {
            full_name : data.fullName,
            courier_id: id,
            phone_number : data.phone,
            country: data.country.id,
            vehicle_type: data.vehicle.id,
            language: 1,
            email: data.email,
            courier_group: data.group.id,
            image_base64: "data:image/jpeg;base64,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"
        }
        dispatch(typeof id === 'undefined' ? addCourierAction(payload, navigate) : updateCourierAction(payloadUpdates, navigate));
    }

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full flex flex-col px-10 py-6 overflow-y-auto pb-32'>
        <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">Couriers</div>
        <div className="w-[266px] h-5 justify-start items-center gap-[9px] inline-flex mt-4">
            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Couriers</div>
            <img src={RightArrow} alt='SVG' className='w-3 h-3' />
            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Add Courier</div>
        </div> 
        <div className="mt-6 w-full min-h-[645px] p-6 bg-white rounded-[10px] flex-col justify-start items-start inline-flex">
            <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Contacts</div>
            <div className='flex flex-row mt-[16px] w-full items-center justify-between'>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <input value={data.fullName} onChange={(e) => setData({...data, fullName: e.target.value })} type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
                </div>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <input value={data.phone} onChange={(e) => setData({...data, phone: e.target.value })} type='text' placeholder='+233-998-345-345' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
                </div>
            </div>
            <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Email</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                <input value={data.email} onChange={(e) => setData({...data, email: e.target.value })} type='text' placeholder='markojemeru@gmail.com' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
            </div>

            <div className="text-zinc-800 text-lg font-semibold font-['Rubik'] mt-8">Courier Group</div>
            <div className='flex flex-row mt-[16px] w-full items-center justify-between'>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Group</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <div className="2xl:w-[460px] w-[48%]">
                    <Listbox value={data.group} onChange={(item) => setData({ ...data, group: item })}>
                        <div className="relative">
                        <Listbox.Button className="self-stretch w-full h-12 px-4 py-[13px] bg-white placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                            {data.group.id > 0 && <GroupProfile small={true} name={data.group.name} />}
                            <span className="block truncate">{data.group.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 z-[99] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {groups.map((country, personIdx) => (
                                <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={country}
                                >
                                {({ selected }) => (
                                    <div className='flex flex-row items-center gap-2.5'>
                                    <GroupProfile small={true} name={country.name} />
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {country.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </div>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                    </div>
                </div>
            </div>
            <div className="text-zinc-800 text-lg font-semibold font-['Rubik'] mt-8">Vehicle Details </div>
            <div className='flex flex-row mt-[16px] w-full items-center justify-between z-0'>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Vehicle Type</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <div className="2xl:w-[460px] w-[48%]">
                    <Listbox value={data.vehicle} onChange={(item) => setData({ ...data, vehicle: item })}>
                        <div className="relative">
                        <Listbox.Button className="self-stretch w-full h-12 px-4 py-[13px] bg-white placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                            <span className="block truncate">{data.vehicle.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full z-[99] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {vehicles.map((country, personIdx) => (
                                <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={country}
                                >
                                {({ selected }) => (
                                    <div className='flex flex-row items-center gap-2.5'>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {country.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </div>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                    </div>
                </div>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Country</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <div className="2xl:w-[460px] w-[48%]">
                    <Listbox value={data.group} onChange={(item) => setData({ ...data, country: item })}>
                        <div className="relative">
                        <Listbox.Button className="self-stretch w-full h-12 px-4 py-[13px] bg-white placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                            <span className="block truncate">{data.country.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {countries.map((country, personIdx) => (
                                <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={country}
                                >
                                {({ selected }) => (
                                    <div className='flex flex-row items-center gap-2.5'>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {country.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </div>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                    </div>
                </div>
            </div>
            <button disabled={!validated} onClick={handleAddGroup} className={`w-[260px] mt-8 h-[50px] px-[60px] py-[15px] ${validated ? 'bg-red-800' : 'bg-gray-100'} rounded-xl justify-center items-center gap-2.5 inline-flex text-center  ${validated ? 'text-white' : 'text-gray-400'} text-base font-normal font-['Rubik'] leading-tight`}>
                {
                    loading ? <Spinner className={'fill-white'} /> : typeof id === 'undefined' ? 'Add Courier' : 'Update Courier'
                } 
            </button>
        </div>
    </div>
  )
}

export default CreateCourier