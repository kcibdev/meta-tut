import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

import { TransactionContext } from "../context/TransactionContext";
import EthIcon from "../img/eth.svg";

const Home = () => {
  const { connectWallet, connectedAccount } = useContext(TransactionContext);
  const [transactionData, setTransactionData] = useState({
    address: "",
    amount: "",
    message: "",
    keyword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTransactionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!connectedAccount) {
      navigate("/login");
    }
  }, [connectedAccount]);

  const sendTransaction = () => {
    //validate all transactionData fields
    if (
      transactionData.address.length === 0 ||
      transactionData.amount.length === 0 ||
      transactionData.message.length === 0
    ) {
      alert("Please fill in all fields");
      return;
    }
  };

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
            <Link to="/transactions">
              <div className="flex items-center">
                <p className="text-sm mr-2 text-white ">See Transactions</p>{" "}
                <BiRightArrowAlt className="text-white text-lg cursor-pointer" />
              </div>
            </Link>
          </div>
          <p className="text-white text-sm">{connectedAccount}</p>
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
              value={transactionData.address}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="wallet-amount">
            <input
              type="number"
              placeholder="Amount (ETH)"
              id="wallet-amount"
              className="p-3 rounded outline-none w-full mb-3"
              value={transactionData.amount}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="wallet-keyword">
            <input
              type="text"
              placeholder="Keyword (GIF)"
              id="wallet-keyword"
              className="p-3 rounded outline-none w-full mb-3"
              value={transactionData.keyword}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="wallet-message">
            <input
              type="text"
              placeholder="Message..."
              id="wallet-message"
              className="p-3 rounded outline-none w-full mb-3"
              value={transactionData.message}
              onChange={handleChange}
            />
          </label>
          <button className="py-3 mb-3 bg-[#192a56] text-white rounded-md w-full text-center font-semibold hover:bg-[#273c75]">
            Send
          </button>
          {/* <Link to="/transactions">
            <button className="py-3 border transition ease-in-out delay-150 duration-300 border-[#192a56] text-[#192a56] rounded-md w-full text-center font-semibold  hover:scale-95">
              See Transactions
            </button>
          </Link> */}
        </form>
      </div>
    </div>
  );
};

export default Home;
