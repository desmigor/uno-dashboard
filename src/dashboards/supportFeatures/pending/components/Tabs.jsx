import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import PendingPackageContent from "./PackageTabContent";
import CustomerTabContent from "./CustomerTabContent ";
import boxImage from "../../../../assets/images/dashboard/image/box.png";
import profile from "../../../../assets/images/dashboard/image/image-3.png";

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
          <PendingPackageContent
          image={boxImage}
          prop1={{title:"size", value:"medium"}}
          prop2={{title:"Package Add-ons", value:"Fragile"}}
          prop3={{title:"Payment Method", value:"Credit Card"}}
          prop4={{title:"Amount", value:"$20.09"}}
          />
        </Tab.Panel>
        <Tab.Panel>
          <CustomerTabContent
          image={profile}
          prop1={{title:"Name", value:"Joel Matakanson"}}
          prop2={{title:"Email", value:"joelmatak123@gmail.com"}}
          prop3={{title:"Phone", value:"(234) 567-8901"}}
          prop4={{title:"Location", value:"Ghana, Accra"}}
           />
        </Tab.Panel>
        <Tab.Panel>
          <PendingPackageContent />
        </Tab.Panel>
        <Tab.Panel>
          <PendingPackageContent />
        </Tab.Panel>
        <Tab.Panel>
          <PendingPackageContent />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default PendingTabs;
