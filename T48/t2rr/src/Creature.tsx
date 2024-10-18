import React, {useState} from "react";
import ColorTooltip from "./ColorTooltip";

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

  const handleColorChange = (part: string, color: string) => {
    if (part === "head") {
      setHeadColor(color);
    } else if (part === "body") {
      setBodyColor(color);
    } else if (part === "legs") {
      setLegsColor(color);
    }
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
          <ColorTooltip
            part="head"
            color={headColor}
            setColor={(color) => handleColorChange("head", color)}
          />
        )}
      </div>
      <div
        className="body"
        style={{ backgroundColor: bodyColor }}
        onMouseOver={() => handleMouseOver("body")}
        onMouseOut={() => handleMouseOut("body")}
      >
        {showBodyTooltip && <ColorTooltip
          part="body"
          color={bodyColor}
          setColor={(color) => handleColorChange("body", color)}
        />}
      </div>
      <div
        className="legs left-leg"
        style={{ backgroundColor: legsColor }}
        onMouseOver={() => handleMouseOver("legs")}
        onMouseOut={() => handleMouseOut("legs")}
      >
        {showLegsTooltip && <ColorTooltip
          part="legs"
          color={legsColor}
          setColor={(color) => handleColorChange("legs", color)}
        />}
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
