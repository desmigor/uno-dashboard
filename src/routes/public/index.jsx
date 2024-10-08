import React from "react";
import { Route, Routes } from "react-router-dom";
import { CHANGE_PASSWORD, ADMIN_LOGIN } from "../../assets/constants";
import Login from "../../dashboards/supportFeatures/authentication/components/Login";
import ChangePassword from "../../dashboards/supportFeatures/authentication/components/ChangePassword";
import AdminLogin from "../../dashboards/adminFeatures/authentication/components/AdminLogin";
import ResetPassword from "../../dashboards/supportFeatures/authentication/components/ResetPassword";

function Public() {
  return (
    <>
      <Routes>
        <Route index element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default Public;
