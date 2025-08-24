import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import { lazy } from "react";
import RoleRoute from "./RoleRoute";
import Contact from "../pages/ContactUS/ContactUs";
import AdminMessages from "../components/AdminMessages/AdminMessages";

const Home = lazy(() => import("../pages/Home/Home"));
const RolePage = lazy(() => import("../pages/RolePage/RolePage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const AdminOverview = lazy(() => import("../components/AdminOverview/AdminOverview"));
const AdminStudents = lazy(() => import("../components/AdminStudents/AdminStudents"));
const AdminTeachers = lazy(() => import("../components/AdminTeachers/AdminTeachers"));
const TeacherPending = lazy(() => import("../pages/TeacherPending/TeacherPending"));
const Teacher = lazy(() => import("../pages/Teacher/Teacher"));
const StudentProfile = lazy(() =>
  import("../pages/StudentProfile/StudentProfile")
);
const TeacherProfile = lazy(() =>
  import("../pages/TeacherProfile/TeacherProfile")
);
const Payment = lazy(() => import("../pages/Payment/Payment"));
const ChooseTeacher = lazy(() =>
  import("../pages/ChooseTeacher/ChooseTeacher")
);
const MyBookings = lazy(() => import("../pages/MyBookings/MyBookings"));
const Search = lazy(() => import("../pages/SearchPage/SearchPage"));
const Unauthorized = lazy(() => import("../pages/Unauthorized/Unauthorized"));
const About = lazy(() => import("../pages/AboutUs/AboutUs"));
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
        { path: "payment", element: <ChooseTeacher /> },
        { path: "myBookings", element: <MyBookings /> },
        { path: "student/:id", element: <StudentProfile /> },
        { path: "tutor/:id", element: <TeacherProfile /> },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
        {
        path: "admin",
        element: (
          <RoleRoute allow={["admin"]}>
            <Admin />
          </RoleRoute>
        ),
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "teachers", element: <AdminTeachers /> }, 
          { path: "students", element: <AdminStudents /> }, 
          {path: "messages", element: <AdminMessages />}
        ],
      },



        {
          path: "teacher",
          element: (
            <RoleRoute allow={["teacher", "admin"]}>
              <Teacher />
            </RoleRoute>
          ),
        },

        {
          path: "student",
          element: (
            <RoleRoute allow={["student", "admin"]}>
              <StudentProfile />
            </RoleRoute>
          ),
        },

        {
          path: "pending",
          element: (
            <RoleRoute allow={["teacherPending", "teacher", "admin"]}>
              <TeacherPending />
            </RoleRoute>
          ),
        },

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default AppRoutes;
