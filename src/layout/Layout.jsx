import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet} from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex-grow min-h-screen">
      <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
