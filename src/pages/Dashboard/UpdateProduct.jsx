import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    externalLinks: "",
    status: "Pending",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        Swal.fire("Error", "Failed to load product data", "error");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove _id from payload
      const productToUpdate = { ...product };
      delete productToUpdate._id;

      const res = await axios.put(
        `http://localhost:3000/products/${productId}`,
        productToUpdate
      );

      console.log(res.data.message);

      Swal.fire({
        icon: "success",
        title: `${product._id} updated`,
        text: `Your ${res.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/dashboard/myProducts");
    } catch (err) {
      console.error("Error updating product:", err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/myProducts");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Update Your Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            External Links
          </label>
          <input
            type="text"
            name="externalLinks"
            value={product.externalLinks}
            onChange={handleChange}
            placeholder="Enter external link"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Status
          </label>
          <input
            type="text"
            value={product.status || "Pending"}
            disabled
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-sm text-gray-500 mt-1">
            *Status is set by moderator (Accepted / Rejected / Pending)
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
