import React from "react";

interface TooltipProps {
  title: string;
  color: string;
  setColor: (color: string) => void;
}

const Tooltip = ({ title, color, setColor }: TooltipProps) => {
  const rgb = hexToRgb(color);

  const handleRGBChange = (value: number, color: string) => {
    const newColor = { ...rgb, [color]: value };
    setColor(rgbToHex(newColor.r, newColor.g, newColor.b));
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  return (
    <div className="tooltip">
      <h4>{title}</h4>
      <input
        type="number"
        value={rgb.r}
        min={0}
        max={255}
        onChange={(e) => handleRGBChange(parseInt(e.target.value), "r")}
      />
      <input
        type="number"
        value={rgb.g}
        min={0}
        max={255}
        onChange={(e) => handleRGBChange(parseInt(e.target.value), "g")}
      />
      <input
        type="number"
        value={rgb.b}
        min={0}
        max={255}
        onChange={(e) => handleRGBChange(parseInt(e.target.value), "b")}
      />
    </div>
  );
};

export default Tooltip;