import React, { useState } from "react";

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
    }
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const handleRGBChange = (part: string, value: number, color: string) => {
    if (part === "head") {
      const headRGB = hexToRgb(headColor);
      const newHeadColor = rgbToHex(
        color === "r" ? value : headRGB.r,
        color === "g" ? value : headRGB.g,
        color === "b" ? value : headRGB.b
      );
      setHeadColor(newHeadColor);
    } else if (part === "body") {
      const bodyRGB = hexToRgb(bodyColor);
      const newBodyColor = rgbToHex(
        color === "r" ? value : bodyRGB.r,
        color === "g" ? value : bodyRGB.g,
        color === "b" ? value : bodyRGB.b
      );
      setBodyColor(newBodyColor);
    } else if (part === "legs") {
      const legsRGB = hexToRgb(legsColor);
      const newLegsColor = rgbToHex(
        color === "r" ? value : legsRGB.r,
        color === "g" ? value : legsRGB.g,
        color === "b" ? value : legsRGB.b
      );
      setLegsColor(newLegsColor);
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
          <div className="tooltip">
            <h4>Head</h4>
            <input
              type="number"
              value={hexToRgb(headColor).r}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("head", parseInt(e.target.value), "r")
              }
            />
            <input
              type="number"
              value={hexToRgb(headColor).g}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("head", parseInt(e.target.value), "g")
              }
            />
            <input
              type="number"
              value={hexToRgb(headColor).b}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("head", parseInt(e.target.value), "b")
              }
            />
          </div>
        )}
      </div>
      <div
        className="body"
        style={{ backgroundColor: bodyColor }}
        onMouseOver={() => handleMouseOver("body")}
        onMouseOut={() => handleMouseOut("body")}
      >
        {showBodyTooltip && (
          <div className="tooltip">
            <h4>Body</h4>
            <input
              type="number"
              value={hexToRgb(bodyColor).r}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("body", parseInt(e.target.value), "r")
              }
            />
            <input
              type="number"
              value={hexToRgb(bodyColor).g}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("body", parseInt(e.target.value), "g")
              }
            />
            <input
              type="number"
              value={hexToRgb(bodyColor).b}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("body", parseInt(e.target.value), "b")
              }
            />
          </div>
        )}
      </div>
      <div
        className="legs left-leg"
        style={{ backgroundColor: legsColor }}
        onMouseOver={() => handleMouseOver("legs")}
        onMouseOut={() => handleMouseOut("legs")}
      >
        {showLegsTooltip && (
          <div className="tooltip">
            <h4>Legs</h4>
            <input
              type="number"
              value={hexToRgb(legsColor).r}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("legs", parseInt(e.target.value), "r")
              }
            />
            <input
              type="number"
              value={hexToRgb(legsColor).g}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("legs", parseInt(e.target.value), "g")
              }
            />
            <input
              type="number"
              value={hexToRgb(legsColor).b}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("legs", parseInt(e.target.value), "b")
              }
            />
          </div>
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
