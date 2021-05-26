import React from "react";
import HeroSection from "./HeroSection";
import { homeObjOne } from "./Data";
import Pricing from "./Pricing";

const Home = () => {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <Pricing />
    </>
  );
};

export default Home;
