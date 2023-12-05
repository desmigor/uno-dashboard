import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "../../../../assets/images/dashboard/icon/edit-3.svg";
import EditIcon2 from "../../../../assets/images/dashboard/icon/edit-2.svg";
import noProfile from "../../../../assets/images/dashboard/image/image.png";
import EditProfileModal from "../components/UI/EditProfileModal";
import SuccessToast from "../../../../components/ui/SuccessToast";
import Spinner from "../../../../components/ui/spinner";
import { fetchProfileAction } from "../../../../redux/actions/fetchProfileAction";
import callAPI from "../../../../utils/api";

export default function ProfileSection() {
  const [ShowEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [editInformations, setEditInformations] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.fetchProfile);

  const dispatch = useDispatch();

  const handleModalConfirm = (isConfirmed) => {
    if (isConfirmed) {
      handleShowToast();
    }
  };

  const handleShowToast = () => {
    setShowEditProfileModal(false);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 30);
  };

  useEffect(() => {
    dispatch(fetchProfileAction());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(profile).length > 0 && Object.keys(userInfo).length > 0) {
      setFirstName(profile.full_name?.split(" ")[0]);
      setLastName(profile.full_name?.split(" ")[1]);
      setEmailAddress(profile.email);
      setPhoneNumber(profile.phone_number);
      setRole(profile.role);
      setSupportGroup(profile.groups[0]?.name);
      setCountry(profile.address[0]?.country?.name);
      setRegion(profile.address[0]?.region);
      setCity(profile.address[0]?.city);
      setPostalCode(profile.address[0]?.postal_code);
      setRole(userInfo?.type?.id === 3 ? "Admin" : "Support");
    }
  }, [profile]);

  const [firstName, setFirstName] = useState(
    profile && profile.full_name?.split(" ")[0]
  );
  const [lastName, setLastName] = useState(
    Object.keys(profile).length > 0 ? profile.full_name?.split(" ")[1] : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    Object.keys(profile).length > 0 ? profile.email : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    Object.keys(profile).length > 0 ? profile.phone_number : ""
  );
  const [role, setRole] = useState();
  const [supportGroup, setSupportGroup] = useState(
    Object.keys(profile).length > 0 ? profile.groups[0]?.name : ""
  );
  const [country, setCountry] = useState(
    Object.keys(profile).length > 0 ? profile.address[0]?.country?.name : ""
  );
  const [region, setRegion] = useState(
    Object.keys(profile).length > 0 ? profile.address[0]?.region : ""
  );
  const [city, setCity] = useState(
    Object.keys(profile).length > 0 ? profile.address[0]?.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    Object.keys(profile).length > 0 ? profile.address[0]?.postal_code : ""
  );

  const handleEdit = async (address = false) => {
    setLoading(true);
    const data = address
      ? {
          city: city,
          country: profile?.country,
          postal_code: postalCode,
          region: region,
        }
      : {
          full_name: `${firstName} ${lastName}`,
          email: emailAddress,
          country: profile?.country,
          phone_number: phoneNumber,
        };
    console.log(data);
    try {
      const result = await callAPI(
        address ? "/api/address/profile-address/" : "/api/auth/web/profile/",
        "PUT",
        true,
        data
      );
      console.log(result);
      dispatch(fetchProfileAction());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    address ? setEditAddress(false) : setEditInformations(false);
  };

  console.log(userInfo);

  return (
    <div className="w-[100%] h-[100%] p-5 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex overflow-auto">
      <EditProfileModal
        show={ShowEditProfileModal}
        onremove={() => setShowEditProfileModal(false)}
        title="Profile Picture"
        image={noProfile}
        content="A picture helps people recognize you and lets you know when you’re signed in to your account."
        onConfirm={handleModalConfirm}
      />

      <SuccessToast
        text="Your profile has been updated successfully"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="justify-start items-center gap-5 inline-flex">
        <div className="w-[100px] h-[100px] relative">
          <div className="w-[100px] h-[100px] left-0 top-0 absolute">
            <div className="w-[100px] h-[100px] left-0 top-0 absolute rounded-full border-2 border-red-800"></div>
            <img
              className="w-[90px] h-[90px] left-[5px] top-[5px] absolute rounded-full"
              src={noProfile}
            />
          </div>
          <div
            className="h-8 pl-[10.15px] pr-[7.80px] py-[9.37px] left-[66px] top-[60px] absolute bg-red-800 rounded-[100px] justify-center items-center inline-flex"
            onClick={() => setShowEditProfileModal(true)}
          >
            <div className="w-3.5 h-[13.27px] relative flex-col justify-start items-start flex">
              <img src={EditIcon} className="" />
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-3 inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 flex">
            <div className="text-gray-900 text-lg font-semibold font-rubik">
              {firstName} {lastName}
            </div>
            <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">
              {emailAddress}
            </div>
          </div>
          <div className="px-4 py-[3px] bg-rose-100 rounded-md justify-start items-start gap-2.5 inline-flex">
            <div className="text-red-800 text-sm font-normal font-['Lato'] leading-tight">
              {supportGroup}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-[3px] flex w-[100%]">
        <div className="justify-between items-start  inline-flex w-[100%]">
          <div className="text-gray-900 text-base font-semibold font-rubik leading-tight">
            Personal Information
          </div>
          {editInformations ? (
            <div className=" py-1 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex ">
              <div className="self-stretch justify-center items-start gap-5 inline-flex">
                <div
                  className="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                  onClick={() => setEditInformations(false)}
                >
                  <div className="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">
                    Cancel
                  </div>
                </div>
                <button
                  className={`w-[168px] h-[50px] py-[15px]  rounded-xl justify-center items-center gap-2.5 flex cursor-pointer text-white bg-red-800`}
                  onClick={() => handleEdit()}
                >
                  {loading ? (
                    <Spinner className={"fill-white"} />
                  ) : (
                    <div className="text-center  text-base font-normal font-rubik leading-tight">
                      Save changes
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="w-[74px] h-[32px] px-[13px] bg-white rounded-[20px] border border-zinc-200 justify-center items-center gap-2 flex cursor-pointer"
              onClick={() => setEditInformations(true)}
            >
              <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">
                Edit
              </div>
              <div className="w-3.5 h-3.5 justify-center items-center flex">
                <div className="w-3.5 h-3.5 relative">
                  <img src={EditIcon2} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-5 w-[100%]">
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class="flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                First Name
              </div>
              {editInformations ? (
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter first name"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {firstName}
                </div>
              )}
            </div>
            <div class="flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Email Address
              </div>
              {editInformations ? (
                <input
                  type="text"
                  id="emailAddress"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter email address"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {emailAddress}
                </div>
              )}
            </div>
            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Role
              </div>
              {editInformations ? (
                <input
                  // make it uneditable
                  editable={false}
                  type="text"
                  id="role"
                  name="role"
                  value={role}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex cursor-not-allowed bg-neutral-100"
                  placeholder="Enter role"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {role}
                </div>
              )}
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Last Name
              </div>
              {editInformations ? (
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter last name"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {lastName}
                </div>
              )}
            </div>
            <div class="flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Phone Number
              </div>
              {editInformations ? (
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter phone number"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {phoneNumber}
                </div>
              )}
            </div>
            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Support Group
              </div>
              {editInformations ? (
                <input
                  editable={false}
                  type="text"
                  id="supportGroup"
                  name="supportGroup"
                  value={supportGroup}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex bg-neutral-100 cursor-not-allowed"
                  placeholder="Enter support group"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {supportGroup}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-[3px] flex w-[100%]">
        <div className="justify-between items-start inline-flex w-[100%]">
          <div className="text-gray-900 text-base font-semibold font-rubik leading-tight">
            Address
          </div>
          {editAddress ? (
            <div className=" py-1 bg-white rounded-bl-2xl rounded-br-2xl border-t border-gray-100 justify-center items-center inline-flex ">
              <div className="self-stretch justify-center items-start gap-5 inline-flex">
                <div
                  className="w-[168px] h-[50px] px-[60px] py-[15px] rounded-[10px] border border-zinc-200 justify-center items-center gap-2.5 flex cursor-pointer"
                  onClick={() => setEditAddress(false)}
                >
                  <div className="text-center text-zinc-800 text-base font-normal font-rubik leading-tight">
                    Cancel
                  </div>
                </div>
                <button
                  className={`w-[168px] h-[50px] py-[15px]  rounded-xl justify-center items-center gap-2.5 flex cursor-pointer text-white bg-red-800`}
                  onClick={() => handleEdit(true)}
                >
                  {loading ? (
                    <Spinner className={"fill-white"} />
                  ) : (
                    <div className="text-center  text-base font-normal font-rubik leading-tight">
                      Save changes
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="w-[74px] h-[32px] px-[13px] bg-white rounded-[20px] border border-zinc-200 justify-center items-center gap-2 flex cursor-pointer"
              onClick={() => setEditAddress(true)}
            >
              <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">
                Edit
              </div>
              <div className="w-3.5 h-3.5 justify-center items-center flex">
                <div className="w-3.5 h-3.5 relative">
                  <img src={EditIcon2} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-5 w-[100%]">
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Country
              </div>
              {editAddress ? (
                <input
                  editable={false}
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex bg-neutral-100 cursor-not-allowed "
                  placeholder="Enter country"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {country}
                </div>
              )}
            </div>

            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Region
              </div>
              {editAddress ? (
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter region"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {region}
                </div>
              )}
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                City/State
              </div>
              {editAddress ? (
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter city"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {city}
                </div>
              )}
            </div>
            <div class=" flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-rubik leading-tight">
                Postal Code
              </div>
              {editAddress ? (
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="text-zinc-800 text-base font-normal font-rubik leading-tight self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                  placeholder="Enter postal code"
                />
              ) : (
                <div class="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {postalCode}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
