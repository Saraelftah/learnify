import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import { Dropdown, DropdownItem } from "flowbite-react";
import Network from "./network/network";

function App() {

  return (
    <>
      <Suspense fallback={<Loader />}>

      <Network />

        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
