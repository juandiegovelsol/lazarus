import React from 'react';
import './Creature.css';

interface CreatureProps {
  headColor: { r: number, g: number, b: number };
  bodyColor: { r: number, g: number, b: number };
  legsColor: { r: number, g: number, b: number };
  setHeadColor: (color: { r: number, g: number, b: number }) => void;
  setBodyColor: (color: { r: number, g: number, b: number }) => void;
  setLegsColor: (color: { r: number, g: number, b: number }) => void;
}

const Creature = ({ headColor, bodyColor, legsColor, setHeadColor, setBodyColor, setLegsColor }: CreatureProps) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>, setColor: (color: { r: number, g: number, b: number }) => void, color: { r: number, g: number, b: number }) => {
    const value = parseInt(event.target.value);
    const newColor = { ...color };
    if (event.target.name === 'r') {
      newColor.r = value;
    } else if (event.target.name === 'g') {
      newColor.g = value;
    } else if (event.target.name === 'b') {
      newColor.b = value;
    }
    setColor(newColor);
  };

  return (
    <div className="creature" id="creature">
      <div className="head" style={{ backgroundColor: `rgb(${headColor.r}, ${headColor.g}, ${headColor.b})` }}>
        <div className="tooltip">
          Head
          <br />
          R: <input type="number" min="0" max="255" value={headColor.r} name="r" onChange={(event) => handleColorChange(event, setHeadColor, headColor)} />
          G: <input type="number" min="0" max="255" value={headColor.g} name="g" onChange={(event) => handleColorChange(event, setHeadColor, headColor)} />
          B: <input type="number" min="0" max="255" value={headColor.b} name="b" onChange={(event) => handleColorChange(event, setHeadColor, headColor)} />
        </div>
      </div>
      <div className="body" style={{ backgroundColor: `rgb(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b})` }}>
        <div className="tooltip">
          Body
          <br />
          R: <input type="number" min="0" max="255" value={bodyColor.r} name="r" onChange={(event) => handleColorChange(event, setBodyColor, bodyColor)} />
          G: <input type="number" min="0" max="255" value={bodyColor.g} name="g" onChange={(event) => handleColorChange(event, setBodyColor, bodyColor)} />
          B: <input type="number" min="0" max="255" value={bodyColor.b} name="b" onChange={(event) => handleColorChange(event, setBodyColor, bodyColor)} />
        </div>
      </div>
      <div className="legs left-leg" style={{ backgroundColor: `rgb(${legsColor.r}, ${legsColor.g}, ${legsColor.b})` }}>
        <div className="tooltip">
          Legs
          <br />
          R: <input type="number" min="0" max="255" value={legsColor.r} name="r" onChange={(event) => handleColorChange(event, setLegsColor, legsColor)} />
          G: <input type="number" min="0" max="255" value={legsColor.g} name="g" onChange={(event) => handleColorChange(event, setLegsColor, legsColor)} />
          B: <input type="number" min="0" max="255" value={legsColor.b} name="b" onChange={(event) => handleColorChange(event, setLegsColor, legsColor)} />
        </div>
      </div>
      <div className="legs right-leg" style={{ backgroundColor: `rgb(${legsColor.r}, ${legsColor.g}, ${legsColor.b})` }}>
        <div className="tooltip">
          Legs
          <br />
          R: <input type="number" min="0" max="255" value={legsColor.r} name="r" onChange={(event) => handleColorChange(event, setLegsColor, legsColor)} />
          G: <input type="number" min="0" max="255" value={legsColor.g} name="g" onChange={(event) => handleColorChange(event, setLegsColor, legsColor)} />
          B: <input type="number" min="0" max="255" value={legsColor.b} name="b" onChange={(event) => handleColorChange(event, setLegsColor, legsColor)} />
        </div>
      </div>
    </div>
  );
};

export default Creature;