// components/Modal.js

import React from "react";
import Button from "./Forms/Button";
import { Copy } from "lucide-react";

const Modal = ({  closeModal, transactionDetails, accounts, selectAccount }) => {

  const handleSelectAccount = (account) => {
    selectAccount(account);
    closeModal(); // Close the modal after selecting account
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Transaction Details</h2>
          <button className="text-white" onClick={closeModal}>
            ×
          </button>
        </div>

        <div className="text-white mb-4">
          <p><strong>To:</strong> {transactionDetails?.to}</p>
          <p><strong>Amount:</strong> {transactionDetails?.amount} ETH</p>
          <p><strong>Gas Limit:</strong> {transactionDetails?.gasLimit}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Select Account</h3>
          <div className="space-y-2">
            {accounts.map((account, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
                onClick={() => handleSelectAccount(account)}
              >
                <div className="flex flex-col">
                  <p className="text-white">Account {index + 1}</p>
                  <p className="text-sm text-gray-300">{account.data.address}</p>
                </div>
                <Copy
                  className="cursor-pointer text-gray-400"
                  onClick={() => navigator.clipboard.writeText(account.data.address)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button label="Cancel" size="lg" onClick={closeModal} />
          <Button label="Sign Transaction" size="lg" onClick={() => alert("Sign Transaction Logic Here")} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
