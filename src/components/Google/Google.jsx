import { signInWithPopup } from "firebase/auth";
import google from "../../assets/images/google-color.svg";
import { auth, googleProvider } from "../../../firebase";
import {useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function Google() {
  const navigate = useNavigate();
  
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
      <NavLink
        onClick={signUpWithGoogle}

        className="flex gap-2 items-center justify-center bg-[var(--card-background)] py-3 rounded-3xl border 
         w-full lg:w-3/4  md:w-3/4
         border-gray-200  hover:bg-gray-50
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
