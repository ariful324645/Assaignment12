import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Name */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/zVvp0GsS/appOrbit.jpg"
              alt="AppOrbit Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-2xl font-bold">AppOrbit</span>
          </div>

          {/* Useful Links */}
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white mt-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm mt-4">
          © {new Date().getFullYear()} AppOrbit. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
