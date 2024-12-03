 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Util from "../../helpers/Util";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
// import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
//   const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false); 
  

// const handleSignIn = (e) => {
//   e.preventDefault();
//   dispatch(signIn({ email, password })).then((data) => {
//     if(data?.payload?.success){
//     toast.success(data?.payload?.message);
//     }else{
//       toast.error(data?.payload?.message);
//     }
//   });
// };
const handleSignIn = async (e) => {
  e.preventDefault();
  try {
    // setIsLoading(true); // Start loading
    Util.call_Post_by_URI(
      "users/signin",
      {
        email,
        password,
      },
      (res, status) => {
        // setIsLoading(false); // Stop loading after response

        if (status && res?.success) {
          // Successful login
          console.log("34",res);
          toast.success(res?.message || "Sign-in successful!", {
            autoClose: 2000,
          });
          dispatch(setUser({ user: res.user || "", token: res.token }));
          Util.auth(dispatch); 
          setTimeout(() => {
            navigate("/shop/home");
          }, 1000);
        } else if (
          res?.message === "Email not verified. Verification email has been resent."
        ) {
          setShowOverlay(true); // Show verification overlay
        } else {
          // Handle other errors
          toast.error(res?.message || "Sign-in failed. Please try again.", {
            autoClose: 2000,
          });
        }
      }
    );
  } catch (error) {
    // setIsLoading(false); // Stop loading on error
    console.error("Error during sign-in:", error);
    toast.error("Something went wrong. Please try again.", {
      autoClose: 2000,
    });
  }
};


    const handleGoogleSignIn = () => {
    window.location.href =
      "http://localhost:8000/apis/v1/users/auth/google";
  };

  return (
  <>
    <form
      className="flex flex-col items-center space-y-4 text-left w-full md:max-w-[360px] xs:max-w-xs sm:max-w-sm xs:px-3 md:px-0"
      onSubmit={handleSignIn}
    >
      <label className="flex flex-col w-full text-left" htmlFor="email">
        <span className="text-[14px] leading-[20px] text-[#191c1f]">Email Address</span>
        <input
          id="email"
          className="w-full px-4 py-2 border border-blue-600 rounded-[15px] mt-[8px] bg-[#D9D9D9] focus:border-2 focus:border-blue-600 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      {/* Password and Forgot Password section */}
        <label className="w-full mb-4" htmlFor="password">
          <div className="flex items-center justify-between mt-2">
            <span className="w-auto">Password</span>
            <Link to="/users/forgotpassword" className="text-blue-500">
              Forgot Password
            </Link>
        </div>

        <div className="relative w-full">
          <input
            id="password"
            className="w-full px-4 py-2 pr-10 mt-[8px] border border-blue-600 rounded-[15px] bg-[#D9D9D9] focus:border-2 focus:border-blue-600 outline-none"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute inset-y-0 flex items-center mt-2 cursor-pointer right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEye className="w-[20px] h-[20px]" />
            ) : (
              <FiEyeOff className="w-[20px] h-[20px]" />
            )}
          </span>
        </div>
      </label>

      {/* Sign In Button */}
      <button className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-[#ffffff] h-[48px] transition-colors duration-300 bg-blue-600 hover:bg-[#5b4234] tracking-[1.2%] rounded-[15px]"
        onClick={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> 
        :<div className="flex items-center"> SIGN IN &nbsp;
          <span>
            <FaArrowRight />
          </span>
        </div>}
      </button>

      {/* Divider with "or" inside a rectangle */}
      <div className="relative flex items-center w-full py-[12px]">
        <hr className="border-t border-blue-600 w-full" />
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600 text-center text-[#ffffff] w-[30px] h-[20px] flex items-center justify-center pb-1">
          or
        </div>
      </div>

      {/* Google Sign-In Button */}
      <button
        className="flex justify-between items-center w-full h-[44px] px-4 py-2 mt-2 text-[#475156] border border-blue-600 rounded-[15px] hover:bg-gray-100"
        type="button" onClick={handleGoogleSignIn}

      >
        <FcGoogle className="h-[20px] w-[20px]" />
        <span className="flex-grow text-center">Login with Google</span>
      </button>
    </form>

      {/* Overlay for the verification code */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overlay-background">
          <div className="w-full p-6 bg-white rounded-lg min-h-[300px] min-w-[300px] xs:max-w-[300px] sm:max-w-[424px] md:max-w-[424px]">
            <VerifyPage email={email} setShowOverlay={setShowOverlay} />
          </div>
        </div>
      )}
      </>
  );
};

export default SignIn;