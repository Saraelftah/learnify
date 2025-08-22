// import  from "./Footer.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

function Footer() {
  return (
    <>
      <footer className="bg-[var(--footer-background)] text-[#cdcccc] py-[30px] capitalize text-sm">
        <div className="container">
          <div className="footer-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <div className="item col-span-2">
              <img src={logoImg} alt="Logo" className="!w-[100px] brightness-1 invert" />
              <p className="mt-5 text-[#cdcccc] leading-[var(--line-height)]">
                Book expert tutors in any subject, anytime. Track progress and
                achieve goals through personalized online lessons. The smart way
                to learn.
              </p>
               <ul className="flex gap-2 pt-5">
                <li className="cursor-pointer group transition duration-300">
                  <i className="fa-brands fa-facebook text-2xl group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-whatsapp text-2xl group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-instagram text-2xl group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-youtube text-2xl group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>
                </li>
                <li className="cursor-pointer group transition-colors duration-300">
                  <i className="fa-brands fa-linkedin text-2xl group-hover:text-[var(--secondary-color)]"></i>
                </li>
              </ul>
              
            </div>

            <div className="item">
              <h3 className="text-xl my-5 text-[var(--light-primary-color)] font-bold">quick links</h3>
              <div className="flex flex-col gap-1">
                <Link className="hover:text-[var(--light-primary-color)]" to="/">home</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/about">about</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/search">teachers</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/contact">support</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/login">login</Link>
                <Link className="hover:text-[var(--light-primary-color)]" to="/role">sign up</Link>
              </div>
            </div>

            <div className="item">
              <h3 className="text-xl my-5 text-[var(--light-primary-color)] font-bold">contact us</h3>
              <ul>
                <li className="flex gap-2 items-center mb-2 group transition duration-300"><i className="fa-solid fa-envelope group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>team.4.iti6@gmail.com</li>
                <li className="flex gap-2 items-center mb-2 group transition duration-300"><i className="fa-solid fa-phone group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>01000000000</li>
                <li className="flex gap-2 items-center mb-2 group transition duration-300"><i className="fa-solid fa-location-dot group-hover:text-[var(--secondary-color)] group-hover:scale-105"></i>alexandria, egypt</li>
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
                  className="flex-1 bg-[var(--footer-background)] input border-2 border-[var(--secondary-color)] focus:outline-0"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 !width-full bg-[var(--secondary-color)] px-2 py-[9px] cursor-pointer z-2 rounded-tr-sm rounded-br-sm"
                >
                  <i className="fa-brands fa-telegram text-white"></i>
                </button>
              </form>
            </div>
            
          </div>
          <hr className="border-t-2 border-[var(--hr-footer)] w-[70%] m-auto my-10 rounded-full" />
          <div className="footer-end text-center">
              <p className=" mt-5">
                Learnify &copy; Team 4 2025 All rights reserved.
              </p>
            </div>
        </div>
        
      </footer>
    </>
  );
}

export default Footer;
