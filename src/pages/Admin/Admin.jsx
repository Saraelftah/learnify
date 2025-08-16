import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar"

function Admin() {
  

  return (
    <>
      <div className="container">
        <div className="admin-dashboard mt-[120px] flex shadow-[0_0_8px_rgba(0,0,0,0.05)] mb-10">
          <AdminSidebar />
          <div className="admin-content w-[80%] py-10 px-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;