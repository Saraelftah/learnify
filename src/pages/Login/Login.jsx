import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { signInWithEmailAndPassword , signInWithPopup} from "firebase/auth";
import bc from "../../assets/images/labtop-bc.png";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google-color.svg";
import toast from "react-hot-toast";

//import style from './Login.module.css'

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Loged in successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
       toast.success("Logged in with Google!");
    navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex">
        <div
          className={`w-5/6 mx-auto lg:w-2/4 rounded-3xl py-15 px-8 flex flex-col items-center`}
        >
          <NavLink to="/">
            <div className="w-30 mb-8 mx-auto">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-5 w-full"
          >
            <h2 className="text-3xl mb-3 font-bold text-center">Login</h2>

            {/* email */}
            <div className="flex flex-col py-5 gap-3 w-4/6">
              <label htmlFor="">Email</label>
              <label className="floating-label">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="input input-lg w-full rounded-xl
                   focus:ring-1 focus:ring-[var(--light-secondary-color)]
                  focus:outline focus:outline-[var(--light-secondary-color)]
                  focus:border-[var(--light-secondary-color)]
                  shadow-md"
                  autoComplete="off"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <span>Email</span>
              </label>

              {errors.email && (
                <div className="text-red-500">
                  <i class="fa-solid fa-circle-exclamation"></i>{" "}
                  <span>{errors.email.message} </span>
                </div>
              )}
            </div>

            {/* /password */}
            <div className="flex flex-col py-5 gap-3 w-4/6 ">
              <label htmlFor="password">Password</label>
              <label className="floating-label">
                <input
                  type="password"
                  placeholder="Enter your password..."
                  id="password"
                  className="input input-lg w-full rounded-xl
                   focus:ring-1 focus:ring-[var(--light-secondary-color)]
                  focus:outline focus:outline-[var(--light-secondary-color)]
                  focus:border-[var(--light-secondary-color)]
                  shadow-md"
                  autoComplete="off"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <span>Password</span>
              </label>

              {errors.password && (
                <div className="text-red-500">
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <span> {errors.password.message} </span>
                </div>
              )}
            </div>
          </form>

          <div className="mb-5">
            <p className="text-center">
              Don't have an account?{" "}
              <NavLink to="/signup">
                {" "}
                <b className="text-blue-600">Register</b>{" "}
              </NavLink>{" "}
            </p>
          </div>

          <div className="text-center flex flex-col items-center justify-center gap-3">
            <p className="mb-3">
              <b>Login </b>With Others
            </p>

            <NavLink
              onClick={signUpWithGoogle}
              className="flex gap-2 items-center justify-center bg-white py-3 rounded-3xl border border-gray-200 w-3/4  hover:bg-gray-50 
          transition-colors duration-500 ease-in-out"
            >
              <div className="w-5 md:w-8">
                <img src={google} alt="google" />
              </div>
              <p>
                Login With <b>Google</b>
              </p>
            </NavLink>
          </div>
        </div>

        {/* side image */}
        <div className="hidden lg:block">
          <img src={bc} alt="image" className="h-full object-fit" />
        </div>
      </div>
    </>
  );
}

export default Login;
