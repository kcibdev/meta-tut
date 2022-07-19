import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import create from "zustand";

import { contractABI, contactAddress } from "../utils/constants";

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

export const useTransactionStore = create(set => ({
    transactions: [],
    connectedAccount: "",
    connectedAccountBalance: "",
    sendTransactionLoading: false,
    transactionCount: 0,
    connectWallet: () => {
        try {

            if (!ethereum) return alert("Please install metamask wallet extension");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.utils.formatEther(balance);

      set(state => ({
        state.connectedAccount: accounts[0],
        state.connectedAccountBalance: balanceInEth,
      }))
            
        } catch (error) {
            console.log(error);
      throw new Error("No etherum wallet found");
        }
    },
    getAllTransactions: () => {
        try {
            if (!ethereum) return alert("Please connect to metamask wallet");
            const transactionContract = getEthereumContract();
            const transactions = await transactionContract.getTransactions();
            const structuredTransactions = transactions.map((transaction) => ({
              receiver: transaction.to,
              sender: transaction.from,
              amount: parseInt(transaction.amount._hex) / 10 ** 18,
              timestamp: new Date(
                transaction.timestamp.toNumber() * 1000
              ).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
            }));
            setTransactions(structuredTransactions);
            set(state => ({
                state.transactions: structuredTransactions,
              }))
          } catch (error) {
            console.log(error);
          }
    },
    checkIfWalletConnected: () => {
        try {
            if (!ethereum) return alert("Please connect to metamask wallet");
            const provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await ethereum.request({ method: "eth_accounts" });
            //get ethereum balnace from connectedAccount address
      
            if (accounts.length) {
              const balance = await provider.getBalance(accounts[0]);
              const balanceInEth = ethers.utils.formatEther(balance);
              set(state => ({
                state.connectedAccount: accounts[0],
                state.connectedAccountBalance: balanceInEth,
              }))
              getAllTransactions();
            } else {
              console.log("No accounts found");
            }
          } catch (error) {
            console.log(error);
            throw new Error("No etherum wallet found");
          }
    },
    sendTransaction: async (receiver, amount, message, keyword) => {
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
    }
}));