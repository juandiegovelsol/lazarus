import React from "react";
import "./App.css";
import Header from "./Header";
import Welcome from "./Welcome";
import Reviews from "./Reviews";
import ParallaxBackground from "./ParallaxBackground";

function App() {
  return (
    <div className="App">
      <Header />
      <ParallaxBackground />
      <Welcome />
      <Reviews />
    </div>
  );
}

export default App;
