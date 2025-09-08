import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuItems from "../data/menuItems";
import logoBag from "../assets/logoBag.png";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container px-8 py-6 mx-auto flex items-center justify-center relative">
        <div className="flex items-center absolute left-8">
          <img
            src={logoBag}
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <nav className="flex space-x-12">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-white hover:text-pink-300"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center absolute right-12 space-x-6">
          <div
            className={`cursor-pointer transition-colors duration-200 ${
              isScrolled
                ? "text-gray-600 hover:text-blue-600"
                : "text-white hover:text-pink-300"
            }`}
          >
            <GrFavorite size={22} />
          </div>
          <div
            className={`cursor-pointer transition-colors duration-200 ${
              isScrolled
                ? "text-gray-600 hover:text-blue-600"
                : "text-white hover:text-pink-300"
            }`}
          >
            <HiOutlineShoppingCart size={22} />
          </div>
          <div
            className={`cursor-pointer transition-colors duration-200 ${
              isScrolled
                ? "text-gray-600 hover:text-blue-600"
                : "text-white hover:text-pink-300"
            }`}
          >
            <SlUser size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
