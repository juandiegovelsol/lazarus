import React from 'react';
import { Habit } from '../types/Habit';
import HabitProgress from './HabitProgress';

interface HabitListProps {
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
  removeHabit: (id: number) => void;
  toggleFrequency: (id: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  updateProgress,
  removeHabit,
  toggleFrequency,
}) => {
  return (
    <div>
      {habits.map((habit) => (
        <div key={habit.id} style={{ backgroundColor: habit.color }}>
          <h3>{habit.name}</h3>
          <HabitProgress habit={habit} updateProgress={updateProgress} />
          <button onClick={() => toggleFrequency(habit.id)}>
            Switch to {habit.frequency === 'daily' ? 'Weekly' : 'Daily'}
          </button>
          {habit.progress >= habit.goal && (
            <button onClick={() => removeHabit(habit.id)}>Remove</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitList;
