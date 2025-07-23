import { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import TagsComponent from "./TagsComponent";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export default function AddProduct() {
  const [tags, setTags] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to add a product");
      navigate("/login");
      return;
    }
    //add subscription

    //sub above

    const tagTexts = tags.map((tag) => tag.text); // convert tags array of objects to array of strings

    const newProduct = {
      name: data.name,
      image: data.image,
      description: data.description,
      ownerName: user.displayName,
      ownerImage: user.photoURL,
      ownerEmail: user.email,
      tags: tagTexts,
      externalLinks: data.externalLinks,
      votes: 0,
      userId: user._id,
      status: "pending",
      featured: false,
      timestamp: new Date(),
    };

    try {
      const res = await axiosSecure.post(`/products`, newProduct, {
        params: { email: user?.email },
      });

      console.log(res);
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
    } catch (err) {
      // Extract custom backend message if available
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to add product";

      // SweetAlert for meaningful error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      }).then(() => {
        navigate("/dashboard/myProfile");
      });

      // Optional toast
      toast.error(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-200">
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
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Product name"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image URL <span className="text-red-500">*</span>
          </label>
          <input
            {...register("image", { required: "Image URL is required" })}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Image URL"
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
            className="w-full border rounded-lg px-4 py-2 resize-none"
            placeholder="Describe your product"
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Owner Info */}
        <div className="bg-blue-50 border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-700 mb-3">
            👤 Owner Information (Read-Only)
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={user?.displayName || ""}
              readOnly
              className="bg-white border rounded px-3 py-2 text-sm"
            />
            <input
              value={user?.photoURL || ""}
              readOnly
              className="bg-white border rounded px-3 py-2 text-sm"
            />
            <input
              value={user?.email || ""}
              readOnly
              className="bg-white border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Tags */}
        <TagsComponent tags={tags} setTags={setTags} />

        {/* External Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            External Link
          </label>
          <input
            {...register("externalLinks")}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Optional link to your website"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg"
        >
          ➕ Submit Product
        </button>
      </form>
    </div>
  );
}
