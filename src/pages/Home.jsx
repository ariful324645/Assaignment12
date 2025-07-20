import React from "react";
import Banner from "./Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import CouponSlider from "./Admin/CouponSlider";
import ProductsMarque from "./ProductsMarque";
import Faq from "./Dashboard/Faq";

const Home = () => {

  return (
    <div>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
      <TrendingProducts></TrendingProducts>
      <CouponSlider></CouponSlider>
      <Faq></Faq>
      <ProductsMarque></ProductsMarque>
    </div>
  );
};

export default Home;
