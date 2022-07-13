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

  console.log({ provider, signer, transactionContract });
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect to metamask wallet");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No etherum wallet found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask wallet extension");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No etherum wallet found");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
      {children}
    </TransactionContext.Provider>
  );
};
