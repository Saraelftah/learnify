import { Link, NavLink } from "react-router-dom";


function AdminSidebar() {
  return (
    <>
    <div className="sidebar bg-[var(--admin-bg-color)] text-[var(--dark-color)] p-5 capitalize w-full xl:w-[20%]">
      <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] mb-5 text-center xl:text-start">dashboard</h3>
      <div className="sidebar flex flex-row xl:flex-col gap-4 xl:gap-2 justify-center xl:justify-start">
        
        <NavLink to="/admin" className="nav-link flex items-center gap-2 mb-2">
          <i className="fa-solid fa-house text-[var(--light-primary-color)]"></i>
           <h5>Overview</h5>
        </NavLink>
        <NavLink to="/admin/teachers" className="nav-link flex items-center gap-2 mb-2">
          <i className="fa-solid fa-person-chalkboard text-[var(--light-primary-color)]"></i>
          <h5> Teachers </h5>
        </NavLink>
        <NavLink to="/admin/students" className="nav-link flex items-center gap-2 mb-2">
          <i className="fa-solid fa-graduation-cap text-[var(--light-primary-color)]"></i> 
          <h5>Students</h5>
        </NavLink>
        <NavLink to="/admin/messages" className="nav-link flex items-center gap-2 mb-2">
          <i className="fa-solid fa-envelope text-[var(--light-primary-color)]"></i> 
          <h5>Messages</h5>
        </NavLink>
      </div>
    </div>

    </>
  )
}

export default AdminSidebar