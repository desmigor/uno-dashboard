import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import LocationPin from '../../../../assets/images/dashboard/icon/location-pin.svg';


const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const libraries = ['places'];

export default function LocationPointContent({
  image,
  prop1,
  prop2,
  prop3,
  location,
}) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA1Yd7Zcmj7Vl89ddqfPQnu1dkZhbuS9zY',
    libraries,
  });

  console.log(prop1, 'JJ');
  return (
    <div class="w-[100%]  h-[162px] relative flex flex-row gap-2 items-center bg-white rounded-xl shadow border border-gray-100">
      <div className="w-[160px] h-[130px] rounded-md m-4">
          {loadError && <div>Error loading maps</div>}
          {!isLoaded ? <div>Loading maps</div> :
              <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={location}
                  options={{
                      zoomControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                      streetViewControl: false,
                  }}
              >
                  <Marker visible={true} icon={LocationPin} position={location} />
              </GoogleMap>
          }
      </div>
      <div className="flex flex-col gap-10">
        <div class="flex-row justify-start h-full items-start gap-5 inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop1.title}
            </div>
            <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
              {prop1.value}
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop3.title}
            </div>
            <div class="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
              {prop3.value}
            </div>
          </div>
        </div>
        <div class="flex-col h-full justify-start items-start gap-5 inline-flex">
          <div class="flex-col justify-start items-start gap-[5px] flex">
            <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {prop2.title}
            </div>
            <div class="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              {prop2.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
