import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import NotificationsSection from "./NotificationsSection";
import PackageConfigurations from "./packageConfigurations";
import CouriersConfigurations from "./CouriersConfigurations";

function Settings() {
  const { userInfo } = useSelector((state) => state.auth);

  var tabs = [
    { name: "My Profile" },
  //  { name: "Package Configurations" },
  //   { name: "Courier configurations" },
    { name: "Security" },
    { name: "Notifications" },
  ];

  if (userInfo?.type?.id === 3) {
    tabs = [
      { name: "My Profile" },
      { name: "Package Configurations" },
      { name: "Courier configurations" },
      { name: "Security" },
      { name: "Notifications" },
    ];
  }

  const [selected, setSelected] = useState(tabs[0]);
  console.log(tabs);

  return (
    <div className="bg-neutral-50 h-[100%] overflow-auto">
      <div className="mx-10 py-6">
        {" "}
        <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">
          Settings
        </div>
        <Tab.Group manual>
          <Tab.List className="py-4">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `${
                    selected
                      ? " h-9 px-6 py-2 border-b border-red-800 justify-start items-start gap-2.5 inline-flex text-center text-red-800 text-sm font-normal font-rubik leading-tight"
                      : " h-9 px-6 py-2 border-b border-gray-100 justify-start items-start gap-2.5 inline-flex text-center text-slate-400 text-sm font-normal font-rubik leading-tight"
                  } `
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ProfileSection />
            </Tab.Panel>
            {userInfo?.type?.id === 3 && (
              <Tab.Panel>
                <PackageConfigurations />
              </Tab.Panel>
            )}
            {userInfo?.type?.id === 3 && (
              <Tab.Panel>
                <CouriersConfigurations />
              </Tab.Panel>
            )}
            <Tab.Panel>
              <SecuritySection />
            </Tab.Panel>
            <Tab.Panel>
              <NotificationsSection />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Settings;
