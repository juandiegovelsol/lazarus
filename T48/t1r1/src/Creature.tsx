import React, { useState } from "react";
import Tooltip from "./Tooltip";

interface CreatureProps {
  headColor: string;
  bodyColor: string;
  legsColor: string;
  setHeadColor: (color: string) => void;
  setBodyColor: (color: string) => void;
  setLegsColor: (color: string) => void;
}

const Creature = ({
  headColor,
  bodyColor,
  legsColor,
  setHeadColor,
  setBodyColor,
  setLegsColor,
}: CreatureProps) => {
  const [showHeadTooltip, setShowHeadTooltip] = useState(false);
  const [showBodyTooltip, setShowBodyTooltip] = useState(false);
  const [showLegsTooltip, setShowLegsTooltip] = useState(false);

  const handleMouseOver = (part: string) => {
    if (part === "head") {
      setShowHeadTooltip(true);
    } else if (part === "body") {
      setShowBodyTooltip(true);
    } else if (part === "legs") {
      setShowLegsTooltip(true);
    }
  };

  const handleMouseOut = (part: string) => {
    if (part === "head") {
      setShowHeadTooltip(false);
    } else if (part === "body") {
      setShowBodyTooltip(false);
    } else if (part === "legs") {
      setShowLegsTooltip(false);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  return (
    <div className="creature" id="creature">
      <div
        className="head"
        style={{ backgroundColor: headColor }}
        onMouseOver={() => handleMouseOver("head")}
        onMouseOut={() => handleMouseOut("head")}
      >
        {showHeadTooltip && (
          <Tooltip
            title="Head"
            color={headColor}
            setColor={setHeadColor}
          />
        )}
      </div>
      <div
        className="body"
        style={{ backgroundColor: bodyColor }}
        onMouseOver={() => handleMouseOver("body")}
        onMouseOut={() => handleMouseOut("body")}
      >
        {showBodyTooltip && (
          <Tooltip
            title="Body"
            color={bodyColor}
            setColor={setBodyColor}
          />
        )}
      </div>
      <div
        className="legs left-leg"
        style={{ backgroundColor: legsColor }}
        onMouseOver={() => handleMouseOver("legs")}
        onMouseOut={() => handleMouseOut("legs")}
      >
        {showLegsTooltip && (
          <Tooltip
            title="Legs"
            color={legsColor}
            setColor={setLegsColor}
          />
        )}
      </div>
      <div
        className="legs right-leg"
        style={{ backgroundColor: legsColor }}
        onMouseOver={() => handleMouseOver("legs")}
        onMouseOut={() => handleMouseOut("legs")}
      />
    </div>
  );
};

export default Creature;