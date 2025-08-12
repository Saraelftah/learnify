// import style from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";
import logo from "../../assets/images/logo.png";
import bc from "../../assets/images/labtop-bc.png";
import google from "../../assets/images/google-color.svg";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
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
      {/* <div className={style.page}>
      <div className={style.overlay}> */}
      <div className="flex">
        <div
          className={`w-5/6 mx-auto lg:w-2/4 rounded-3xl py-15 px-8 flex flex-col items-center bg-[#FFFBFA]`}
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
            <h2 className="text-3xl mb-3 font-bold text-center">
              Hey, We are glad you <br></br> chose Learnify
            </h2>
            <div className="divider w-5/6 mx-auto mb-5">Lets get started</div>

            {/* username */}
            <div className="flex flex-col py-2 gap-3 w-4/6">
              <label htmlFor="">Name</label>
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="input input-lg w-full rounded-xl
                   focus:ring-1 focus:ring-[var(--light-secondary-color)]
                  focus:outline focus:outline-[var(--light-secondary-color)]
                  focus:border-[var(--light-secondary-color)]
                  shadow-md"
                  autoComplete="off"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 6,
                      message: "Username must be at least 6 characters",
                    },
                  })}
                />
                <span>Name</span>
              </label>
              {errors.username && (
                <div className="text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  <span className="text-sm">{errors.username.message}</span>
                </div>
              )}
            </div>

            {/* email */}
            <div className="flex flex-col py-2 gap-3 w-4/6 ">
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
                    pattern: {
                      value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                      message: "Email is not valid",
                    },
                  })}
                />
                <span>Email</span>
              </label>
              {errors.email && (
                <div className="text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  <span className="text-sm">{errors.email.message} </span>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col py-2 gap-3 w-4/6 ">
              <label htmlFor="">Password</label>
              <label className="floating-label">
                <input
                  type="password"
                  placeholder="Enter your password..."
                  className="input input-lg w-full rounded-xl
                   focus:ring-1 focus:ring-[var(--light-secondary-color)]
                  focus:outline focus:outline-[var(--light-secondary-color)]
                  focus:border-[var(--light-secondary-color)]
                  shadow-md
                  "
                  autoComplete="off"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                      message:
                        "Password must contain uppercase, lowercase, number, and special character",
                    },
                  })}
                />
                <span>Password</span>
              </label>
              {errors.password && (
                <div className="text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm"> {errors.password.message} </span>
                </div>
              )}
            </div>

            {/* confirm password */}
            <div className="flex flex-col py-2 gap-3 w-4/6 ">
              <label htmlFor="">Confirm Password</label>
              <label className="floating-label">
                <input
                  type="password"
                  placeholder="Confirm your password..."
                  className="input input-lg w-full rounded-xl 
                  focus:ring-1 focus:ring-[var(--light-secondary-color)]
                  focus:outline focus:outline-[var(--light-secondary-color)]
                  focus:border-[var(--light-secondary-color)]
                  shadow-md
                  "
                  autoComplete="off"
                  {...register("confirmPassword", {
                    required: "Confirmation is required",
                    validate: (value) =>
                      value === watch("password") || "Password do not match",
                  })}
                />
                <span>Confirm Password</span>
              </label>
              {errors.confirmPassword && (
                <div className="text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  <span className="text-red-500 text-sm">
                    {" "}
                    {errors.confirmPassword.message}{" "}
                  </span>
                </div>
              )}
            </div>

            {/* Phone*/}
            <div className="flex flex-col py-2 gap-3 w-4/6 ">
              <label htmlFor="">Phone</label>
              <label className="floating-label">
                <input
                  type="tel"
                  placeholder="Enter your phone number..."
                  className="input input-lg w-full rounded-xl 
                  focus:ring-1 focus:ring-[var(--light-secondary-color)]
                  focus:outline focus:outline-[var(--light-secondary-color)]
                  focus:border-[var(--light-secondary-color)]
                  shadow-md
                  "
                  autoComplete="off"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10,12}$/,
                      message: "Phone number must contain only digits",
                    },
                  })}
                />
                <span>Phone</span>
              </label>
              {errors.phone && (
                <div className="text-red-500">
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm"> {errors.phone.message} </span>
                </div>
              )}
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="w-4/6 btn mt-5 mb-9 py-6 rounded-xl text-white bg-[var(--secondary-color)]
              hover:bg-[var(--primary-color)]
              transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>

          <div className="mb-5">
            <p className="text-center">
              Already have an account?{" "}
              <NavLink to="/login">
                {" "}
                <b className="text-[var(--primary-color)]">Login</b>{" "}
              </NavLink>{" "}
            </p>
          </div>

          <div className="divider w-5/6 mx-auto mb-9">
            <p>
              <b>Signup </b>With Others
            </p>
          </div>

          {/* google */}
          <NavLink
            onClick={signUpWithGoogle}
            className="flex gap-2 items-center justify-center bg-white py-3 rounded-3xl border border-gray-200 w-3/4  hover:bg-gray-50 
          transition-colors duration-500 ease-in-out"
          >
            <div className="w-5 md:w-8">
              <img src={google} alt="google" />
            </div>
            <p>
              Signup With <b>Google</b>
            </p>
          </NavLink>
        </div>

        {/* side image */}
        <div className="hidden lg:block w-2/4">
          <img src={bc} alt="image" className="h-full object-fit" />
        </div>
      </div>

      {/* </div>
    </div> */}
    </>
  );
}

export default Register;
