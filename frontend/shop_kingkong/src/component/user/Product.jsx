import React, { useState } from "react";
import { RiFilterLine } from "react-icons/ri";
import {
  MdKeyboardArrowDown,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Product = () => {
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [selectOption, setSelectOption] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelection = (productId, type, value) => {
    setSelectOption((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value,
      },
    }));
  };

  const products = [
    {
      id: 1,
      name: "Túi Xách Cao Cấp Louis Vuitton",
      price: "25,000,000",
      image: "https://via.placeholder.com/300x300",
      category: "Luxury",
      sizes: ["S", "M", "L"],
      colors: ["black", "brown", "white"],
    },
    {
      id: 2,
      name: "Túi Đeo Chéo Gucci",
      price: "18,500,000",
      image: "https://via.placeholder.com/300x300",
      category: "Designer",
      sizes: ["S", "M"],
      colors: ["green", "black"],
    },
    {
      id: 3,
      name: "Túi Tote Chanel",
      price: "32,000,000",
      image: "https://via.placeholder.com/300x300",
      category: "Luxury",
      sizes: ["M", "L"],
      colors: ["black", "beige"],
    },
    {
      id: 4,
      name: "Túi Clutch Hermès",
      price: "45,000,000",
      image: "https://via.placeholder.com/300x300",
      category: "Premium",
      sizes: ["S"],
      colors: ["red", "black"],
    },
    {
      id: 5,
      name: "Túi Backpack Prada",
      price: "22,000,000",
      image: "https://via.placeholder.com/300x300",
      category: "Designer",
      sizes: ["M", "L"],
      colors: ["black", "navy"],
    },
    {
      id: 6,
      name: "Túi Shoulder Dior",
      price: "28,000,000",
      image: "https://via.placeholder.com/300x300",
      category: "Luxury",
      sizes: ["S", "M"],
      colors: ["white", "pink"],
    },
  ];

  const colorMap = {
    black: "bg-black",
    brown: "bg-amber-800",
    white: "bg-white border border-gray-300",
    green: "bg-green-600",
    beige: "bg-amber-200",
    red: "bg-red-600",
    navy: "bg-blue-900",
    pink: "bg-pink-400",
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            TẤT CẢ TÚI XÁCH
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những chiếc túi xa hoa từ các thương hiệu hàng đầu thế giới
          </p>
        </div>

        {/* Filter and Sort Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-300">
          <div className="flex items-center font-bold gap-2 text-gray-700 mb-4 sm:mb-0">
            <RiFilterLine size={20} />
            <span>LỌC</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Sắp xếp theo:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              >
                <option value="most-popular">Phổ Biến Nhất</option>
                <option value="price-low">Giá: Thấp đến Cao</option>
                <option value="price-high">Giá: Cao đến Thấp</option>
                <option value="name-az">Tên: A-Z</option>
                <option value="name-za">Tên: Z-A</option>
                <option value="newest">Mới nhất</option>
              </select>
              <MdKeyboardArrowDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl group relative"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover cursor-pointer"
                  />
                </Link>
                {/* Favorite Icon */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                >
                  {favorites.includes(product.id) ? (
                    <MdFavorite size={24} className="text-red-500" />
                  ) : (
                    <MdFavoriteBorder size={24} />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Kích thước:</span>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          handleSelection(product.id, "size", size)
                        }
                        className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                          selectOption[product.id]?.size === size
                            ? "border-purple-600 bg-purple-100 text-purple-600"
                            : "border-gray-300 text-gray-600"
                        } text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Màu sắc:</span>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          handleSelection(product.id, "color", color)
                        }
                        className={`w-6 h-6 rounded-full ${colorMap[color]} ${
                          selectOption[product.id]?.color === color
                            ? "ring-2 ring-purple-600 ring-offset-2"
                            : ""
                        } hover:ring-2 hover:ring-purple-600 hover:ring-offset-2 transition-all`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg font-bold text-black-600 mt-2">
                  {product.price} VNĐ
                </p>
              </div>
              {/* Add to Cart Button - Appears on Hover */}
              <button className="absolute bottom-0 left-0 right-0 bg-purple-600 text-white py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-700">
                <HiOutlineShoppingCart size={20} />
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
