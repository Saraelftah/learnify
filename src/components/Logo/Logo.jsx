import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Logo() {
  return (
    <NavLink to="/">
      <div className="w-30 mb-5 mx-auto">
        <img src={logo} alt="logo" />
      </div>
    </NavLink>
  );
}

export default Logo;
