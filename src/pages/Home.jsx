import React from "react";
import Banner from "./Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import CouponSlider from "./Admin/CouponSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
      <TrendingProducts></TrendingProducts>
      <CouponSlider></CouponSlider>
    </div>
  );
};

export default Home;
