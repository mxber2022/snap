"use client"
import React, { useState } from "react";
import "./styles.css"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "",
            content: (
                <>
                    <p><strong>Name:</strong> MX</p>
                    <p><strong>Date:</strong> 30.Aug 2024</p>
                    <p><strong>Goal: </strong>Snap for X, Facebook</p>
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
            title: "Technical Architecture",
            content: (
                <>
                    <ul>
                        <li><strong>Wormhole:</strong> </li>
                    </ul>
                </>
            ),
        },
  
        {
            title: "Demo",
            content: (
                <>
                    <h2>Demo</h2>
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
