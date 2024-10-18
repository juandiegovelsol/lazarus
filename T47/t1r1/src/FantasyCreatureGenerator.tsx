import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import Creature from "./Creature";
import html2canvas from "html2canvas";
import "./FantasyCreatureGenerator.css";

const FantasyCreatureGenerator = () => {
  const [headColor, setHeadColor] = useState("#ff0000");
  const [bodyColor, setBodyColor] = useState("#00ff00");
  const [legsColor, setLegsColor] = useState("#0000ff");
  const [headColorRendered, setHeadColorRendered] = useState("#ff0000");
  const [bodyColorRendered, setBodyColorRendered] = useState("#00ff00");
  const [legsColorRendered, setLegsColorRendered] = useState("#0000ff");

  const handleGenerateCreature = () => {
    setHeadColorRendered(headColor)
    setBodyColorRendered(bodyColor)
    setLegsColorRendered(legsColor)
  };

  const handleSaveCreature = () => {
    const creatureElement = document.getElementById("creature");
    if (creatureElement) {
      html2canvas(creatureElement).then((canvas) => {
        const link = document.createElement("a");
        link.download = "my-fantasy-creature.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="container">
      <h1>Fantasy Creature Generator</h1>
      <div className="controls">
        <ColorPicker label="Head" color={headColor} setColor={setHeadColor} />
        <ColorPicker label="Body" color={bodyColor} setColor={setBodyColor} />
        <ColorPicker label="Legs" color={legsColor} setColor={setLegsColor} />
      </div>
      <Creature
        headColor={headColorRendered}
        bodyColor={bodyColorRendered}
        legsColor={legsColorRendered}
      />
      <button onClick={handleGenerateCreature}>Generate Creature</button>
      <button onClick={handleSaveCreature}>Save Creature</button>
    </div>
  );
};

export default FantasyCreatureGenerator;
