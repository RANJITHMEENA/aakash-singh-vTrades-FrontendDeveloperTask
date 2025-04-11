// src/context/WalletContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('walletAddress') || '');
  const [networkName, setNetworkName] = useState(localStorage.getItem('networkName') || '');
  const [isConnected, setIsConnected] = useState(!!walletAddress);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const network = await provider.getNetwork();

        setWalletAddress(accounts[0]);
        setNetworkName(network.name);
        setIsConnected(true);
        localStorage.setItem('walletAddress', accounts[0]);
        localStorage.setItem('networkName', network.name);


        // Listeners
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) disconnectWallet();
          else setWalletAddress(accounts[0]);
        });

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setNetworkName('');
    setIsConnected(false);
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        networkName,
        isConnected,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
