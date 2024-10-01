import React from 'react'
import {auth} from './firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
export default function Auth() {
    const signInWithGoogle = async() => {
      const provider = new GoogleAuthProvider();
      
     try{
        const result = await signInWithPopup(auth, provider);
        // console.log(result.user);
        const user = result.user;
        console.log('User signed in successfully');
        console.log(user);

     }catch(e){
        console.log(e);
     }
    }
  return (
    <div   className="flex justify-center items-center gap-4 p-2 border border-gray-700 outline-none rounded-full w-full bg-[#10172a]">
        <FcGoogle />
        <button
        onClick={signInWithGoogle}
        className='text-white '
        >signUpWithGoogle</button>
    </div>
  )
}
