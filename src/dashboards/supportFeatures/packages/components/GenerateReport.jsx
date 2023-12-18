import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react';
import CloseIcon from '../../../../assets/images/dashboard/icon/close-icon.svg';
import DeactivateIcon from '../../../../assets/images/dashboard/icon/deactivate.svg';
import DeleteIcon from '../../../../assets/images/dashboard/icon/delete.svg';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelPackage } from '../../../../redux/actions/fetchPackagesAction';
import Spinner from '../../../../components/ui/spinner';
import { fetchGroupDetailsAction, generateReport, updateGroupAction } from '../../../../redux/actions/fetchCouriersAction';
import moment from 'moment';
import ReportPDF from '../../../../components/ui/ReportPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Datepicker } from 'flowbite-react';
import ReportPackagePDF from '../../../../components/ui/ReportPackagePDF';


const GenerateReportPackages = ({ isOpen, setIsOpen }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [period, setPeriod] = useState('Daily');
    const [value, setValue] = useState({ 
        startDate: moment().format("YYYY-MM-DD"), 
        endDate: moment().format("YYYY-MM-DD"),
    });
    const [data, setData] = useState();

    useEffect(() => {
        handleAction(value);
    }, [value, period]);

    const handleAction = (value) => {
        const payload = {
            time: period === "Daily" ? "daily" : period === "Monthly" ? "monthly" : "custom_date",
            start_date: value.startDate,
            end_date: value.endDate
        }
        console.log(payload, 'klkll')
    }

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
        handleAction(newValue);
    }
        

  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[440px] h-[370px] flex-col justify-start bg-white rounded-2xl items-start inline-flex">
              <div className="w-full p-5">
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Generate Report</div>
                    <img onClick={() => setIsOpen(false)} src={CloseIcon} className='w-6 h-6 cursor-pointer' />
                </div>
                <div className="w-full text-slate-500 text-sm font-normal text-left font-['Rubik'] mt-5 leading-tight">Select period and format of the file your want to generate.</div>
                <div className="w-full h-[74px] flex-col justify-start items-start gap-1.5 inline-flex mt-5">
                    <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Period</div>
                    {/* <div className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Daily</div>
                    </div> */}
                    <Listbox onChange={(item) => setPeriod(item)}>
                        <div className="relative w-full">
                        <Listbox.Button className="self-stretch w-full h-12 px-4 py-[13px] bg-white placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                            <span className="block truncate">{period}</span>
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
                                <Listbox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value='Daily'
                                >
                                {({ selected }) => (
                                    <div className='flex flex-row items-center gap-2.5'>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        Daily
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </div>
                                )}
                                </Listbox.Option>
                                <Listbox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={'Monthly'}
                                >
                                {({ selected }) => (
                                    <div className='flex flex-row items-center gap-2.5'>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        Monthly
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </div>
                                )}
                                </Listbox.Option>
                                <Listbox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={'Custom Date'}
                                >
                                {({ selected }) => (
                                    <div className='flex flex-row items-center gap-2.5'>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        Custom Date
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </div>
                                )}
                                </Listbox.Option>
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                </div>
                <div className="w-full h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Start Date</div>
                    {/* <div className="cursor-pointer self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">12-09-2023</div>
                    </div> */}
                    <Datepicker 
                        className="w-full h-12 bg-white"
                        maxDate={new Date()}
                        color={"red"}
                        icon={undefined}
                        value={period === "Monthly" ? moment(value.startDate).format("MM-YYYY") : moment(value.startDate).format("DD-MM-YYYY")}
                        height={70}
                        onSelectedDateChanged={(val) => {
                            if(period === 'Monthly'){
                                setValue({
                                    startDate: moment(val).startOf("month").format("YYYY-MM-DD"),
                                    endDate: moment(val).endOf("month").format("YYYY-MM-DD"),
                                })
                            }else if (period === "Daily"){
                                setValue({
                                    endDate: moment(val).format("YYYY-MM-DD"),
                                    startDate: moment(val).format("YYYY-MM-DD"),
                                })
                            }else{
                                setValue({
                                    ...value,
                                    startDate: moment(val).startOf("month").format("YYYY-MM-DD"),
                                })
                            }
                        }}
                        theme={{
                            "root": {
                              "base": "relative",
                              "input": {
                                base: "h-12",
                                field: {
                                    base: "h-12",
                                    input: {
                                        base: "w-full h-12 px-4 py-[13px] bg-white placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-2xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex",
                                    }
                                }
                              } 
                            },
                            "popup": {
                              "root": {
                                "base": "absolute top-10 z-50 block pt-2",
                                "inline": "relative top-0 z-auto",
                                "inner": "inline-block rounded-lg bg-white  p-4 shadow-lg dark:bg-gray-700"
                              },
                              "header": {
                                "base": "",
                                "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                                "selectors": {
                                  "base": "flex justify-between mb-2",
                                  "button": {
                                    "base": "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
                                    "prev": "",
                                    "next": "",
                                    "view": ""
                                  }
                                }
                              },
                              "view": {
                                "base": "p-1"
                              },
                              "footer": {
                                "base": "flex mt-2 space-x-2",
                                "button": {
                                  "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                                  "today": "bg-red-800 text-white hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700",
                                  "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                }
                              }
                            },
                            "views": {
                              "days": {
                                "header": {
                                  "base": "grid grid-cols-7 mb-1",
                                  "title": "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
                                },
                                "items": {
                                  "base": "grid w-64 grid-cols-7",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              },
                              "months": {
                                "items": {
                                  "base": "grid w-64 grid-cols-4",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              },
                              "years": {
                                "items": {
                                  "base": "grid w-64 grid-cols-4",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              },
                              "decades": {
                                "items": {
                                  "base": "grid w-64 grid-cols-4",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              }
                            }
                          }
                          }
                    />
                </div>
               {period === "Custom Date" && <div className="w-full h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">End Date</div>
                    {/* <div className="cursor-pointer self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">12-09-2023</div>
                    </div> */}
                    <Datepicker 
                        className="w-full h-12 bg-white"
                        color={"red"}
                        icon={undefined}
                        maxDate={new Date()}
                        height={70}
                        value={moment(value.endDate).format("DD-MM-YYYY")}
                        onSelectedDateChanged={(val) => {
                            console.log(val);
                            setValue({
                                ...value,
                                endDate: moment(val).format("YYYY-MM-DD"),
                            })
                        }}
                        theme={{
                            "root": {
                              "base": "relative",
                              "input": {
                                base: "h-12",
                                field: {
                                    base: "h-12",
                                    input: {
                                        base: "w-full h-12 px-4 py-[13px] bg-white placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-2xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex",
                                    }
                                }
                              } 
                            },
                            "popup": {
                              "root": {
                                "base": "absolute top-10 z-50 block pt-2",
                                "inline": "relative top-0 z-auto",
                                "inner": "inline-block rounded-lg bg-white  p-4 shadow-lg dark:bg-gray-700"
                              },
                              "header": {
                                "base": "",
                                "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                                "selectors": {
                                  "base": "flex justify-between mb-2",
                                  "button": {
                                    "base": "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
                                    "prev": "",
                                    "next": "",
                                    "view": ""
                                  }
                                }
                              },
                              "view": {
                                "base": "p-1"
                              },
                              "footer": {
                                "base": "flex mt-2 space-x-2",
                                "button": {
                                  "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                                  "today": "bg-red-800 text-white hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700",
                                  "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                }
                              }
                            },
                            "views": {
                              "days": {
                                "header": {
                                  "base": "grid grid-cols-7 mb-1",
                                  "title": "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
                                },
                                "items": {
                                  "base": "grid w-64 grid-cols-7",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              },
                              "months": {
                                "items": {
                                  "base": "grid w-64 grid-cols-4",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              },
                              "years": {
                                "items": {
                                  "base": "grid w-64 grid-cols-4",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              },
                              "decades": {
                                "items": {
                                  "base": "grid w-64 grid-cols-4",
                                  "item": {
                                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
                                    "selected": "bg-red-800 text-white font-rubik",
                                    "disabled": "text-gray-500"
                                  }
                                }
                              }
                            }
                          }
                          }
                    />
                </div>}
              </div>
              <div className="w-full h-[90px] pl-[38px] pr-[39px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
                <div className="self-stretch justify-start items-start gap-[27px] inline-flex">
                    <div onClick={() => setIsOpen(false)} className="w-[168px] cursor-pointer h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex">
                        <div className="text-center text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Cancel</div>
                    </div>
                    <PDFDownloadLink document={<ReportPackagePDF item={data} />}>
                        <button className={`w-[168px] cursor-pointer h-[50px] px-[60px] py-[15px] ${data ? 'bg-red-800' : 'bg-gray-300'} rounded-[10px] justify-center items-center gap-2.5 flex`}>
                            {
                                loading ? <Spinner className={'fill-white'} /> : <div className={`text-center ${data ? 'text-white' : 'text-gray-700'} text-base font-normal font-['Rubik'] leading-tight`}>Confirm</div>
                            }
                        </button>
                    </PDFDownloadLink>
                </div> 
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

export default GenerateReportPackages