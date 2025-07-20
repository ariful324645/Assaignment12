import React from "react";
import Marquee from "react-fast-marquee";

const logos = [
  "https://i.ibb.co/8L7FtzHb/star.jpg",
  "https://i.ibb.co/8LSch9nV/product.webp",
  "https://i.ibb.co/JFQxhsQV/standard-quality-control-concept-m.jpg",
  "https://i.ibb.co/FkJS0N86/applents.webp",
  "https://i.ibb.co/vCpf7YPT/tent-pulse.jpg",
  "https://i.ibb.co/ccNczBRW/Betahub.png",
  "https://i.ibb.co/TBhzGchy/buzzcraft.jpg",
  "https://i.ibb.co/svpv2VyY/orbit-track.jpg",
];

const ProductsMarque = () => {
  return (
    <div className="py-10 bg-white w-11/12 mb-8 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        🔥Our Signature Tools on AppOrbit
      </h2>
      <Marquee speed={60} pauseOnHover gradient={false} loop={0}>
        <div className="flex items-center gap-16">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-24 w-24 rounded-full "
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ProductsMarque;
