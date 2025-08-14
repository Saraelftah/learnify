import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet} from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <div className="flex-grow">
      <Outlet />
      </div>
=======

      <Outlet />

>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
      <Footer />
    </>
  );
}

export default Layout;
