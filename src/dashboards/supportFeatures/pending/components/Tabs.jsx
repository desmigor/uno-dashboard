import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@headlessui/react";
import PendingPackageContent from "./PackageTabContent";
import CustomerTabContent from "./CustomerTabContent ";
import boxImage from "../../../../assets/images/dashboard/image/box.png";
import profile from "../../../../assets/images/dashboard/image/image-3.png";
import map from "../../../../assets/images/dashboard/image/map.png";
import LocationPointContent from "./LocationPointTabContent";
import CourierTabContent from "./CourierTabContent";
import NoOrderDetails from "./ui/NoOrderDetails";
import { fetchOneCourierAction } from "../../../../redux/actions/fetchOneCourierAction";
import { fetchOneCustomerAction } from "../../../../redux/actions/fetchOneCustomerAction";

function PendingTabs({ item }) {
  const { courier } = useSelector((state) => state.fetchOneCourier);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      dispatch(fetchOneCourierAction(item.package.courier));
      dispatch(fetchOneCustomerAction(item.package.customer));
    }
  }, [item]);

  return (
    <Tab.Group manual>
      <Tab.List className="w-[100%] h-12 p-1.5 bg-neutral-100 rounded-[10px] border border-gray-100 justify-between items-center inline-flex">
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              class={
                "w-[100px] h-9 px-[18px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
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
                "w-[100px] h-9 px-[18px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
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
                "w-[126px] h-9 px-[18px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
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
                "w-[135px] h-9 px-[18px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-rubik leading-tight" +
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
                "w-[108px] h-9 px-[18px] py-2 rounded-md justify-start items-center gap-2.5 inline-flex cursor-pointer" +
                (selected ? " bg-white" : "")
              }
            >
              <div
                class={
                  "text-center text-sm font-normal font-rubik leading-tight cursor-pointer" +
                  (selected ? " text-zinc-800" : " text-slate-500")
                }
              >
                Courier
              </div>
            </div>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="w-[100%]">
        <Tab.Panel>
          {item ? (
            <PendingPackageContent
              image={boxImage}
              prop1={{
                title: "size",
                value:
                  item.package.relative_size == 1
                    ? "Small"
                    : item.package.relative_size == 2
                    ? "Medium"
                    : "Large",
              }}
              prop2={{
                title: "Package Add-ons",
                value: item.package.frangible ? "Frangible" : "Non-Frangible",
              }}
              prop3={{
                title: "Payment Method",
                value:
                  item.package.payment_type == 1
                    ? "Cash on pickup"
                    : item.package.payment_type == 2
                    ? "Cash on delivery"
                    : item.package.payment_type == 3
                    ? "Momo Pay"
                    : "Unknown",
              }}
              prop4={{ title: "Amount", value: item.package.total_cost }}
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
        <Tab.Panel>
          {item ? (
            <CustomerTabContent
              image={profile}
              prop1={{
                title: "Name",
                value: item.package?.customer?.full_name,
              }}
              prop2={{ title: "Email", value: "joelmatak123@gmail.com" }}
              prop3={{ title: "Phone", value: "(234) 567-8901" }}
              prop4={{ title: "Location", value: "Ghana, Accra" }}
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
        <Tab.Panel>
          {item ? (
            <LocationPointContent
              image={map}
              prop1={{
                title: "Name",
                value: item.package.pickup_contact_person,
              }}
              prop2={{
                title: "Pickup comment",
                value: item.package.pickup_landmark,
              }}
              prop3={{
                title: "Phone",
                value: item.package.pickup_contact_phone,
              }}
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
        <Tab.Panel>
          {item ? (
            <LocationPointContent
              image={map}
              prop1={{ title: "Name", value: item.package.drop_contact_person }}
              prop2={{
                title: "Delivery Note",
                value: item.package.drop_landmark,
              }}
              prop3={{ title: "Phone", value: item.package.drop_contact_phone }}
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
        <Tab.Panel>
          {item ? <CourierTabContent /> : <NoOrderDetails />}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default PendingTabs;
