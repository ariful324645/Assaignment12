import { useState, use } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// react-tag-input key codes
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

// Suggestions
const suggestionsList = [
  { id: "1", text: "Artificial Intelligence" },
  { id: "2", text: "Design Systems" },
  { id: "3", text: "Productivity Tools" },
  { id: "4", text: "Collaboration Platform" },
  { id: "5", text: "Open Source" },
  { id: "6", text: "Chrome Extension" },
  { id: "7", text: "Marketing Automation" },
  { id: "8", text: "Customer Support" },
  { id: "9", text: "Data Analytics" },
];

export default function AddProduct() {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to add a product");
      navigate("/login");
      return;
    }

    const newProduct = {
      name: data.name,
      image: data.image,
      description: data.description,
      ownerName: user.displayName,
      ownerImage: user.photoURL,
      ownerEmail: user.email,
      tags: tags.map((tag) => tag.text),
      externalLinks: data.externalLinks,
      votes: 0,
      status: "pending",
      isFeatured: false,
      timestamp: new Date(),
    };

   
      await axios.post("http://localhost:3000/products", newProduct);
      toast.success("Product added successfully!");
      reset();
      setTags([]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/myProducts");
   
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-6 py-10 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Add Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="Product name "
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image  <span className="text-red-500">*</span>
          </label>
          <input
            {...register("image", { required: "Product image is required" })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="product image url"
          />
          {errors.image && (
            <p className="text-xs text-red-600 mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
            placeholder="Describe what your product does..."
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Owner Info (Read-only) */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-700 mb-3">
            👤 Owner Information (Read-Only)
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={user?.displayName || ""}
              readOnly
              className="bg-white border rounded px-3 py-2 text-sm text-gray-700"
              placeholder="Owner Name"
            />
            <input
              value={user?.photoURL || ""}
              readOnly
              className="bg-white border rounded px-3 py-2 text-sm text-gray-700"
              placeholder="Owner Image URL"
            />
            <input
              value={user?.email || ""}
              readOnly
              className="bg-white border rounded px-3 py-2 text-sm text-gray-700"
              placeholder="Owner Email"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags{" "}
            <span className="text-gray-400 text-xs">
              (Type and press enter)
            </span>
          </label>
          <div className="border rounded-lg px-3 py-2 bg-white">
            <ReactTags
              tags={tags}
              suggestions={suggestionsList}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              delimiters={delimiters}
              placeholder="Start typing to add tags..."
            />
          </div>
        </div>

        {/* External Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            External Link
          </label>
          <input
            {...register("externalLinks")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="external link "
          />
          <p className="text-xs text-gray-400 mt-1">
            Optional: Link to your website or landing page.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold py-3 rounded-lg shadow transition transform hover:scale-105"
        >
          ➕ Submit Product
        </button>
      </form>
    </div>
  );
}
