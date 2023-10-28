import { Fragment } from "react";

import { Tab } from "@headlessui/react";
import PendingTabsContent from "./tabsContent";

function PendingTabs() {
  return (
    <Tab.Group manual>
      <Tab.List className="w-[612px] h-12 p-1.5 bg-neutral-100 rounded-[10px] border border-gray-100 justify-between items-center inline-flex">
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              class={
                "w-[100px] h-9 px-[22px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-['Rubik'] leading-tight" +
                  (selected ? " text-zinc-800" : " text-slate-500")
                }
              >
                Package
              </div>
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              class={
                "w-[100px] h-9 px-[22px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-['Rubik'] leading-tight" +
                  (selected ? " text-zinc-800" : " text-slate-500")
                }
              >
                Customer
              </div>
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              class={
                "w-[135px] h-9 px-[22px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-['Rubik'] leading-tight" +
                  (selected ? " text-zinc-800" : " text-slate-500")
                }
              >
                Delivery Point
              </div>
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              class={
                "w-[126px] h-9 px-[22px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-['Rubik'] leading-tight" +
                  (selected ? " text-zinc-800" : " text-slate-500")
                }
              >
                Pickup Point
              </div>
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              class={
                "w-[108px] h-9 px-[22px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-['Rubik'] leading-tight" +
                  (selected ? " text-zinc-800" : " text-slate-500")
                }
              >
                Courier
              </div>
            </div>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <PendingTabsContent />
        </Tab.Panel>
        <Tab.Panel>
          <PendingTabsContent />
        </Tab.Panel>
        <Tab.Panel>
          <PendingTabsContent />
        </Tab.Panel>
        <Tab.Panel>
          <PendingTabsContent />
        </Tab.Panel>
        <Tab.Panel>
          <PendingTabsContent />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default PendingTabs;
