import React, { useState } from 'react';
import { Habit } from '../types/Habit';

interface HabitProgressProps {
  habit: Habit;
  updateProgress: (id: number, progress: number) => void;
}

const HabitProgress: React.FC<HabitProgressProps> = ({ habit, updateProgress }) => {
  const [inputProgress, setInputProgress] = useState(habit.progress);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value);
    setInputProgress(newProgress);
    updateProgress(habit.id, newProgress);
  };

  const progressPercentage = (habit.progress / habit.goal) * 100;

  return (
    <div>
      <label>
        Progress: {habit.progress} / {habit.goal}
        <input
          type="number"
          value={inputProgress}
          onChange={handleProgressChange}
          min="0"
          max={habit.goal}
        />
      </label>
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: habit.color,
            borderRadius: '5px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default HabitProgress;
