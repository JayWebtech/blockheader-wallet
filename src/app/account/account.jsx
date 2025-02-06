"use client";
import React, { useEffect, useState } from "react";
import Button from "../../components/Forms/Button";
import AccountNav from "../../components/AccountNav";
import toast from "react-hot-toast";
import { Copy } from "lucide-react"; 
import Modal from "../../components/Modal";

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const savedAccounts = sessionStorage.getItem("accounts");
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  }, []);

  const createAccount = async () => {
    const mnemonicPhrase = sessionStorage.getItem("mnemonicPhrase");

    if (!mnemonicPhrase) {
      toast.error("Mnemonic phrase is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: mnemonicPhrase }),
      });

      if (response.ok) {
        const data = await response.json();

        const updatedAccounts = [...accounts, data];
        sessionStorage.setItem("accounts", JSON.stringify(updatedAccounts));
        setAccounts(updatedAccounts);
        toast.success("Account created successfully!");
      } else {
        toast.error("Failed to create account.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const shortenKey = (key) => {
    return `${key.slice(0, 4)}****${key.slice(-4)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const sendTransaction = async () => {
    const response = await fetch("http://localhost:3000/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: "mnemonicPhrase" }),
      });

  }

  return (
    <div className="h-screen grid-background bg-gray-900">
      {isOpen && <Modal accounts={accounts} />}
      <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
        <AccountNav setOpen={setOpen} createAccount={createAccount} />

        <div className="flex flex-col justify-center my-[5em]">
          <h2 className="text-4xl font-bold text-primary">Your Account</h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 bg-gray-800 p-4 rounded-md"
                >
                  <p className="text-white text-lg font-semibold">
                    Account {index + 1}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-white">
                      Address: {shortenKey(account.data.address)}
                    </p>
                    <Copy
                      size={14}
                      className="cursor-pointer text-sm text-gray-400"
                      onClick={() => copyToClipboard(account.data.address)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-white">
                      Private Key: {shortenKey(account.data.privateKey)}
                    </p>
                    <Copy
                      size={14}
                      className="cursor-pointer text-sm text-gray-400"
                      onClick={() => copyToClipboard(account.data.privateKey)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No accounts found.</p>
            )}
          </div>

          <div className="flex gap-5 mt-5">
            <Button label="Create Account" size="lg" onClick={createAccount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
