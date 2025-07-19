import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./modules/components/Loader";
import AdminLayout from "./modules/layout/AdminLayout";
import RootDashBoard from "./modules/screens/RootDashBoard/RootDashBoard";
import BusInputForm from "./modules/screens/Bus/BusInputForm";
import CustomImageList from "./modules/screens/CustomImageList/CustomImageList";
import AddUserInfo from "./modules/screens/AddUserInfo/AddUserInfro";
import React from "react";
import VideoCard from "./modules/screens/EventVideos/EventVideo";

// 👇 create router with future flag
const router = createBrowserRouter(
  [
    {
      element: <AdminLayout />,
      children: [
        { path: "/", element: <RootDashBoard /> },
        { path: "/bus", element: <BusInputForm /> },
        { path: "/image", element: <CustomImageList /> },
        { path: "/AddUserInfo", element: <AddUserInfo /> },
        { path: "/video", element: <VideoCard /> },
      ],
    },
  ],
);

function App() {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </React.Suspense>
      <ToastContainer autoClose={2000} position="bottom-right" />
    </>
  );
}

export default App;
