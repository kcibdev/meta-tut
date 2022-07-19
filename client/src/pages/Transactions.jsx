import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import TransactionCard from "../components/TransactionCard";
import useConnectStore from "../store/useConnectStore";

const Transactions = () => {
  const { connectedAccount, isLoading, transactions, getAllTransactions } =
    useConnectStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectedAccount) {
      navigate("/login");
    }
  }, [connectedAccount]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-md rounded-sm max-w-[470px] w-full">
        <h1 className="text-2xl font-bold py-3 text-center">
          Transactions{" "}
          <Link to="/">
            <span className="text-sm text-gray-400 text-right ml-6 cursor-pointer">
              Go Back
            </span>
          </Link>
        </h1>
        <div className="flex-flex-col">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.timestamp}
              transaction={transaction}
              connectedAccount={connectedAccount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
