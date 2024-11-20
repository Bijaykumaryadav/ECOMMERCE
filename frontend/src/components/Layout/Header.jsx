import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../features/auth/authSlice";

const Header = () => {
  const theme = useSelector((state) => state.theme.theme); 
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} w-full shadow-md`}>
      {/* Search Bar for Small Screens */}
      <div className="md:hidden flex items-center w-full relative px-6 pt-3">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`w-full h-10 px-4 border rounded-2xl focus:outline-none ${
            theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
          }`}
        />
        <AiOutlineSearch
          size={24}
          className={`absolute right-8 cursor-pointer ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        />
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between py-4 px-6">
        {/* Dropdown Menu and Logo for Small Screens */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Dropdown Button */}
          <div className="relative">
            <button className="focus:outline-none" onClick={toggleDropdown}>
              {isDropdownOpen ? (
                <HiOutlineX size={24} className="text-gray-600" />
              ) : (
                <HiOutlineMenuAlt3 size={24} className="text-gray-600" />
              )}
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-md rounded-lg py-2 w-40">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/150x50?text=Logo"
              alt="Logo"
              className="h-8"
            />
          </Link>
        </div>

        {/* Logo and Search Bar for Larger Screens */}
        <div className="hidden md:flex items-center w-full space-x-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/150x50?text=Logo"
              alt="Logo"
              className="h-8"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow relative px-4">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full h-10 px-4 border rounded-md focus:outline-none ${
                theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
            />
            <AiOutlineSearch
              size={24}
              className={`absolute right-6 top-2.5 cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button onClick={handleThemeToggle} className="focus:outline-none">
            {theme === "dark" ? (
              <MdLightMode size={24} className="text-yellow-400" />
            ) : (
              <MdDarkMode size={24} className="text-gray-600" />
            )}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <AiOutlineHeart size={24} className="text-gray-600" />
            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              1
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <AiOutlineShoppingCart size={24} className="text-gray-600" />
            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* User Profile */}
          <Link to="/profile">
            <CgProfile size={24} className="text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Bottom Navigation for Larger Screens */}
      <nav className="hidden md:flex items-center justify-center space-x-8 bg-gray-100 py-2">
        <Link to="/" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        <Link to="/shop" className="text-gray-600 hover:text-blue-500">
          Shop
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-blue-500">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-blue-500">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
