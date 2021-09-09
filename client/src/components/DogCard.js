import React from "react";
export default function Card({ name, img, temperaments, weight }) {
  // acá va tu código
  return (
    <div>
      {/* <button onClick={props.onClose}>X</button> */}
      <span>{name}</span>
      <img src={img} alt="dog img" width="200px" height="200px"></img>
      <span>{weight.metric}</span>
      {typeof temperaments === "string"
        ? temperaments
            .split(", ")
            .map((temp, index) => <div key={index}>{temp} </div>) //TODO
        : temperaments.map((temp) => <div key={temp.id}>{`${temp.name}`}</div>)}
      <span></span>
    </div>
  );
}
