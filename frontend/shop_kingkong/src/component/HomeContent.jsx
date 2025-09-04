import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Welcome to Shop King Kong
      </h1>
      <div className="text-center">
        <p className="text-lg text-gray-600 mb-6">
          Your one-stop shop for amazing products!
        </p>
        {/* Test Tailwind CSS */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Tailwind CSS Test</h2>
          <p className="text-sm">
            If you can see this styled box, Tailwind CSS is working!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
