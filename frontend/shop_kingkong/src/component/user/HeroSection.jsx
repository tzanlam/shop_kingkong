import React from "react";
import { useNavigate } from "react-router-dom";
import bag1 from "../../assets/bag1.jpg";
import { MdArrowForwardIos } from "react-icons/md";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/product");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-20 pt-24 pb-20">
        <div className="flex items-center justify-between min-h-[80vh]">
          {/* Left Content */}
          <div className="flex-1 pr-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
              TÚI XA XỈ CHO <span className="block">PHÁI ĐẸP</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              KHÁM PHÁ BỘ SƯU TẬP TÚI XÁCH CAO CẤP TỪ CÁC THƯƠNG HIỆU HÀNG ĐẦU
              THẾ GIỚI, MANG ĐẾN PHONG CÁCH VÀ ĐẲNG CẤP CHO MỌI QUÝ PHÁI.
            </p>

            <button
              onClick={handleShopNow}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Mua Ngay
              <MdArrowForwardIos />
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-lg shadow-2xl overflow-hidden">
                <img
                  src={bag1}
                  alt="Bag"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating decorative circles */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-500 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500 rounded-full opacity-50"></div>
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-white rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
