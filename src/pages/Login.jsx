import React, { use } from "react";
import SocialLogin from "../components/SocialLogin";
import { Link, Navigate, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerLotie from "../assets/loties/lotieLogin.json";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { user, userLogin } = use(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    userLogin(email, password)
      .then(async (result) => {
        const userInfo = {
          password: password,
          email: email,
          role: "user", //Default
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        const userRes = await axios.post(
          "http://localhost:3000/users",
          userInfo
        );
        console.log(userRes);

        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });
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
    <div className="min-h-screen px-4 py-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-8">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie
          animationData={registerLotie}
          loop
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-amber-200 rounded-xl p-6 md:p-8 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Login Now!
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-700 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>

        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
