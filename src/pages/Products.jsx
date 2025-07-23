import React, { useEffect, useState, useContext } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "./Hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/products/allProducts", {
          params: { userEmail: user?.email },
        });
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [axiosSecure, user]);

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await axiosSecure.post(
        `/products/allProducts/${productId}/upvote`,
        { userEmail: user.email }
      );

      const updatedProduct = res.data.product;

      setAllProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...updatedProduct, hasVoted: true } : p
        )
      );
    } catch (err) {
      console.log(err?.response?.data?.error || "Upvote failed");
    }
  };

  const handleClick = (id) => {
    if (user) {
      navigate(`/productDetails/${id}`);
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

      <div className="w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => {
              const isOwner = user?.email === product.ownerEmail;
              const hasVoted = product.hasVoted;
              const disabled =  isOwner || hasVoted;

              return (
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
                        disabled={disabled}
                        className={`btn ${
                          disabled ? "btn-disabled" : "btn-primary"
                        }`}
                        title={
                          !user
                            ? "Login required"
                            : isOwner
                            ? "You cannot vote on your own product"
                            : hasVoted
                            ? "You have already voted"
                            : ""
                        }
                        onClick={() => handleUpvote(product._id)}
                      >
                        <FaThumbsUp />
                        {product.votes}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
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
