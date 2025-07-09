import React from "react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <img
        className="w-[300px] md:w-[600px] h-auto"
        src="https://i.ibb.co/Wpd76qLq/3828537.jpg"
        alt="Error Illustration"
      />
      <Link to="/" className="mt-4 btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
