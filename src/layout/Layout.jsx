import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet} from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
      <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
