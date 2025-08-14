<<<<<<< HEAD
import { NavLink, useLocation, useNavigate } from "react-router-dom";
=======
// import style from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";
import SideImg from "../../components/SideImg/SideImg";
import Logo from "../../components/Logo/Logo";
import Google from "../../components/Google/Google";
import SignBtn from "../../components/SignBtn/SignBtn";
import FormInput from "../../components/FormInput/FormInput";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation();
  const role = location.state?.selectedRole || "student";
=======
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
<<<<<<< HEAD
    const { email, password, username, phone } = data;
=======
    const { email, password, username, phone, role } = data;
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      const safeRole = role === "teacher" ? "teacherPending" : "student";
      // make users collection
<<<<<<< HEAD
      await setDoc(doc(db, "users", uid), {
=======
      await setDoc(doc(db,"users",uid), {
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
        email,
        name: username,
        phone,
        role: safeRole,
<<<<<<< HEAD
        createdAt: serverTimestamp(),
      });
      // make newteachers collection
      if (role === "teacher") {
        await setDoc(doc(db, "newTeachers", uid), {
=======
        creatdeAt: serverTimestamp()
      })
      // make newteachers collection
      if (role === "teacher") {
        await setDoc(doc(db, "newTeachers", uid),{
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
          bio: "",
          subject: "",
          pricePerHour: null,
          availability: [],
          ownerId: uid,
          createdAt: serverTimestamp(),
          approved: false,
        });
      }
      toast.success("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
<<<<<<< HEAD
      <div className="flex bg-[#FFFBFA]">
        <div
          className={`w-5/6 mx-auto lg:w-3/6 rounded-3xl lg:rounded-none py-5 px-8 flex flex-col items-center`}
=======
      <div className="flex">
        <div
          className={`w-5/6 mx-auto lg:w-2/4 rounded-3xl lg:rounded-none py-15 px-8 flex flex-col items-center bg-[#FFFBFA]`}
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
        >
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-5 w-full"
          >
            <h2 className="text-xl lg:text-3xl md:text-2xl mb-3 font-bold text-center">
              Hey, We are glad you <br></br> chose Learnify
            </h2>
            <div className="divider w-full lg:w-5/6 mx-auto mb-5">
              Lets get started
            </div>

<<<<<<< HEAD
            <div className="flex justify-between w-full gap-5">
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
            </div>

            <div className="flex justify-between w-full gap-5">
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
            </div>
=======
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
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)

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

<<<<<<< HEAD
=======
            {/* teacher or student */}
            <div className="flex gap-6 my-2">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  value="student"
                  {...register("role", { required: true })}
                  defaultChecked
                />
                <span>Student</span>
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  value="teacher"
                  {...register("role", { required: true })}
                />
                <span>Teacher</span>
              </label>
            </div>

>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
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
