import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from "firebase/auth";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
// import "./App.css";
export default function Register() {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [passError, setPassError] = useState("");
  const [noMail, setnoMail] = useState("");
  const [empty, setEmpty] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false)
  

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassError("");
    setnoMail("");
    setEmpty("");
    setLoading(true);
    if (displayName === "") {
      setEmpty("Please enter your display name");
      return;
    }
    if (email === "") {
      setnoMail("Please enter your email");
      return;
    }
    if (password === "") {
      setPassError("Please enter a password");
      return;
    }
    if (password.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setPassError("Passwords do not match.");
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
     
      const user = userCredentials.user;
      await updateProfile(user, { displayName });
      await sendEmailVerification(user);
     setShowModal(true);
      setEmail("");
      setPassword("");
      setdisplayName("");
      setConfirmPassword("");
      setError("");
      
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          setError("The email address is already in use by another account.");
          setLoading(false);
          break;
        case "auth/invalid-email":
          setError("The email address is badly formatted.");
          setLoading(false);
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          setLoading(false);
          break;
        default:
          setError("Failed to sign up. Please try again.");
          setLoading(false);
      }
    }finally{
      setLoading(false);
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
          SignUp
        </h1>
        <p className="pl-8 text-[12px]">Let's sign up quickly to get started</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-8 py-8 sm:px-9 px-1 w-full"
        >
          <label htmlFor="username" className="flex flex-col">
            <span className="text-xs text-gray-500 font-semibold">
              Username:
            </span>
            <div className="relative flex items-center">
              <FaRegUserCircle className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={displayName}
                className="pl-10 p-2 border border-gray-700 outline-none rounded-full w-full bg-[#10172a]"
                onChange={(e) => setdisplayName(e.target.value)}
              />
            </div>
            {empty && (
              <span className="text-xs text-red-700 font-semibold">
                {empty}
              </span>
            )}
          </label>
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
            {noMail && (
              <span className="text-xs text-red-700 font-semibold">
                {noMail}
              </span>
            )}
          </label>
          <label htmlFor="Password" className="flex flex-col">
            <span className="text-xs text-gray-500 font-semibold">
              Password:
            </span>
            <div className="relative flex items-center">
              <RiLockPasswordLine className="absolute left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="Password"
                placeholder="Password"
                value={password}
                className="pl-10 p-2 border border-gray-700 outline-none rounded-full w-full bg-[#10172a]"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </div>
            </div>
            {passError && (
              <span className="text-xs text-red-700 font-semibold">
                {passError}
              </span>
            )}
          </label>
          <label htmlFor="confirmPassword" className="flex flex-col">
            <span className="text-xs text-gray-500 font-semibold">
              ConfirmPassword:
            </span>
            <div className="relative flex items-center">
              <RiLockPasswordLine className="absolute left-3 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                id="confirmPassword"
                className="pl-10 p-2 border border-gray-700 outline-none rounded-full w-full bg-[#10172a]"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-3 text-gray-400"
                onClick={() => {
                  setshowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </div>
            </div>
            {passError && (
              <span className="text-xs text-red-700 font-semibold">
                {passError}
              </span>
            )}
          </label>
          {error && (
            <p className="p-2 bg-red-500 text-white rounded-full text-center text-nowrap sm:text-sm text-xs py-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="p-2 bg-purple-500 text-white rounded-full"
            disabled={loading}
            >
          {loading? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-purple-300 text-center">
            Already have an account? <Link
            to="/login"
            className="text-purple-500"
          >
            Sign In
          </Link>
          </p>
            <Auth/>
          
        </form>
        
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-lg font-bold">Email Sent!</h2>
            <p>Please check your email to verify your account.</p>
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
}
