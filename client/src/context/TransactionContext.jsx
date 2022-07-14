import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contactAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contactAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [connectedAccountBalance, setConnectedAccountBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect to metamask wallet");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //get ethereum balnace from connectedAccount address

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = ethers.utils.formatEther(balance);
        setConnectedAccountBalance(balanceInEth);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No etherum wallet found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask wallet extension");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.utils.formatEther(balance);
      setConnectedAccount(accounts[0]);
      setConnectedAccountBalance(balanceInEth);
    } catch (error) {
      console.log(error);
      throw new Error("No etherum wallet found");
    }
  };

  const sendTransaction = async (address, amount, message, keyword) => {
    try {
      if (!ethereum) return alert("Please install metamask wallet extension");

      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: address,
            value: parsedAmount._hex,
            gas: "0x5208", //2100 Gwei = 0.000121 ETH
            // gasPrice: '0x3b9aca00', //1 Gwei = 0.00001 ETH
          },
        ],
      });

      const transactionHash = await transactionContract.sendToBlockchain(
        address,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log("Loading transactionHash", transactionHash);
      await transactionHash.wait();
      setIsLoading(false);
      console.log("Loading transactionHash - success", transactionHash);

      //get transactionCount
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No etherum wallet found");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        connectedAccountBalance,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
