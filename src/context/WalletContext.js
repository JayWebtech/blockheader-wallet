"use client"
import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [mnemonicPhrase, setMnemonicPhrase] = useState('');

  return (
    <WalletContext.Provider value={{ mnemonicPhrase, setMnemonicPhrase }}>
      {children}
    </WalletContext.Provider>
  );
};
