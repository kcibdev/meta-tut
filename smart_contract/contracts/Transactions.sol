// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address to, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStructure {
        address from;
        address to;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStructure[] transactions;

    function sendToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStructure(msg.sender, reciever, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    }

    function getTransactions() public view returns (TransferStructure[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}