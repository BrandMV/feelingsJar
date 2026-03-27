import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  emotion: string;
  onSelect?: (emotion: string) => void;
}

const Card: React.FC<CardProps> = ({ title, emotion, onSelect }) => {
  return (
    <div
      className="card"
      data-emotion={emotion}
      onClick={() => onSelect && onSelect(title)}
    >
      <h2>{title}</h2>
      {emotion && <span className="card-emotion">{emotion}</span>}
    </div>
  );
};

export default Card;
