import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
// import Util from "../../helpers/Util";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/userSlice";
// import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
//   const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {

    // e.preventDefault();
    // try {
    //   setIsLoading(true);
    //   Util.call_Post_by_URI("user/signin", {
    //     email,
    //     password,
    //   }, (res, status) => {
    //     setIsLoading(false);
    //     if (status) {
    //       dispatch(login({ userInfo: "", token: res.token })); // Save user to Redux
    //       Util.auth(dispatch);
    //       toast.success("Sign-in successful!", { autoClose: 2000 }); // toast.update(res.message)
    //       setTimeout(() => {
    //         navigate("/profile");
    //       }, 1000);
    //     }else {
    //       toast.error(res.message, { autoClose: 2000 })
    //     }
    //   } );
    // } catch (error) {
    //   toast.error("An error occurred while signing in. Please try again.", { autoClose: 2000 });
    //   console.error(error); // Log the error to console for debugging
    // }
    // setIsLoading(false);
  }

  return (
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
      <label className="relative flex flex-col w-full" htmlFor="password">
        <div className="flex justify-between items-center text-[14px] leading-[20px] text-[#191c1f]">
          <span className="w-auto">Password</span>
          {email && <Link to={"/auth/forgotpassword/"+ email} className="text-blue-600">
            Forgot Password
          </Link>}
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
        type="button"
      >
        <FcGoogle className="h-[20px] w-[20px]" />
        <span className="flex-grow text-center">Login with Google</span>
      </button>
    </form>
  );
};

export default SignIn;