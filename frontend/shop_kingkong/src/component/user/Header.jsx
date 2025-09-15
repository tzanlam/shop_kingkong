import React, { useState, useEffect } from "react";
import menuItems from "../../data/menuItems";
import logoBag from "../../assets/logoBag.png";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/slices/AuthSlice";
import { Link } from "react-router-dom";
import AuthModal from "../modal/AuthModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = (myId) => {
    dispatch(LOGOUT(myId))
      .unwrap()
      .then(() => setOpenDropdown(false));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="container px-8 py-6 mx-auto flex items-center justify-center relative">
          {/* Logo */}
          <div className="flex items-center absolute left-8">
            <img
              src={logoBag}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Menu */}
          <nav className="flex space-x-12">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 ${isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white hover:text-pink-300"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center absolute right-12 space-x-6">
            {/* Yêu thích */}
            <div
              className={`cursor-pointer transition-colors duration-200 ${isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-white hover:text-pink-300"
                }`}
            >
              <GrFavorite size={22} />
            </div>

            {/* Giỏ hàng */}
            <div
              className={`cursor-pointer transition-colors duration-200 ${isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-white hover:text-pink-300"
                }`}
            >
              <HiOutlineShoppingCart size={22} />
            </div>

            {/* Tài khoản */}
            {!accountId ? (
              // ✅ Chưa login → hiện icon
              <div
                onClick={() => setOpenAuth(true)}
                className={`cursor-pointer transition-colors duration-200 ${isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white hover:text-pink-300"
                  }`}
              >
                <SlUser size={20} />
              </div>
            ) : (
              // ✅ Đã login → hiện accountId
              <div className="relative">
                <span
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className={`cursor-pointer font-medium transition-colors duration-200 ${isScrolled
                      ? "text-gray-700 hover:font-semibold"
                      : "text-white hover:font-semibold"
                    }`}
                >
                  Mã khách hàng: {accountId}
                </span>

                {openDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl 
                      backdrop-blur-md bg-gray-800/40 shadow-xl border border-gray-200/30"
                  >
                    <ul className="py-2 text-gray-100">
                      <Link to={"/profile"}>
                        <li className="px-4 py-2 hover:bg-gray-700/40 cursor-pointer">
                          Hồ sơ cá nhân
                        </li>
                      </Link>

                      <li className="px-4 py-2 hover:bg-gray-700/40 cursor-pointer">
                        Lịch sử mua hàng
                      </li>
                      <li
                        onClick={() => handleLogout(accountId)}
                        className="px-4 py-2 hover:bg-gray-700/40 cursor-pointer text-red-400"
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal login */}
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};

export default Header;
