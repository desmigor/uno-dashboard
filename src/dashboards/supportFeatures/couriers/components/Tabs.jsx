import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'

function Tabs({ setTable, availableCounts, atworkCounts, pausedCounts, offlineCounts, table, paginate }) {
  return (
    <Tab.Group manual>
        <Tab.List className="min-w-[412px] h-12 p-1.5 bg-neutral-100 rounded-[10px] border border-gray-100 justify-start items-center gap-2.5 inline-flex">
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('available')
                    paginate()
                }}
                class={
                    "min-w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow" : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    Available
                </div>

                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'available' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                <div className={`text-center ${table === 'available' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{availableCounts}</div> 
                </div>
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('at-work')
                    paginate()
                }}
                class={
                    "min-w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow " : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    At Work
                </div>
                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'at-work' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                <div className={`text-center ${table === 'at-work' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{atworkCounts}</div>
                </div> 
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('paused')
                    paginate()
                }}
                class={
                    "min-w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow" : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    Paused
                </div>
                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'paused' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                    <div className={`text-center ${table === 'paused' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{pausedCounts}</div>
                </div> 
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('offline')
                    paginate()
                }}
                class={
                    "min-w-[124px] h-9 px-4 py-2 rounded-md justify-start items-center gap-2.5 inline-flex  cursor-pointer" +
                    (selected ? " bg-white shadow" : "")
                }
                >
                <div
                    class={
                    "text-center text-sm font-normal font-rubik leading-tight" +
                    (selected ? " text-zinc-800" : " text-slate-500")
                    }
                >
                    Offline
                </div>
                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'offline' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                    <div className={`text-center ${table === 'offline' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{offlineCounts}</div>
                </div> 
                </div>
            )}
            </Tab>
        </Tab.List>
    </Tab.Group>
  )
}

export default Tabs