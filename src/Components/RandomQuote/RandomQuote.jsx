import React, { useState } from "react";
import "./RandomQuote.css";
import twitter_icon from "../Assets/twitter.png";
import reload_icon from "../Assets/reload.png";

const RandomQuote = () => {
  let quotes = [];
  const [quote, setQuote] = useState({
    quote: "Difficulties increase the nearer we get to the global.",
    author: "Johann Wolfgang von Goethe",
    category: "art",
  });

  async function loadQuotes() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": "yeV9Wi01eQZhLRbhCAOC3g==9xgTfjvsE1aFeHDk",
    });

    var requestOptions = {
      method: "GET",
      headers: headers,
    };

    const respone = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category",
      requestOptions
    );
    quotes = await respone.json();
  }

  const random = () => {
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(select);
  };

  const twitter = () => {
    window.open(
      `http://twitter.com/intent/tweet?text=${quote.quote} - ${
        quote.author.split(",")[0]
      }`
    );
  };

  const author = () => {
    window.open(
      `https://www.google.com/search?q=${quote.author.split(",")[0]}`
    );
  };

  loadQuotes();

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
