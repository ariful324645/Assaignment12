import React, { use } from "react";
import SocialLogin from "../components/SocialLogin";
import { Link, Navigate, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginLotie from "../assets/loties/lotieRegister.json";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { user, createUser, updateUser, setUser } = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    console.log(name, email, photo, password);
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
        const userRes = await axios.post(
          "http://localhost:3000/users",
          userInfo
        );
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
    <div className="flex mt-10 items-center gap-5 justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <h1 className="text-2xl font-bold text-center">Register Now!</h1>
            {/* name */}
            <label className="label text-xl font-semibold">Name</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Name"
            />
            {/* email */}
            <label className="label text-xl font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            {/* photourl */}
            <label className="label text-xl font-semibold">Photo</label>
            <input
              type="URL"
              name="photo"
              className="input"
              placeholder="Photo URL"
            />
            {/* pass */}
            <label className="label text-xl font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />

            <button type="submit" className="btn w-full btn-primary mt-4">
              Registration
            </button>
            <p className="text-xs mt-3 text-center sm:px-6 dark:text-gray-600">
              Don't have an account?
              <Link to="/login">Login</Link>
            </p>
          </form>
          <div className=" w-full">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
      <div>
        <Lottie
          style={{ width: "600px" }}
          animationData={loginLotie}
          loop={true}
        ></Lottie>
      </div>
    </div>
  );
};

export default Register;
