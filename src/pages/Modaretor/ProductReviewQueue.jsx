import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const ProductReviewQueue = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAction = async (id, action) => {
    await axios.patch(`http://localhost:3000/products/${action}/${id}`);
    fetchProducts();
  };

  //   view details
  const handleClick = (productId) => {
    if (user) {
      navigate(`/productDetails/${productId}`);
    } else {
      navigate("");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">
        Product Review Queue
      </h2>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">View Details</th>
                <th className="py-3 px-4 text-left">Featured</th>
                <th className="py-3 px-4 text-left">Accept</th>
                <th className="py-3 px-4 text-left">Reject</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="py-3 px-4 font-semibold">{product.name}</td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleClick(product._id)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      View
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      disabled={product.featured}
                      onClick={() => handleAction(product._id, "feature")}
                      className={`btn btn-sm ${
                        product.featured
                          ? "bg-yellow-400 text-black cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {product.featured ? "⭐ Featured" : "Make Featured"}
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      disabled={product.status === "accepted"}
                      onClick={() => handleAction(product._id, "accept")}
                      className={`btn btn-sm ${
                        product.status === "accepted"
                          ? "bg-green-300 cursor-not-allowed text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      Accept
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      disabled={product.status === "rejected"}
                      onClick={() => handleAction(product._id, "reject")}
                      className={`btn btn-sm ${
                        product.status === "rejected"
                          ? "bg-red-300 cursor-not-allowed text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewQueue;
