import React, { useEffect } from 'react'
import RightArrow from '../../../../assets/images/dashboard/icon/arrow-right.svg';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { createGroupAction, fetchGroupDetailsAction, updateGroupAction } from '../../../../redux/actions/fetchCouriersAction';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/ui/spinner';
import * as Yup from 'yup';

const countries = [
    { name: 'Country' },
    { name: 'Accra' },
    { name: 'Turkey' },
    { name: 'India' },
    { name: 'Rwanda' },
];

const UpdateGroup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const { countries, loading, groupDetails } = useSelector(state => state.fetchCouriers);
    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        fullName: '',
        phone: '',
        email: '',
        country: { id: 0, name: 'Country' },
    });

    useEffect(() => {
        dispatch(fetchGroupDetailsAction(id)).then((res) => {
            setData({ ...data, name: res.data.name, fullName: res.data.owner_name, phone: res.data.owner_phone, email: res.data.owner_email, country: res.data.country });
        })
    }, [])

    useEffect(() => {
        checkValidations();
    }, [data]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        fullName: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().email().required(),
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

    const handleUpdateGroup = (id) => {
        const payload = {
            name: data.name,
            country: data.country.id,
            owner_name: data.fullName,
            owner_phone: data.phone,
            owner_email: data.email,
        }
        dispatch(updateGroupAction(payload, id, navigate));

    }

  return (
    <div className='bg-[#F8F9FA] h-[93%] w-full flex flex-col px-10 py-6 overflow-y-auto pb-32'>
        <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">Courier Groups</div>
        <div className="w-[266px] h-5 justify-start items-center gap-[9px] inline-flex mt-4">
            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Courier Groups</div>
            <img src={RightArrow} alt='SVG' className='w-3 h-3' />
            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Create Group</div>
        </div> 
        <div className="mt-6 w-full h-[494px] p-6 bg-white rounded-[10px] flex-col justify-start items-start inline-flex">
            <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Details</div>
            <div className='flex flex-row mt-[16px] w-full items-center justify-between'>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Group Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <input value={data.name} onChange={(e) => setData({...data, name: e.target.value })} type='text' placeholder='Accra Group' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
                </div>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Country</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <div className="2xl:w-[460px] w-[48%]">
                    <Listbox value={data.country} onChange={(item) => setData({ ...data, country: item })}>
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
                                    <>
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
                                    </>
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

            <div className="text-zinc-800 text-lg font-semibold font-['Rubik'] mt-8">Owner</div>
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
            <div className='flex flex-row mt-[16px] w-full items-center justify-between'>
                <div className="2xl:w-[460px] w-[48%] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Email</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
                    <input value={data.email} onChange={(e) => setData({...data, email: e.target.value })} type='text' placeholder='jamesmarkoo@gmail.com' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
                </div>
            </div>
            <button disabled={!validated} onClick={() => handleUpdateGroup(id)} className={`w-[260px] mt-8 h-[50px] px-[60px] py-[15px] ${validated ? 'bg-red-800' : 'bg-gray-100'} rounded-xl justify-center items-center gap-2.5 inline-flex text-center  ${validated ? 'text-white' : 'text-gray-400'} text-base font-normal font-['Rubik'] leading-tight`}>
                {
                    loading ? <Spinner className={'fill-white'} /> : 'Update Group'
                } 
            </button>
        </div>
    </div>
  )
}

export default UpdateGroup