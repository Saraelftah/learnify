// import style from "./Footer.module.css";
import logoImg from "../../assets/images/logo.png";

function Footer() {
  return (
    <>
      <footer className="bg-[#212121] text-white py-[20px] p-4">
        <div className="container flex items-center justify-between">
          <img
            src={logoImg}
            alt="Logo"
            className="!w-[100px]"
          />

          <p className="text-sm">Learnify &copy; Team 4 2025 All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
