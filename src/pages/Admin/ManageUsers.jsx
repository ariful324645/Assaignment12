import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Make user an Admin
  const handleMakeAdmin = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/users/make-admin/${id}`);
     Swal.fire({
       position: "center",
       icon: "success",
       title: "User promoted to Admin",
       showConfirmButton: false,
       timer: 1500,
     });

      // Update local state
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, role: "admin" } : user
        )
      );
    } catch (err) {
      console.error("Error making admin:", err);
    }
  };

  // Make user a Moderator
  const handleMakeModerator = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/users/make-moderator/${id}`);
     Swal.fire({
       position: "center",
       icon: "success",
       title: "User promoted to Moderator",
       showConfirmButton: false,
       timer: 1500,
     });

      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, role: "moderator" } : user
        )
      );
    } catch (err) {
      console.error("Error making moderator:", err);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm md:text-base border">
          <thead className="bg-gray-100 text-[13px] md:text-base">
            <tr>
              <th>SL</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td className="break-words max-w-[120px] md:max-w-none">
                  {user.email}
                </td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  {user.role !== "moderator" && (
                    <button
                      onClick={() => handleMakeModerator(user._id)}
                      className="btn btn-xs sm:btn-sm md:btn-sm btn-outline btn-warning"
                    >
                      Make Moderator
                    </button>
                  )}
                </td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs sm:btn-sm md:btn-sm btn-outline btn-success"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
