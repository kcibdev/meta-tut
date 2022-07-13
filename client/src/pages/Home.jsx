import React from "react";
import { useNavigate } from "react-router-dom";

import EthIcon from "../img/eth.svg";

const Home = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-md rounded-sm p-6 max-w-[450px] w-full">
        <h1 className="text-2xl font-bold text-center">Send Crypto</h1>
        <p className="text-center">
          Send crypto to anyone, anywhere, at anytime.
        </p>
        <div className="bg-gradient-to-r from-[#eb3b5a] via-[#fa8231] to-pink-500 rounded shadow-md p-3 my-4">
          <div className="flex justify-between mb-8">
            <img src={EthIcon} className="w-[50px]" alt="Eth Icon" />
            <div></div>
          </div>
          <p className="text-white text-sm">AFDRV....HJDG5DG</p>
          <div className="flex justify-between text-2xl font-bold text-white">
            <h3>Ethereum</h3>
            <h3>5.045 (Eth)</h3>
          </div>
        </div>
        <form action="#" className="my-4">
          <label htmlFor="wallet-address">
            <input
              type="text"
              placeholder="Address to..."
              id="wallet-address"
              className="p-3 rounded outline-none w-full mb-3"
            />
          </label>
          <label htmlFor="wallet-amount">
            <input
              type="number"
              placeholder="Amount (ETH)"
              id="wallet-amount"
              className="p-3 rounded outline-none w-full mb-3"
            />
          </label>
          <label htmlFor="wallet-keyword">
            <input
              type="text"
              placeholder="Keyword (GIF)"
              id="wallet-keyword"
              className="p-3 rounded outline-none w-full mb-3"
            />
          </label>
          <label htmlFor="wallet-message">
            <input
              type="text"
              placeholder="Message..."
              id="wallet-message"
              className="p-3 rounded outline-none w-full mb-3"
            />
          </label>
          <button className="py-3 bg-[#192a56] text-white rounded-md w-full text-center font-semibold hover:bg-[#273c75]">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
