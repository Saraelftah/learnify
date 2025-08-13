import { signInWithPopup } from "firebase/auth";
import google from "../../assets/images/google-color.svg";
import { auth, googleProvider } from "../../../firebase";
import { Navigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function Google() {
  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      Navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavLink
        onClick={signUpWithGoogle}
        className="flex gap-2 items-center justify-center bg-white py-3 rounded-3xl border border-gray-200 w-full lg:w-3/4  hover:bg-gray-50 
          transition-colors duration-500 ease-in-out"
      >
        <div className="w-5 md:w-8">
          <img src={google} alt="google" />
        </div>
        <p>
          Signup With <b>Google</b>
        </p>
      </NavLink>
    </>
  );
}
