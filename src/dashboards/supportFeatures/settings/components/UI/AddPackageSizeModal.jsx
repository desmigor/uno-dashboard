import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import callAPI from "../../../../../utils/api";
import { fetchPackageSizesAction } from "../../../../../redux/actions/fetchPackageSizesAction";

export default function AddPackageSizeModal({
  show,
  onClose,
  onSaved,
  editData,
}) {
  if (!show) {
    return null;
  }
  const [sizeName, setSizeName] = useState(editData ? editData.name : "");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [basePrice, setBasePrice] = useState(editData ? editData.price : "");
  const [firstKM, setFirstKM] = useState(
    editData ? editData.price_per_km[0].km : ""
  );
  const [priceControl, setPriceControl] = useState(
    editData ? editData.price_per_km[0].price_control : ""
  );
  const [nextKM, setNextKM] = useState(
    editData ? editData.price_per_km[1].km : ""
  );
  const [priceControl2, setPriceControl2] = useState(
    editData ? editData.price_per_km[1].price_control : ""
  );
  const [nextKM2, setNextKM2] = useState(
    editData ? editData.price_per_km[2].km : ""
  );
  const [priceControl3, setPriceControl3] = useState(
    editData ? editData.price_per_km[2].price_control : ""
  );
  const [nKM, setNKm] = useState(
    editData ? editData.price_per_km[3].price_control : ""
  );

  const [dataId1, setDataId0] = useState(
    editData ? editData.price_per_km[0].id : null
  );
  const [dataId2, setDataId1] = useState(
    editData ? editData.price_per_km[1].id : null
  );
  const [dataId3, setDataId2] = useState(
    editData ? editData.price_per_km[2].id : null
  );
  const [dataId4, setDataId3] = useState(
    editData ? editData.price_per_km[3].id : null
  );

  const handleSave = async () => {
    const data = {
      name: sizeName,
      description: description,
      price: basePrice,
      currency: 1,
      type: 1,
      price_per_km: [
        {
          title: "First KM",
          km: firstKM,
          price_control: priceControl,
          currency: 1,
        },
        {
          title: "Next KM",
          km: nextKM,
          price_control: priceControl2,
          currency: 1,
        },
        {
          title: "Next KM",
          km: nextKM2,
          price_control: priceControl3,
          currency: 1,
        },
        {
          title: "Next KM",
          km: "n",
          price_control: nKM,
          currency: 1,
        },
      ],
    };
    console.log(data);
    try {
      const result = await callAPI(
        "/api/package-settings/package-size/",
        "POST",
        true,
        data
      );
      console.log(result);
      fetchPackageSizesAction();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPackageSize = async (id) => {
    const data = {
      name: sizeName,
      description: description,
      price: basePrice,
      currency: 1,
      type: 1,
      price_per_km: [
        {
          data_id: dataId1,
          title: "First KM",
          km: firstKM,
          price_control: priceControl,
          currency: 1,
        },
        {
          data_id: dataId2,
          title: "Next KM",
          km: nextKM,
          price_control: priceControl2,
          currency: 1,
        },
        {
          data_id: dataId3,
          title: "Next KM",
          km: nextKM2,
          price_control: priceControl3,
          currency: 1,
        },
        {
          data_id: dataId4,
          title: "Next KM",
          km: "n",
          price_control: nKM,
          currency: 1,
        },
      ],
    };
    console.log(data);
    try {
      const result = await callAPI(
        `/api/package-settings/package-size/${id}`,
        "PUT",
        true,
        data
      );
      console.log(result);
      fetchPackageSizesAction();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={show ? true : false} onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black modal overflow-auto">
        <div className="flex-col justify-start items-start inline-flex mx-8 pt-12">
          <div className="p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-5 flex">
            <form className="flex-col justify-start items-start gap-2.5 flex">
              <div className="justify-between items-center inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-rubik">
                  Add package size
                </div>
                <div className="w-6 h-6 justify-center items-center flex">
                  <div className="w-6 h-6 relative"></div>
                </div>
              </div>
              <div className=" text-slate-500 text-sm font-normal font-rubik leading-tight">
                Add details about the package size.
              </div>
              <div className="flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Size Name
                </div>
                <input
                  type="text"
                  id="sizeName"
                  name="sizeName"
                  value={sizeName}
                  onChange={(e) => setSizeName(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                  placeholder="Enter size name"
                />
              </div>
              <div className=" flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Description
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="self-stretch h-[100%] w-[280px] px-4 py-3 rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                  placeholder="Add description ..."
                />
              </div>
              <div className=" flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Base Price
                </div>
                <input
                  type="text"
                  id="basePrice"
                  name="basePrice"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="self-stretch h-12 px-4 py-[13px] w-[80px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                  placeholder="$6.00"
                />
              </div>
              <div className="justify-start items-start gap-4 inline-flex">
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    First KM
                  </div>
                  <input
                    type="text"
                    id="firstKM"
                    name="firstKM"
                    value={firstKM}
                    onChange={(e) => setFirstKM(e.target.value)}
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="10"
                  />
                </div>
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    Price control
                  </div>
                  <input
                    type="text"
                    id="priceControl"
                    name="priceControl"
                    value={priceControl}
                    onChange={(e) => setPriceControl(e.target.value)}
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="justify-start items-start gap-4 inline-flex">
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    Next KM
                  </div>
                  <input
                    type="text"
                    id="nextKM"
                    name="nextKM"
                    value={nextKM}
                    onChange={(e) => setNextKM(e.target.value)}
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="15"
                  />
                </div>
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    Price control
                  </div>
                  <input
                    type="text"
                    id="priceControl2"
                    name="priceControl2"
                    value={priceControl2}
                    onChange={(e) => setPriceControl2(e.target.value)}
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="0.5"
                  />
                </div>
              </div>
              <div className="justify-start items-start gap-4 inline-flex">
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    Next KM
                  </div>
                  <input
                    type="text"
                    id="nextKM2"
                    name="nextKM2"
                    value={nextKM2}
                    onChange={(e) => setNextKM2(e.target.value)}
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="25"
                  />
                </div>
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    Price control
                  </div>
                  <input
                    type="text"
                    id="priceControl3"
                    name="priceControl3"
                    value={priceControl3}
                    onChange={(e) => setPriceControl3(e.target.value)}
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="0.25"
                  />
                </div>
              </div>
              <div className="justify-start items-start gap-4 inline-flex">
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div>
                    <span className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                      Next KM{" "}
                    </span>
                    <span className="text-slate-500 text-xs font-normal font-rubik leading-none">
                      (FIXED VARIABLE)
                    </span>
                  </div>
                  <div className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">
                      n
                    </div>
                  </div>
                </div>
                <div className="w-[196px] flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                    Price control
                  </div>
                  <input
                    type="text"
                    id="nKM"
                    name="nKM"
                    value={nKM}
                    onChange={(e) => setNKm(e.target.value)}
                    placeholder="0.1"
                    className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="px-[46.50px] py-4 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
            <div className="self-stretch justify-center items-start gap-5 inline-flex">
              <div
                className="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={onClose}
              >
                <div className="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">
                  Cancel
                </div>
              </div>
              <button
                disabled={!sizeName || !description || !basePrice}
                className={`w-[168px] h-[50px] px-[60px] py-[15px]  rounded-xl justify-center items-center gap-2.5 flex cursor-pointer ${
                  !sizeName || !description || !basePrice
                    ? "text-gray-400 bg-zinc-200 disabled"
                    : "text-white bg-red-800 enabled"
                }`}
                onClick={
                  editData
                    ? () => handleEditPackageSize(editData.id)
                    : handleSave
                }
              >
                <div className="text-center text-base font-normal font-rubik leading-tight">
                  Save
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
