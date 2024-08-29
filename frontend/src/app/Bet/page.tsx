"use client";

import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import "./styles.css";

interface MarketData {
  marketId: string;
  outcomes: string; // Adjust to string if GraphQL returns it as a string
  question: string;
  imageUri: string;
}

const Bet: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [data, setData] = useState<MarketData[]>([]);
  const [tokenId, setTokenId] = useState<string>('1'); 
  const [customData, setcustomData] = useState<MarketData[]>([]);

  console.log(tokenId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGraphQLData('1');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("useeffetc");
    const fetchData = async () => {
      try {
        const result = await fetchGraphQLData(tokenId);
        setcustomData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [tokenId] );

  const fetchGraphQLData = async (marketId: string): Promise<MarketData[]> => {
    const query = `
      query MyQuery($marketId: String!) {
        marketCreateds(where: { marketId: $marketId }) {
          marketId
          outcomes
          question
          imageUri
        }
      }
    `;

    const url = 'https://api.goldsky.com/api/public/project_clzhsxd1aulmx01zzbhjb8f9y/subgraphs/friendtech-arbitrum-sepolia/1.0/gn';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { marketId } })
      });
      const result = await response.json();
      return result.data.marketCreateds || [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = { marketId: tokenId };
  
    try {
      const response = await axios.post('http://localhost:8000/generatePrediction', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResponse(`Success: ${response.data}`);
    } catch (error) {
      setResponse(`Error: ${error}`);
    }
  };

  return (
    <section className='donation1'>
      <div className='donationContainer1'>
        <div>
          <h1>Original Prediction Snap</h1>
          <div className="donationContainer">
            <div className="content">
              {data.map(market => {
                // Split outcomes if it's a string
                const outcomes: string[] = market.outcomes ? market.outcomes.split(',') : [];
                return (
                  <div key={market.marketId}>
                    <img src={`${market.imageUri}?raw=true`} alt="Market" />
                    <input type="text" value={market.question} readOnly />
                    <input placeholder="Amount" type="text" id={`input${market.marketId}`} />
                    <div className="">
                      {outcomes.map((outcome, index) => (
                        <div key={index}>
                          <button type="button" className="outcomeButton">{outcome}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

              
        <div className='Customize'>
          <h1>Customize Your Prediction Snap</h1>
          <div className="donationContainer">
            <div className="content">
              {customData.map(market => {
                // Split outcomes if it's a string
                const outcomes: string[] = market.outcomes ? market.outcomes.split(',') : [];
                return (
                  <div key={market.marketId}>
                    <img src={`${market.imageUri}?raw=true`} alt="Market" />
                    <input type="text" value={market.question} readOnly />
                    <input placeholder="Amount" type="text" id={`input${market.marketId}`} />
                    <div className="">
                      {outcomes.map((outcome, index) => (
                        <div key={index}>
                          <button type="button" className="outcomeButton">{outcome}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
    
        </div>



        <div className='Customize'>
          <form onSubmit={handleSubmit}>            
            <div>
              <label>Market ID:</label>
              <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} /> {/* New input for Token ID */}
            </div>

            <button type="submit">Save Snap</button>
          </form>
        </div>
    
      </div>

      {response && <div className='response'>{response}</div>}
    </section>
  );
}

export default Bet;
