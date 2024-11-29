import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Util from "../../helpers/Util";
import { toast } from "react-toastify";
import VerifyPage from "../../components/Auth/VerifyPage";
// import Util from "@/helpers/Util";
// import Loader from "../../components/Loader/Loader";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

const handleSignUp = async (e) => {
  e.preventDefault();

  // Proceed with sign-up if validations pass
  try {
    Util.call_Post_by_URI(
      "users/signup",
      {
        name,
        email,
        password,
      },
      (res, status) => {
        if (status && res?.success) {
          toast.success("Please verify your email.", {
            autoClose: 2000,
          });
          setShowOverlay(true); 
        } else if (res?.message === "Please verify your email to continue") {
          // Only show the toast if it's not already showing
          // toast.info("Please verify your email to continue.", {
          //   autoClose: 2000,
          // });
          setShowOverlay(true);
        } else if(res?.message === "Account already exists"){
          toast.error(res?.message === "User already exists");
          clearForm();
        }else{
          toast.error(res?.message || "Sign-up failed.");
          clearForm(); // Clear the form fields
        }
      }
    );
  } catch (error) {
    clearForm(); // Clear the form fields
    console.log(error);
    toast.error("Something went wrong. Please try again.");
  }
};

  // Function to clear form fields
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsAgreed(false);
  };

  // Function to close overlay when clicking outside the modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay-background")) {
      setShowOverlay(false);
    }
  };

      const handleGoogleSignIn = () => {
      window.location.href =
        "http://localhost:8000/apis/v1/users/auth/google";
    };

  return (
    <>
      <form
        className="flex flex-col space-y-4 text-left w-full md:max-w-[360px] xs:max-w-xs sm:max-w-sm xs:px-3 md:px-0"
        onSubmit={handleSignUp}
      >
        {/* Name Input */}
        <label className="flex flex-col w-full" htmlFor="name">
          <span className="text-[14px] leading-[20px] text-[#191c1f] mb-1">
            Name
          </span>
          <input
            id="name"
            className="w-full px-4 py-2 border border-blue-600 rounded-[15px] bg-[#D9D9D9] focus:border-2 focus:border-blue-600 outline-none"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* Email Input */}
        <label className="flex flex-col w-full" htmlFor="email">
          <span className="text-[14px] leading-[20px] text-[#191c1f] mb-1">
            Email Address
          </span>
          <input
            id="email"
            className="w-full px-4 py-2 border border-blue-600 rounded-[15px] bg-[#D9D9D9] focus:border-2 focus:border-blue-600 outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {/* Password Input */}
        <label className="relative flex flex-col w-full" htmlFor="password">
          <span className="text-[14px] leading-[20px] text-[#191c1f] mb-1">
            Password
          </span>
          <div className="relative w-full">
            <input
              id="password"
              className="w-full px-4 py-2 border border-blue-600 rounded-[15px] bg-[#D9D9D9] focus:border-2 focus:border-blue-600 outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="8+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 flex items-center cursor-pointer right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEye className="text-[#191c1f]" />
              ) : (
                <FiEyeOff className="text-[#191c1f]" />
              )}
            </span>
          </div>
        </label>

        {/* Confirm Password Input */}
        <label
          className="relative flex flex-col w-full"
          htmlFor="confirm-password"
        >
          <span className="text-[14px] leading-[20px] text-[#191c1f] mb-1">
            Confirm Password
          </span>
          <div className="relative w-full">
            <input
              id="confirm-password"
              className="w-full px-4 py-2 border border-blue-600 rounded-[15px] bg-[#D9D9D9] focus:border-2 focus:border-blue-600 outline-none"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 flex items-center cursor-pointer right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEye className="text-[#191c1f]" />
              ) : (
                <FiEyeOff className="text-[#191c1f]" />
              )}
            </span>
          </div>
        </label>

        {/* Checkbox for Terms and Conditions */}
        <label className="flex items-center w-full">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <p className="text-[14px] leading-[20px] text-[#191c1f]">
            I agree to Clicon
            <span className="text-blue-600"> Terms of Condition </span>
            and <span className="text-blue-600">Privacy Policy</span>
          </p>
        </label>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-4 font-semibold text-[#ffffff] h-[48px] transition-colors duration-300 bg-blue-600 hover:bg-[#5b4234] tracking-[1.2%] rounded-[15px]"
          disabled={!isAgreed}
        >
          {isLoading ? <Loader /> 
          :<div className="flex items-center">
            SIGN UP &nbsp;
            <span>
              <FaArrowRight />
            </span>
          </div>}
        </button>

        {/* Divider with "or" inside a rectangle */}
        <div className="relative flex items-center w-full py-3">
          <hr className="border-t border-blue-600 w-full" />
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600 text-center text-[#ffffff] w-8 h-5 flex items-center justify-center pb-1">
            or
          </div>
        </div>

        {/* Google Sign-In Button */}
        <button
          className="flex justify-between items-center w-full h-11 px-4 py-2 mt-2 text-[#475156] border border-blue-600 rounded-[15px] hover:bg-gray-100"
          type="button"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="flex-grow text-center" onClick={handleGoogleSignIn}>Sign up with Google</span>
        </button>
      </form>

      {/* Overlay for the verification page */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overlay-background"
        >
          <div className="bg-[#D9D9D9] p-6 rounded-lg w-full min-h-[300px] xs:max-w-[300px] sm:max-w-[424px] md:max-w-[424px]">
            <VerifyPage email={email} setShowOverlay={setShowOverlay} />
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;