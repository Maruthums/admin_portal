import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./modules/components/Loader";
import AdminLayout from "./modules/layout/AdminLayout";
import RootDashBoard from "./modules/screens/RootDashBoard/RootDashBoard";
import BusInputForm from "./modules/screens/Bus/BusInputForm";
import CustomImageList from "./modules/screens/CustomImageList/CustomImageList";
import AddUserInfo from "./modules/screens/AddUserInfo/AddUserInfro";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<RootDashBoard />} />
              <Route path="/bus" element={<BusInputForm />} />
              <Route path="/image" element={<CustomImageList />} />
              <Route path="/AddUserInfo" element={<AddUserInfo />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer autoClose={2000} position="bottom-right" />
    </div>
  );
}

export default App;
