import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { HomePage } from "./components/HomePage";
import { CreateDogPage } from "./components/CreateDogPage";
import { DogDetailPage } from "./components/DogDetailPage";
import "./App.css";

const PageNotFound = () => <div>PAGE NOT FOUND</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/createdog" component={CreateDogPage} />
          <Route path="/dogs/:id" component={DogDetailPage} />
          <Route path="/" component={LandingPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
