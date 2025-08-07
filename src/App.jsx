import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="text-xl bg-amber-300">Hello world</div>
        <button type="button" class="mybtn">
          Default
        </button>
        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
