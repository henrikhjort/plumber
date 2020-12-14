import React, { useState, useEffect } from "react";
import _ from "lodash";
import Card from "./components/Card/Card";
import passions from "./data/passions";
import names from "./data/names";
import jobs from "./data/jobs";
import employers from "./data/employers";
import cities from "./data/cities";
import "./App.css";

const App = () => {
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardIsMoving, setCardIsMoving] = useState(false);
  const [startX, setStartX] = useState(null);

  useEffect(() => {
    const run = async () => {
      if (cards.length === 0) {
        const newCards = [];
        for (let index of Array.from(Array(5).keys())) {
          const newCard = await createRandomCard();
          newCards.push(newCard);
        }
        setCards(newCards);
        setCard(newCards[0]);
      }
    };
    run();
  }, [cards]);

  const handleMoveStart = (event) => {
    event.target.className = event.target.className + " moving";
    setStartX(event.clientX);
    setCardIsMoving(true);
  };

  const handleMove = (event) => {};

  const handleMoveEnd = (event) => {
    event.target.classList.remove("moving");
    const deltaX = startX - event.clientX;
    setCardIsMoving(false);
    if (deltaX < -250) {
      handleSwipe(true);
      return;
    }
    if (deltaX > 250) {
      handleSwipe(false);
      return;
    }
  };

  const createRandomCard = async (index) => {
    // Images are named 1.png, 2.png ... 1000.png.
    const imgId = Math.floor(Math.random() * 1000) + 1;
    const imgTint = Math.floor(Math.random() * 360) + 1;
    const numberOfPassions = getRandomFromList([2, 3, 4, 5]);
    const job = Math.random() > 0.15 ? getRandomFromList(jobs) : "";
    const newCard = {
      imgId: imgId,
      tint: imgTint,
      contrast: (Math.random() * (1.0 - 4.0) + 4.0).toFixed(3),
      name: getRandomFromList(names),
      age: Math.floor(Math.random() * (33 - 18 + 1) + 18),
      passions: getNRandomFromList(numberOfPassions, passions),
      job: job,
      employer: getRandomFromList(employers),
      city: getRandomFromList(cities),
    };
    return newCard;
  };

  const getRandomFromList = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const getNRandomFromList = (n, list) => {
    let result = new Array(n),
      len = list.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError(
        "getNRandomFromList: more elements taken than available"
      );
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = list[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  const handleSwipe = async (swipeRight) => {
    let body = document.getElementById("body");
    if (swipeRight) {
    } else {
    }
    const newList = cards.slice(1);
    const newCard = await createRandomCard();
    newList.push(newCard);
    setCard(newList[0]);
    setCards(newList);
  };

  return (
    <div className="app">
      <div className="cards">
        {cards.length > 0 &&
          cards.map((c, index) => {
            return (
              <Card
                key={index}
                card={c}
                z={cards.length - index + 1}
                inactive={c !== card}
                onMoveStart={handleMoveStart}
                onMove={handleMove}
                onMoveEnd={handleMoveEnd}
              />
            );
          })}
        <div className="buttons">
          <div
            id="nope"
            className="button nope"
            onClick={() => handleSwipe(false)}
          >
            <h2 className="nopeX">X</h2>
          </div>
          <div
            id="love"
            className="button love"
            onClick={() => handleSwipe(true)}
          >
            <div className="heart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
