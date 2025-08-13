import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import { lazy } from "react";


const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const StudentProfile = lazy(() => import("../pages/StudentProfile/StudentProfile"));
const TeacherProfile = lazy(() => import("../pages/TeacherProfile/TeacherProfile"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
const Search = lazy(() => import("../pages/SearchPage/SearchPage"));
const Notfound = lazy(() => import("../pages/Notfound/Notfound"));

function AppRoutes() {
  let router = createBrowserRouter([
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "search", element: <Search /> },
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "payment", element: <Payment /> },
        { path: "student/:id", element: <StudentProfile /> },
        { path: "tutor/:id", element: <TeacherProfile /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default AppRoutes;
