import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex ">
        <div
          className={`w-5/6 mx-auto lg:w-2/4 bg-white rounded-3xl py-15 px-8 `}
        >
          {/* <Link to="/">
            <div className="w-30 mb-8 mx-auto">
              <img src={logo} alt="logo" />
            </div>
          </Link> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-5"
          >
            <h2 className="text-3xl font-bold">Signup</h2>
            {/* username */}
            <div className="flex flex-col py-2 gap-2 w-5/6">
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="input input-lg"
                  autoComplete="off"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 6,
                      message: "Username must be at least 6 characters",
                    },
                  })}
                />
                <span>Username</span>
              </label>
              {errors.username && (
                <div className="text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  <span className="text-sm">{errors.username.message}</span>
                </div>
              )}
            </div>

            {/* email */}
            <div className="flex flex-col py-2 gap-2 w-5/6 ">
              <label className="floating-label">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="input input-lg"
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
            <div className="flex flex-col py-2 gap-2 w-5/6 ">
              <label className="floating-label">
                <input
                  type="password"
                  placeholder="Enter your password..."
                  className="input input-lg"
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
                <span>Email</span>
              </label>
              {errors.password && (
                <div className="text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm"> {errors.password.message} </span>
                </div>
              )}
            </div>

            {/* confirm password */}
            <div className="flex flex-col py-2 gap-2 w-5/6 ">
              <label className="floating-label">
                <input
                  type="password"
                  placeholder="Confirm your password..."
                  className="input input-lg"
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

            <button
              type="submit"
              className="w-5/6 mt-3 bg-blue-500 hover:bg-blue-700 text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
