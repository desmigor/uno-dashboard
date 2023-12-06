import { React, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import trashIcon from "../../../../../assets/images/dashboard/icon/trash.svg";
import uploadIcon from "../../../../../assets/images/dashboard/icon/send-square.svg";
import callAPI from "../../../../../utils/api";
import { fetchProfileAction,fetchCountriesAction } from "../../../../../redux/actions/fetchProfileAction";
import Spinner from "../../../../../components/ui/spinner";

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
  const [base64, setBase64] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    await getBase64(file, (result) => {
      setBase64(result);
    });
  };

  const handleRemove = () => {
    onremove(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await handleUpload();
    setLoading(false);
    onConfirm(true);
  };
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const getBase64 = async (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // convert image to base64 string
        await getBase64(selectedFile, (result) => {
          setBase64(result);
        });
        const data = {
          image_base64: base64,
        };
        console.log(data);
        // upload image to server
        const res = await callAPI(
          "/api/auth/user/profile/profile-photo/",
          "PUT",
          true,
          data
        );
        console.log(res);
        dispatch(fetchProfileAction());
      } catch (err) {
        console.log(err);
      }
    }
  };

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
            src={selectedFile ? URL.createObjectURL(selectedFile) : image}
          />
          <div class="w-[400px] px-2 text-center text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
            {content}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            class="w-[200px] h-[50px] px-[20px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 inline-flex cursor-pointer mb-4"
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
          <div
                className="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                onClick={
                  handleRemove
                }
              >
                <div className="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">
                  Cancel
                </div>
              </div>
            <div
              className="w-[180px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-[10px] justify-center items-center gap-2.5 flex cursor-pointer"
              onClick={handleConfirm}
            >
              {loading ? (
                <Spinner className={"fill-white"} />
              ) : (
                <div className="text-center text-white text-base font-normal font-rubik leading-tight">
                  Save
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
