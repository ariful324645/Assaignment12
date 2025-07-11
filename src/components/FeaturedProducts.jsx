import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Handle Upvote
  const handleUpvote = async (productId) => {
    if (!user) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/products/${productId}/upvote`,
        { userId: user.email }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? res.data : p))
      );
    } catch (err) {
      console.error("Upvote failed:", err.response?.data || err);
      alert(err.response?.data?.error || "Upvote failed!");
    }
  };
  

  if (!products.length) {
    return <div className="text-center py-10">No featured products found.</div>;
  }

  return (
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
            <h2 className="card-title">{product.name}</h2>

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
                disabled={!user || user.email === product.ownerEmail}
              >
                <FaThumbsUp /> {product.votes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
