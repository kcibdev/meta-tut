import { ethers } from "ethers";

const { ethereum } = window;
import { contractABI, contactAddress } from "../utils/constants";

export const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contactAddress,
    contractABI,
    signer
  );

  return transactionContract;
};
