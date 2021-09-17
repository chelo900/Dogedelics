import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/Card.module.css";
export default function Card({ id, name, image, weight, temperaments }) {
  // acá va tu código
  return (
    <div className={style.container}>
      {/* <button onClick={props.onClose}>X</button> */}
      <Link to={`/dogs/${id}`} style={{ textDecoration: "none" }}>
        <h3 className={style.title}>{name}</h3>
      </Link>
      <div className={style.cardImage}>
        <img src={image} alt="dog"></img>
      </div>
      <div className={style.weight}>
        <span>Weight:</span>
        {weight.map((w, index) => (
          <span key={index + "_" + weight}>
            {index === 0 && index + 1 ? ` ${w} -` : ` ${w}kg`}
          </span>
        ))}
      </div>
      <div className={style.temp_container}>
        {temperaments.map((temp, index) => (
          <span className={style.temp} key={`${temp}_${index}`}>
            {temp}
          </span>
        ))}
      </div>
    </div>
  );
}
