// Footer.jsx
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white  px-6 py-12 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          {/* <h2 className="text-2xl font-bold text-white">AppOrbit</h2> */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/d49Jp2JZ/app-Orbit1.webp"
              alt="AppOrbit Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold">AppOrbit</span>
          </div>

          <p className="mt-2 text-sm">
            Discover, upvote, and share the latest web apps, AI tools, and tech
            products.
          </p>
          <div className="flex space-x-4 mt-4 text-white text-lg">
            <a
              href="https://web.facebook.com/?_rdc=1&_rdr#"
              target="blank"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/"
              target="blank"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="blank"
              className="hover:text-blue-600"
            >
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white">
                DashBoard
              </Link>
            </li>
            <li></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-white">Help Center</a>
            </li>{" "}
            <li>
              <a className="hover:text-white">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:text-white">Terms of Service</a>
            </li>
            <li>
              <a className="hover:text-white">Support</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-sm mb-2">Get product updates in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-gray-800 text-white text-sm outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700 text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} AppOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
