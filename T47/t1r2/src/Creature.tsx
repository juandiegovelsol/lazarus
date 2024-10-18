import React from 'react';

interface CreatureProps {
  headColor: string;
  bodyColor: string;
  legsColor: string;
}

function Creature({ headColor, bodyColor, legsColor }: CreatureProps) {
  return (
    <div className="creature" id="creature">
      <div className="head" style={{ backgroundColor: headColor }}></div>
      <div className="body" style={{ backgroundColor: bodyColor }}></div>
      <div className="legs left-leg" style={{ backgroundColor: legsColor }}></div>
      <div className="legs right-leg" style={{ backgroundColor: legsColor }}></div>
    </div>
  );
}

export default Creature;