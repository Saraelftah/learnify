import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Logo() {
  return (
    <NavLink to="/">
<<<<<<< HEAD
      <div className="w-30 mb-5 mx-auto">
=======
      <div className="w-30 mb-8 mx-auto">
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
        <img src={logo} alt="logo" />
      </div>
    </NavLink>
  );
}

export default Logo;
