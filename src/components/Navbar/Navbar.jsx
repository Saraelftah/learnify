import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import LightDark from "../LightDark/LightDark";
import Notification from "../Notification/Notification";
import NavCurrentUser from "../NavCurrentUser/NavCurrentUser";
import "./Navbar.css"
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector(state => state.users.currentUser);
  return (
    <>
      <nav className="home-navbar fixed top-0 left-0 z-50 w-full bg-[var(--background-color)] capitalize">
        <div className="container py-4">
          <div className="navbar px-0 py-[5px] justify-between items-center">
            <div className="navbar-start w-fit">
              <NavLink to="/">
                <img src={logoImg} alt="logo" className="!w-[100px] " />
              </NavLink>
            </div>

            <div className="navbar-center hidden lg:flex lg:items-center">
              <ul className="menu menu-horizontal px-1 gap-3 items-center">
                <li className="">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] nav-hover px-0 ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/search"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] nav-hover px-0 ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    teachers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] nav-hover px-0 ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    about
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] nav-hover px-0 ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] nav-hover px-0 ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    services
                  </NavLink>
                </li>
                <li className="">
                  <LightDark />
                </li>
                <li className="">
                  <Notification />
                </li>
              </ul>

              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] lg:ml-[20px] nav-hover ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn bg-[var(--secondary-color)] text-white ml-4 hover:bg-[var(--background-color)] hover:text-[var(--secondary-color)] border-1 border-[var(--secondary-color)] shadow-none transition-colors duration-500 ease-in-out"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}

              <div className="ml-2">
                <NavCurrentUser />
              </div>
            </div>

            <div className="navbar-end lg:hidden w-fit p-0">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 top-[50px] right-0"
                >
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/search">teachers</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">about</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                  <li>
                    <NavLink to="/services">services</NavLink>
                  </li>
                  <li>
                    <LightDark />
                  </li>
                  <li>
                    <Notification />
                  </li>
                  {!user && (
                    <>
                      <li>
                        <NavLink to="/login">Login</NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/register"
                          className="btn bg-[var(--secondary-color)] text-white w-full"
                        >
                          Sign Up
                        </NavLink>
                      </li>
                    </>
                  )}
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
