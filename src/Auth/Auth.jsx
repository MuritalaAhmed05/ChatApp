import React from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log(result.user);
      const user = result.user;
      console.log("User signed in successfully");
      console.log(user);
      navigate("/Chat");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div onClick={signInWithGoogle} className="flex justify-center items-center gap-4 p-2 border border-gray-700 outline-none rounded-full w-full bg-[#10172a]">
      <FcGoogle />
      <button  className="text-white ">
        Continue With Google
      </button>
    </div>
  );
}
