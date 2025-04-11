import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../css/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../src/context/WallletContext'; 

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: 'getCounter',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'incrementCounter',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const contractAddress = '0xA349C2568E528Edd1645509B6eb2E122D6727F31';

const Dashboard = () => {
  const {
    walletAddress,
    networkName,
    isConnected,
    connectWallet,
    disconnectWallet
  } = useWallet(); 
  const navigate = useNavigate();

  const [counterValue, setCounterValue] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch counter value from the smart contract
  const fetchCounterValue = async () => {
    if (!isConnected || !window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const value = await contract.getCounter();
      setCounterValue(value.toString());
    } catch (err) {
      console.error('Error fetching counter value', err);
    }
  };

  // Increment counter on the smart contract
  const incrementCounter = async () => {
    if (!isConnected || !window.ethereum) return;

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.incrementCounter(); // MetaMask popup
      await tx.wait(); // Wait for transaction

      await fetchCounterValue();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error incrementing counter', err);
    }
  };

  // On component mount: fetch counter if connected
  useEffect(() => {
    if (isConnected) {
      fetchCounterValue();
    }
  }, [isConnected]);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    disconnectWallet();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>🦊 Web3 Dashboard</h2>
          <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {isConnected && (
              <div className="network-badge">
                {networkName}
                
              </div>
            )}
            <button className="button button-logout" onClick={handleLogout} style={{ marginLeft: '20px' }}>
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
                <button className="button button-disconnect" onClick={disconnectWallet}>
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
                    <button className="button button-fetch" onClick={fetchCounterValue} disabled={loading}>
                      {loading ? 'Fetching...' : 'Fetch Counter'}
                    </button>
                    <button className="button button-increment" onClick={incrementCounter} disabled={loading}>
                      {loading ? 'Incrementing...' : 'Increment Counter'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="connect-wallet">
              <button className="button button-connect" onClick={connectWallet}>
                Connect Wallet
              </button>
              <p className="connect-message">
                Please connect your MetaMask wallet to interact with the dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
