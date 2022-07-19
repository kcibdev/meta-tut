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
  // checkIfWalletConnected: async () => {
  //   // check if connectStore is in localstorage
  //   const connectedAccount = localStorage.getItem("connectStore");
  //   if (connectedAccount) {

  //   }
  // },
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
});

const useConnectStore = create(
  devtools(
    persist(connectStore, {
      name: "connectStore",
    })
  )
);

export default useConnectStore;
