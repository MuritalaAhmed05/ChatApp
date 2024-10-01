import React, { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);

      setShowModal(true);
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          setError("The email address is already in use by another account.");

          break;
        case "auth/invalid-email":
          setError("The email address is badly formatted.");

          break;
        case "auth/missing-email":
          setError("Please enter an email address");

          break;
        default:
          setError("Failed to sign up. Please try again.");
      }
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden sm:flex justify-end items-end bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] h-screen">
        <h1 className="self-end  text-white font-bold text-[4rem] text-center p-8 shadow-lg">
          Welcome to Ahmed's Chat App
        </h1>
      </div>
      <div className="sm:w-1/2 w-full  bg-black text-white flex flex-col justify-center items-start px-9">
        <h1 className="text-[2rem] font-bold text-left self-left pl-8">
          Reset Password
        </h1>
        <p className="pl-8 text-[12px]">
          Enter your email to reset your password
        </p>
        <form
          onSubmit={handlePasswordReset}
          className="flex flex-col space-y-8 py-8 sm:px-9 px-1 w-full"
        >
          <label htmlFor="Email" className="flex flex-col">
            <span className="text-xs text-gray-500 font-semibold">Email:</span>
            <div className="relative flex items-center">
              <MdOutlineEmail className="absolute left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                className="pl-10 p-2 border border-gray-700 outline-none rounded-full w-full bg-[#10172a]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          {error && (
            <p className="p-2 bg-red-500 text-white rounded-full text-center text-nowrap sm:text-sm text-xs py-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="p-2 bg-purple-500 w-full text-center text-white rounded-full"
          >
            Submit
          </button>
          <p className="text-md text-gray-500 font-semibold text-center">OR</p>
          <Link
            to="/login"
            className="p-2 bg-purple-500 w-full text-center text-white rounded-full"
          >
            Sign In
          </Link>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-lg font-bold">Email Sent!</h2>
            <p>Please check your email to Reset your password.</p>
            <button
              className="mt-4 p-2 px-5 bg-blue-500 text-white rounded-lg"
              onClick={handleModalClose}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reset;
