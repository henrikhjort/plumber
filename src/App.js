import React, { useState, useEffect } from "react";
import _ from "lodash";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import passions from "./data/passions";
import names from "./data/names";
import jobs from "./data/jobs";
import employers from "./data/employers";
import cities from "./data/cities";
import messages from "./data/messages";
import "./App.css";

const App = () => {
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [match, setMatch] = useState(null);

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
    if (swipeRight) {
      checkMatch(card);
    } else {
    }
    const newList = cards.slice(1);
    const newCard = await createRandomCard();
    newList.push(newCard);
    setCard(newList[0]);
    setCards(newList);
  };

  const checkMatch = (card) => {
    const match = Math.random() < 0.10;
    if (match) {
      setMatch(card);
      setModalVisible(true);
    }
  }

  const blurApp = (modalVisible) => {
    return modalVisible ? " app-blur" : "";
  }

  const disablePointerEvents = (modalVisible) => {
    return modalVisible ? " disable-pointer-events" : "";
  }

  const handleModalClose = () => {
    setModalVisible(false);
  }

  return (
    <div className={`app ${blurApp(modalVisible)}`}>
      {modalVisible && <Modal card={match} onClose={handleModalClose} message={getRandomFromList(messages)}/>}
      <div className="cards" id="cards">
        {cards.length > 0 &&
          cards.map((c, index) => {
            return (
              <Card
                key={index}
                card={c}
                z={cards.length - index + 1}
                inactive={(c !== card) || modalVisible}
                handleSwipe={handleSwipe}
              />
            );
          })}
        <div className={`buttons ${disablePointerEvents(modalVisible)}`}>
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
