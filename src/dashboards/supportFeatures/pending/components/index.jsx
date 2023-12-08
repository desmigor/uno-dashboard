import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import OrderResolution from "./orderResolution";
import PendingPackage from "./pendingPackage";
import Location from "../../../../assets/images/dashboard/icon/location-red.svg";
import Routing from "../../../../assets/images/dashboard/icon/routing-2.svg";
import Clock from "../../../../assets/images/dashboard/icon/clock.svg";
import Close from "../../../../assets/images/dashboard/icon/close-thin.svg";
import PendingTabs from "./Tabs";
import { fetchPendingAction } from "../../../../redux/actions/fetchPendingAction";
import NoPendingEmpty from "./ui/NoPendingEmpty";
import NoOrderResoultion from "./ui/OrderNoResolution";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoBox,
  InfoBoxF,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { Menu, Transition } from "@headlessui/react";
import ArrowDown from "../../../../assets/images/dashboard/icon/arrow-down.svg";
import SearchIcon from "../../../../assets/images/dashboard/icon/search-normal2.svg";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 5.614818, // default latitude
  lng: -0.205874, // default longitude
};

const libraries = ["places"];

function Pending() {
  const { resolutionPackages } = useSelector((state) => state.fetchPending);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [destinations, setDestinations] = useState();
  const [pickup, setPickup] = useState();
  const [searchId, setSearchId] = useState();
  const [SortText, setSortText] = useState("Creation Time");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingAction());
  }, []);

  useEffect(() => {
    calculateRoute();
  }, [selectedItem]);

  useEffect(() => {
    if (resolutionPackages.length > 0 && window.innerWidth >= 1280) {
      setSelectedItem(resolutionPackages[0]);
    }
  }, [resolutionPackages]);

  // define selectedIndex state

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY",
    libraries,
  });

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const originLatLng = new google.maps.LatLng(
      selectedItem?.package?.pickup_latitude,
      selectedItem?.package?.pickup_longitude
    );
    const destinationLatLng = new google.maps.LatLng(
      selectedItem?.package?.drop_latitude,
      selectedItem?.package?.drop_longitude
    );
    const results = await directionsService.route({
      origin: originLatLng,
      destination: destinationLatLng,
      provideRouteAlternatives: false,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setPickup({
      lat: results.routes[0].legs[0].start_location.lat(),
      lng: results.routes[0].legs[0].start_location.lng(),
    });
    setDestinations({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });
  }

  return (
    <div className="bg-[#F8F9FA] h-screen w-full overflow-hidden">
      <div className="w-full h-[100%] mx-auto flex flex-row gap-0 relative">
        {/* Left Column */}
        <div className="xl:w-[50%] w-full h-[100%] content-center">
          <div className="p-4 w-full min-h-[125px] pl-[41px] pr-5 pt-5 pb-0 bg-white border-b border-gray-100 flex-col justify-end items-start gap-[18px] inline-flex">
            <div>
              <span className="text-zinc-800 text-2xl font-bold font-rubik">
                Pending Support{" "}
              </span>
              <span className="text-gray-400 text-base font-semibold font-rubik leading-tight">
                {" "}
                - {resolutionPackages?.length}
                {" Packages"}
              </span>
            </div>
            {/* Sort Filter by Date Dropdown */}
            {/* <div className="flex flex-row gap-4 ">
              
            </div> */}

            <div className="flex flex-row gap-4 mt-3 mb-4">
              <div className="h-10 justify-start items-center gap-2.5 inline-flex">
                <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">
                  Sort by
                </div>
                <Menu>
                  <div className="">
                    <Menu.Button>
                      <div className=" w-[140px] h-10 px-3 bg-white rounded-xl border border-gray-100 justify-between items-center flex">
                        <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">
                          {SortText}
                        </div>
                        <div className="w-3 h-3 justify-center items-center flex">
                          <div className="w-3 h-3 relative">
                            <img src={ArrowDown} className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute z-50 right-[80%] p-4 top-[13%] h-[160px] w-[120px] bg-white rounded-xl shadow flex-col justify-start items-start gap-3 inline-flex cursor-pointer">
                        <Menu.Item
                          onClick={() => {
                            setSortText("Creation Time");
                            dispatch(fetchPendingAction(searchId, "-created_at"));
                          }}
                        >
                          <div className="text-zinc-800 text-xs font-normal font-rubik leading-none w-[100%] h-[100%]">
                            Creation Time
                          </div>
                        </Menu.Item>
                        <div className="w-full h-[1px] bg-[#D0D4D9]" />
                        <Menu.Item
                          onClick={() => {
                            setSortText("Delivery time");
                            dispatch(fetchPendingAction(searchId, "-package__delivery_date"));
                          }}
                        >
                          <div className="text-zinc-800 text-xs font-normal font-rubik leading-none w-[100%] h-[100%]">
                            Delivery time
                          </div>
                        </Menu.Item>
                        <div className="w-full h-[1px] bg-[#D0D4D9]" />
                        <Menu.Item
                          onClick={() => {
                            setSortText("Cost");
                            dispatch(fetchPendingAction(searchId, "-package__total_cost"));
                          }}
                        >
                          <div className="text-zinc-800 text-xs font-normal font-rubik leading-none w-[100%] h-[100%]">
                            Cost
                          </div>
                        </Menu.Item>
                        <div className="w-full h-[1px] bg-[#D0D4D9]" />
                        <Menu.Item
                          onClick={() => {
                            setSortText("Distance");
                            dispatch(fetchPendingAction(searchId, "-package__distance_as_km"));
                          }}
                        >
                          <div className="text-zinc-800 text-xs font-normal font-rubik leading-none w-[100%] h-[100%]">
                            Distance
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </div>
                </Menu>
              </div>

              <div className="w-[272px] h-10 px-4 py-[13px] bg-white rounded-xl border border-gray-100 justify-start items-center gap-2.5 inline-flex">
                <div className="w-4 h-4 justify-center items-center flex">
                  <div className="w-4 h-4 relative">
                    <img src={SearchIcon} className="w-4 h-4" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search by Tracking ID"
                  value={searchId}
                  className="text-zinc-800 text-sm font-normal font-rubik leading-tight border-transparent focus:border-transparent focus:ring-0 "
                  onChange={(e) => {
                    setSearchId(e.target.value);
                    dispatch(fetchPendingAction(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col h-screen pb-64 items-center overflow-auto">
            {/* loop through resolutionPackages */}
            {resolutionPackages?.length > 0 ? (
              resolutionPackages?.map((item) => (
                <PendingPackage
                  selected={selectedItem === item ? true : false}
                  tracking_id={item.id}
                  pickup_point={item.package.pickup_open_address}
                  delivery_point={item.package.drop_open_address}
                  time={item.package.delivery_date}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                />
              ))
            ) : (
              <NoPendingEmpty />
            )}
          </div>
        </div>
        {/* Right Column */}
        {/* <div className="flex flex-col md:flex-row justify-center items-center"> */}
        <div
          className={`xl:w-[50%] w-[70%] xl:flex ${
            selectedItem ? "flex absolute top-0 right-0 shadow-lg" : "hidden"
          } px-10 h-full pb-32 bg-white border-l border-gray-100 flex-col items-center pt-5 overflow-y-auto`}
        >
          <div className="self-stretch justify-center items-center gap-1 inline-flex"></div>
          <div className="self-stretch flex-col justify-start items-start gap-6 inline-flex">
            <div>
              <span className="text-gray-400 text-base font-normal font-rubik leading-tight">
                Tracking ID:
              </span>
              <span className="text-gray-400 text-sm font-normal font-rubik leading-tight">
                {" "}
              </span>
              <span className="text-zinc-800 text-base font-semibold font-rubik leading-tight">
                #TK-0023{" "}
              </span>
            </div>
            <div className="w-[100%] h-[307px] relative flex justify-center rounded-xl">
              {loadError && <div>Error loading maps</div>}
              {!isLoaded ? (
                <div>Loading maps</div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={14}
                  center={
                    selectedItem
                      ? {
                          lat: selectedItem?.package?.pickup_latitude,
                          lng: selectedItem?.package?.pickup_longitude,
                        }
                      : center
                  }
                  options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                  }}
                >
                  {directionsResponse && (
                    <InfoBoxF
                      position={pickup}
                      options={{
                        closeBoxURL: "",
                        enableEventPropagation: true,
                      }}
                    >
                      <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 border border-red-800 rounded-full flex items-center justify-center">
                            <div className="w-[9.60px] h-[9.60px] bg-red-800 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </InfoBoxF>
                  )}
                  {directionsResponse && (
                    <InfoBoxF
                      position={destinations}
                      options={{
                        closeBoxURL: "",
                        enableEventPropagation: true,
                      }}
                    >
                      <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center">
                            <div className="w-[9.60px] h-[9.60px] bg-green-600 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </InfoBoxF>
                  )}
                  {directionsResponse && (
                    <DirectionsRenderer
                      directions={directionsResponse}
                      options={{
                        suppressMarkers: true,
                        polylineOptions: {
                          strokeColor: "#1EC10F",
                          strokeWeight: 5,
                        },
                      }}
                    />
                  )}
                </GoogleMap>
              )}

              {selectedItem && (
                <div className="p-3 bottom-4 w-[90%] absolute bg-white rounded-[10px] shadow flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="justify-start w-full items-start inline-flex">
                    <div className="justify-start w-[60%] items-start gap-1.5 flex">
                      <img src={Location} className="w-4 h-4" />
                      <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">
                          Current location
                        </div>
                        <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
                          {selectedItem?.package?.pickup_open_address}
                        </div>
                      </div>
                    </div>
                    <div className="justify-start w-[20%] items-start gap-10 flex">
                      <div className="justify-start items-start gap-1.5 flex">
                        <img src={Routing} className="w-4 h-4" />
                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                          <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">
                            Distance left
                          </div>
                          <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
                            {selectedItem?.package?.time_left?.distance} km
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="justify-start w-[20%] items-start gap-10 flex">
                      <div className="justify-start items-start gap-1.5 flex">
                        <img src={Clock} className="w-4 h-4" />
                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                          <div className="text-zinc-800 text-xs font-normal font-rubik leading-none">
                            Time left
                          </div>
                          <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
                            {selectedItem?.package?.time_left?.distance} min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-col justify-start items-start gap-6 flex w-[100%]">
              <div className="flex-col justify-start items-start gap-4 flex w-[100%]">
                <div className="text-zinc-800 text-base font-semibold font-rubik leading-tight mt-4">
                  Order Details
                </div>
                <PendingTabs item={selectedItem} />
              </div>
            </div>
            {selectedItem == null ? (
              <NoOrderResoultion />
            ) : (
              <OrderResolution item={selectedItem} />
            )}
          </div>
          <img
            onClick={() => setSelectedItem()}
            className="absolute cursor-pointer xl:hidden block top-5 right-5 w-10 h-10"
            src={Close}
          />
        </div>
      </div>
    </div>
  );
}

export default Pending;
