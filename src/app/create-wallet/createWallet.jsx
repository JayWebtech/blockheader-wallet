"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Button from "../../components/Forms/Button";
import { useRouter } from "next/navigation";

function CreateWallet({ data }) {

  const router = useRouter();

  const copyPhrase = () => {
    navigator.clipboard.writeText(data?.phrase).then(() => {
      toast.success("Seed phrase copied successfully");
    });
  };

  const handleProceed = () => {
    sessionStorage.setItem("mnemonicPhrase", data?.phrase);
    router.push("/account");
  };

  return (
    <div className="h-screen grid-background flex flex-col justify-center items-center bg-gray-900">
      <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-primary">Mnemonic Phrase</h2>
          <p className="text-gray-300 mt-2">
            Please keep this confidential, do not share it with anyone.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-2 border-[#333] backdrop-blur-md p-6 rounded-lg shadow-lg mt-10">
            {data?.phrase?.split(" ").map((word, index) => (
              <div key={index} className="p-3 bg-white rounded-md text-center">
                <p className="text-lg font-semibold">{word}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-5 mt-5">
            <Button label="Copy Phrase" size="lg" onClick={copyPhrase} />
            <Button label="Proceed" size="lg" onClick={handleProceed} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
