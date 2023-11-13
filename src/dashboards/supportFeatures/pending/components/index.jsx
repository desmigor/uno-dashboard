import { React, useState, useEffect } from "react";
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
import { DirectionsRenderer, GoogleMap, InfoBox, InfoBoxF, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 5.614818, // default latitude
  lng: -0.205874, // default longitude
};

const libraries = ['places'];

function Pending() {
  const { resolutionPackages } = useSelector((state) => state.fetchPending);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [destinations, setDestinations] = useState();
  const [pickup, setPickup] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingAction());
  }, []);

  useEffect(() => {
    calculateRoute();
  }, [selectedItem]);


  // define selectedIndex state

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
    libraries,
  });

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const originLatLng = new google.maps.LatLng(selectedItem?.package?.pickup_latitude, selectedItem?.package?.pickup_longitude);
    const destinationLatLng = new google.maps.LatLng(selectedItem?.package?.drop_latitude, selectedItem?.package?.drop_longitude);
    const results = await directionsService.route({
      origin: originLatLng,
      destination: destinationLatLng,
      provideRouteAlternatives: false,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setPickup({lat: results.routes[0].legs[0].start_location.lat(), lng: results.routes[0].legs[0].start_location.lng()});
    setDestinations({lat: results.routes[0].legs[0].end_location.lat(), lng: results.routes[0].legs[0].end_location.lng()});
}

  console.log(selectedItem, 'KKK')
  return (
    console.log(typeof(resolutionPackages)),
    <div className="bg-[#F8F9FA] h-screen w-full overflow-hidden">
      <div className="w-full h-[100%] mx-auto flex flex-row gap-0 relative">
        {/* Left Column */}
        <div className="2xl:w-[55%] w-full h-[100%] content-center">
          <div className="p-4 w-full min-h-[125px] pl-[41px] pr-5 pt-5 pb-0 bg-white border-b border-gray-100 flex-col justify-end items-start gap-[18px] inline-flex">
            <div>
              <span className="text-zinc-800 text-2xl font-bold font-rubik">
                Pending Support{" "}
              </span>
              <span className="text-gray-400 text-base font-semibold font-rubik leading-tight">
                {" "}
                - 2 packages
              </span>
            </div>
            {/* Sort Filter by Date Dropdown */}
            <div className="flex flex-row gap-4 mt-4 mb-5">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight mt-3">
                Sort by
              </div>
              <div className="">
                <select
                  id="sortDropdown"
                  className="block w-full h-10 px-4 py-2 border rounded-xl #ECEEF0  text-gray-400 text-sm font-normal font-rubik leading-tight"
                >
                  <option value="time">Time</option>
                  <option value="amount">amount</option>
                </select>
              </div>
              {/* Search Bar */}
              <div className="">
                <input
                  type="text"
                  placeholder=" Search package"
                  className="w-full justify-center items-center flex h-10 px-4 py-2 border rounded-xl #ECEEF0 text-gray-300 text-sm font-normal font-rubik leading-tight"
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
                    console.log(item.id);
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
        <div class={`2xl:w-[45%] w-[70%] 2xl:flex ${selectedItem ? 'flex absolute top-0 right-0 shadow-lg' : 'hidden'} px-10 h-full pb-32 bg-white border-l border-gray-100 flex-col items-center pt-5 overflow-y-auto`}>
          <div class="self-stretch justify-center items-center gap-1 inline-flex"></div>
          <div class="self-stretch flex-col justify-start items-start gap-6 inline-flex">
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
            <div class="w-[100%] h-[307px] relative flex justify-center rounded-xl">
              {loadError && <div>Error loading maps</div>}
            {!isLoaded ? <div>Loading maps</div> :
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={14}
                  center={selectedItem ? { lat: selectedItem?.package?.pickup_latitude, lng: selectedItem?.package?.pickup_longitude } : center}
                  options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                  }}
                >
                   {directionsResponse && <InfoBoxF
                        position={pickup}
                        options={{ closeBoxURL: "", enableEventPropagation: true }}
                    >
                            <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 relative">
                                  <div className="w-4 h-4 border border-red-800 rounded-full flex items-center justify-center" >
                                      <div className="w-[9.60px] h-[9.60px] bg-red-800 rounded-full" />
                                  </div>
                              </div>
                            </div>
                    </InfoBoxF>}
                    {directionsResponse && <InfoBoxF
                        position={destinations}
                        options={{ closeBoxURL: "", enableEventPropagation: true }}
                    >
                        <div className="w-[35px] h-[35px] bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center" >
                                    <div className="w-[9.60px] h-[9.60px] bg-green-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </InfoBoxF>}
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} options={{
                            suppressMarkers: true,
                            polylineOptions: {
                                strokeColor: '#1EC10F',
                                strokeWeight: 5
                            }
                        }}  />
                    )}
                </GoogleMap>
              }

              {selectedItem && <div class="p-3 bottom-4 w-[90%] absolute bg-white rounded-[10px] shadow flex-col justify-start items-start gap-2.5 inline-flex">
                <div class="justify-start w-full items-start inline-flex">
                  <div class="justify-start w-[60%] items-start gap-1.5 flex">
                    <img src={Location} className="w-4 h-4" />
                    <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                      <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                        Current location
                      </div>
                      <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                        {selectedItem?.package?.pickup_open_address}
                      </div>
                    </div>
                  </div>
                  <div class="justify-start w-[20%] items-start gap-10 flex">
                    <div class="justify-start items-start gap-1.5 flex">
                      <img src={Routing} className="w-4 h-4" />
                      <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                          Distance left
                        </div>
                        <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                          {selectedItem?.package?.time_left?.distance} km

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="justify-start w-[20%] items-start gap-10 flex">
                    <div class="justify-start items-start gap-1.5 flex">
                      <img src={Clock} className="w-4 h-4" />
                      <div class="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div class="text-zinc-800 text-xs font-normal font-rubik leading-none">
                          Time left
                        </div>
                        <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
                          {selectedItem?.package?.time_left?.distance} min
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
              </div>}
            </div>
            <div class="flex-col justify-start items-start gap-6 flex w-[100%]">
              <div class="flex-col justify-start items-start gap-4 flex w-[100%]">
                <div class="text-zinc-800 text-base font-semibold font-rubik leading-tight mt-4">
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
          <img onClick={() => setSelectedItem()} className="absolute cursor-pointer 2xl:hidden block top-5 right-5 w-10 h-10" src={Close} />
        </div>
      </div>
    </div>
  );
}

export default Pending;
