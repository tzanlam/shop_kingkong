import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getThumbnailsByProductId } from "../../data/thumbnail";
import { products, colorMap, sizeMap } from "../../data/products";
import { MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addToCart, setAddToCart] = useState([]);
  const [selectedOption, setSelectOption] = useState([]);

  useEffect(() => {
    // Lấy thông tin sản phẩm
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    // Lấy ảnh thumbnail
    const images = getThumbnailsByProductId(parseInt(id));
    setProductImages(images);
    setMainImage(images.mainImage);
  }, [id]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleSelectOption = (productId, type, value) => {
    setSelectOption((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value,
      },
    }));
  };

  const handleAddToCart = (productId) => {
    setAddToCart((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: prev[productId] ? prev[productId].quantity + 1 : 1,
      },
    }));
    toast.success("Thêm vào giỏ hàng thành công!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  if (!product || !productImages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Phần ảnh bên trái */}
          <div className="image-section">
            {/* Ảnh lớn chính */}
            <div className="main-image mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Các ảnh nhỏ thumbnail */}
            <div className="thumbnail-images flex gap-2 overflow-x-auto">
              {productImages.thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`${product.name} view ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                    mainImage === thumb
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  onClick={() => handleThumbnailClick(thumb)}
                />
              ))}
            </div>
          </div>

          {/* Phần thông tin bên phải */}
          <div className="product-info">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Thể loại: </span>
              <span className="text-gray-800">{product.category}</span>
            </div>
            <p className="text-2xl text-gray-800 font-semibold mb-4">
              {product.price}₫
            </p>
            <hr className="mb-6" />
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            <hr className="mb-6" />
            {/* Thông tin chi tiết */}
            <div className="product-details mb-6">
              <div className="mb-4">
                <span className="font-semibold text-gray-700 block mb-2">
                  Màu sắc:
                </span>
                <div className="flex gap-2">
                  {product.colors &&
                    product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          handleSelectOption(product.id, "color", color)
                        }
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          colorMap[color] || "bg-gray-300"
                        } ${
                          selectedOption[product.id]?.color === color
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : "hover:ring-2 hover:ring-gray-400 hover:ring-offset-1"
                        }`}
                        title={color}
                      />
                    ))}
                </div>
                <hr className="mb-6" />
                <div className="mb-4">
                  <span className="font-semibold text-gray-700 block mb-2">
                    Kích thước
                  </span>
                  <div className="flex gap-2">
                    {product.sizes &&
                      product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            handleSelectOption(product.id, "size", size)
                          }
                          className={`w-8 h-8 rounded-sm border-2 transition-all duration-200 flex items-center justify-center text-sm font-medium ${
                            selectedOption[product.id]?.size === size
                              ? "bg-blue-500 text-white border-blue-500 ring-2 ring-blue-500 ring-offset-2"
                              : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                          title={size}
                        >
                          {size}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
              <hr className="mb-6" />

              <hr className="mb-6" />
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Đánh giá: </span>
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-gray-600 ml-2">(4.5/5)</span>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="quantity-section mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons space-y-3">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="flex gap-2 items-center justify-center py-2 bg-transparent text-gray-800 hover:text-red-500 transition-colors">
                <MdFavoriteBorder className="text-3xl" />
                Thêm vào yêu thích
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
