import React, { useEffect, useState, use } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext"; // adjust path as needed
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  useEffect(() => {
    fetchReportedProducts();
  }, []);

  const fetchReportedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/reported-products");
      setReportedProducts(res.data);
    } catch (error) {
      console.error("Error fetching reported products:", error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setReportedProducts((prev) => prev.filter((item) => item._id !== id));

        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Failed to delete the product", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 Reported Contents</h2>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th>Product Name</th>
              <th>View Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No reported products found.
                </td>
              </tr>
            ) : (
              reportedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="font-medium">{product.name}</td>
                  <td>
                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="btn btn-sm btn-info"
                    >
                      View Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
