import React, { useState } from "react";
import "./styles.css";

const Modal = ({ card, onClose, message }) => {
  const [closed, setClosed] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  
  const handleClose = (msg) => {
    setMsgSent(msg);
    setClosed(true);
    let modal = document.getElementById("modal");
    modal.classList.add("modal--fade-out");
    setTimeout(() => {
      onClose();
    }, 800);
  }

  const preventEvents = (closed) => {
    return closed ? " prevent-events" : "";
  }

  const msgSentStyle = (msgSent) => {
    return msgSent ? " message-sent" : "";
  }

  return (
    <div id="modal" className="modal">
      <h1 className="modal--title">It's a match!</h1>
      <h3 className="modal--text">
        You and {card.name} have liked each other!
      </h3>
      <img
        className="modal--image"
        src={`/images/${card.imgId}.png`}
        style={{ filter: `hue-rotate(${card.tint}deg)` }}
      ></img>
            <h3 className="modal--text">
        You can now send them a message or keep swiping.
      </h3>
      <div className={"modal--actions" + preventEvents(closed)}>
        <div className={"modal--actions--button message" + msgSentStyle(msgSent)} onClick={() => handleClose(true)}>
          {!msgSent ? `"${message}"` : "Message sent!"}
        </div>
        <div className="modal--actions--button continue" onClick={() => handleClose(false)}>
          Continue swiping
        </div>
      </div>
    </div>
  );
};

export default Modal;
