import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import Creature from "./Creature";
import html2canvas from "html2canvas";
import "./FantasyCreatureGenerator.css";

const FantasyCreatureGenerator = () => {
  const [headColor, setHeadColor] = useState({ r: 255, g: 0, b: 0 });
  const [bodyColor, setBodyColor] = useState({ r: 0, g: 255, b: 0 });
  const [legsColor, setLegsColor] = useState({ r: 0, g: 0, b: 255 });
  const [headColorRendered, setHeadColorRendered] = useState({ r: 255, g: 0, b: 0 });
  const [bodyColorRendered, setBodyColorRendered] = useState({ r: 0, g: 255, b: 0 });
  const [legsColorRendered, setLegsColorRendered] = useState({ r: 0, g: 0, b: 255 });

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

  const handleColorChange = (color: { r: number, g: number, b: number }, setColor: (color: { r: number, g: number, b: number }) => void) => {
    setColor(color);
  };

  return (
    <div className="container">
      <h1>Fantasy Creature Generator</h1>
      <div className="controls">
        <ColorPicker label="Head" color={headColor} setColor={(color) => handleColorChange(color, setHeadColor)} />
        <ColorPicker label="Body" color={bodyColor} setColor={(color) => handleColorChange(color, setBodyColor)} />
        <ColorPicker label="Legs" color={legsColor} setColor={(color) => handleColorChange(color, setLegsColor)} />
      </div>
      <Creature
        headColor={headColorRendered}
        bodyColor={bodyColorRendered}
        legsColor={legsColorRendered}
        setHeadColor={(color) => handleColorChange(color, setHeadColorRendered)}
        setBodyColor={(color) => handleColorChange(color, setBodyColorRendered)}
        setLegsColor={(color) => handleColorChange(color, setLegsColorRendered)}
      />
      <button onClick={handleGenerateCreature}>Generate Creature</button>
      <button onClick={handleSaveCreature}>Save Creature</button>
    </div>
  );
};

export default FantasyCreatureGenerator;