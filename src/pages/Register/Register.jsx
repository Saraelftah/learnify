import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const role = location.state?.selectedRole || "student";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password, username, phone } = data;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      const safeRole = role === "teacher" ? "teacherPending" : "student";
      // make users collection
      await setDoc(doc(db, "users", uid), {
        email,
        name: username,
        phone,
        role: safeRole,
        createdAt: serverTimestamp(),
      });
      // make newteachers collection
      if (role === "teacher") {
        await setDoc(
          doc(db, "newTeachers", uid),
          {
            ownerId: uid,
            name: username,
            overview: "",
            subject: "",
            Image: "",
            gradeLevel: "",
            lessonType: "Online",
            firstLessonFree: false,
            hourlyRate: null,
            availableDates: [],
            availablGroupeDates: [],
            approved: false,
            submitted: false,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        await setDoc(doc(db, "students", uid), {
          studentId: uid,
          name: username,
          // createdAt: serverTimestamp(),
        });
      }
      toast.success("Registered Successfully!");
      reset();
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="flex bg-[var(--background-color)]">
        <div
          className={`w-5/6 mx-auto lg:w-3/6 rounded-3xl lg:rounded-none py-5 px-8 flex flex-col items-center`}
        >
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-5 w-full px-3"
          >
            <h2 className="text-lg lg:text-3xl md:text-2xl md:mb-3 font-bold text-center">
              Hey, We are glad you <br></br> chose Learnify
            </h2>
            <div className="divider w-full lg:w-5/6 mx-auto mb-5">
              Lets get started
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full md:gap-5 gap-3 mb-3 md:mb-4">
              {/* username */}
              <div className="lg:w-3/6 md:w-2/4">
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
              </div>

              {/* Phone*/}
              <div className="lg:w-3/6 md:w-2/4">
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
              </div>
            </div>

            {/* email */}
            <div className="w-full mb-3 md:mb-4">
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

            <div className="flex flex-col md:flex-row justify-between w-full md:gap-5 gap-3">
              {/* Password */}
              <div className="lg:w-3/6 md:w-2/4">
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
              </div>

              {/* confirm password */}
              <div className="lg:w-3/6 md:w-2/4">
                <FormInput
                  label="Confirm Password"
                  type="password"
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
            </div>

            {/* submit button */}
            <SignBtn label="Sign Up" />
          </form>

          <div className="md:mb-5">
            <p className="text-center">
              Already have an account?{" "}
              <NavLink to="/login">
                {" "}
                <b className="text-[var(--primary-color)]">Login</b>{" "}
              </NavLink>{" "}
            </p>
          </div>

          <div className="divider w-full lg:w-5/6 mx-auto md:mb-9">
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
