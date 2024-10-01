import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        navigate("/Chat");
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-credential":
          setError("The email or password is incorrect.");
          break;
        case "auth/invalid-email":
          setError("The email address is badly formatted.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
     
      <div className="sm:w-1/2 w-full  bg-black text-white flex flex-col justify-center items-start sm:px-9 px-1">
        <h1 className="text-[2rem] font-bold text-left self-left pl-8">
          Sign In
        </h1>
        <p className="pl-8 text-[12px]">Hey👋 Welcome back, Login and get started</p>
        <form onSubmit={handleLogin}
         className="flex flex-col space-y-8 p-8 w-full"
        >
          <div>
            <label htmlFor="email" className="flex flex-col">
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
           
          </div>
         
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
            {/* {passError && (
              <span className="text-xs text-red-700 font-semibold">
                {passError}
              </span>
            )} */}
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
      {loading ? "Logging in..." : "Login"}
          </button>

         
          
          <p className="text-purple-300 text-center">
            Don't have an account? <Link
            to="/"
            className="text-purple-500"
          >
           Create Account
          </Link>
          </p>
          
          <Link to="/Reset" className="text-center text-purple-500"> Forgotten password?</Link>
        </form>
      </div>

      <div className="w-1/2 hidden sm:flex justify-end items-end bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] h-screen">
        <h1 className="self-end  text-white font-bold text-[4rem] text-center p-8 shadow-lg">
          Welcome to Ahmed's Chat App
        </h1>
      </div>
    </div>
  );
};

export default Login;
