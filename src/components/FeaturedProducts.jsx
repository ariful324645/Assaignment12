import React, { useEffect, useState, useContext } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import useAxiosSecure from "../pages/Hooks/useAxiosSecure";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch featured products with vote status
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (!user) return;

  //     try {
  //       const res = await axiosSecure.get(
  //         `/products/featured?email=${encodeURIComponent(user.email)}`
  //       );
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.error("Failed to fetch featured products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, [axiosSecure, user]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get(
          user?.email
            ? `/products/featured?email=${encodeURIComponent(user.email)}`
            : "/products/featured"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchProducts();
  }, [axiosSecure, user]);


  // Handle upvote action
  // const handleUpvote = async (productId) => {
  //   if (!user) return navigate("/login");

  //   try {
  //     const res = await axiosSecure.post(
  //       `/products/featured/${productId}/upvote`,
  //       { userEmail: user.email }
  //     );

  //     const updatedProduct = res.data.product;

  //     // Update product list state, mark hasVoted true on updated product
  //     setProducts((prev) =>
  //       prev
  //         .map((p) =>
  //           p._id === productId ? { ...updatedProduct, hasVoted: true } : p
  //         )
  //         .sort((a, b) => b.votes - a.votes)
  //     );
  //   } catch (err) {
  //     console.error("Upvote failed:", err);
  //     // Optional: handle error display here
  //   }
  // };
  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");

    try {
      const res = await axiosSecure.post(
        // `/products/featured/${productId}/upvote`,
        `/products/featured/${productId}/upvote`,
        { userEmail: user.email }
      );

      const updatedProduct = res.data.product;

      // Update product list state, mark hasVoted true on updated product
      setProducts((prev) =>
        prev
          .map((p) =>
            p._id === productId ? { ...updatedProduct, hasVoted: true } : p
          )
          .sort((a, b) => b.votes - a.votes)
      );
    } catch (err) {
      console.error("Upvote failed:", err);
      // Optional: handle error display here
    }
  };

  const handleClick = (productId) => {
    if (user) {
      navigate(`/productDetails/${productId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-11/12 mx-auto bg-white">
      <h1 className="text-4xl font-extrabold mb-4 p-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        ✨ Featured Product
      </h1>
      <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {products.length === 0 ? (
            <div className="col-span-full flex items-center justify-center h-[300px]">
              <h3 className="text-lg font-semibold text-gray-500">
                No featured products found
              </h3>
            </div>
          ) : (
            products.map((product) => (
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
                      className={`btn btn-outline flex items-center gap-2 ${
                        product.hasVoted || user?.email === product.ownerEmail
                          ? "btn-disabled cursor-not-allowed text-gray-400"
                          : "btn-primary"
                      }`}
                      onClick={() => handleUpvote(product._id)}
                      disabled={
                        product.hasVoted || user?.email === product.ownerEmail
                      }
                      title={
                        product.hasVoted
                          ? "You have already voted for this product"
                          : user?.email === product.ownerEmail
                          ? "You cannot vote on your own product"
                          : ""
                      }
                    >
                      <FaThumbsUp />
                      {/* {product.hasVoted ? "1" : product.votes} */}
                      {product.votes}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
