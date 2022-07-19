import { ethers } from "ethers";
import { toast } from "react-toastify";

import { getEthereumContract } from "./getEth";
const { ethereum } = window;

export const sendTransaction = async (
  address,
  amount,
  message,
  keyword,
  connectedAccount,
  addTransaction,
  updateWalletBalance
) => {
  console.log("2");
  try {
    if (!ethereum)
      return toast.error("Please install metamask wallet extension");

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
    addTransaction(true);
    console.log("Loading transactionHash", transactionHash);
    await transactionHash.wait();

    const transactionCount = await transactionContract.getTransactionCount();
    console.log("Loading transactionHash - success", transactionHash);

    addTransaction(false, transactionCount.toNumber());

    updateWalletBalance();

    //get transactionCount
    // setTransactionCount(transactionCount.toNumber());
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    addTransaction(false);
    throw new Error("No etherum wallet found");
  }
};
