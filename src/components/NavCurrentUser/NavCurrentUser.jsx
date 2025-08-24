import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../store/UsersSlice";
import { Link } from "react-router-dom";

function NavCurrentUser() {
  const user = useSelector((state) => state.users.currentUser);
  const teachers = useSelector((state) => state.teachers.teachers);
  const currentTeacher = teachers?.find((teacher) => teacher?.id === user?.id);

  console.log(user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOutUser());
  };
  return (
    <>
      {user && (
        <div className="nav-currentuser">
          
            
            {user.role === "admin" && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="image-placeholder w-10 h-10 rounded-full bg-[var(--secondary-color)] text-white !flex justify-center items-center">
                        <h3 className="text-md">
                            {user?.name?.split(" ").map(name => name.charAt(0).toUpperCase()).join('')}
                        </h3>
                    </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm py-5 dropdown-content bg-[var(--background-color)] text-[var(--main-color)] rounded-box z-1 mt-3 w-70 p-2 shadow"
                >
                    <h3 className="ml-2 mb-2 text-[var(--dark-color)] font-bold text-[18px]">hi admin,</h3>
                  <li>
                    <Link to="/admin" className="justify-between text-[18px]">
                      dashboard
                    </Link>
                  </li>
                  <li >
                    <button className="justify-between text-[18px]" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
            {user.role === "student" && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="image-placeholder w-10 h-10 rounded-full bg-[var(--secondary-color)] text-white !flex justify-center items-center ">
                    
                        <h3 className="text-md">
                            {user?.name?.split(" ").map(name => name.charAt(0).toUpperCase()).join('')}
                        </h3>
                    </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-[var(--background-color)] text-[var(--main-color)] rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    <h3 className="ml-2 mb-2 text-[var(--dark-color)] font-bold text-[18px]">hi {user.name},</h3>
                  <li>
                    <Link to="/myBookings" className="justify-between text-[18px]">
                      my booking
                    </Link>
                  </li>
                  <li>
                    <button className="text-[18px]" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
            {user.role === "teacher" && currentTeacher &&(
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  {currentTeacher?.Image ? (
                    <div className="w-10 rounded-full">
                      <img
                        alt={currentTeacher?.name}
                        src={currentTeacher?.Image}
                      />
                    </div>
                  ) : (
                    <div className="image-placeholder w-10 h-10 rounded-full bg-[var(--secondary-color)] text-white !flex justify-center items-center">
                        <h3 className="text-md">
                            {currentTeacher?.name?.split(" ").map(name => name.charAt(0).toUpperCase()).join('')}
                        </h3>
                    </div>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-[var(--background-color)] text-[var(--main-color)] rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                   <h3 className="ml-2 mb-2 text-[var(--dark-color)] font-bold text-[18px]">hi {user.name},</h3>

                  <li>
                    <Link to={`/tutor/${user.uid}`} className="justify-between text-[18px]">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="justify-between text-[18px]" >edit profile</Link>
                  </li>
                  <li>
                    <button className=" text-[18px]" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
      )}
    </>
  );
}

export default NavCurrentUser;


