import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);


  const handleLogout = () => {
    logOut()
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(result);
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

  const links = (
    <>
      <NavLink to="/">
        <li className="ml-4">Home</li>
      </NavLink>
      <NavLink to="/products">
        <li className="ml-4">Products</li>
      </NavLink>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="navbar w-11/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/zVvp0GsS/appOrbit.jpg"
              alt="AppOrbit Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-2xl font-bold">AppOrbit</span>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co/zVvp0GsS/appOrbit.jpg"
                    }
                    alt="User"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="font-semibold text-gray-600 pointer-events-none">
                    {user.displayName || "User"}
                  </p>
                </li>
                <li>
                  <Link className="text-black" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button className="text-black" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-accent">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-info">Registration</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
