import React, { useEffect, useState } from "react";

const Faq = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched FAQ:", result);
        setData(result);
      })
      .catch((err) => {
        console.error("FAQ Fetch Error:", err);
        setData([]);
      });
  }, []);

  return (
    <div className="py-12 w-11/12 mx-auto bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2] mb-10">
      <h2 className="text-3xl text-center font-bold mb-10">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 md:px-16">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://i.ibb.co/BmP7DRT/faq3.jpg"
            alt="FAQ Illustration"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side Q&A */}
        <div className="w-full md:w-1/2 space-y-4">
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-base-100 border border-base-300"
              >
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-semibold">
                  {item.question}
                </div>
                <div className="collapse-content text-sm">{item.answer}</div>
              </div>
            ))
          ) : (
            <p className="text-red-500">FAQ data is not in correct format.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
