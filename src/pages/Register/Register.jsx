// import style from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import toast from "react-hot-toast";
import SideImg from "../../components/SideImg/SideImg";
import Logo from "../../components/Logo/Logo";
import Google from "../../components/Google/Google";
import SignBtn from "../../components/SignBtn/SignBtn";
import FormInput from "../../components/FormInput/FormInput";

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
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="flex">
        <div
          className={`w-5/6 mx-auto lg:w-2/4 rounded-3xl lg:rounded-none py-15 px-8 flex flex-col items-center bg-[#FFFBFA]`}
        >
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-5 w-full"
          >
            <h2 className="text-xl lg:text-3xl md:text-2xl mb-3 font-bold text-center">
              Hey, We are glad you <br></br> chose Learnify
            </h2>
            <div className="divider w-full lg:w-5/6 mx-auto mb-5">Lets get started</div>

            {/* username */}
            <FormInput
              label="Name"
              type="text"
              placeholder="Enter your name..."
              name="username"
              register={register}
              rules={{
                required: "Username is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 characters",
                },
              }}
              error={errors.username}
            />

            {/* email */}
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email..."
              name="email"
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: "Email is not valid",
                },
              }}
              error={errors.email}
            />

            {/* Password */}
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password..."
              name="password"
              register={register}
              rules={{
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
              }}
              error={errors.password}
            />

            {/* confirm password */}
            <FormInput
              label="Confirm Password"
              type="Password"
              placeholder="Confirm your password..."
              name="confirmPassword"
              register={register}
              rules={{
                required: "Confirmation is required",
                validate: (value) =>
                  value === watch("password") || "Password do not match",
              }}
              error={errors.confirmPassword}
            />

            {/* Phone*/}
            <FormInput
              label="Phone"
              type="tel"
              placeholder="Enter your phone number..."
              name="phone"
              register={register}
              rules={{
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,12}$/,
                  message: "Phone number must contain only digits",
                },
              }}
              error={errors.phone}
            />
           

            {/* submit button */}
            <SignBtn label="Sign Up" />
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

          <div className="divider w-full lg:w-5/6 mx-auto mb-9">
            <p className="text-sm md:text-lg">
              <b>Signup </b>With Others
            </p>
          </div>

          <Google />
        </div>

        <SideImg imgClass="h-full" />
      </div>
    </>
  );
}

export default Register;
