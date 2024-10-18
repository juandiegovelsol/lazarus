import React, { useState } from "react";
import "./App.css";
import Sky from "./Sky";
import Key from "./Key";
import Information from "./Information";

const App = () => {
  const [telescopeX, setTelescopeX] = useState(300);
  const [telescopeY, setTelescopeY] = useState(200);
  const [objectName, setObjectName] = useState("Select a celestial object");
  const [objectInfo, setObjectInfo] = useState(
    "Use the controls to move the telescope and observe different objects in the sky."
  );

  const moveTelescope = (dx, dy) => {
    setTelescopeX(Math.max(50, Math.min(550, telescopeX + dx)));
    setTelescopeY(Math.max(50, Math.min(350, telescopeY + dy)));
  };

  const checkObjects = () => {
    const celestialObjects = [
      {
        name: "Ursa Major",
        x: 100,
        y: 100,
        info: "Ursa Major is one of the most recognizable constellations in the night sky. In Greek mythology, it represents Callisto, transformed into a bear by Zeus.",
      },
      {
        name: "Jupiter",
        x: 300,
        y: 200,
        info: "Jupiter is the largest planet in the Solar System. It has 79 known moons and a Great Red Spot which is actually a giant storm.",
      },
      {
        name: "Orion Nebula",
        x: 500,
        y: 150,
        info: "The Orion Nebula is a cloud of gas and dust where new stars are forming. It is visible to the naked eye in the night sky.",
      },
    ];

    let found = false;
    for (let obj of celestialObjects) {
      const distance = Math.sqrt(
        Math.pow(obj.x - telescopeX, 2) + Math.pow(obj.y - telescopeY, 2)
      );
      if (distance < 50) {
        setObjectName(obj.name);
        setObjectInfo(obj.info);
        found = true;
        break;
      }
    }
    if (!found) {
      setObjectName("Empty space");
      setObjectInfo("There are no celestial objects in this area.");
    }
  };

  return (
    <div className="app">
      <h1 className="title">Interactive Space Telescope</h1>
      <div className="telescope">
        <Sky
          telescopeX={telescopeX}
          telescopeY={telescopeY}
          moveTelescope={moveTelescope}
          checkObjects={checkObjects}
        />
      </div>
      <Key moveTelescope={moveTelescope} />
      <Information objectName={objectName} objectInfo={objectInfo} />
    </div>
  );
};

export default App;
