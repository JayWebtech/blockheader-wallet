"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default CreateWallet =({props}) => {

console.log(props)

    const copyPhrase = () => {
        navigator.clipboard.writeText(mnemonic.join(" ")).then(() => {
            toast.success({
            message: "Seed phrase copied successfully",
          });
        });
      };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
      <h2 className="text-4xl font-bold">Mnemonic Phrase</h2>
      <p className="text-gray-300 mt-2">
        Please keep this confidential, do not share it with anyone.
      </p>

      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-2 border-gray-700 backdrop-blur-md p-6 rounded-lg shadow-lg mt-10 bg-gray-800">
        {mnemonic.map((word, index) => (
          <div key={index} className="p-3 bg-white rounded-md text-center">
            <p className="text-lg font-semibold">{word}</p>
          </div>
        ))}
      </div> */}

      <div className="flex gap-5 mt-5">
        <button
          className="bg-blue-500 text-white rounded-md py-3 px-10 cursor-pointer hover:bg-blue-600"
          onClick={copyPhrase}
        >
          Copy Phrase
        </button>
        <Link href="/dashboard">
          <button className="bg-green-500 text-white rounded-md py-3 px-10 cursor-pointer hover:bg-green-600">
            Create Account
          </button>
        </Link>
      </div>
    </div>
  )
}