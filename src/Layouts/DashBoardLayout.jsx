import React from "react";
import { Link, NavLink, Outlet } from "react-router";

const DashBoardLayout = () => {
  return (
    <div className="">
      <div className="min-h-screen bg-[#e6fff7] grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="bg-gray-200 p-4 lg:col-span-3 flex flex-col items-start">
          <Link to="/">
            <div className="flex items-center ml-3 gap-2 ">
              <img
                src="https://i.ibb.co/zVvp0GsS/appOrbit.jpg"
                alt="AppOrbit Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-xl font-bold">AppOrbit</span>
            </div>
          </Link>
          <ul className="menu bg-gray-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <NavLink to="addProduct">
              <li>AddProduct</li>
            </NavLink>
            <NavLink to="myProducts">
              <li>MyProducts</li>
            </NavLink>
            <NavLink to="myProfile">
              <li>MyProfile</li>
            </NavLink>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="bg-[#e6fff7] p-4 lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
