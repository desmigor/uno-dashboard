import React, { useState } from "react";
import ArrowLeft from "../../assets/images/dashboard/icon/arrow-left.svg";
import ArrowLeftGray from "../../assets/images/dashboard/icon/arrow-left-gray.svg";
import Export from "../../assets/images/dashboard/icon/export.svg";
import Person from "../../assets/images/dashboard/image/icon.png";
import Ghana from "../../assets/images/dashboard/image/ghana.png";
import Cube from "../../assets/images/dashboard/icon/cube.png";
import MapImage from "../../assets/images/dashboard/image/map.png";
import Truck from "../../assets/images/dashboard/icon/truck-fast.svg";
import UserSearch from "../../assets/images/dashboard/icon/user-search.svg";
import { Link } from "react-router-dom";
import { GoogleMap, InfoWindow, InfoWindowF, Marker, useLoadScript } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import LocationPin from '../../assets/images/dashboard/icon/location-pin.svg';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 5.614818, // default latitude
  lng: -0.205874, // default longitude
};

const libraries = ['places'];

function TableCard({ type, name, data }) {
  const { locations } = useSelector((state) => state.fetchCouriers);
  const [selectedMarker, setSelectedMarker] = useState(null)

  console.log(selectedMarker);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
    libraries,
  });

  return (
    <div className="w-[49.2%]  0 p-6 bg-white rounded-lg ">
      <div className="flex flex-row justify-between items-center">
        <h1
          className={`text-zinc-800 text-base font-semibold font-rubik leading-tight`}
        >
          {name}
        </h1>
        {type === "map" ? null : (
          <Link
            to={"/support/dashboard/pending"}
            className="w-[73px] flex flex-row gap-[12px]"
          >
            <h1
              className={`${
                data?.length > 0 ? "text-red-800" : "text-gray-400"
              } text-xs font-normal font-rubik leading-none`}
            >
              Show All
            </h1>
            <img
              src={data?.length > 0 ? ArrowLeft : ArrowLeftGray}
              className="w-[13px] h-[13px]"
            />
          </Link>
        )}
      </div>
      <div className="mt-[17px] w-full h-[400px] overflow-auto">
        {type === "pending" ? (
          <div
            class={`relative  ${
              data.length > 0 ? "shadow-sm" : ""
            }  sm:rounded-lg`}
          >
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-[54px] gap-3">
                <img src={Cube} alt="ALTICON" className="w-[100px] h-[100px]" />
                <div className="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">
                  There are no pending resolutions yet
                </div>
              </div>
            ) : (
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-100 position-sticky top-0">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Time
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Tracking #
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Courier
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0
                    ? data?.map((item, idx) => (
                        <tr
                          key={idx}
                          class="bg-white border-b hover:bg-gray-50"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1"
                          >
                            <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                              {item.updated_at.split("T")[0]}{" "}
                              {item.updated_at.split("T")[1].split(".")[0]}
                            </span>
                            <span className="text-gray-400 text-xs font-normal font-rubik leading-none">
                              {item.time}
                            </span>
                          </th>
                          <td class="px-6 py-4">
                            <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                              {item.id}
                            </span>
                          </td>
                          <td class="px-6 py-4">
                            <div className="flex flex-row gap-[6px]">
                              <span className="text-red-800 text-sm font-normal font-rubik underline">
                                {item.package.courier.full_name}
                              </span>
                              <img src={Export} alt="SVGEXPORT" className="" />
                            </div>
                          </td>
                          <td class="py-4">
                            <button className="w-[93px] group hover:bg-red-800 h-7 px-[60px] py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
                              <span className="text-center text-red-800 group-hover:text-white text-sm font-normal font-rubik leading-tight">
                                View
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            )}
          </div>
        ) : type === "ongoing" ? (
          <div
            class={`relative overflow-x-auto ${
              data?.length > 0 ? "shadow-sm" : ""
            }  sm:rounded-lg`}
          >
            {data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-[54px] gap-3">
                <img
                  src={Truck}
                  alt="ALTICON"
                  className="w-[100px] h-[100px]"
                />
                <div className="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">
                  There are no ongoing packages
                </div>
              </div>
            ) : (
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-100 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Tracking #
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Courier
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Status
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0
                    ? data?.map((item, idx) => (
                        <tr
                          key={idx}
                          class="bg-white border-b hover:bg-gray-50"
                        >
                          <th class="px-6 py-4">
                            <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                              {item.sr_number}
                            </span>
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1"
                          >
                            <div className="flex flex-row items-center gap-2">
                              <img
                                className="w-[34px] h-[34px] rounded-[100px] object-cover"
                                src={
                                  item.courier.profile_photo_link
                                    ? item.courier.profile_photo_link
                                    : Person
                                }
                              />
                              <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                                {item.courier.full_name}
                              </div>
                            </div>
                          </th>
                          <td class="px-6 py-4">
                            <div
                              className={`min-w-[106px] h-[19px] px-3 py-1.5 ${
                                item.status === 2
                                  ? "bg-yellow-50"
                                  : "bg-gray-100"
                              } rounded justify-start items-center gap-2.5 inline-flex`}
                            >
                              <span
                                className={`${
                                  item.package_status === 1
                                    ? "text-amber-500"
                                    : item.package_status === 2
                                    ? "text-yellow-500"
                                    : item.package_status === 3
                                    ? "text-blue-500"
                                    : item.package_status === 4
                                    ? "text-green-500"
                                    : item.package_status === 5
                                    ? "text-green-500"
                                    : item.package_status === 6
                                    ? "text-red-500"
                                    : "text-red-500"
                                } text-xs font-normal font-rubik leading-none`}
                              >
                                {item.package_status === 1
                                  ? "Pending courier assignment"
                                  : item.package_status === 2
                                  ? "Pending pickup"
                                  : item.package_status === 3
                                  ? "On the way for pickUp"
                                  : item.package_status === 4
                                  ? "On it's way"
                                  : item.package_status === 5
                                  ? "Delivered"
                                  : item.package_status === 6
                                  ? "Cancelled"
                                  : "Unknwon"}
                              </span>
                            </div>
                          </td>
                          <td class="py-4">
                            <button className="w-[93px] group hover:bg-red-800 h-7 px-[60px] py-[15px] rounded-lg border border-red-800 justify-center items-center gap-2.5 inline-flex">
                              <span className="text-center text-red-800 group-hover:text-white text-sm font-normal font-rubik leading-tight">
                                View
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            )}
          </div>
        ) : type === "courier" ? (
          <div
            class={`relative overflow-x-auto ${
              data.length > 0 ? "shadow-sm" : ""
            }  sm:rounded-lg`}
          >
            {data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-[54px] gap-3">
                <img
                  src={UserSearch}
                  alt="ALTICON"
                  className="w-[100px] h-[100px]"
                />
                <div className="text-center text-gray-300 text-sm font-normal font-rubik leading-tight">
                  There are no available couriers
                </div>
              </div>
            ) : (
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-100 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Name
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Courier Type
                      </span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                        Phone Number
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0
                    ? data.map((item, idx) => (
                        <tr
                          key={idx}
                          class="bg-white border-b hover:bg-gray-50"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-1"
                          >
                            <div className="flex flex-row items-center gap-2">
                              <img
                                className="w-[34px] h-[34px] rounded-[100px] object-cover"
                                src={
                                  item.profile_photo_link
                                    ? item.profile_photo_link
                                    : Person
                                }
                              />
                              <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                                {item.full_name}.
                              </div>
                            </div>
                          </th>
                          <td class="px-6 py-4">
                            <span className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
                              {item.vehicle_type}
                            </span>
                          </td>
                          <td class="px-6 py-4">
                            <div className="flex flex-row gap-[10px] items-center">
                              <img
                                src={Ghana}
                                alt="SVGCOUNTRY"
                                className="w-[25px] h-[25px] rounded-full"
                              />
                              <span className="text-red-800 text-sm font-normal font-rubik underline cursor-pointer">
                                {item.phone_number}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div class="relative w-full h-full overflow-x-auto shadow-sm sm:rounded-lg">
            {loadError && <div>Error loading maps</div>}
            {!isLoaded ? <div>Loading maps</div> :
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={2}
                  center={locations?.length > 0 ? new google.maps.LatLng(locations[0]?.latitude,locations[0]?.longitude) : center}
                  options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                  }}
                >
                  {
                    locations?.map((item, idx) => <Marker key={idx} onClick={() => setSelectedMarker(item)} icon={LocationPin} position={{ lat: item.latitude, lng: item.longitude }}  />)
                  }
                  {selectedMarker && (
                    <InfoWindowF
                      position={{ lat: selectedMarker?.latitude, lng: selectedMarker?.longitude }}
                      onCloseClick={() => {
                        setSelectedMarker(null);
                      }}
                    >
                       <div className="w-[156px] h-12 px-2 py-1.5 bg-white rounded-md shadow justify-start items-center gap-2.5 inline-flex"> 
                          <img className="w-9 h-9" src={selectedMarker?.profile_photo_link} />
                          <div className="w-[154px] h-9 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">Name</div>
                            <div className="w-[100px] justify-start items gap-1.5 inline-flex">
                              <div className="text-red-800 text-xs font-normal font-['Rubik'] underline leading-none">{selectedMarker?.full_name}</div>
                              <img src={Export} alt="SVGEXPORT" className="" />
                            </div>
                          </div> 
                        </div>
                    </InfoWindowF>
                  )}
                </GoogleMap>
              }
          </div>
        )}
      </div>
    </div>
  );
}

export default TableCard;
