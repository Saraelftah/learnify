import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import SideImg from "../../components/SideImg/SideImg";
import Logo from "../../components/Logo/Logo";
import Google from "../../components/Google/Google";
import SignBtn from "../../components/SignBtn/SignBtn";
import FormInput from "../../components/FormInput/FormInput";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/UsersSlice";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // get the user id and check if he is registered or not
      const uid = cred.user.uid;
      const snap = await getDoc(doc(db, "users", uid));
      if (!snap.exists()) {
        toast.error("user not found, please register first");
        return;
      }
      // get the user role
      const role = snap.data().role;

      //save current user to redux to use it in navbar profile icon
      const userObject = {
        uid: cred.user.uid,
        email: cred.user.email,
        name: snap.data().name,
        image: cred.user.Image,
        role: role,
      };
      dispatch(setCurrentUser(userObject));

      toast.success("Logged in successfully!");
       reset();

      // navigate as role
      if (role === "admin") navigate("/admin");
      else if (role === "teacher") navigate("/teacher");
      else if (role === "student") navigate("/");
      else if (role === "teacherPending") navigate("/pending");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex bg-[var(--background-color)]">
        <div
          className={`w-5/6 mx-auto lg:w-2/4 rounded-3xl lg:rounded-none py-15 px-8 flex flex-col items-center`}
        >
          <Logo />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-5 w-full gap-4 "
          >
            <h2 className="text-xl md:text-3xl mb-3 font-bold text-center text-[var(--main-text-color)]">
              Login
            </h2>

            {/* email */}
            <div className="w-full md:w-4/6">
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
            </div>

            {/* /password */}
            <div className="w-full  md:w-4/6">
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
            </div>

            {/* submit button */}
            <SignBtn label="Login" />
          </form>

          <div className="mb-5">
            <p className="text-center">
              Don't have an account?{" "}
              <NavLink to="/role">
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

        <SideImg imgClass="min-h-screen" />
      </div>
    </>
  );
}

export default Login;
