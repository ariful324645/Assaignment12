import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      fetchMyProducts();
    }
  }, [user]);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/products/users/${user.email}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching my products:", err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/dashboard/updateProduct/${productId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-300">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Number of Votes</th>
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
                  {product.status || "Pending"}
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
