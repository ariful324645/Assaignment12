import React, { useEffect, useState } from "react";
import axios from "axios";

const CouponSlider = () => {
  const [coupons, setCoupons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch valid coupons
  useEffect(() => {
    axios
      .get("http://localhost:3000/valid-coupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.error("Error fetching coupons:", err));
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === coupons.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [coupons]);

  if (!coupons.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        🎫 No valid coupons available right now.
      </div>
    );
  }

  const current = coupons[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        💥 Exclusive Membership Coupons
      </h2>
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 text-center">
        <h3 className="text-2xl font-semibold text-purple-600">
          {current.code}
        </h3>
        <p className="text-gray-800 mt-2">
          💸 Discount: <strong>{current.discountAmount}%</strong>
        </p>
        <p className="text-gray-700">
          📅 Expires on: {new Date(current.expiryDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600 italic mt-2">📝 {current.description}</p>
      </div>

      {/* Dots for navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {coupons.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CouponSlider;
