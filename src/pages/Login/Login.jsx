import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import SideImg from "../../components/SideImg/SideImg";
import Logo from "../../components/Logo/Logo";
import Google from "../../components/Google/Google";
import SignBtn from "../../components/SignBtn/SignBtn";
import FormInput from "../../components/FormInput/FormInput";
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
      toast.success("Logged in successfully!");
      navigate("/");
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
            <h2 className="text-xl md:text-3xl mb-3 font-bold text-center">
              Login
            </h2>

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

            {/* /password */}
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password..."
              name="password"
              register={register}
              rules={{
                required: "Password is required",
              }}
              error={errors.password}
            />

            {/* submit button */}
            <SignBtn label="Login" />
          </form>

          <div className="mb-5">
            <p className="text-center">
              Don't have an account?{" "}
              <NavLink to="/register">
                {" "}
                <b className="text-[var(--primary-color)]">Register</b>{" "}
              </NavLink>{" "}
            </p>
          </div>

          <div className="divider w-5/6 mx-auto mb-9">
            <p className="mb-3">
              <b>Login </b>With Others
            </p>
          </div>

          <Google />
        </div>

        <SideImg imgClass="max-h-[900px] object-cover" />
      </div>
    </>
  );
}

export default Login;
