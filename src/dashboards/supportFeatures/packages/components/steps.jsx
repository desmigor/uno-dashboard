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
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Step1 = ({ next }) => {
    return (
        <div className="w-full min-h-[891px] p-6 bg-white rounded-[10px] mt-6 flex-col justify-start items-start gap-8 inline-flex mb-24"> 
    <div className='w-full'>   
     <div className="w-[295px] h-[45px] flex-col justify-start items-start gap-2 inline-flex">
         <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Addresses</div>
         <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">You can add up to 10 delivery addresses in one order.</div>
     </div>
     <div className='flex flex-row justify-between flex-wrap mt-[16px] w-full'>
         <div className="w-[460px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Pickup Address</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input type='text' placeholder='Amasaman KG124' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
             <Link to={'/admin/dashboard/package/choose-address'} className='flex flex-row items-center gap-[6px] mt-3 cursor-pointer'>
                 <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight ">Choose address on map</div> 
                 <img src={ArrowLeft2} className='w-4 h-4' />
             </Link>                        
         </div>
         <div className="w-[460px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Delivery Address</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <div className='flex flex-row items-center gap-3'>
                 <input type='text' placeholder='Amasaman KG124' className="w-[406px] self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
                 <img src={AddCircle} className='w-8 h-8 cursor-pointer' />
             </div>
             <Link to={'/admin/dashboard/package/choose-address'} className='flex flex-row items-center gap-[6px] mt-3 cursor-pointer'>
                 <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Choose address on map</div> 
                 <img src={ArrowLeft2} className='w-4 h-4' />
             </Link>  
         </div>
     </div>
</div>
<div className='w-full mt-8'>
     <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Pickup Details</div>
     <div className='flex flex-row justify-between mt-[16px] w-full'>
         <div className="w-[460px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
         <div className="w-[460px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input type='text' placeholder='+233-4823-321-312' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
     </div> 
     <div className="w-[460px] h-[113px] mt-4 flex-col justify-start items-start gap-1.5 inline-flex">
         <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Comment</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
         <textarea placeholder='Leave a comment' className="self-stretch h-[87px] px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" ></textarea> 
     </div>
</div>
<div className='w-full mt-8'>
     <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery Details</div>
     <div className='flex flex-row justify-between mt-[16px] w-full'>
         <div className="w-[460px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Full Name</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input type='text' placeholder='James Marrko' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
         <div className="w-[460px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
             <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
             <input type='text' placeholder='+233-4823-321-312' className="self-stretch h-12 px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" /> 
         </div>
     </div> 
     <div className="w-[460px] h-[113px] mt-4 flex-col justify-start items-start gap-1.5 inline-flex">
         <div><span className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Comment</span><span className="text-red-700 text-sm font-normal font-['Rubik'] leading-tight">*</span></div>
         <textarea placeholder='Leave a comment' className="self-stretch h-[87px] px-4 py-[13px] placeholder:text-gray-300 text-sm font-normal font-['Rubik'] leading-tight text-zinc-800 rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" ></textarea> 
     </div>
</div>
<button onClick={() => next(1)} className='w-[312px] h-[50px] bg-gray-100 rounded-xl justify-center items-center gap-2.5 flex flex-row'>
    <div className="text-center text-gray-400 text-base font-normal font-['Rubik'] leading-tight">Continue</div> 
    <img src={ArrowLeft3} className='w-4 h-4' />
</button>
</div>
    )
}


