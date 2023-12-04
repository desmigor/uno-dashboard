import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccountNotificationsActionAction,
  updateAccountNotificationsActionAction,
} from "../../../../redux/actions/accountNotificationsAction.js";

export default function NotificationsSection() {
  const dispatch = useDispatch();
  const { accountNotifications } = useSelector(
    (state) => state.fetchAccountNotifications
  );
  useEffect(() => {
    dispatch(fetchAccountNotificationsActionAction());
  }, [dispatch]);

  useEffect(() => {
    // Check if accountNotifications is not empty before setting the state
    if (Object.keys(accountNotifications).length !== 0) {
      setAccountUpdatesEnabled(accountNotifications.email_account_updates);
      setNewsUpdatesEnabled(accountNotifications.email_news_and_updates);
      setPendingPackagesEnabled(accountNotifications.email_pending_packages);
      setNewPackagesEnabled(accountNotifications.email_new_packages);
      setCouriersEnabled(accountNotifications.email_courier);
      setAccountUpdatesPushEnabled(accountNotifications.account_updates);
      setNewsUpdatesPushEnabled(accountNotifications.news_and_updates);
    }
  }, [accountNotifications]);

  const [accountUpdatesEnabled, setAccountUpdatesEnabled] = useState(
    accountNotifications ? accountNotifications.email_account_updates : false
  );
  const [newsUpdatesEnabled, setNewsUpdatesEnabled] = useState(
    accountNotifications ? accountNotifications.email_news_and_updates : false
  );
  const [pendingPackagesEnabled, setPendingPackagesEnabled] = useState(
    accountNotifications ? accountNotifications.email_pending_packages : false
  );
  const [newPackagesEnabled, setNewPackagesEnabled] = useState(
    accountNotifications ? accountNotifications.email_new_packages : false
  );
  const [couriersEnabled, setCouriersEnabled] = useState(
    accountNotifications ? accountNotifications.email_courier : false
  );
  const [accountUpdatesPushEnabled, setAccountUpdatesPushEnabled] = useState(
    accountNotifications ? accountNotifications.account_updates : false
  );
  const [newsUpdatesPushEnabled, setNewsUpdatesPushEnabled] = useState(
    accountNotifications ? accountNotifications.news_and_updates : false
  );


  const handleUpdateAccountNotifications = async (data) => {
    try {
      dispatch(updateAccountNotificationsActionAction(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    Object.keys(accountNotifications).length !== 0 && (
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
                onChange={
                  () => {
                    setAccountUpdatesEnabled(!accountUpdatesEnabled);
                    handleUpdateAccountNotifications({
                      email_account_updates: !accountUpdatesEnabled,
                    });
                  }
                }
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
                onChange={() => {
                  setNewsUpdatesEnabled(!newsUpdatesEnabled);
                  handleUpdateAccountNotifications({
                    email_news_and_updates: !newsUpdatesEnabled,
                  });
                }}
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
                onChange={
                  () => {
                    setPendingPackagesEnabled(!pendingPackagesEnabled);
                    handleUpdateAccountNotifications({
                      email_pending_packages: !pendingPackagesEnabled,
                    });
                  }
                }
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
                onChange={
                  () => {
                    setNewPackagesEnabled(!newPackagesEnabled);
                    handleUpdateAccountNotifications({
                      email_new_packages: !newPackagesEnabled,
                    });
                  }
                }
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
                onChange={
                  () => {
                    setCouriersEnabled(!couriersEnabled);
                    handleUpdateAccountNotifications({
                      email_courier: !couriersEnabled,
                    });
                  }
                }
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
                onChange={
                  () => {
                    setAccountUpdatesPushEnabled(!accountUpdatesPushEnabled);
                    handleUpdateAccountNotifications({
                      account_updates: !accountUpdatesPushEnabled,
                    });
                  }
                }
                className={`${
                  accountUpdatesPushEnabled ? "bg-red-800" : "bg-zinc-200"
                } relative inline-flex h-5 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    accountUpdatesPushEnabled
                      ? "translate-x-6"
                      : "translate-x-1"
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
                onChange={
                  () => {
                    setNewsUpdatesPushEnabled(!newsUpdatesPushEnabled);
                    handleUpdateAccountNotifications({
                      news_and_updates: !newsUpdatesPushEnabled,
                    });
                  }
                }
                className={`${
                  newsUpdatesPushEnabled ? "bg-red-800" : "bg-zinc-200"
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
    )
  );
}
