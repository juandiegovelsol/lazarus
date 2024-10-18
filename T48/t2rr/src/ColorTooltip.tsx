import React, { useEffect, useState } from "react";

interface ColorTooltipProps {
  part: string;
  color: string;
  setColor: (color: string) => void;
}

const ColorTooltip = ({ part, color, setColor }: ColorTooltipProps) => {
  const [rgbColor, setRgbColor] = useState(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  const handleRGBChange = (value: number, color: string) => {
    const newColor = { ...rgbColor, [color]: value };
    const newHexColor = `#${(
      (1 << 24) +
      (newColor.r << 16) +
      (newColor.g << 8) +
      newColor.b
    )
      .toString(16)
      .slice(1)}`;
    setColor(newHexColor);
  };

  useEffect(() => {
    setRgbColor(hexToRgb(color));
  }, [color]);

  return (
    <div className="tooltip">
      <h4>{part.charAt(0).toUpperCase() + part.slice(1)}</h4>
      <input
        type="number"
        value={rgbColor.r}
        min={0}
        max={255}
        onChange={(e) => handleRGBChange(parseInt(e.target.value), "r")}
      />
      <input
        type="number"
        value={rgbColor.g}
        min={0}
        max={255}
        onChange={(e) => handleRGBChange(parseInt(e.target.value), "g")}
      />
      <input
        type="number"
        value={rgbColor.b}
        min={0}
        max={255}
        onChange={(e) => handleRGBChange(parseInt(e.target.value), "b")}
      />
    </div>
  );
};

export default ColorTooltip;
