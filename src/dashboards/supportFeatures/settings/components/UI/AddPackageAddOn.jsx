import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import callAPI from "../../../../../utils/api";
import { fetchPackageAddOnsAction } from "../../../../../redux/actions/fetchPackageSizesAction";
import Spinner from "../../../../../components/ui/spinner";

export default function AddPackageAddOn({ show, onClose, onSaved, editData }) {
  if (!show) {
    return null;
  }
  const dispatch = useDispatch();
  const [addOnName, setAddOnName] = useState(editData ? editData.name : "");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [amount, setAmount] = useState(editData ? editData.price : "");

  const handleAddOnName = (e) => {
    setAddOnName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const [loading, setLoading] = useState(false);


  const handleSave = async () => {
    setLoading(true);
    const data = {
      name: addOnName,
      description: description,
      price: amount,
      currency: 1,
    };
    try {
      const result = await callAPI(
        "/api/package-settings/package-addon/",
        "POST",
        true,
        data
      );
      dispatch(fetchPackageAddOnsAction());
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const handleEditPackageAddOn = async (id) => {
    setLoading(true);
    const data = {
      name: addOnName,
      description: description,
      price: amount,
      currency: 1,
    };
    try {
      const result = await callAPI(
        `/api/package-settings/package-addon/${id}`,
        "PUT",
        true,
        data
      );
      dispatch(fetchPackageAddOnsAction());
      setLoading(false);

      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <Dialog open={show ? true : false} onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black modal overflow-auto">
        <div className="w-[449px] h-[515px] flex-col justify-start items-start inline-flex">
          <div className="h-[425px] p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-5 flex">
            <form className="flex-col justify-start items-start gap-5 flex">
              <div className="w-[409px] justify-between items-center inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-rubik">
                  {editData ? "Edit Package Add-on" : "Add Package Add-on"}
                </div>
                <div className="w-6 h-6 justify-center items-center flex">
                  <div className="w-6 h-6 relative"></div>
                </div>
              </div>
              <div className="w-[409px] text-slate-500 text-sm font-normal font-rubik leading-tight">
                Add details about the package add-on.
              </div>
              <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Add-on Name
                </div>
                <input
                  type="text"
                  id="addOnName"
                  name="addOnName"
                  value={addOnName}
                  onChange={handleAddOnName}
                  className="self-stretch h-12 px-4 py-[13px] w-[380px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Add-on name"
                />
              </div>
              <div className="h-[113px] flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Description
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescription}
                  className="self-stretch h-[87px] w-[380px] px-4 py-3 rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                  placeholder="Add description ..."
                />
              </div>
              <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                  Amount
                </div>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmount}
                  className="self-stretch h-12 px-4 py-[13px] w-[380px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="$6.00"
                />
              </div>
            </form>
          </div>
          <div className="px-[46.50px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex ">
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
                disabled={!addOnName || !description || !amount}
                className={`w-[168px] h-[50px] px-[60px] py-[15px]  rounded-xl justify-center items-center gap-2.5 flex cursor-pointer ${
                  !addOnName || !description || !amount
                    ? "text-gray-400 bg-zinc-200 disabled"
                    : "text-white bg-red-800 enabled"
                }`}
                onClick={
                  editData
                    ? () => handleEditPackageAddOn(editData.id)
                    : handleSave
                }
              >
                {loading ? (
                  <Spinner className={"fill-white"} />
                ) : (
                  <div className="text-center  text-base font-normal font-rubik leading-tight">
                    Save
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
