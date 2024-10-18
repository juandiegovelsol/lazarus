import React from "react";
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import Reviews from "./components/Reviews/Reviews";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="parallax-background"></div>
      <div className="content">
        <Welcome />
        <Reviews />
      </div>
    </div>
  );
};

export default App;
