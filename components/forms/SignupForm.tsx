"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { useForm } from "react-hook-form";
import { error } from "console";

//Defining signup schema
const signUpSchema = Yup.object().shape({
  userName: Yup.string()
    .min(1, "Your username must be more than 1 character")
    .max(20, "Your username must be less than 20 characters")
    .required("Your username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your email is required ."),
  password: Yup.string()
    .min(8, "Pssword must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
});

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
      try {
        createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then((userCredential) => {
          const user = userCredential.user;
        });
        router.push("dashboard");
      } catch (error) {
        console.error("");
      }
    },
  });

  

  
  return (
    <>
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-center items-start gap-7 w-full"
    >
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        {/* <label htmlFor="userName" className="text-gray-500 font-medium">
          Username
        </label> */}
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          className={`outline-none border border-gray-500 w-full px-3 py-[0.6rem] text-gray-500  rounded-xl ${
            formik.touched.userName && formik.errors.userName
              ? "border-gray-500"
              : ""
          }`}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div className="text-red-500 text-sm">{formik.errors.userName}</div>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        {/* <label htmlFor="userName" className="text-gray-500 font-medium">
          Email
        </label> */}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`outline-none border border-gray-500 w-full px-3 py-[0.6rem] text-gray-500  rounded-xl ${
            formik.touched.email && formik.errors.email
              ? "border-gray-500"
              : ""
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        {/* <label htmlFor="password" className="text-gray-500 font-medium">
          Password
        </label> */}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`outline-none border border-gray-500 w-full px-3 py-[0.6rem] text-gray-500  rounded-xl ${
            formik.touched.password && formik.errors.password
              ? "border-gray-500"
              : ""
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : (
          ""
        )}
      </div>
      <button
        type="submit"
        className="mt-4 w-full flex justify-center items-center px-6 py-3 bg-green-300 hover:bg-green-500 text-white font-semibold rounded-xl"
        disabled={!(formik.isValid && formik.dirty)}
      >
       {loading ? (
          <div className="loader flex justify-center items-center">

          </div>
        ) : "Create your account"}
      </button>
    </form>
   
    </>
  );
};

export default SignupForm;
