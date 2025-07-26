import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CouponSlider = () => {
  const [coupons, setCoupons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Fetch valid coupons
  useEffect(() => {
    axiosSecure
      .get("/valid-coupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.error("Error fetching coupons:", err));
  }, []);
  // useEffect(() => {
  //   const fetchCoupons = async () => {
  //     try {
  //       const res = await axiosSecure.get("/valid-coupons");

  //       setCoupons(res.data);
  //       setCurrentIndex(0); // Reset slider position on update
  //     } catch (error) {
  //       console.error("Error fetching coupons:", error);
  //     }
  //   };

  //   fetchCoupons();
  //   const interval = setInterval(fetchCoupons, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === coupons.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [coupons]);

  if (!coupons.length) {
    return (
      <div className="w-11/12 mx-auto my-10 text-center text-gray-500 py-10 bg-gray-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300 drop-shadow-md">
          💥 Exclusive Membership Coupons
        </h2>
        <p className="text-white"> 🎫 No valid coupons available right now.</p>
      </div>
    );
  }

  const current = coupons[currentIndex];

  return (
    <div className="w-11/12 mx-auto my-10 rounded-xl shadow-xl bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] bg-opacity-90">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300 drop-shadow-md">
          💥 Exclusive Membership Coupons
        </h2>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center border border-slate-200">
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

        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {coupons.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-cyan-400 shadow-md shadow-cyan-400 scale-110"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponSlider;
