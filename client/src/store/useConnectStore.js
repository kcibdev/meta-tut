import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { getEthereumContract } from "../services/getEth";

const { ethereum } = window;

const counts = localStorage.getItem("transactionCount");

const connectStore = (set) => ({
  connectedAccount: null,
  connectedAccountBalance: null,
  isLoading: false,
  transactionCounts: counts,
  transactions: [],
  getAllTransactions: async () => {
    try {
      if (!ethereum) return toast.error("Please connect to metamask wallet");
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
      set((state) => ({
        transactions: structuredTransactions,
      }));
    } catch (error) {
      throw new Error("No etherum wallet found");
    }
  },
  updateWalletBalance: async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //get ethereum balnace from connectedAccount address
      if (accounts.length) {
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = ethers.utils.formatEther(balance);
        set((state) => ({
          connectedAccountBalance: balanceInEth,
        }));
      }
    } catch (error) {
      throw new Error("No etherum wallet found");
    }
  },
  connectWallet: async () => {
    try {
      if (!ethereum)
        return toast.error("Please install metamask wallet extension");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.utils.formatEther(balance);

      set((state) => ({
        connectedAccount: accounts[0],
        connectedAccountBalance: balanceInEth,
      }));
    } catch (error) {
      toast.error(error.message);
      throw new Error("No etherum wallet found");
    }
  },
  addTransaction: (isLoading, transactionCounts) => {
    set((state) => ({
      isLoading: isLoading,
      transactionCounts: transactionCounts,
    }));
  },
  logoutFromStore: () => {
    localStorage.removeItem("connectStore");
    localStorage.removeItem("transactionCount");
    set((state) => ({
      connectedAccount: "",
      connectedAccountBalance: "",
      isLoading: false,
      transactionCounts: null,
    }));
  },
});

const useConnectStore = create(
  devtools(
    persist(connectStore, {
      name: "connectStore",
    })
  )
);

export default useConnectStore;
