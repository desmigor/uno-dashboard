import { React, useState, useRef } from "react";
import trashIcon from "../../../../../assets/images/dashboard/icon/trash.svg";
import uploadIcon from "../../../../../assets/images/dashboard/icon/send-square.svg";


function EditProfileModal({
  title,
  content,
  image,
  show,
  onremove,
  onConfirm,
}) {
  if (!show) {
    return null;
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  const handleConfirm = () => {
    onConfirm(true);
    onClose();
  };
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      // You can now perform the upload logic here, for example, using Axios or fetch.
      // For simplicity, let's just log the file details for now.
      console.log('Selected File:', selectedFile);
    } else {
      console.log('No file selected');
    }
  }


  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
      <div className="w-[420px] h-[400px] flex-col justify-start items-start inline-flex bg-white rounded-2xl rounded-tr-2xl">
        <div class="w-[400px] h-[390px] flex-col justify-start items-center gap-5 inline-flex">
          <div class="w-[380px] p-2  justify-between items-start inline-flex">
            <div class="text-zinc-800 text-lg font-semibold font-['Rubik']">
              {title}
            </div>
          </div>
          <img
            class="w-40 h-40 rounded-full"
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : image
            }
          />
          <div class="w-[400px] px-2 text-center text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
            {content}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button class="w-[200px] h-[50px] px-[20px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 inline-flex cursor-pointer"
            onClick={openFileDialog}
          >
            <div class="w-6 h-6 justify-center items-center flex">
              <div class="w-6 h-6 relative">
                <img src={uploadIcon} />
              </div>
            </div>
            <div class="text-center text-zinc-800 text-base font-normal font-['Rubik'] leading-tight cursor-pointer">
              Upload image
            </div>
          </button>
        </div>
        <div className="pl-[22px] pr-[23px] py-5 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex">
          <div className="self-stretch justify-start items-start gap-[27px] inline-flex">
            <div class="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-red-700 justify-center items-center gap-2.5 inline-flex"
              onClick={onremove}
            >
              <div class="w-5 h-5 justify-center items-center flex">
                <div class="w-5 h-5 relative">
                  <img src={trashIcon} />
                </div>
              </div>
              <div class="text-center text-red-700 text-base font-normal font-['Rubik'] leading-tight cursor-pointer">
                Remove
              </div>
            </div>
            <div
              className="w-[180px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 flex cursor-pointer"
              onClick={handleConfirm}
            >
              <div className="text-center text-white text-base font-normal font-rubik leading-tight">
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
