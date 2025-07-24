import React, { useState, useEffect } from "react";

const Banner = () => {
  const slides = [
    {
      image: "https://i.ibb.co/8LSch9nV/product.webp",
      title: "Discover Innovative Tech Products",
      description:
        "Explore the latest web apps, AI tools, games, and software shared by the community.",
    },
    {
      image: "https://i.ibb.co/JFQxhsQV/standard-quality-control-concept-m.jpg",
      title: "Showcase Your Own Creations",
      description:
        "Submit your tech products and get feedback and votes from real users.",
    },
    {
      image: "https://i.ibb.co/N6x3rGYd/colarb.jpg",
      title: "Collaborate with Experts",
      description:
        "Join a vibrant community of developers, moderators, and admins.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="my-8">
      <div
        className="my-10"
        style={{ maxWidth: 1200, margin: "auto", position: "relative" }}
      >
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          style={{
            width: "100%",
            height: 600,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "10%",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            maxWidth: "50%",
             
              zIndex: 8,
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: 10 }}>
            {slides[currentIndex].title}
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            {slides[currentIndex].description}
          </p>
        </div>
     


        <button
          onClick={prevSlide}
          style={buttonStyle("left")}
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          style={buttonStyle("right")}
          aria-label="Next Slide"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

const buttonStyle = (position) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0,0,0,0.4)",
  border: "none",
  color: "white",
  fontSize: "2rem",
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: "50%",
  userSelect: "none",
  [position]: 20,
});

export default Banner;
