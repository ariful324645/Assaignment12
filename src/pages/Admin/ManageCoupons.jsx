import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const axiosSecure=useAxiosSecure()

  // Load all coupons from server
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axiosSecure.get("/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("Error loading coupons", err);
    }
  };

  // Add or update coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoupon = {
      code: form.code.value,
      expiryDate: form.expiryDate.value,
      description: form.description.value,
      discountAmount: parseFloat(form.discountAmount.value),
    };

    try {
      if (editingCoupon) {
        await axiosSecure.put(
          `/coupons/${editingCoupon._id}`,
          newCoupon
        );
        Swal.fire("Updated!", "Coupon updated successfully.", "success");
      } else {
        await axiosSecure.post("/coupons", newCoupon);
        Swal.fire("Added!", "Coupon added successfully.", "success");
      }

      form.reset();
      setEditingCoupon(null);
      fetchCoupons();
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  // Delete coupon
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This coupon will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/coupons/${id}`);
        Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        fetchCoupons();
      } catch (err) {
        Swal.fire("Error", "Failed to delete coupon", "error");
      }
    }
  };

  // Populate form for editing
  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🏷️ Manage Coupons</h2>

      {/* Coupon Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 mb-6 space-y-4"
      >
        <h3 className="text-lg font-semibold">
          {editingCoupon ? "✏️ Edit Coupon" : "➕ Add Coupon"}
        </h3>
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          defaultValue={editingCoupon?.code || ""}
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="expiryDate"
          defaultValue={editingCoupon?.expiryDate?.slice(0, 10) || ""}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          defaultValue={editingCoupon?.description || ""}
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          type="number"
          name="discountAmount"
          placeholder="Discount Amount"
          defaultValue={editingCoupon?.discountAmount || ""}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editingCoupon ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      {/* Coupon Display Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>SL</th>
              <th>Code</th>
              <th>Expiry</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.expiryDate?.slice(0, 10)}</td>
                <td>{coupon.description}</td>
                <td>{coupon.discountAmount}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning mr-2"
                    onClick={() => handleEdit(coupon)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
