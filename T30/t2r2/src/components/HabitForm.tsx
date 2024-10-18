import React, { useState } from 'react';
import { Habit, HabitSection } from '../types/Habit';

interface HabitFormProps {
  addHabit: (habit: Habit) => void;
  sections: HabitSection[];
}

const HabitForm: React.FC<HabitFormProps> = ({ addHabit, sections }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [goal, setGoal] = useState(1);
  const [frequency, setFrequency] = useState(sections[0]?.frequency || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHabit: Habit = {
      id: Date.now(),
      name,
      color,
      goal,
      progress: 0,
      frequency,
    };
    addHabit(newHabit);
    setName('');
    setColor('#000000');
    setGoal(1);
    setFrequency(sections[0]?.frequency || '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Habit Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label>
        Goal:
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(parseInt(e.target.value))}
          min="1"
          required
        />
      </label>
      <label>
        Frequency:
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        >
          {sections.map((section) => (
            <option key={section.id} value={section.frequency}>
              {section.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
