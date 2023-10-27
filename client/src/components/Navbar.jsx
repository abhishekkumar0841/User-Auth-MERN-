import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutThunk } from "../Redux/authSlice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <div className=" min-h-[5vh] bg-blue-950 w-full text-white text-center flex items-center justify-between px-10">
      <div className=" font-semibold text-xl">
        <Link to={"/"}>Home</Link>
      </div>
      <div className=" space-x-8 flex items-center justify-center font-semibold text-xl">
        {isLoggedIn ? (
          <Link onClick={() => dispatch(logoutThunk())} to={"/"}>
            Logout
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
        {isLoggedIn ? (
          <Link to={"/profile"}>
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.fullName}`}
              alt="User Pic"
              width={30}
            />
          </Link>
        ) : (
          <Link to={"/signup"}>Signup</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
