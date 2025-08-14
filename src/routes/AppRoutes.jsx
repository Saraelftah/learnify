import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import { lazy } from "react";
<<<<<<< HEAD
import RoleRoute from "./RoleRoute";
import Admin from "../pages/admin/admin";
import Teacher from "../pages/Teacher/teacher";
import RolePage from "../pages/RolePage/RolePage";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
=======
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)


const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const StudentProfile = lazy(() => import("../pages/StudentProfile/StudentProfile"));
const TeacherProfile = lazy(() => import("../pages/TeacherProfile/TeacherProfile"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
<<<<<<< HEAD
const ChooseTeacher = lazy(() => import("../pages/ChooseTeacher/ChooseTeacher"));
=======
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
const Search = lazy(() => import("../pages/SearchPage/SearchPage"));
const Notfound = lazy(() => import("../pages/Notfound/Notfound"));

function AppRoutes() {
  let router = createBrowserRouter([
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
<<<<<<< HEAD
<<<<<<< HEAD
    { path: "role", element: <RolePage /> },
    { path: "unauthorized", element: <Unauthorized /> },
=======
    { path: "search", element: <Search /> },
>>>>>>> 5f6f694b97bf533f7f397c93231d894b23c4d2e9
=======
    { path: "search", element: <Search /> },
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "search/:id", element: <Search /> },
        { path: "payment/:id", element: <Payment /> },
<<<<<<< HEAD
        {path: "payment", element: <ChooseTeacher />},
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
=======
        { path: "student/:id", element: <StudentProfile /> },
        { path: "tutor/:id", element: <TeacherProfile /> },
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default AppRoutes;
