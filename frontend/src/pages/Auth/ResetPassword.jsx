import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Util from '../../helpers/Util';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
      const handleCancel = () => {
        navigate("/");
      };

 const handleUpdatePassword = (e) => {
   e.preventDefault();

   const token = sessionStorage.getItem("resetToken"); // Retrieve token
   if (!token) {
     toast.error("Session expired. Please try resetting your password again.");
     return;
   }

   const data = { password, confirmPassword };

   Util.call_Post_by_URI(
     "users/update-password",
     data,
     (res, status) => {
       if (status) {
         toast.success(res.message, { autoClose: 2000 });
         sessionStorage.removeItem("resetToken"); // Clear token after use
         navigate("/");
       }
     },
     { Authorization: `Bearer ${token}` } // Include token in header
   );
 };


  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xl shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg border border-blue-500 bg-[#d9d9d9] pb-6">
        <div className="w-full p-4">
          <h2 className="text-[20px] leading-[28px] mb-4 flex justify-center">
            Reset Password
          </h2>
          <form className="flex flex-col items-center w-full space-y-4" onSubmit={handleUpdatePassword}>
            <label className="w-full" htmlFor="password">
              Password
              <div className="relative w-full">
                <input
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type={showPassword ? "text" : "password"}
                  placeholder="8+ characters"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  value={password}
                  required
                />
                <span
                  className="absolute inset-y-0 flex items-center cursor-pointer right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEye className="text-[#191c1f]" />
                  ) : (
                    <AiFillEyeInvisible className="text-[#191c1f]" />
                  )}
                </span>
              </div>
            </label>

            {/* Confirm Password Input */}
            <label className="w-full mb-4" htmlFor="confirmPassword">
              Confirm Password
              <div className="relative w-full">
                <input
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute inset-y-0 flex items-center cursor-pointer right-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiFillEye className="text-[#191c1f]" />
                  ) : (
                    <AiFillEyeInvisible className="text-[#191c1f]" />
                  )}
                </span>
              </div>
            </label>
            <button
              className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-[#ffffff] h-[48px] transition-colors duration-300 bg-blue-500 hover:bg-blue-800 tracking-[1.2%] rounded-[15px]"
              type="submit"
            >
              RESET PASSWORD
            </button>
            <button
              className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-red-500 h-[48px] transition-colors duration-300 bg-white hover:bg-gray-200 tracking-[1.2%] rounded-[15px] border border-blue-500"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword