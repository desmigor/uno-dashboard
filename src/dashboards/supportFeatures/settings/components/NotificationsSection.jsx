import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function NotificationsSection() {
  const [accountUpdatesEnabled, setAccountUpdatesEnabled] = useState(false);
  const [newsUpdatesEnabled, setNewsUpdatesEnabled] = useState(false);
  const [pendingPackagesEnabled, setPendingPackagesEnabled] = useState(false);
  const [newPackagesEnabled, setNewPackagesEnabled] = useState(false);
  const [couriersEnabled, setCouriersEnabled] = useState(false);
  const [accountUpdatesPushEnabled, setAccountUpdatesPushEnabled] =
    useState(false);
  const [newsUpdatesPushEnabled, setNewsUpdatesPushEnabled] = useState(false);

  return (
    <div class="w-[100%] h-[100%] p-5 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex">
      <div class="flex-col justify-start items-start gap-2.5 flex">
        <div class="text-gray-900 text-lg font-semibold font-rubik">
          Notifications
        </div>
        <div class="text-gray-400 text-base font-normal font-rubik leading-tight">
          Select what kind of notifications that you’ll be receiving about
          activities and recommendations.{" "}
        </div>
      </div>
      <div class="p-5 bg-white rounded-lg border border-gray-100 grid grid-cols-3 gap-20 w-[100%]">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
            Email notifications
          </div>
          <div class=" text-gray-400 text-sm font-normal font-rubik leading-tight">
            Get email to find out what’s going on when you’re not online. You
            can turn these off anytime.
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-6 inline-flex">
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="justify-start items-start flex">
              <Switch
                checked={accountUpdatesEnabled}
                onChange={setAccountUpdatesEnabled}
                className={`${
                    accountUpdatesEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    accountUpdatesEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                Account updates
              </div>
              <div class="w-[400px]  text-gray-400 text-sm font-normal font-rubik leading-tight">
                Updates about your account status.
              </div>
            </div>
          </div>
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="justify-start items-start flex">
              <Switch
                checked={newsUpdatesEnabled}
                onChange={setNewsUpdatesEnabled}
                className={`${
                    newsUpdatesEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    newsUpdatesEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                News and updates
              </div>
              <div class=" w-[400px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                News about our product new features and updates.
              </div>
            </div>
          </div>
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="opacity-40 justify-start items-start flex">
              <Switch
                checked={pendingPackagesEnabled}
                onChange={setPendingPackagesEnabled}
                className={`${
                    pendingPackagesEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    pendingPackagesEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                Pending packages
              </div>
              <div class=" w-[400px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                Updates about new packages awaiting resolution.
              </div>
            </div>
          </div>
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="justify-start items-start flex">
              <Switch
                checked={newPackagesEnabled}
                onChange={setNewPackagesEnabled}
                className={`${
                    newPackagesEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    newPackagesEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                New packages
              </div>
              <div class="w-[400px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                Get notified about new created packages on our app.
              </div>
            </div>
          </div>
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="justify-start items-start flex">
              <Switch
                checked={couriersEnabled}
                onChange={setCouriersEnabled}
                className={`${
                    couriersEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    couriersEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                Couriers
              </div>
              <div class="w-[400px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                Updates about couriers including new ones that join our
                platform.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[100%] p-5 bg-white rounded-lg border border-gray-100 grid grid-cols-3 gap-20 ">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
            Push notifications
          </div>
          <div class=" w-[100%]text-gray-400 text-sm font-normal font-rubik leading-tight">
            Get push notifications in-app to find out what’s going on when
            you’re online.
          </div>
        </div>
        <div class="flex-col justify-start items-start gap-6 inline-flex">
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="justify-start items-start flex">
              <Switch
                checked={accountUpdatesPushEnabled}
                onChange={setAccountUpdatesPushEnabled}
                className={`${
                    accountUpdatesPushEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    accountUpdatesPushEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                Account updates
              </div>
              <div class="w-[400px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                Updates about your account status.
              </div>
            </div>
          </div>
          <div class="justify-start items-start gap-[9px] inline-flex">
            <div class="justify-start items-start flex">
              <Switch
                checked={newsUpdatesPushEnabled}
                onChange={setNewsUpdatesPushEnabled}
                className={`${
                    newsUpdatesPushEnabled? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    newsUpdatesPushEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div class="flex-col justify-start items-start gap-1 inline-flex">
              <div class="text-gray-900 text-sm font-semibold font-rubik leading-tight">
                News and updates
              </div>
              <div class="w-[400px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                News about our product new features and updates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
