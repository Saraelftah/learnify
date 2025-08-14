import { Suspense } from "react";
import "./App.css";
<<<<<<< HEAD
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import Network from "./network/Network";

=======
import Home from "./pages/Home/Home";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import Network from "./network/network";
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)

function App() {
  return (
    <>
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
=======
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
      <Suspense fallback={<Loader />}>
        <Network />
        <AppRoutes />
      </Suspense>
<<<<<<< HEAD
    </div>
=======
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
    </>
  );
}

export default App;
