import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIdDog } from "../actions";
import styles from "./styles/DogDetailPage.module.css";

export const DogDetailPage = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getIdDog(id));
  }, [id, dispatch]);

  return (
    <div className={styles.container}>
      {Object.entries(dog).length > 0 ? (
        <>
          <div>
            <Link to="/home">
              <button className={styles.home_button}> HOME </button>
            </Link>
          </div>
          <div className={styles.card_container}>
            <h1 className={styles.title}>{dog.name}</h1>
            <img src={dog.image} alt="dog"></img>
            <div className={styles.measures}>
              Weight:
              {dog.weight.map((weight, index) => (
                <span key={index + "_" + weight}>
                  {index === 0 && index + 1 ? ` ${weight} -` : ` ${weight} kg`}
                </span>
              ))}
            </div>
            <div className={styles.measures}>
              Height:
              {dog.height.map((height, index) => (
                <span key={index + "_" + height}>
                  {index === 0 && index + 1 ? ` ${height} -` : ` ${height} cm`}
                </span>
              ))}
            </div>
            <div className={styles.measures}>
              Life span:
              <span>{dog.life_span}</span>
            </div>
            <div className={styles.temp_container}>
              {dog.temperaments.map((temp, index, array) => (
                <span className={styles.temp} key={temp.id}>
                  {temp.name}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};
