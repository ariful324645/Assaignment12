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
          password:password,
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
    <div className="flex mt-8 items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-amber-200 ">
        <h1 className="text-2xl font-bold text-center">Login Now!</h1>
        <form
          onSubmit={handleLogin}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="username"
              className="block dark:text-gray-600 text-xl font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="username"
              placeholder="name"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="block dark:text-gray-600 text-xl font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
          >
            Login
          </button>
          <p className="text-xs mt-3 text-center sm:px-6 dark:text-gray-600">
            Don't have an account?
            <Link to="/register">Registration</Link>
          </p>
        </form>
        <div className="flex items-center space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <div className="w-full">
            <SocialLogin></SocialLogin>
          </div>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>
      </div>
      <div>
        <Lottie
          style={{ width: "600px" }}
          animationData={registerLotie}
          loop={true}
        ></Lottie>
      </div>
    </div>
  );
};

export default Login;
