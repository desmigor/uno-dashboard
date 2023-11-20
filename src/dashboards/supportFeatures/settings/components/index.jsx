import React, { useState } from "react";
import { Tab } from "@headlessui/react";

const tabs = [
  { name: "My Profile" },
  { name: "Security" },
  { name: "Notifications" },
];

function Settings() {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="bg-neutral-50 h-[100%]">
      <div className="mx-10 py-6">
        {" "}
        <div className="text-zinc-800 text-2xl font-bold font-['Rubik']">
          Settings
        </div>
        <Tab.Group>
          <Tab.List className="py-4">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `${
                    selected
                      ? "w-[130px] h-9 px-6 py-2 border-b border-red-800 justify-start items-start gap-2.5 inline-flex text-center text-red-800 text-sm font-normal font-['Rubik'] leading-tight"
                      : "w-[130px] h-9 px-6 py-2 border-b border-gray-100 justify-start items-start gap-2.5 inline-flex text-center text-slate-400 text-sm font-normal font-['Rubik'] leading-tight"
                  } `
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>profile</Tab.Panel>
            <Tab.Panel>security</Tab.Panel>
            <Tab.Panel>notifications</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Settings;
