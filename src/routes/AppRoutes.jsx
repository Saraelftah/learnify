import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import { lazy } from "react";
import RoleRoute from "./RoleRoute";
import Admin from "../pages/Admin/Admin";
import Teacher from "../pages/Teacher/Teacher";
import RolePage from "../pages/RolePage/RolePage";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import TeacherPending from "../pages/TeacherPending/TeacherPending";


const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const StudentProfile = lazy(() => import("../pages/StudentProfile/StudentProfile"));
const TeacherProfile = lazy(() => import("../pages/TeacherProfile/TeacherProfile"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
const ChooseTeacher = lazy(() => import("../pages/ChooseTeacher/ChooseTeacher"));
const SuccessfulPayment = lazy(() => import("../pages/Payment/SuccessfulPayment/SuccessfulPayment"));
const MyBookings = lazy(() => import("../pages/MyBookings/MyBookings"));
const Search = lazy(() => import("../pages/SearchPage/SearchPage"));
const Notfound = lazy(() => import("../pages/Notfound/Notfound"));

function AppRoutes() {
  let router = createBrowserRouter([
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "role", element: <RolePage /> },
    { path: "unauthorized", element: <Unauthorized /> },
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "payment/:id", element: <Payment /> },
        {path: "payment", element: <ChooseTeacher />},
        {path: "successfulPayment", element: <SuccessfulPayment />},
        {path: "myBookings", element: <MyBookings />},
        { path: "student/:id", element: <StudentProfile /> },
        { path: "tutor/:id", element: <TeacherProfile /> },
        { path: "admin", element: 
        <RoleRoute allow={["admin"]} >
          <Admin/>
        </RoleRoute>},

         { path: "teacher", element: 
        <RoleRoute allow={["teacher"]} >
          <Teacher/>
        </RoleRoute>},

          { path: "student", element: 
        <RoleRoute allow={["student"]} >
          <StudentProfile/>
        </RoleRoute>},

         { path: "Pending", element: 
        <RoleRoute allow={["teacherPending"]} >
          <TeacherPending/>
        </RoleRoute>},

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default AppRoutes;
