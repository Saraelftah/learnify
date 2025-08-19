import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../store/UsersSlice";
import { Link } from "react-router-dom";


function NavCurrentUser() {
    const user = useSelector(state => state.users.currentUser); 
    const dispatch = useDispatch();

    const handleLogout = () => {
    dispatch(signOutUser());
  };
  return (
    <>
        {user&& (
            <div className="nav-currentuser">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        
                        {user.photoURL? (
                            <div className="w-10 rounded-full">
                                <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        ):(
                            <div className="w-10 h-10 rounded-full border-1 border-[var(--secondary-color)] text-[var(--secondary-color)] !flex justify-center items-center">
                                <i className="fa-solid fa-user text-xl "></i>
                            </div>
                        )}
                        
                    </div>
                    {
                        user.role === "admin" && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[var(--background-color)] text-[var(--main-color)] rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                            <Link to="/admin" className="justify-between">
                                dashboard
                            </Link>
                            </li>
                            <li> <button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    )}
                    {
                        user.role === "student" && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[var(--background-color)] text-[var(--main-color)] rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                            <Link to="/myBookings" className="justify-between">
                                my booking
                            </Link>
                            </li>
                            <li> <button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    )}
                    {
                        user.role === "teacher" && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[var(--background-color)] text-[var(--main-color)] rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                            <Link to={`/tutor/${user.uid}`} className="justify-between">
                                Profile
                            </Link>
                            </li>
                            <li><Link to="">edit profile</Link></li>
                            <li> <button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    )}
                    
                </div>
            </div>
        )}
        
    </>
  )
}

export default NavCurrentUser