
import React, { use, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
  FaBoxes,
  FaChartBar,
  FaClipboardCheck,
  FaFlag,
  FaPlus,
  FaTicketAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import useAxiosSecure from "../pages/Hooks/useAxiosSecure";

const DashBoardLayout = () => {
  const { user } = use(AuthContext);
  const [role, setRole] = useState(null);
  const axiosSecure=useAxiosSecure()

  useEffect(() => {
    const fetchRole = async () => {
      const response = await axiosSecure.get(
        `/user_role/${user?.email}`
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
          <ul className="menu bg-gray-200 text-base-content w-80 p-4 space-y-2">
            {/* User Routes */}
            {role === "user" && (
              <>
                <NavLink
                  to="addProduct"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaPlus />
                  <li>Add Product</li>
                </NavLink>

                <NavLink
                  to="myProducts"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaBoxes />
                  <li>My Products</li>
                </NavLink>

                <NavLink
                  to="myProfile"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaUser />
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
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaClipboardCheck />
                  <li>Product Review Queue</li>
                </NavLink>

                <NavLink
                  to="ReportedContents"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaFlag />
                  <li>Reported Contents</li>
                </NavLink>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <NavLink
                  to="manageUsers"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaUsers />
                  <li>Manage Users</li>
                </NavLink>

                <NavLink
                  to="statistics"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaChartBar />
                  <li>Admin Statistics</li>
                </NavLink>

                <NavLink
                  to="manageCoupons"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-white bg-[#00796b] p-2 rounded"
                      : "flex items-center gap-2 p-2"
                  }
                >
                  <FaTicketAlt />
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
