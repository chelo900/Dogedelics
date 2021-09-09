import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { CreateDogPage } from "./components/CreateDogPage";
import { DogDetailPage } from "./components/DogDetailPage";
import "./App.css";
import { getDogs } from "./actions/index";

getDogs();

function App() {
  // tener en cuenta el 404 en caso de que ninguno matchee
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/home" component={NavBar} />
        <h1>Henry Dogs</h1>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/createdog" component={CreateDogPage} />
        <Route exact path="/dogs/:id" component={DogDetailPage} />
      </div>
    </BrowserRouter>
  );
}

//Componente que va a tener las rutas y todos los providers

export default App;
