// import  from "./Footer.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

function Footer() {
  return (
    <>
      <footer className="bg-[#282828] text-[#cdcccc] py-[30px] capitalize text-sm">
        <div className="container">
          <div className="footer-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <div className="item col-span-2">
              <img src={logoImg} alt="Logo" className="!w-[100px] brightness-1 invert" />
              <p className="mt-5 text-[#cdcccc] leading-[var(--line-height)]">
                Book expert tutors in any subject, anytime. Track progress and
                achieve goals through personalized online lessons. The smart way
                to learn.
              </p>
              <p className=" mt-5">
                Learnify &copy; Team 4 2025 All rights reserved.
              </p>
            </div>

            <div className="item">
              <h3 className="text-xl my-5 text-[var(--light-primary-color)] font-bold">quick links</h3>
              <div className="flex flex-col gap-1">
                <Link className="hover:text-[var(--light-primary-color)]" to="/">home</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/about">about</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/search">teachers</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/support">support</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/login">login</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/register">sign up</Link>
              </div>
            </div>

            <div className="item">
              <h3 className="text-xl my-5 text-[var(--light-primary-color)] font-bold">contact us</h3>
              <ul className="flex flex-col justify-center gap-2">
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-facebook text-xl group-hover:text-[var(--light-primary-color)]"></i> facebook
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-whatsapp text-xl group-hover:text-[var(--light-primary-color)]"></i> whatsapp
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-instagram text-xl group-hover:text-[var(--light-primary-color)]"></i> instagram
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-youtube text-xl group-hover:text-[var(--light-primary-color)]"></i> youtube
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-linkedin text-xl group-hover:text-[var(--light-primary-color)]"></i> linkedin
                </li>
              </ul>
            </div>

            <div className="item">
              <h3 className="text-xl my-5 text-[var(--light-primary-color)] font-bold">subscribe</h3>
              <p className="leading-[var(--line-height)]">
                Subscribe to our newsletter and never miss a learning
                opportunity.
              </p>
              <form
                className="mt-4 flex gap-2 w-full relative"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 bg-[#383838] input border-2 border-[var(--secondary-color)] focus:outline-0"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 !width-full bg-[var(--secondary-color)] px-2 py-[9px] cursor-pointer z-2 rounded-tr-sm rounded-br-sm"
                >
                  <i class="fa-brands fa-telegram text-white"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        
      </footer>
    </>
  );
}

export default Footer;
