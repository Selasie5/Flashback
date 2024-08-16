"use client"

import React from 'react'
import Image from "next/image"
import {useRouter} from "next/navigation"
import {auth} from "../../../config/firebase"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Link from 'next/link'
import LoginForm from '@/components/forms/LoginForm'

const page = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  //Google signup
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in: ", user);
        console.log("Access token: ", token);

        router.push("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData ? error.customData.email : null;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error signing in: ", errorCode, errorMessage);

        if (email) console.error("Email: ", email);
        if (credential) console.error("Credential: ", credential);
      });
  };

  return (
    <section className='flex'>
      <div className='h-screen flex flex-col justify-center items-start w-full md:w-3/5  gap-6 px-7 md:px-[10rem] py-5'>
      <div className='space-y-2'>
      <h2 className='font-medium text-3xl font-heading'>
          Welcome back😉
         </h2>
         <p className='font-normal text-sm'>Let's get you all set to start learning smart</p>
      </div> <div className="w-full">
            <button
              type="submit"
              onClick={signInWithGoogle}
              className=" flex justify-center items-center gap-3 mt-4 w-full px-6 py-3 text-sm bg-gray-200 text-black font-medium rounded-xl"
            >
              <Image src="/google.svg" width={20} height={50} alt="Google" />
              Sign Up With Google
            </button>
          </div>
          <div className='flex justify-center items-center mx-auto space-x-6'>
<hr className='w-36'/>
<span className='text-gray-500'>or</span>
<hr className='w-36'/>
          </div>
      <LoginForm/>
      </div>
      
      <div className="hidden  w-2/5 bg-login md:flex justify-end items-start p-5 relative bg-center bg-cover bg-no-repeat" style={{backgroundImage:" url('/bg.jpg')"}}>
    <div className="absolute inset-0 bg-black/20">
         </div>
      </div>
    </section>
  )
}

export default page