import React from "react";
export default function Card({ name, image, temperaments, weight }) {
  // acá va tu código
  return (
    <div>
      {/* <button onClick={props.onClose}>X</button> */}
      <h3>{name}</h3>
      <img src={image} alt="dog" width="200px" height="200px"></img>
      <div>
        Weight:
        {weight.map((w, index) => (
          <span key={index + "_" + weight}>
            {index === 0 && index + 1 ? ` ${w} -` : ` ${w}kg`}
          </span>
        ))}
      </div>
      {temperaments.map((temp, index) => (
        <span className="card__temperament" key={`${temp}_${index}`}>
          {index !== temperaments.length - 1 ? ` ${temp},` : ` ${temp}`}
        </span>
      ))}
    </div>
  );
}
