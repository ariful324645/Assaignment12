import React, { use } from "react";
import SocialLogin from "../components/SocialLogin";
import { Link, Navigate, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginLotie from "../assets/loties/lotieRegister.json";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

import useAxiosSecure from "./Hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure()
  const { user, createUser, updateUser, setUser } = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    console.log(name, email, photo, password);
    // Password length validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must be at least 6 characters long.",
        timer: 2500,
        showConfirmButton: false,
        position: "center",
      });
      return; // stop further execution if password invalid
    }
    // Password uppercase validation
    const uppercasePattern = /[A-Z]/;
    if (!uppercasePattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must contain at least one Uppercase letter.",
        timer: 3000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }

    // Password lowercase validation
    const lowercasePattern = /[a-z]/;
    if (!lowercasePattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must contain at least one Lowercase letter.",
        timer: 3000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }

    createUser(email, password)
      .then(async (result) => {
        //update user info
        const userInfo = {
          name: name,
          email: email,
          role: "user", //Default
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        const userRes = await axiosSecure.post("/users", userInfo);
        console.log(userRes);

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((error) => console.log(error));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen px-4 py-10 flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-8">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie
          animationData={loginLotie}
          loop
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>

      {/* Register Form */}
      <div className="w-full  max-w-sm bg-base-100 shadow-2xl rounded-xl p-6 md:px-8">
        <form onSubmit={handleRegister} className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Register Now!
          </h1>

          {/* Name */}
          <div>
            <label className="label text-xl font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label text-xl font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="label text-xl font-semibold">Photo URL</label>
            <input
              type="url"
              name="photo"
              className="input input-bordered w-full"
              placeholder="Photo URL"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label text-xl font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Registration
          </button>

          {/* Login Link */}
          <p className="text-sm mt-3 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>

        {/* Social Login */}
        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
