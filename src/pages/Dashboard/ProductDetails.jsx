import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({ description: "", rating: 5 });
  const [reportReason, setReportReason] = useState("");

  /** Utility fallback for broken/missing images */
  const getSafeImage = (src) =>
    src?.startsWith("http") ? src : "https://via.placeholder.com/400x300";

  /** Fetch product info */
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /** Fetch reviews for product */
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  /** Check if current user is owner */
  const isOwner = user?.email === product?.ownerEmail;

  /** Report handler */
  const handleReport = async () => {
    if (!user) return navigate("/login");

    await axios.post(`http://localhost:3000/products/${id}/report`, {
      userId: user.email,
      reason: reportReason.trim(),
    });
    await fetchProduct();
    setReportReason("");
    Swal.fire("Success", "Your report has been submitted.", "success");
  };

  /** Upvote handler */
  const handleUpvote = async () => {
    if (!user) return navigate("/login");
    try {
      const res = await axios.post(
        `http://localhost:3000/products/featured/${id}/upvote`,
        { userId: user.email }
      );
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /** Submit review handler */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const reviewData = {
      productId: id,
      reviewerName: user?.name || user?.displayName,
      reviewerImage: user?.photoURL,
      description: newReview.description.trim(),
      rating: Number(newReview.rating),
    };

    if (!reviewData.description) {
      return Swal.fire("Error", "Please enter a review description.", "error");
    }
    if (
      isNaN(reviewData.rating) ||
      reviewData.rating < 1 ||
      reviewData.rating > 5
    ) {
      return Swal.fire("Error", "Rating must be between 1 and 5.", "error");
    }

    try {
      const res = await axios.post("http://localhost:3000/reviews", reviewData);
      setReviews((prev) => [res.data, ...prev]);
      setNewReview({ description: "", rating: 5 });
      Swal.fire("Success", "Review posted successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to post review.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-10">
      {/* Product Details */}
      <div className="bg-white p-6 rounded shadow">
        <img
          src={getSafeImage(product?.image)}
          alt={product?.name}
          className="w-full max-h-[400px] object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{product?.name}</h1>
        <p className="text-gray-700 mt-2">{product?.description}</p>

        <div className="mt-2 text-sm">
          <strong>Tags:</strong>{" "}
          {product?.tags?.length ? product.tags.join(", ") : "None"}
        </div>
        <div className="mt-2">
          <strong>External Link:</strong>{" "}
          {product?.externalLink ? (
            <a
              href={product.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit
            </a>
          ) : (
            "None"
          )}
        </div>

        <div className="mt-2 text-green-600 font-medium">
          Votes: {product?.votes ?? 0}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleUpvote}
            disabled={!user || isOwner}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Upvote
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Enter report reason"
              className="border px-3 py-2 rounded w-full sm:w-auto"
            />

            <button
              onClick={handleReport}
              disabled={!user || isOwner}
              className={`${
                !user || isOwner
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } text-white px-4 py-2 rounded`}
            >
              Report
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded bg-gray-50 flex items-center gap-4"
              >
                {review.reviewerImage ? (
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    N/A
                  </div>
                )}
                <div>
                  <p className="font-semibold">
                    {review.reviewerName || "Anonymous"}
                  </p>
                  <p className="text-gray-700">{review.description}</p>
                  <p className="text-yellow-500 font-semibold">
                    ⭐ {review.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Post a Review</h2>
        {user ? (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Reviewer Name</label>
              <input
                type="text"
                value={user.name || user.displayName || ""}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Reviewer Image</label>
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Reviewer"
                    className="w-20 h-20 object-cover rounded-full border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    N/A
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                value={newReview.description}
                onChange={(e) =>
                  setNewReview({ ...newReview, description: e.target.value })
                }
                required
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>
            <div>
              <label className="block font-medium">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-red-500">Please log in to post a review.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
