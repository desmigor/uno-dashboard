import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MenuIcon from "../../../../assets/images/dashboard/icon/more_vertical.svg";
import AddIcon from "../../../../assets/images/dashboard/icon/add-circle.svg";
import AddPackageSizeModal from "./UI/AddPackageSizeModal";
import AddPackageAddOn from "./UI/AddPackageAddOn";
import {fetchPackageSizesAction,fetchPackageAddOnsAction} from "../../../../redux/actions/fetchPackageSizesAction";


export default function PackageConfigurations() {
  const { packageSizes} = useSelector((state) => state.fetchPackageSizes);
  const { packageAddOns } = useSelector((state) => state.fetchPackageSizes);
  const dispatch = useDispatch();
  const [addSizeModal, setAddSizeModal] = useState(false);
  const [addOnModal, setAddOnModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPackageSizesAction());
    dispatch(fetchPackageAddOnsAction());
  }, []);

  return (
    <div>
      <AddPackageSizeModal
        show={addSizeModal}
        open={addSizeModal}
        onClose={() => setAddSizeModal(false)}
      />
      <AddPackageAddOn
        show={addOnModal}
        open={addOnModal}
        onClose={() => setAddOnModal(false)}
      />

        <div className={`w-[100%] h-[100%] relative bg-white rounded-lg p-6`}>
          <div className="flex flex-row justify-between pb-2">
            <div className="text-zinc-800 text-lg font-semibold font-rubik ">
              Package sizes
            </div>
            <div
              className="h-10 px-[30px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer"
              onClick={setAddSizeModal}
            >
              <div className="text-center text-white text-sm font-normal font-rubik leading-tight">
                Add Size
              </div>
              <div className="w-5 h-5 justify-center items-center flex">
                <div className="w-5 h-5 relative">
                  <img src={AddIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            {packageSizes?.length > 0 && (
            packageSizes?.map((item, index) => (
              <div
                key={index}
                className="w-[340px] h-[200px] relative bg-white rounded-xl shadow border border-gray-100"
              >
                <div className="w-4 h-4 left-[324px] top-[10px] absolute">
                  <div className="left-[-2.67px] top-[-2.67px] absolute">
                    <img src={MenuIcon} alt="" className="h-4" />
                  </div>
                </div>
                <div className="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-3 inline-flex">
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="text-zinc-800 text-sm font-semibold font-rubik] leading-tight">
                      {item.name}
                    </div>
                    <div className="w-[312px] h-[35px] text-gray-400 text-[13px] font-normal font-rubik] leading-tight overflow-auto">
                      {item.description}
                    </div>
                  </div>
                  <hr className="w-[312px] border border-gray-200 border-solid " />
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                        Base Price
                      </div>
                      <div className="text-right text-red-800 text-xs font-semibold font-rubik] leading-none">
                        ${item.price}
                      </div>
                    </div>
                    <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                        First 10km
                      </div>
                      <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                        ${(item.price * 10).toFixed(2)}
                      </div>
                    </div>
                    <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                        Next 15km
                      </div>
                      <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                        ${(item.price * 0.5 * 15).toFixed(2)}
                      </div>
                    </div>
                    <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                        Next 25km
                      </div>
                      <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                        ${(item.price * 0.75 * 25).toFixed(2)}
                      </div>
                    </div>
                    <div className="w-[312px] justify-between items-start inline-flex">
                      <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                        Next n-km
                      </div>
                      <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                        n x ${(item.price * 0.1).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
        <div className="w-[100%] h-[100%] relative bg-white rounded-lg p-6">
          <div className="flex flex-row justify-between pb-2"
          onClick={setAddOnModal}
          >
            <div className="text-zinc-800 text-lg font-semibold font-rubik ">
              Package add-ons
            </div>
            <div className="h-10 px-[30px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer">
              <div className="text-center text-white text-sm font-normal font-rubik leading-tight">
                Add add-on
              </div>
              <div className="w-5 h-5 justify-center items-center flex">
                <div className="w-5 h-5 relative">
                  <img src={AddIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            {
            packageAddOns?.length > 0 && 
            (packageAddOns.map((item, index) => (
              <div
                key={index}
                className="w-[340px] h-[126px] relative bg-white rounded-xl shadow border border-gray-100"
              >
                <div className="w-4 h-4 left-[324px] top-[10px] absolute">
                  <div className="w-[21.33px] h-[21.33px] left-[-2.67px] top-[-2.67px] absolute"></div>
                </div>
                <div className="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-2 inline-flex">
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
                      {item.title}
                    </div>
                    <div className="w-[312px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-red-800 text-sm font-semibold font-rubik leading-tight">
                    ${item.price}
                  </div>
                </div>
              </div>
            )))
          }
          </div>
        </div>
      </div>
    
  );
}
