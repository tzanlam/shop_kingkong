// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header cố định */}
      <Header />

      {/* Nội dung chính với padding */}
      <main className="flex-grow pb-20">
        <Outlet />{" "}
        {/* Các trang như HomePage, ProductDetails sẽ được render ở đây */}
      </main>

      {/* Footer cố định */}
      <Footer />
    </div>
  );
};

export default Layout;
