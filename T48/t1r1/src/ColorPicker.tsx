import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

const ColorPicker = ({ label, color, setColor }: ColorPickerProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div className="color-picker">
      <label>{label}</label>
      <input type="color" value={color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;