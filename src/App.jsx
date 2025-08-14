import { Suspense } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
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
