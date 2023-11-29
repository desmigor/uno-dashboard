import React from "react";

export default function AddPackageAddOn(
    {
        show,
        onClose,
        onSaved
    }
) {
    if (!show) {
        return null;
    }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black modal overflow-auto">
        <div className="w-[449px] h-[515px] flex-col justify-start items-start inline-flex">
    <div className="h-[425px] p-5 bg-white rounded-tl-2xl rounded-tr-2xl flex-col justify-start items-start gap-5 flex">
        <form className="flex-col justify-start items-start gap-5 flex">
            <div className="w-[409px] justify-between items-center inline-flex">
                <div className="text-zinc-800 text-lg font-semibold font-rubik">Add package add-on</div>
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                    </div>
                </div>
            </div>
            <div className="w-[409px] text-slate-500 text-sm font-normal font-rubik leading-tight">Add details about the package add-on.</div>
            <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">Add-on Name</div>
                <input
                    type="text"
                    id="addOnName"
                    name="addOnName"
                    className="self-stretch h-12 px-4 py-[13px] w-[380px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                    placeholder="Add-on name"
                />
                
            </div>
            <div className="h-[113px] flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">Description</div>
                <textarea
                    id="description"
                    name="description"
                    className="self-stretch h-[87px] w-[380px] px-4 py-3 rounded-xl border border-zinc-200 justify-start items-start gap-2.5 inline-flex"
                    placeholder="Add description ..."
                />
                
            </div>
            <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
                <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">Amount</div>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    className="self-stretch h-12 px-4 py-[13px] w-[380px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                    placeholder="$6.00"
                />
                
            </div>
        </form>
    </div>
    <div className="px-[46.50px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex ">
        <div className="self-stretch justify-center items-start gap-5 inline-flex">
            <div className="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={onClose}
            >
                <div className="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">Cancel</div>
            </div>
            <div className="w-[168px] h-[50px] px-[60px] py-[15px] bg-zinc-200 rounded-xl justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={onSaved}
            >
                <div className="text-center text-gray-400 text-base font-normal font-rubik leading-tight">Save</div>
            </div>
        </div>
    </div>
</div>
    </div>
  );
}
