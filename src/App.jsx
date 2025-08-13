import { Suspense } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import Network from "./network/Network";

function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<Loader />}>
        <Network />
        <AppRoutes />
      </Suspense>
    </div>
    </>
  );
}

export default App;
