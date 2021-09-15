import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => (
  <>
    <h1>
      Dog-edelics: a place where you bind with those four-leged little friends
    </h1>
    <Link to="/home">
      <button>CONNECT</button>
    </Link>
  </>
);
