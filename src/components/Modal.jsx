// components/Modal.js

import React, { useEffect, useState } from "react";
import Button from "./Forms/Button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Modal = ({ tranferDetails, accounts, shortenKey, setOpen }) => {
  const [gas, setGas] = useState();

  const [account, setAccount] = useState();
  const [amount, setAmount] = useState();
  const [to, setTo] = useState();
  const [isGasLoading, setIsGasLoading] = useState(false);
  const [isTransaction, setIsTransaction] = useState(false);
  const [privateKey, setPrivateKey] = useState();

  const transferData = {
    account,
    amount,
    to,
    privateKey
  };

  const estimateGas = async () => {
    setIsGasLoading(true);

    const response = await fetch("http://localhost:3000/api/estimate-gas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: transferData }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setIsGasLoading(false);
      if (data?.status) {
        setGas(data?.data?.estimatedCostInEth);
      } else {
        toast.error("An error occur please try again");
      }
    } else {
      setIsGasLoading(false);
      const errorData = await response.json().catch(() => null);
      console.log(errorData);
      if (errorData?.message?.toLowerCase().includes("insufficient funds")) {
        toast.error("You have insufficient funds to cover this transaction.");
      } else {
        toast.error(errorData?.message || "Failed to estimate gas.");
      }
    }
  };

  const sendTransaction = async () => {
    setIsTransaction(true);
    const response = await fetch("http://localhost:3000/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: transferData }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setIsTransaction(false);
      if (data?.status) {
        toast.success(
          "Transaction successfully, redirecting to etherscan testnaet"
        );
        setTimeout(() => {
          window.location.href = `https://${process.env.NEXT_PUBLIC_NETWORK}.etherscan.io/tx/${data.hash}`;
        }, 2000);
      } else {
        toast.error("An error occur please try again");
      }
    } else {
      setIsTransaction(false);
      const errorData = await response.json().catch(() => null);
      console.log(errorData);
      if (errorData?.message?.toLowerCase().includes("insufficient funds")) {
        toast.error("You have insufficient funds to cover this transaction.");
      } else {
        toast.error(errorData?.message || "Failed to estimate gas.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Transfer ETH</h2>
          <button className="text-white" onClick={() => setOpen(false)}>
            x
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Select Account</h3>
          <div className="space-y-2">
            <select
              name="account"
              className="py-5 px-3 mt-2 outline-none border-2 border-[#fff] bg-transparent text-white rounded-md w-full"
              onChange={(e) => {
                const selectedAddress = e.target.value;
                const selectedAccount = accounts.find(acc => acc.data.address === selectedAddress);
                
                setAccount(selectedAddress);
                setPrivateKey(selectedAccount ? selectedAccount.data.privateKey : ""); 
              }}
            >
              <option value="" className="bg-gray-800">
                Select account
              </option>
              {accounts.map((account, index) => (
                <option
                  key={index}
                  value={account.data.address}
                  className="bg-gray-800"
                >
                  {shortenKey(account.data.address)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              name="to"
              placeholder="Enter recipient address"
              onChange={(e) => setTo(e.target.value)}
              className="py-5 px-3 outline-none border-2 border-[#fff] bg-transparent text-white rounded-md w-full"
            />
            <input
              type="text"
              name="amount"
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
              className="py-5 px-3 outline-none border-2 border-[#fff] bg-transparent text-white rounded-md w-full"
            />
            <p className="text-sm text-white">
              {isGasLoading ? "getting gas estimate" : ""}
            </p>
          </div>
          {gas && <p className="my-2 text-white">Estimated Gas: {gas} ETH</p>}
        </div>

        <div className="flex justify-between items-center">
          <Button label="Cancel" size="lg" onClick={() => setOpen(false)} />
          {gas ? (
            <>
              {isTransaction ? (
                <Loader2 color="white" className="animate-spin" />
              ) : (
                <Button label="Proceed" size="lg" onClick={sendTransaction} />
              )}
            </>
          ) : (
            <>
              {isGasLoading ? (
                <Loader2 color="white" className="animate-spin" />
              ) : (
                <Button label="Get Estimate" size="lg" onClick={estimateGas} />
              )}
            </>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
