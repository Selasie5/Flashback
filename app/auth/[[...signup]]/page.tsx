"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../config/firebase";

const signUpSchema = Yup.object().shape({
  userName: Yup.string()
    .min(1, "Your user name must be more than 1 character")
    .max(20, "Your user name must be less than 20 characters")
    .required("user name is required"),
  email: Yup.string()
    .email("Invalid email. Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("You must confirm your password"),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log("Form Submitted:", values);
      try {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            router.push("/supportroom");
          })
          .catch(() => {
            setLoading(false);
            console.error();
          });
      } catch (error) {
        console.error(error);
      }
    },
  });

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
    <section className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start py-14 px-16 overflow-y-auto">
        <div className="mb-6">
          <h1 className="font-bold text-3xl">Create an account</h1>
          <p className="text-gray-600 font-medium">
            Begin your journey to a <span className="text-purple-500">great learning experience</span>
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-start gap-7 w-full"
        >
          <div className="flex flex-col justify-center items-start gap-2 w-full">
            <label htmlFor="email" className="text-gray-600">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-xl ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="flex flex-col justify-center items-start gap-2 w-full">
            <label htmlFor="password" className="text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-xl ${
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

         

          <button
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-purple-300 hover:bg-purple-500 text-black font-medium rounded-xl"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loading ? (
              <div className="loader flex justify-center items-center">

              </div>
            ) : "Create your account"}
          </button>

          <div className="w-full">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex justify-center items-center gap-3 mt-4 w-full px-6 py-3 bg-gray-200 text-black font-medium rounded-xl"
            >
              {/* <Image src="/google.svg" width={20} height={50} alt="Google" /> */}
              Sign Up With Google
            </button>
          </div>
        </form>
      </div>
      <div className=" testimonial  md:w-1/2 h-full overflow-hidden flex flex-col justify-end items-center">
      <h1 className="text-white font-">
      As a professional trying to upskill, this AI flashcard app has been a game-changer. It helps me <span className="text-purple-500 italic">focus</span> on what I need to learn most, saving me time and effort. I’m learning <span className="text-purple-500 italic">faster</span> and more <span className="text-purple-500 italic">efficiently</span> than ever before!
      </h1>
       </div>
    </section>
  );
}

export default Page;
