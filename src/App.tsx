import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/VerifyEamil";
import { VerificationText } from "./pages/auth/VerificationText"; 

import AuthLayout from "./AuthLayout";
import AdminProfile from "./pages/dashboard/AdminProfile";
import UserDetails from "./pages/dashboard/UserDetails";
// import UpdateUser from "./pages/dashboard/UpdateUser";
import AllAdmin from "./pages/dashboard/AllAdmin";
import Well_come from "./pages/dashboard/Well_come";

import { useEffect } from "react";
import Welcome from "./Welcome";

const App = () => {
  const token = localStorage.getItem("LoginToken");

  useEffect(() => {
    // const id = localStorage.getItem("userID");
    console.log("TOKEN : ", token);
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-email" element={<VerifyEmail />}>
            <Route path="text" element={<VerificationText />} />
            </Route>
          </Route>

          <Route path="/profile" element={<AdminProfile />}>
          <Route index element={<Well_come/>}></Route>
            <Route path="details" element={<UserDetails />} />
            <Route path="admins" element={<AllAdmin />} />
          </Route>

          {/* <Route path="/" element={<h2>Page Not Found</h2>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
