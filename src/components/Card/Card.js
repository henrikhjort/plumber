import React from "react";
import jobIcon from "../../assets/icons/card_job.png";
import "./styles.css";

const Card = ({ card, z, inactive, onMoveStart, onMove, onMoveEnd }) => {
  const getTopOffset = (z) => {
    return z * 15;
  };

  const getWidth = (z) => {
    const step = 25;
    return 400 - (5 - z) * step;
  };

  const setInactiveClass = (inactive) => {
    return inactive ? " card--inactive" : "";
  };

  return (
    <div
      className={"card" + setInactiveClass(inactive)}
      style={{ zIndex: z, top: getTopOffset(z), maxWidth: getWidth(z) }}
      draggable={!inactive}
      onDragStart={(event) => onMoveStart(event)}
      onDrag={(event) => onMove(event)}
      onDragEnd={(event) => onMoveEnd(event)}
    >
      {card && (
        <img
          className={"card--img " + (inactive ? "img--inactive" : "img--active")}
          width="100%"
          height={"300"}
          alt="profile"
          src={`/images/${card.imgId}.png`}
          style={{filter: `hue-rotate(${card.tint}deg)`}}
        ></img>
      )}
      <div className="card--info">
        <h3 className="card--title">
          {card.name}, {card.age}
        </h3>
        <div className="card--job-and-city">
          <div className="card-city-container">
              <span className="card--emoji">📍</span>
              <h4 className="card--jobTitle">
                {card.city}
              </h4>
            </div>
          <div className="card-job-container">
            <img className="card--jobIcon" src={jobIcon} width="20" height="20" />
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
            "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum111"}
        </p>
      </div>
    </div>
  );
};

export default Card;
