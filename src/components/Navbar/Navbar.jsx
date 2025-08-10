import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import LightDark from "../LightDark/LightDark";

function Navbar() {
    
  return (
    <>
      <div className="home-navbar">
        <div className="my-container">
          <nav className="navbar px-0 py-[10px] justify-between">
            <div className="navbar-start w-fit">
              <NavLink to="/">
                <img src={logoImg} alt="logo" className="!w-[100px]" />
              </NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `text-[var(--main-text-color)] hover:text-[var(--primary-color)] ${
                        isActive ? "font-bold text-[var(--primary-color)]" : ""
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              <LightDark />

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-[var(--main-text-color)] hover:text-[var(--primary-color)] lg:ml-[20px] ${
                    isActive ? "font-bold text-[var(--primary-color)]" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="btn bg-[var(--secondary-color)] text-white ml-4 hover:bg-[var(--primary-color)] border-0 shadow-none transition-colors duration-500 ease-in-out"
              >
                Sign Up
              </NavLink>
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
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/services">Services</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                  <li>
                    <LightDark />
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className="btn bg-[var(--secondary-color)] text-white w-full"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
