import React, { useState } from "react";
import jobIcon from "../../assets/icons/card_job.png";
import "./styles.css";

const Card = ({ card, z, inactive, handleSwipe }) => {
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  const getTopOffset = (z) => {
    return z * 15;
  };

  const getWidth = (z) => {
    const step = 25;
    return 400 - (5 - z) * step;
  };

  const setInactiveClass = (inactive) => {
    return inactive ? " card--inactive" : " card--active";
  };

  const handleMoveStart = (event) => {
    // Hide card.
    //event.target.className = event.target.className + " moving";

    // Create clone of top card.
    let movingCardElement = document.getElementsByClassName("card")[0];
    let clone = document.createElement("div");
    clone.innerHTML = movingCardElement.innerHTML;
    clone.style.cssText = document.defaultView.getComputedStyle(movingCardElement, "").cssText;
    clone.id = "clone";
    clone.style.visibility = "hidden";

    // Set drag event starting point.
    setStartX(event.clientX);
    setStartY(event.clientY);

    // Add hidden clone to dom.
    document.getElementById("cards").appendChild(clone);
    //event.target.style.visibility = "hidden";
  };

  const handleMove = (event) => {
    event.target.style.visibility = "hidden";
    let clone = document.getElementById("clone");
    let rectangle = event.target.getBoundingClientRect();
    // Dirty math.
    // Dx.
    const offsetX = rectangle.left;
    const w = event.target.offsetWidth;
    const a = (offsetX + w) - startX;
    const dx = w - a;

    // Dy.
    const offsetY = rectangle.top;
    const h = event.target.offsetHeight;
    const b = (offsetY + h) - startY;
    const dy = h - b;

    clone.style.visibility = "visible";
    clone.style.position = "fixed";
    clone.style.opacity = 1;
    if (event.clientX > 0) {
      clone.style.left = event.clientX - dx + "px";
    }
    if (event.clientY > 0) {
      clone.style.top = event.clientY - dy + "px";
    }
  };

  const handleMoveEnd = (event) => {
    event.target.style.visibility = "visible";
    let clone = document.getElementById("clone");
    document.getElementById("cards").removeChild(clone);
    const deltaX = startX - event.clientX;
    if (deltaX < -250) {
      handleSwipe(true);
      return;
    }
    if (deltaX > 250) {
      handleSwipe(false);
      return;
    }
    event.target.style.visibility = "visible";
  };

  return (
    <div
      className={"card" + setInactiveClass(inactive)}
      style={{ zIndex: z, top: getTopOffset(z), maxWidth: getWidth(z) }}
      draggable={!inactive}
      onDragStart={handleMoveStart}
      onDrag={handleMove}
      onDragEnd={handleMoveEnd}
    >
      {card && (
        <img
          className={
            "card--img " + (inactive ? "img--inactive" : "img--active")
          }
          width="100%"
          height={"300"}
          alt="profile"
          src={`/images/${card.imgId}.png`}
          style={{ filter: `hue-rotate(${card.tint}deg)` }}
        ></img>
      )}
      <div className="card--info">
        <h3 className="card--title">
          {card.name}, {card.age}
        </h3>
        <div className="card--job-and-city">
          <div className="card-city-container">
            <span className="card--emoji">📍</span>
            <h4 className="card--jobTitle">{card.city}</h4>
          </div>
          <div className="card-job-container">
            <img
              className="card--jobIcon"
              src={jobIcon}
              width="20"
              height="20"
            />
            <h4 className="card--jobTitle">
              {card.job && card.employer
                ? card.job + " at " + card.employer
                : "Unemployed"}
            </h4>
          </div>
        </div>
      </div>
      <div className="card--passions">
        {card.passions.map((passion, index) => {
          return (
            <div className="card--passion" key={index}>
              {passion}
            </div>
          );
        })}
      </div>
      <div className="card--bio">
        <p>
          {card.bio ||
            "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum111Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum111"}
        </p>
      </div>
    </div>
  );
};

export default Card;
