import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

function ColorPicker({ label, color, setColor }: ColorPickerProps) {
  return (
    <div className="color-picker">
      <label>{label}</label>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
  );
}

export default ColorPicker;