import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'

function Tabs({ setTable, ongoingCount, completedCount, canceledCount, table, paginate }) {
  return (
    <Tab.Group manual>
        <Tab.List className="min-w-[412px] h-12 p-1.5 bg-neutral-100 rounded-[10px] border border-gray-100 justify-start items-center gap-2.5 inline-flex">
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('ongoing')
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
                    Ongoing
                </div>

                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'ongoing' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                <div className={`text-center ${table === 'ongoing' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{ongoingCount}</div> 
                </div>
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('completed')
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
                    Completed
                </div>
                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'completed' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                <div className={`text-center ${table === 'completed' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{completedCount}</div>
                </div> 
                </div>
            )}
            </Tab>
            <Tab as={Fragment}>
            {({ selected }) => (
                <div
                onClick={() => {
                    setTable('cancelled')
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
                    Canceled
                </div>
                <div className={`min-w-[27px] h-[19px] px-1.5 rounded-md border ${table === 'canceled' ? 'border-red-800' : 'border-gray-100'} justify-start items-center gap-2.5 inline-flex`}>
                    <div className={`text-center ${table === 'canceled' ? 'text-red-800' : 'text-zinc-800'} text-xs font-normal font-rubik leading-none`}>{canceledCount}</div>
                </div> 
                </div>
            )}
            </Tab>
        </Tab.List>
    </Tab.Group>
  )
}

export default Tabs