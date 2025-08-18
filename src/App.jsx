import { Suspense, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import Network from "./network/Network";
import { useDispatch } from "react-redux";
import { initializeAuthListener } from "./services/auth";


function App() {
  //It ensures that the Redux store's currentUser is always synchronized with the user's Firebase session(profile icon navbar)
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = initializeAuthListener(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

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
