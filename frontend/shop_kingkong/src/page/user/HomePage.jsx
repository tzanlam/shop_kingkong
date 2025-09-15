import React from "react";
import HeroSection from "../../component/user/HeroSection";
import AboutSection from "../../component/user/AboutSection";
import ServicesSection from "../../component/user/ServicesSection";
import Category from "../../component/user/Category";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Category />
    </div>
  );
};

export default HomePage;
