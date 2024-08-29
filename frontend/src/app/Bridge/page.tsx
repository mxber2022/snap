"use client"

import React, { useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed for API requests
import "./styles.css"

function Bridge() {
  const [imageUrl, setImageUrl] = useState('https://sapphire-following-turkey-778.mypinata.cloud/ipfs/QmbMiZ218aAZXLgtyxgP51kP1NZCsqg8rWj5MGwt47L8oS');
  const [response, setResponse] = useState('');

  // Common styles
  const commonStyles = `
    .donationContainer {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
      padding: 15px;
      border: 1px solid #e1e8ed;
      border-radius: 10px;
      background-color: #f5f8fa;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .content {
      background-color: #f7f9fa;
      border-radius: 12px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 5px;
      width: 100%;
      max-width: 320px;
    }

    .donationContainer img {
      width: 100%;
      max-width: 600px;
      height: auto;
      object-fit: cover;
      border-radius: 15px;
      margin-bottom: -5px;
    }
    
    .donationContainer label {
      display: block;
      margin-bottom: 3px;
      font-weight: bold;
      color: #14171a;
      font-size: 14px;
    }
    .donationContainer select,
    .donationContainer input {
      width: 100%;
      padding: 7px;
      margin-bottom: 8px;
      border: 1px solid #ccd6dd;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .donationContainer button {
      width: 100%;
      padding: 8px;
      background-color: #1da1f2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    .donationContainer button:hover {
      background-color: #0d8ddb;
    }
  `;

  // Handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      imageUrl
    };

    try {
      const response = await axios.post('http://localhost:8000/generateBridge', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      setResponse(`Success: ${response.data}`);
    } catch (error) {
      setResponse(`Error: ${error}`);
    }
  };

  // Original iframe content with styles
  const originalIframe = (
    <div>
      <style>{commonStyles}</style>
      <div className="donationContainer">
        <div className="content">
          <img src="https://sapphire-following-turkey-778.mypinata.cloud/ipfs/QmbMiZ218aAZXLgtyxgP51kP1NZCsqg8rWj5MGwt47L8oS" alt="Background Image" />
          <label htmlFor="fromNetwork">From Network:</label>
          <select id="fromNetwork">
            <option value="1">Optimism Sepolia</option>
            <option value="3">Ropsten Testnet</option>
            <option value="4">Rinkeby Testnet</option>
            <option value="5">Goerli Testnet</option>
          </select>

          <label htmlFor="toNetwork">To Network:</label>
          <select id="toNetwork">
            <option value="sepolia">Ethereum Sepolia</option>
          </select>

          <label htmlFor="Token">Token:</label>
          <select id="token">
            <option value="1">BET</option>
            <option value="3">ETH</option>
            <option value="4">BTC</option>
          </select>

          <input
            placeholder="Amount"
            type="text"
            id="inputOriginal"
          />

          <button id="dugmeOriginal">Send</button>
        </div>
      </div>
    </div>
  );

  // Dynamically updated content with styles
  const updatedIframe = (
    <div>
      <style>{commonStyles}</style>
      <div className="donationContainer">
        <div className="content">
          <img src={imageUrl} alt="Background Image" />
          <label htmlFor="fromNetwork">From Network:</label>
          <select id="fromNetwork">
            <option value="1">Optimism Sepolia</option>
            <option value="3">Ropsten Testnet</option>
            <option value="4">Rinkeby Testnet</option>
            <option value="5">Goerli Testnet</option>
          </select>

          <label htmlFor="toNetwork">To Network:</label>
          <select id="toNetwork">
            <option value="sepolia">Ethereum Sepolia</option>
          </select>

          <label htmlFor="Token">Token:</label>
          <select id="token">
            <option value="1">BET</option>
            <option value="3">ETH</option>
            <option value="4">BTC</option>
          </select>

          <input
            placeholder="Amount"
            type="text"
            id="inputUpdated"
          />

          <button id="dugmeUpdated">Send</button>
        </div>
      </div>
    </div>
  );

  return (
    <section className='donation1'>
      <div className='donationContainer1'>
        <div>
          <h1>Original Bridge Snap</h1>
          {originalIframe}
        </div>

        <div className='Customize'>
          <h1>Customize Your Bridge Snap</h1>
          {updatedIframe}
        </div>

        <div className='Customize'>  
          <form onSubmit={handleSubmit}>
            <div>
              <label>Image URL:</label>
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
              />
            </div>
          
            <button type="submit">Save Snap</button>
          </form>
        </div>      
      </div>
      
      <div className='response'>
          {response && <div>{response}</div>}
      </div>
    </section>
  );
}


export default Bridge;
