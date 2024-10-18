import React from 'react';
import { Habit } from '../types/Habit';
import HabitProgress from './HabitProgress';

interface HabitListProps {
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, updateProgress }) => {
  return (
    <div>
      {habits.map((habit) => (
        <div key={habit.id} style={{ backgroundColor: habit.color }}>
          <h3>{habit.name}</h3>
          <HabitProgress habit={habit} updateProgress={updateProgress} />
        </div>
      ))}
    </div>
  );
};

export default HabitList;
