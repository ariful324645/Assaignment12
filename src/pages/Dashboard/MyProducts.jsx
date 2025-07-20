import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext); // user: { email, role }
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure()

  useEffect(() => {
    if (user?.email) {
      fetchMyProducts();
    }
  }, [user]);

  const fetchMyProducts = async () => {
    try {
      const res = await axiosSecure.get(
        `/products/users/${user.email}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axiosSecure.delete(`/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/dashboard/updateProduct/${productId}`);
  };

  const handleSetStatus = async (productId, status) => {
    try {
      await axiosSecure.put(`/products/status/${productId}`, {
        status,
      });
      alert(`Status set to ${status}`);
      fetchMyProducts();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-300">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Votes</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.votes || 0}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      product.status === "Accepted"
                        ? "bg-green-500"
                        : product.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {product.status || "Pending"}
                  </span>

                  {/* Show status change buttons if user is moderator and status is Pending */}
                  {user?.role === "moderator" &&
                    product.status === "Pending" && (
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() =>
                            handleSetStatus(product._id, "Accepted")
                          }
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleSetStatus(product._id, "Rejected")
                          }
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
