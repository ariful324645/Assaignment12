import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch trending products
  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    const res = await axios.get("http://localhost:3000/products/trending");
    const sorted = res.data.sort((a, b) => b.votes - a.votes);
    setTrendingProducts(sorted); 
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="px-4 py-12 bg-gradient-to-b from-base-200 to-base-100 min-h-screen">
        <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          🚀 Trending Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trendingProducts.map((product, index) => (
            <div
              key={product._id}
              className="relative flex flex-col rounded-2xl overflow-hidden border border-base-300 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Voted Ribbon */}
                {index === 0 && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    🔥 Top Voted
                  </div>
                )}

                {/* Votes Badge */}
                <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold text-sm px-3 py-1 rounded-full shadow-md">
                  ⭐ {product.votes}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between p-5 bg-base-100">
                <h2
                  className="text-lg md:text-xl font-bold text-primary mb-2 cursor-pointer underline"
                  onClick={() =>
                    user
                      ? navigate(`/productDetails/${product._id}`)
                      : navigate("/login")
                  }
                >
                  {product.name}
                </h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags?.length ? (
                    product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-semibold border border-secondary rounded-full text-secondary bg-secondary/10"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No Tags</span>
                  )}
                </div>

                <button
                  className="btn btn-sm bg-gradient-to-r from-green-400 to-green-600 text-white shadow hover:from-green-500 hover:to-green-700 transition disabled:opacity-50 w-full flex items-center justify-center gap-2"
                  disabled={user?.email === product.ownerEmail}
                >
                  <FaThumbsUp /> Upvote
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <button className="btn btn-primary px-8">Show All Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
