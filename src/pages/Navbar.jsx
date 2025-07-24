import React, { useContext } from "react";
// ✅ Correct import
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error(error);
      });
  };

  const links = (
    // <>
    //   <li>
    //     <NavLink
    //       to="/"
    //       className={({ isActive }) =>
    //         isActive ? "font-bold  text-blue-700 underline" : ""
    //       }
    //     >
    //       Home
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/products"
    //       className={({ isActive }) =>
    //         isActive ? "font-bold text-blue-700 underline" : ""
    //       }
    //     >
    //       Products
    //     </NavLink>
    //   </li>
    // </>
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive && user
              ? "font-semibold text-white bg-blue-600 rounded-lg px-3 py-1 shadow-md transition duration-300 "
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive && user
              ? "font-semibold text-white bg-blue-600 rounded-lg px-3 py-1 shadow-md transition duration-300"
              : ""
          }
        >
          Products
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="navbar w-11/12 mx-auto">
        {/* Navbar Start (Mobile) */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 text-black rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/zVvp0GsS/appOrbit.jpg"
              alt="AppOrbit Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold">AppOrbit</span>
          </div>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle avatar">
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
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-black"
              >
                <li>
                  <p className="font-semibold pointer-events-none">
                    {user.displayName || "User"}
                  </p>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-accent">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-info">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
