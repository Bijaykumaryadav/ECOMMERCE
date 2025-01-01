import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiHome, BiCategoryAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../features/auth/themeSlice";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import { fetchAllFilteredProducts } from "@/features/shop/productSlice";

const Header = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true); // Set to true initially
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navigate = useNavigate();
    const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
  const storedFilters = sessionStorage.getItem("filters")
    ? JSON.parse(sessionStorage.getItem("filters"))
    : {};
  
  const filterParams = {
    ...storedFilters,
  };
  
  dispatch(fetchAllFilteredProducts({ filterParams, sortParams: "" }));
}, [location.search]); // Re-run whenever query params change


function handleNavigate(menuItem) {
  // Clear filters for "home" or "shop"
  if (menuItem.id === "home" || menuItem.id === "shop") {
    sessionStorage.removeItem("filters"); // Clear session storage filter
    setSearchParams({}); // Clear search params
    navigate(menuItem.path); // Navigate to home or shop
    return;
  }

  // For categories, apply filter
  const currentFilter = { category: [menuItem.id] };
  sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // Save filter to session storage

  // Update the URL search params to reflect the filter
  setSearchParams({ category: menuItem.id });

  // Navigate to the category-specific page
  navigate(`/shop/listing?category=${menuItem.id}`);
}


  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down and user has scrolled past 50px
      setScrollingUp(false);
    } else {
      // Scrolling up
      setScrollingUp(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

    useEffect(() => {
    // Dynamically set padding based on header height
    const header = document.querySelector("header");
    const body = document.querySelector("body");
    if (header && body) {
      body.style.paddingTop = `${header.offsetHeight}px`;
    }
    // Adjust on resize
    const handleResize = () => {
      if (header) {
        body.style.paddingTop = `${header.offsetHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <header
        className={`header w-full fixed top-0 left-0 z-50 shadow-md bg-background text-foreground transition-transform duration-300 ${
          scrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
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
            className="absolute right-8 cursor-pointer text-gray-500"
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
                  <HiOutlineX size={24} className="text-foreground" />
                ) : (
                  <HiOutlineMenuAlt3 size={24} className="text-foreground" />
                )}
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-10 left-0 bg-background text-foreground shadow-md rounded-lg py-2 w-40">
                {
                  shoppingViewHeaderMenuItems.map(menuItems =>  <Link key={menuItems.id} to={menuItems.path}                    className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
                  onClick={() => setIsDropdownOpen(false)}>{menuItems.label}</Link>
                  )
                }
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
                className="w-full h-10 px-4 border rounded-md focus:outline-none bg-background text-foreground"
              />
              <AiOutlineSearch
                size={24}
                className="absolute right-6 top-2.5 cursor-pointer text-gray-500"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="header flex items-center space-x-6">
            {/* Theme Toggle */}
            <button onClick={handleThemeToggle} className="focus:outline-none">
              {theme === "dark" ? (
                <MdLightMode size={24} className="text-yellow-400" />
              ) : (
                <MdDarkMode size={24} className="text-foreground" />
              )}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden md:inline-block">
              <AiOutlineHeart size={24} className="text-foreground" />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                1
              </span>
            </Link>

            {/* Cart */}
            <Link to="/shop/cart" className="relative hidden md:inline-block">
              <AiOutlineShoppingCart size={24} className="text-foreground" />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Profile */}
            <Link to="/profile" className="hidden md:inline-block">
              <CgProfile size={24} className="text-foreground" />
            </Link>
          </div>
        </div>

        {/* Bottom Navigation for Larger Screens */}
        <nav className="header hidden md:flex items-center justify-center space-x-8 bg-muted py-2">
          {
            shoppingViewHeaderMenuItems.map(menuItems =>  <Label
                key={menuItems.id}
               onClick={() => handleNavigate(menuItems)} className="hover:text-blue-500 cursor-pointer">{menuItems.label}</Label>
            )
          }
        </nav>
      </header>

      {/* Downward Navbar for Small Screens */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background text-foreground shadow-md header">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center text-sm">
            <BiHome size={24} />
            <span>Home</span>
          </Link>
          <Link to="/shop/listing" className="flex flex-col items-center text-sm">
            <BiCategoryAlt size={24} />
            <span>Shop</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center text-sm">
            <AiOutlineHeart size={24} />
            <span>Wishlist</span>
          </Link>
          <Link to="/shop/cart" className="flex flex-col items-center text-sm">
            <AiOutlineShoppingCart size={24} />
            <span>Cart</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-sm">
            <CgProfile size={24} />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
