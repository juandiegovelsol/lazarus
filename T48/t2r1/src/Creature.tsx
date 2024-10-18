import React, { useEffect, useState } from "react";

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
  const [headRGB, setHeadRGB] = useState({ r: 255, g: 0, b: 0 });
  const [bodyRGB, setBodyRGB] = useState({ r: 0, g: 255, b: 0 });
  const [legsRGB, setLegsRGB] = useState({ r: 0, g: 0, b: 255 });

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

  const handleRGBChange = (part: string, value: number, color: string) => {
    if (part === "head") {
      const newHeadColor = { ...headRGB, [color]: value }
      setHeadColor(rgbToHex(newHeadColor.r, newHeadColor.g, newHeadColor.b));
    } else if (part === "body") {
      const newBodyColor = { ...bodyRGB, [color]: value }
      setBodyColor(rgbToHex(newBodyColor.r, newBodyColor.g, newBodyColor.b));
    } else if (part === "legs") {
      const newLegsColor = { ...legsRGB, [color]: value }
      setLegsColor(rgbToHex(newLegsColor.r, newLegsColor.g, newLegsColor.b));
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

  function rgbToHex(r: number, g: number, b: number): string {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  useEffect(()=>{
    const newHeadColor = hexToRgb(headColor)
    setHeadRGB(newHeadColor)
    const newBodyColor = hexToRgb(bodyColor)
    setBodyRGB(newBodyColor)
    const newLegsColor = hexToRgb(legsColor)
    setLegsRGB(newLegsColor)
  },[headColor, bodyColor, legsColor])

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
              value={headRGB.r}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("head", parseInt(e.target.value), "r")
              }
            />
            <input
              type="number"
              value={headRGB.g}
              min={0}
              max={255}
              onChange={(e) =>
                handleRGBChange("head", parseInt(e.target.value), "g")
              }
            />
            <input
              type="number"
              value={headRGB.b}
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
              value={bodyRGB.r}
              onChange={(e) =>
                handleRGBChange("body", parseInt(e.target.value), "r")
              }
            />
            <input
              type="number"
              value={bodyRGB.g}
              onChange={(e) =>
                handleRGBChange("body", parseInt(e.target.value), "g")
              }
            />
            <input
              type="number"
              value={bodyRGB.b}
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
              value={legsRGB.r}
              onChange={(e) =>
                handleRGBChange("legs", parseInt(e.target.value), "r")
              }
            />
            <input
              type="number"
              value={legsRGB.g}
              onChange={(e) =>
                handleRGBChange("legs", parseInt(e.target.value), "g")
              }
            />
            <input
              type="number"
              value={legsRGB.b}
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
