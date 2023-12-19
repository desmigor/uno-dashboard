import { React, useEffect, Fragment } from "react";
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
import ProfileNone from "../../../../assets/images/dashboard/image/image.png";

function PendingTabs({ item }) {
  const { courier } = useSelector((state) => state.fetchOneCourier);
  const { customer } = useSelector((state) => state.fetchOneCustomer);
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
              image={
                customer?.profile_photo_link
                  ? customer?.profile_photo
                  : ProfileNone
              }
              prop1={{
                title: "Name",
                value: customer?.full_name,
              }}
              prop2={{ title: "Email", value: customer?.email }}
              prop3={{
                title: "Phone",
                value: "+" + customer?.country_code + customer?.phone_number,
              }}
              prop4={{
                title: "Location",
                value: customer?.address ? customer?.address : "N/A",
              }}
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
        <Tab.Panel>
          {item ? (
            <LocationPointContent
              location={
                window.google?
                new google.maps.LatLng(item?.package?.pickup_latitude, item?.package?.pickup_longitude)
                :
                null
              }
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
              location={
                window.google?
                new google.maps.LatLng(item?.package?.drop_latitude, item?.package?.drop_longitude)
                :
                null
              }
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
        <Tab.Panel>
          {item ? (
            <CourierTabContent
              image={
                courier?.profile_photo_link
                  ? courier?.profile_photo_link
                  : ProfileNone
              }
              prop1={{
                title: "Name",
                value: customer?.full_name,
              }}
              prop2={{
                title: "Phone",
                value: "+" + courier?.country_code + courier?.phone_number,
              }}
              prop3={{ title: "country", value: courier?.country  ? courier?.country : "N/A"}}
              prop4={{ title: "Vehicle", value: courier?.vehicle_name  ? courier?.vehicle_name : "N/A" }}
              prop5={{ title: "Total trips", value: courier?.total_delivery }}
              prop6={{ title: "Total revenue", value: courier?.total_revenue }}
              rating={courier?.rating ? courier?.rating : "0.0"}
            />
          ) : (
            <NoOrderDetails />
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default PendingTabs;
