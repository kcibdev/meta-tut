import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TransactionContext } from "../context/TransactionContext";
import TransactionCard from "../components/TransactionCard";

const Transactions = () => {
  const { connectWallet, connectedAccount, transactions } =
    useContext(TransactionContext);
  //   const {
  //   connectWallet,
  //   connectedAccount,
  //   connectedAccountBalance,
  //   sendTransaction,
  //   isLoading,
  // } = useConnectStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectedAccount) {
      navigate("/login");
    }
  }, [connectedAccount]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-md rounded-sm max-w-[450px] w-full">
        <h1 className="text-2xl font-bold py-3 text-center">Transactions</h1>
        <div className="flex-flex-col">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.timestamp}
              transaction={transaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
