// import style from "./Footer.module.css";
import logoImg from "../../assets/images/logo.png";

function Footer() {
  return (
    <>
      <footer className="bg-[#1e1d1d] text-white py-[20px] lg:p-4 p-2">
        <div className="container flex items-center justify-between flex-col lg:flex-row">
          <img
            src={logoImg}
            alt="Logo"
            className="!w-[100px]"
          />

          <p className="lg:text-sm text-xs">Learnify &copy; Team 4 2025 All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
