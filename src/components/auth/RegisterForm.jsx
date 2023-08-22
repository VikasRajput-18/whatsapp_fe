import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { changeStatus, registerUser } from "../../features/userSlice";
import Picture from "./Picture";
import axios from "axios";

const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

const RegisterForm = () => {
  const { status, error } = useSelector((state) => state.user);

  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    let res;

    dispatch(changeStatus("loading"));
    if (picture) {
      await uploadImage()
        .then(async (cloduinary_res) => {
          console.log("cloduinary_res", cloduinary_res);
          res = await dispatch(
            registerUser({ ...data, picture: cloduinary_res.secure_url })
          );
        })
        .catch((error) => {
          console.log("error", error);
          dispatch(changeStatus("failed"));
        });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }
    if (res?.payload?.user) navigate("/");
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("cloud_name", cloud_name);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container  */}
      <div className="max-w-md w-full space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* heading  */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {/* picture  */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          />

          {
            // if we a have an error
          }
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/* submit button  */}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>

          {/* sign in link   */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Already have an account ?</span>
            <Link
              to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;