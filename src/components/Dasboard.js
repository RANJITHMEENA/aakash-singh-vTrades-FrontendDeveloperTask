import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import '../css/dashboard.css';
import { useNavigate } from 'react-router-dom';

const contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getCounter",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "incrementCounter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0xYourContractAddress";

const Dashboard = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [counterValue, setCounterValue] = useState(null);
  const [loading, setLoading] = useState(false);


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        
        setWalletAddress(accounts[0]);
        setNetworkName(network.name);
        setIsConnected(true);

        // Listen for wallet account change
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length === 0) {
            disconnectWallet();
          } else {
            setWalletAddress(accounts[0]);
          }
        });

        // Listen for network change
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        // Fetch counter value from contract after connection
        await fetchCounterValue();

      } catch (err) {
        console.error("User rejected wallet connection", err);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress('');
    setNetworkName('');
    setIsConnected(false);
    setCounterValue(null);
  };

  // Fetch counter value from the smart contract
  const fetchCounterValue = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Call the getCounter function
        const value = await contract.getCounter();
        setCounterValue(value.toString()); // Assuming it's a number
      } catch (err) {
        console.error("Error fetching counter value", err);
      }
    }
  };

  // Increment counter on the smart contract
  const incrementCounter = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the incrementCounter function
        const tx = await contract.incrementCounter();
        await tx.wait(); // Wait for the transaction to be mined

        // After transaction, fetch updated counter value
        await fetchCounterValue();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error incrementing counter", err);
      }
    }
  };

  // Add logout function
  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Disconnect wallet if connected
    if (isConnected) {
      disconnectWallet();
    }
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>🦊 Web3 Dashboard</h2>
          <div className="header-actions" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            {isConnected && (
              <div className="network-badge">
                {networkName}
              </div>
            )}
            <button 
              className="button button-logout" 
              style={{marginLeft: '1rem'}}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="wallet-section">
          {isConnected ? (
            <>
              <div className="wallet-info">
                <div className="info-item">
                  <label>Wallet Address:</label>
                  <span className="address">{walletAddress}</span>
                </div>
                <button 
                  className="button button-disconnect" 
                  onClick={disconnectWallet}
                >
                  Disconnect
                </button>
              </div>

              <div className="contract-section">
                <h3>Smart Contract Interaction</h3>
                <div className="counter-display">
                  <div className="counter-value">
                    <label>Counter Value:</label>
                    <span className="value">
                      {counterValue !== null ? counterValue : 'Loading...'}
                    </span>
                  </div>
                  <div className="counter-actions">
                    <button 
                      className="button button-fetch" 
                      onClick={fetchCounterValue} 
                      disabled={loading}
                    >
                      {loading ? 'Fetching...' : 'Fetch Counter'}
                    </button>
                    <button 
                      className="button button-increment" 
                      onClick={incrementCounter} 
                      disabled={loading}
                    >
                      {loading ? 'Incrementing...' : 'Increment Counter'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="connect-wallet">
              <button 
                className="button button-connect" 
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
              <p className="connect-message">
                Please connect your MetaMask wallet to interact with the dashboard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
