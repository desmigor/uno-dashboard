import React from "react";
import { Route, Routes } from "react-router-dom";
import { CHANGE_PASSWORD, ADMIN_LOGIN } from "../../assets/constants";
import Login from "../../dashboards/supportFeatures/authentication/components/Login";
import ChangePassword from "../../dashboards/supportFeatures/authentication/components/ChangePassword";
import AdminLogin from "../../dashboards/adminFeatures/authentication/components/AdminLogin";

function Public() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path={ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={CHANGE_PASSWORD} element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default Public;
