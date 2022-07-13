import React from "react";
import MetaMask from "../img/metamask.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex px-4 py-2 shadow-md rounded cursor-pointer hover:bg-[#eee] transition ease-in-out delay-150 duration-100">
        <img src={MetaMask} className="w-[40px] mr-2" alt="Login" />{" "}
        <p className="text-2xl font-semibold">Continue with metamask</p>
      </div>
    </div>
  );
};

export default Login;
