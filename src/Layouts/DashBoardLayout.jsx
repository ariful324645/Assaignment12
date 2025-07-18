import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";

const DashBoardLayout = () => {
  const { user } = use(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const response = await axios.get(
        `http://localhost:3000/user_role/${user?.email}`
      );
      console.log(response.data.role);
      setRole(response.data.role);
    };

    if (user?.email) {
      fetchRole();
    }
  }, [user]);

  // const role = "admin";
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
            {role === "user" && (
              <>
                <NavLink
                  to="addProduct"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>Add Product</li>
                </NavLink>
                <NavLink
                  to="myProducts"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>My Products</li>
                </NavLink>
                <NavLink
                  to="myProfile"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>My Profile</li>
                </NavLink>
              </>
            )}

            {/* Moderator Routes */}
            {role === "moderator" && (
              <>
                <NavLink
                  to="ProductReviewQueue"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>Product Review Queue</li>
                </NavLink>
                <NavLink
                  to="ReportedContents"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>Reported Contents</li>
                </NavLink>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <NavLink
                  to="statistics"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>Statistics</li>
                </NavLink>
                <NavLink
                  to="manageUsers"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>Manage Users</li>
                </NavLink>
                <NavLink
                  to="manageCoupons"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-[#00796b] p-2 rounded" : "p-2"
                  }
                >
                  <li>Manage Coupons</li>
                </NavLink>
              </>
            )}
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
