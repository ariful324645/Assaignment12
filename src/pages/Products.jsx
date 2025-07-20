import React, { useEffect, useState, use } from "react";

import { FaThumbsUp } from "react-icons/fa";

import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "./Hooks/useAxiosSecure";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { user } = use(AuthContext);
  const axiosSecure=useAxiosSecure()
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");

      // const sorted = res.data.sort((a, b) => b.votes - a.votes);
      setAllProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");
    try {
      const res = await axiosSecure.post(
        `/products/featured/${productId}/upvote`,
        { userId: user.email }
      );

      setAllProducts((prev) =>
        prev
          .map((p) => (p._id === productId ? res.data : p))
          .sort((a, b) => b.votes - a.votes)
      );
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  const handleClick = (productId) => {
    if (user) {
      navigate(`/productDetails/${productId}`);
    } else {
      navigate("/login");
    }
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="px-4 py-10 bg-base-200 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        🌟 All Products
      </h2>

      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by name or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Product Grid */}
      <div className="w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-md border"
              >
                <figure>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2
                    className="card-title text-blue-500 underline cursor-pointer"
                    onClick={() => handleClick(product._id)}
                  >
                    {product.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {product.tags?.length ? (
                      product.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="badge badge-outline badge-primary"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No Tags</span>
                    )}
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-outline btn-primary flex items-center gap-2"
                      onClick={() => handleUpvote(product._id)}
                      disabled={user?.email === product.ownerEmail}
                    >
                      <FaThumbsUp /> {product.votes}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No products found.
            </p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-outline"
        >
          Prev
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
