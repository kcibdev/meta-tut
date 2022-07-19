import React, { useContext, useEffect } from "react";
import MetaMask from "../img/metamask.svg";
import { Link, useNavigate } from "react-router-dom";

import { TransactionContext } from "../context/TransactionContext";
import useConnectStore from "../store/useConnectStore";

const Login = () => {
  const { connectWallet, connectedAccount, connectedAccountBalance } =
    useConnectStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (connectedAccount || connectedAccountBalance) {
      navigate("/");
    }
  }, [connectedAccount, connectedAccountBalance]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div
        className="flex px-4 py-2 shadow-md rounded cursor-pointer hover:bg-[#eee] transition ease-in-out delay-150 duration-100"
        onClick={connectWallet}
      >
        <img src={MetaMask} className="w-[40px] mr-2" alt="Login" />{" "}
        <p className="text-2xl font-semibold">Continue Wallet</p>
      </div>
    </div>
  );
};

export default Login;
