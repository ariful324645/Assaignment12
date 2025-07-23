import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

// CheckoutForm Component

const CheckoutForm = ({ user, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  //

  const [couponError, setCouponError] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    const fetchPaymentIntent = async () => {
      try {
        const res = await axiosSecure.post("/create-payment-intent", {
          email: user.email,
          couponCode,
        });
        setClientSecret(res.data.clientSecret);
        setDiscount(res.data.discount || 0);
        setError("");
      } catch {
        setError("Payment initialization failed");
      }
    };
    fetchPaymentIntent();
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      await axiosSecure.patch(`/user-subscribe/${user.email}`);
      onSuccess();
    }
  };
  //last day
  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.get(`/validate-coupon?code=${couponCode}`);

      if (res.data.valid) {
        setDiscount(res.data.discountAmount);
        setCouponError("");
      } else {
        setDiscount(0);
        setCouponError(res.data.message);
      }
    } catch (error) {
      setDiscount(0);
      setCouponError("Coupon not valid or expired.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
          className="flex-1 border p-2 rounded"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {discount > 0 && (
        <p className="text-green-600">Discount Applied: ${discount}</p>
      )}

      <CardElement className="p-3 border rounded" />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Pay ${500 - discount}
      </button>
    </form>
  );
};

// MyProfile Component

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // ✅ Now properly used
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user-subscribe/${user.email}`)
        .then((res) => setIsSubscribed(res.data.isSubscribed))
        .catch(() => setIsSubscribed(false));
    }
  }, [user?.email, axiosSecure]);

  const onPaymentSuccess = () => {
    setIsSubscribed(true);
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex items-center mb-6">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt={user.displayName}
          className="w-16 h-16 rounded-full mr-4 border"
        />
        <div>
          <p className="font-semibold text-lg">{user.displayName}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {isSubscribed ? (
        <div className="bg-green-100 p-4 rounded text-green-700 font-medium text-center mb-4">
          Membership Status: Verified ✅
        </div>
      ) : (
        <div className="text-center mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Subscribe Membership ($500)
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-[#e6fff7]  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-center text-xl font-semibold mb-4">
              Complete Payment
            </h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm user={user} onSuccess={onPaymentSuccess} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
