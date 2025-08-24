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


  //AOS for animation
  useEffect(() => {
    window.AOS.init({
      duration: 1500,
    });
  }, []);

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
