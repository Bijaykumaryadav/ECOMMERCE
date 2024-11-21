import { useState } from "react";
import SignUp from "../../pages/Auth/SignUp";
import SignIn from "../../pages/Auth/SignIn";
import AuthLayout from "./AuthLayout";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signIn");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AuthLayout>
      {/* Button Switching */}
      <div className="flex items-center justify-center mb-4 w-full max-w-[424px]">
        <button
          className={`flex-grow h-[60px] flex items-center justify-center font-semibold transition-colors duration-300 text-[20px] leading-[28px] border border-b-blue-600 border-r-blue-600 border-opacity-100 ${
            activeTab === "signIn"
              ? "text-blue-600"
              : "text-white hover:bg-[#A8A8A8]"
          }`}
          onClick={() => handleTabSwitch("signIn")}
        >
          Sign In
        </button>
        <button
          className={`flex-grow h-[60px] flex items-center justify-center font-semibold transition-colors duration-300 text-[20px] leading-[28px] border border-b-blue-600 border-opacity-100 ${
            activeTab === "signUp"
              ? "text-blue-600"
              : "text-white hover:bg-[#A8A8A8]"
          }`}
          onClick={() => handleTabSwitch("signUp")}
        >
          Sign Up
        </button>
      </div>
      {/* Form Content */}
      {activeTab === "signIn" ? <SignIn /> : <SignUp />}
    </AuthLayout>
  );
};

export default Auth;