import { Link, NavLink } from "react-router-dom";


function AdminSidebar() {
  return (
    <>
    <div className="sidebar w-[250px] bg-[var(--primary-color)] text-white p-2">
      {/* <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Dashboard</h2>
      </div> */}
      
      <nav className="sidebar-nav flex flex-col gap-2">
        <NavLink to="/admin/overview" className="nav-link">
          <i class="fa-solid fa-house"></i>
           <h5>Overview</h5>
        </NavLink>
        <NavLink to="/admin/teachers" className="nav-link">
          <i class="fa-solid fa-person-chalkboard"></i>
          <h5> Teachers </h5>
        </NavLink>
        <NavLink to="/admin/students" className="nav-link">
          <i class="fa-solid fa-graduation-cap"></i> 
          <h5>Students</h5>
        </NavLink>
      </nav>
    </div>


    </>
  )
}

export default AdminSidebar