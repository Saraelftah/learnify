import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar"

function Admin() {
  

  return (
    <>
      <div className="container">
        <div className="admin-dashboard min-h-[calc(100vh-150px)] mt-[120px] flex xl:flex-row flex-col justify-center shadow-[0_0_8px_rgba(0,0,0,0.05)] mb-10">
          <AdminSidebar />
          <div className="admin-content xl:w-[80%] w-full py-10 px-5 bg-[var(--card-background)]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;