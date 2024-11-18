import React, { useState, useEffect } from "react";
import "./RandomQuote.css";
import twitter_icon from "../Assets/twitter.png";
import reload_icon from "../Assets/reload.png";

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]); // State to store the quotes
  const [quote, setQuote] = useState({
    quote: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
    category: "art",
  });

  // Load quotes from API when the component mounts
  useEffect(() => {
    async function loadQuotes() {
      const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "yeV9Wi01eQZhLRbhCAOC3g==9xgTfjvsE1aFeHDk",
      });

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/quotes?category",
          requestOptions
        );
        const data = await response.json();
        setQuotes(data); // Update the quotes state
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    }

    loadQuotes();
  }, []); // Empty dependency array ensures it runs only once

  // Select a random quote from the loaded quotes
  const random = () => {
    if (quotes.length > 0) {
      const selected = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(selected);
    }
  };

  // Open Twitter to share the quote
  const twitter = () => {
    window.open(
      `http://twitter.com/intent/tweet?text=${quote.quote} - ${
        quote.author.split(",")[0]
      }`
    );
  };

  // Search for the author's name on Google
  const author = () => {
    window.open(
      `https://www.google.com/search?q=${quote.author.split(",")[0]}`
    );
  };

  return (
    <div className="container">
      <div>
        <div className="quote">" {quote.quote} "</div>
        <div className="category">( {quote.category} )</div>
      </div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div
            className="author"
            onClick={() => {
              author();
            }}
          >
            {quote.author.split(",")[0]}
          </div>
          <div className="icons">
            <img
              src={reload_icon}
              alt=""
              onClick={() => {
                random();
              }}
            />
            <img
              src={twitter_icon}
              alt=""
              onClick={() => {
                twitter();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
