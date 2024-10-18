import React, { useState } from 'react';
import { Habit } from '../types/Habit';

interface HabitFormProps {
  addHabit: (habit: Habit) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ addHabit }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [goal, setGoal] = useState(1);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

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
    setFrequency('daily');
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
          onChange={(e) =>
            setFrequency(e.target.value as 'daily' | 'weekly')
          }
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </label>
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
