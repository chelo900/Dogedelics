import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => (
  <>
    <h1>
      Welcome to the place where you connect with your Dog through connecting
      both of your souls
    </h1>
    <Link to="/home">
      <button>CONNECT</button>
    </Link>
  </>
);
