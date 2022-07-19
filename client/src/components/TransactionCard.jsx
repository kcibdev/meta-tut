import React from "react";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionCard = ({ transaction }) => {
  return (
    <div className="flex border-b w-full p-3 border-gray-200">
      <img
        src="https://media.giphy.com/media/XaLnoepP2IwFnUXdvb/giphy-downsized-large.gif"
        alt=""
        className="w-[30%] h-[160px] min-w-fit object-cover rounded"
      />
      <div className="flex-2 w-[70%] pl-4">
        <p className="text-base mb-2">
          <span className="text-gray-500 mr-2">From:</span>
          <span className="text-gray-700 font-semibold">
            {shortenAddress(transaction.sender)}
          </span>
        </p>
        <p className="text-base mb-2">
          <span className="text-gray-500 mr-2">To:</span>
          <span className="text-gray-700 font-semibold">
            {shortenAddress(transaction.receiver)}
          </span>
        </p>
        <p className="text-base mb-3">
          <span className="text-gray-500 mr-2">Amount:</span>
          <span className="text-gray-700 font-semibold">
            {transaction.amount} ETH
          </span>
        </p>
        <p className="text-sm">
          <span className="text-gray-500 mr-2">Message:</span>
          <span className="text-gray-700 font-semibold">
            {transaction.message}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
