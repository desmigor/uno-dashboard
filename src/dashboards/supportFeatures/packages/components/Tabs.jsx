import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'

function Tabs({ setTable }) {
  return (
    <Tab.Group manual>
        <Tab.List className="w-[412px] h-12 p-1.5 bg-neutral-100 rounded-[10px] border border-gray-100 justify-start items-center gap-2.5 inline-flex">
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => setTable('ongoing')}
                class={
                    "w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow" : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    Ongoing
                </div>

                <div className='w-[27px] h-[19px] px-1.5 rounded-md border border-red-800 justify-start items-center gap-2.5 inline-flex'>
                    <div className="text-center text-red-800 text-xs font-normal font-rubik leading-none">60</div> 
                </div>
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => setTable('completed')}
                class={
                    "w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow " : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    Completed
                </div>
                <div className="w-5 h-[19px] px-1.5 rounded-md border border-gray-100 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-zinc-800 text-xs font-normal font-rubik leading-none">0</div>
                </div> 
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => setTable('canceled')}
                class={
                    "w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow" : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    Canceled
                </div>
                <div className="w-5 h-[19px] px-1.5 rounded-md border border-gray-100 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-zinc-800 text-xs font-normal font-rubik leading-none">0</div>
                </div> 
                </div>
            )}
            </Tab>
        </Tab.List>
    </Tab.Group>
  )
}

export default Tabs