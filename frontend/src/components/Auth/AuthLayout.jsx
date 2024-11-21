import React from "react";
import logo from "../../assets/logo.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D9D9D9]  overflow-x-hidden pt-[40px]">
      {/* Logo Section */}
      <div className="flex justify-center mb-4 xs:max-w-xs sm:max-w-sm  md:max-w-[424px] w-[424px] min-w-[280px]">
        <img src={logo} alt="logo" className="max-h-[300px]" />
      </div>

      {/* Form Container */}
      <div className="flex flex-col items-center justify-center bg-[#D9D9D9] shadow-lg border border-blue-600 rounded-md overflow-hidden transition-all duration-300 pb-6 mb-[15vh] xs:max-w-xs sm:max-w-sm  md:max-w-[424px] w-[424px] min-w-[280px]">
        {/* Children will be the form content */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;