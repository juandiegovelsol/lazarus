import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import Creature from './Creature';

function FantasyCreatureGenerator() {
  const [headColor, setHeadColor] = useState('#ff0000');
  const [bodyColor, setBodyColor] = useState('#00ff00');
  const [legsColor, setLegsColor] = useState('#0000ff');

  const generateCreature = () => {
    // Not needed as colors are updated in real time
  };

  const saveCreature = () => {
    const creature = document.getElementById('creature');
    if (creature) {
      html2canvas(creature).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'my-fantasy-creature.png';
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
      <Creature headColor={headColor} bodyColor={bodyColor} legsColor={legsColor} />
      <button onClick={saveCreature}>Save Creature</button>
    </div>
  );
}

export default FantasyCreatureGenerator;