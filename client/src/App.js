import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { HomePage } from "./components/HomePage";
import { CreateDogPage } from "./components/CreateDogPage";
import { DogDetailPage } from "./components/DogDetailPage";
import "./App.css";
import { SearchBar } from "./components/SearchBar";

function App() {
  // tener en cuenta el 404 en caso de que ninguno matchee TODO
  //QUE HACE BROWSER ROUTER?? TODO
  //QUE HACE SWITCH?? TODO
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/createdog" component={CreateDogPage} />
        <Route exact path="/dogs/:id" component={DogDetailPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
