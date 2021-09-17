import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";

export const LandingPage = () => (
  <div className={styles.container}>
    <h1>
      Dog-edelics: a place where you can find all you want to know about those
      four-leged little friends
    </h1>
    <Link to="/home">
      <button>CONNECT</button>
    </Link>
  </div>
);
