import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AuthContext } from "../../context/AuthContext";
// import { Modal } from "daisyui"; // DaisyUI modal

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

// ⬇️ Checkout Form
const CheckoutForm = ({ user, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/create-payment-intent",
          {
            email: user.email,
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch {
        setError("Could not initialize payment");
      }
    };
    createIntent();
  }, [user.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });
    console.log(result)

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      await axios.patch(`http://localhost:3000/user-subscribe/${user.email}`);
      onPaymentSuccess(); // Update UI
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Pay $10"}
      </button>
    </form>
  );
};

// ⬇️ MyProfile Page
const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 🔁 Check subscription from DB
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/user-subscribe/${user.email}`)
        .then((res) => setIsSubscribed(res.data.isSubscribed))
        .catch(() => setIsSubscribed(false));
    }
  }, [user?.email]);

  const handlePaymentSuccess = () => {
    setIsSubscribed(true);
    setShowModal(false);
  };

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-56 bg-white p-6 border rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt={user.displayName || "User"}
          className="w-16 h-16 rounded-full mr-4 border"
        />
        <div>
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {isSubscribed ? (
        <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg text-center font-medium">
          Status: <strong>Verified</strong>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Membership Subscribe ($10)
          </button>
        </div>
      )}

      {/* ✅ Modal for Stripe Payment */}
      {showModal && (
        <div className="fixed inset-0 bg-[#e6fff7] bg-opacity-40 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Complete Payment
            </h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                user={user}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
