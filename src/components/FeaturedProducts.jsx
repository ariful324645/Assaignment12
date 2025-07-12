import React, { useEffect, useState, useContext, use } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3000/products/featured");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  //  Handle Upvote
  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");
    else {
      const res = await axios.post(
        `http://localhost:3000/products/featured/${productId}/upvote`,
        { userId: user.email }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? res.data : p))
      );
    }
  };

  if (!products.length) {
    return <div className="text-center py-10">No featured products found.</div>;
  }

  const handleClick = (productId) => {
    if (user) {
      navigate(`/productDetails/${productId}`);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        ✨ Featured Product
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-md border">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2
                className="card-title text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleClick(product._id)}
              >
                {product.name}
              </h2>

              <div className="flex flex-wrap gap-2 mb-2">
                {product.tags?.length ? (
                  product.tags.map((tag, i) => (
                    <span key={i} className="badge badge-outline badge-primary">
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
