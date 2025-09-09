import React from "react";

const Category = () => {
  const bags = [
    {
      name: "Túi Casual",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Túi Văn Phòng",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Túi Đa Hơi",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Túi Sáng Trọng",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Túi Thiết Kế",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex gap-6 text-center mb-8 ">
        <h1 className="text-5xl font-bold text-black">BỘ SƯU TẬP</h1>
        <p className="text-gray-500 mt-2 ">
          Khám phá những chiếc túi xa hoa, chuến nghệp và phong cách độc đáo để
          làm nổi bật cá tính riêng của bạn
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {bags.map((bag, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-3/4"
          >
            <img
              src={bag.image}
              alt={bag.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-lg font-medium text-gray-800">{bag.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
