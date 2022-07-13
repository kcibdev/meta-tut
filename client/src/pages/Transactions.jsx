import React from "react";
import TransactionCard from "../components/TransactionCard";

const Transactions = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-md rounded-sm max-w-[450px] w-full">
        <h1 className="text-2xl font-bold py-3 text-center">Transactions</h1>
        <div className="flex-flex-col">
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
