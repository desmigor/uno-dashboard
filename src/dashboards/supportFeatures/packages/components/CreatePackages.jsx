import React, { useState } from 'react'
import ArrowLeft from '../../../../assets/images/dashboard/icon/arrow-left-black.svg'
import { Step1, Step2, Step3 } from './steps'

function CreatePackages() {
    const [current, setCurrent] = useState(0);
    
    
    const next = (nbr) => {
        setCurrent(nbr);
    }
    
    const steps = [
        <Step1 next={next} />,
        <Step2 next={next} />,
        <Step3 />
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
            <div className="2xl:px-[262px] px-[100px] justify-center items-center inline-flex">
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