export const Step2 = ({ next }) => {
    return (
        <div className="w-full min-h-[584px] p-6 bg-white rounded-[10px] mt-6 flex-col justify-start items-start gap-8 inline-flex mb-24"> 
            <div className="w-full h-[91px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Payment Method</div> 
                <div className='w-full mt-4 flex flex-row gap-3.5'>
                    <div className="w-[198px] h-[54px] bg-white rounded-[10px] border border-gray-100 justify-center cursor-pointer items-center gap-1.5 inline-flex">
                        <div className="w-[44px] h-[26px] relative rounded-[3px] bg-[#FFCB05] flex items-center justify-center">
                            <img className="w-8 h-[26px]" src={Mtn} />
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">MTN Mobile Money</div>
                    </div> 
                    <div className="w-[231px] h-[54px] bg-white rounded-[10px] border border-gray-100 justify-center cursor-pointer items-center gap-1.5 inline-flex">
                        <div className="w-[39px] h-[26px] pl-2.5 pr-[9px] py-[3px] bg-neutral-100 rounded-[3px] justify-center items-center inline-flex">
                            <img className="w-5 h-5" src={Voda} />
                        </div>
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Vodafone Mobile Money</div>
                    </div>
                    <div className="w-[177px] h-[54px] bg-white rounded-[10px] border border-gray-100 justify-center cursor-pointer items-center gap-1.5 inline-flex">
                        <img className="w-[34px] h-[17px]" src={Money} />
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Pickup</div>
                    </div> 
                    <div className="w-[186px] h-[54px] bg-white rounded-[10px] border border-gray-100 justify-center cursor-pointer items-center gap-1.5 inline-flex">
                        <img className="w-[34px] h-[17px]" src={Money} />
                        <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Delivery</div>
                    </div> 
                </div>
            </div>
            <div className="w-full h-[91px] flex-col justify-start items-start gap-4 inline-flex mt-8">
                <div className="text-zinc-800 text-lg font-semibold font-['Rubik']">Delivery: Package 1</div> 
                <div className="text-slate-500 text-base font-semibold font-['Rubik'] leading-tight">Package Size</div> 
                <div className='flex flex-row gap-6'>
                    <div className="w-[345px] h-[106px] p-5 bg-white rounded-2xl border border-zinc-200 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="self-stretch h-[66px] relative">
                            <div className="w-[103.04px] left-0 top-0 absolute text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">Small Package</div>
                            <div className="w-[47.40px] left-[257.60px] top-0 absolute text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$6.00</div>
                            <div className="w-[305px] left-0 top-[26px] absolute text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Maximum size should be 20X20 and maximum weight should be 5 kg.</div>
                        </div>
                    </div> 
                    <div className="w-[345px] h-[106px] p-5 rounded-2xl border border-zinc-200 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="self-stretch h-[66px] relative">
                            <div className="w-[119.53px] left-0 top-0 absolute text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">Medium Package</div>
                            <div className="w-[50.49px] left-[254.51px] top-0 absolute text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$11.70</div>
                            <div className="w-[305px] left-0 top-[26px] absolute text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Maximum size should be 20X20 and maximum weight should be 5 kg.</div>
                        </div>
                    </div> 
                    <div className="w-[345px] h-[106px] p-5 bg-white rounded-2xl border border-zinc-200 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="self-stretch h-[66px] relative">
                            <div className="w-[104.07px] left-0 top-0 absolute text-zinc-800 text-sm font-semibold font-['Rubik'] leading-tight">Large Package</div>
                            <div className="w-[57.70px] left-[247.30px] top-0 absolute text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$23.00</div>
                            <div className="w-[305px] left-0 top-[26px] absolute text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Maximum size should be 20X20 and maximum weight should be 5 kg.</div>
                        </div>
                    </div> 
                </div>
                <div className="w-[411px] h-[88px] flex-col justify-start items-start gap-4 inline-flex">
                    <div className="text-slate-500 text-base font-semibold font-['Rubik'] leading-tight">Package Addons</div> 
                    <div className='flex flex-row gap-6'>
                        <div className="w-[165px] h-[52px] bg-white rounded-[10px] border border-gray-100 justify-center items-center gap-1.5 inline-flex">
                            <img src={TickOutile} />
                            <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Fragile Package</div>
                        </div>
                        <div className="w-[222px] h-[52px] bg-white rounded-[10px] border border-gray-100 justify-center items-center gap-1.5 inline-flex">
                            <img src={TickOutile} />
                            <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Insulated food container</div>
                        </div>
                    </div> 
                </div>
                <button onClick={() => next(2)}  className="w-[312px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex mt-4">
                    <div className="text-center text-white text-base font-normal font-['Rubik'] leading-tight">Proceed to Summary</div>
                    <img src={ArrowLeft4} className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}

export const Step3 = () => {
    const [discountExpanded, setDiscountExpanded] = useState(false);
    
    return (
        <div className='w-full flex flex-row justify-between items-start mt-6 mb-24'>
            <div className='w-[70%] h-[789px] p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex'>
                <div className="w-full h-[117px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Addresses</div> 
                        <button className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="w-[716px] h-[45px] justify-start items-start gap-[73px] inline-flex">
                        <div className="w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Pickup Address</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">PPR3+JG6, Amasaman</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Delivery Address</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">PPR3+JG6, Amasaman</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full h-[188px] p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-5 inline-flex"> 
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Package Details & Payment</div> 
                        <button className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="w-[716px] h-[45px] justify-start items-start gap-[73px] inline-flex">
                        <div className="w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Package Size</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Medium</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Package Addons</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Fragile, Insulated food container</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-6 inline-flex">
                        <div className="flex-col justify-start items-start gap-[5px] flex">
                            <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Payment Method</div>
                            <div className="flex flex-row gap-1.5">
                                <img className="w-[34px] h-[17px]" src={Money} />
                                <div className="text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight">Cash on Delivery</div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[194px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Pickup Details</div> 
                        <button className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="w-[716px] h-[45px] justify-start items-start gap-[73px] inline-flex">
                        <div className="w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Full Name</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Michael Larson</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">+233-4823-321-312</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[65px] flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Comment</div>
                        <div className="w-[624px] text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">When you arrive, leave the package at the door if you won’t find anyone at the entrance.</div>
                    </div> 
                </div>
                <div className="w-full h-[194px] p-5 bg-white rounded-lg border border-gray-100 flex-col justify-start items-start gap-3 inline-flex">
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Delivery Details</div> 
                        <button className='flex flex-row gap-1.5'>
                            <div className="text-red-800 text-sm font-normal font-['Rubik'] leading-tight">Back to Edit</div> 
                            <img src={ArrowLeft2} className='w-4 h-4' />
                        </button>
                    </div>
                    <div className="w-[716px] h-[45px] justify-start items-start gap-[73px] inline-flex">
                        <div className="w-[370px] pr-[61px] flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Full Name</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Michael Larson</div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-[5px] flex">
                                <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Phone Number</div>
                                <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">+233-4823-321-312</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[65px] flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Comment</div>
                        <div className="w-[624px] text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">When you arrive, leave the package at the door if you won’t find anyone at the entrance.</div>
                    </div> 
                </div>
            </div>
            <div className='w-[28%] flex flex-col gap-6'>
                <div className='w-full min-h-[343px] p-6 bg-white rounded-[10px] flex-col justify-start items-start gap-4 inline-flex'>
                    <div className="text-gray-900 text-base font-semibold font-['Rubik'] leading-tight">Order Total</div>
                    <div className="w-full h-[22px] justify-between items-start inline-flex">
                        <div className="justify-start items-center gap-1.5 flex">
                            <div className="h-[22px] w-[22px] py-[3px] bg-gray-100 rounded-md justify-center items-center flex">
                                <div className="text-zinc-800 text-xs font-normal font-['Rubik'] leading-none">1</div>
                            </div>
                            <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Package</div>
                        </div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$13.00</div>
                    </div>
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Medium size</div>
                        <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">$11.70</div>
                    </div>
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">Add-ons</div>
                        <div className="text-right text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">$1.30</div>
                    </div>
                    <div className='border border-b-[#D0D4D9] w-full' />
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Subtotal</div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$13.00</div>
                    </div> 
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">Taxes & Other fees</div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$1.00</div>
                    </div>
                    <div className='border border-b-[#D0D4D9] w-full' />
                    <div className="w-full h-5 justify-between items-start inline-flex">
                        <div className="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">Total</div>
                        <div className="text-right text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">$14.00</div>
                    </div>
                    <button className="w-[348px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[18px] justify-center items-center gap-2.5 inline-flex">
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
                    {discountExpanded && <div className="w-[348px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">Discount Code</div>
                        <input type='text' placeholder='SUPPORT@133' className="placeholder:text-zinc-300 text-zinc-800 text-sm font-normal font-['Rubik'] leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex" />
                    </div>}
                    {discountExpanded && <button className="w-[348px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[18px] justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-white text-base font-semibold font-['Rubik'] leading-snug">Apply Code</div>
                    </button>}
                </div>
            </div>
        </div>
    )
}
