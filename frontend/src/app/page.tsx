"use client"
import React, { useState } from "react";
import "./styles.css"
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "",
            content: (
                <>
                    <p><strong>Name:</strong> MX</p>
                    <p><strong>Date:</strong> 30.Aug 2024</p>
                    <p><strong>Goal: </strong>Snap for X, Facebook, web2</p>
                </>
            ),
        },
        {
            title: "Farcaster is Cool",
            content: (
                <>
                    <h2></h2>
                    <p><strong></strong>  </p>
                </>
            ),
        },
        {
            title: "Solana Blink is Cool",
            content: (
                <>
                </> 
            ),
        },

        {
          title: "How about SNAP",
          content: (
              <>
              </> 
          ),
        },

        {
            title: "Use Cases",
            content: (
                <>
                    <p><strong></strong>1. On Boarding web2 users to web3</p>
                    <p><strong></strong>2. Refferal bonus</p>
                    <p><strong></strong>3. Mass audience reach X</p>
                </>
            ),
        },

        
        {
            title: "Technical Architecture",
            content: (
                <>
                    <pre>
        {`
        +--------------------+        +----------------------+          +------------------------+          +-------------------------+
        |   Frontend (UI)    |        |      Express.js      |          |      IPFS Gateway      |          |    Ethereum Network     |
        |  - Web3 Frontend   | <----> |   - Receives SNAP    | <------> |   - Publish HTML/JS    | <------> |   - Smart Contracts     |
        |  - Build SNAP      |        |   - GraphQL Client   |          |   - Return CID         |          |   - Handle Transactions |
        |                    |        |   - IPFS Publisher   |          |                        |          |   - Cross-Chain wormhole|
        +--------------------+        +----------------------+          +------------------------+          +-------------------------+

        
            +--------------------+        
           |   Chrome           |       
     |  - Plugin          | 
                 |                    |             
     +--------------------+ 
             
   
         
        `}
                    </pre>
                </>
            ),
        }
        
        
        ,


        {
            title: "",
            content: (
                <>
                <h2>Shoutout to the Emphi team, winners at ETH Global Brussels, who came up with the plugin idea!</h2>
                <div  className="ephi" style={{ marginTop: "20px" }}>
                    <Image 
                        src="/ephi.jpg" 
                        alt="Emphi team at ETH Global Brussels" 
                        width={300} 
                        height={450} 
                    />
                </div>
            </>
            ),
        }
        ,
        
        
  
        {
            title: "Thank You",
            content: (
                <>
                    <h2></h2>
                </>
            ),
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };
  return (
    <>
    <header className="header">
            <div className="header__container">
                <div className="slider">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? "active" : ""}`}
                        >
                            <h3>{slide.title}</h3>
                            <div>{slide.content}</div>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </header>
    </>
  );
}
