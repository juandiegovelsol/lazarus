import React from 'react';
import { Habit } from '../types/Habit';
import HabitProgress from './HabitProgress';

interface HabitListProps {
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
  updateFrequency: (id: number, frequency: 'daily' | 'weekly') => void;
  removeHabit: (id: number) => void;
  frequency: 'daily' | 'weekly';
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  updateProgress,
  updateFrequency,
  removeHabit,
  frequency,
}) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, habit: Habit) => {
    event.dataTransfer.setData('habit', JSON.stringify(habit));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const habit = JSON.parse(event.dataTransfer.getData('habit')) as Habit;
    updateFrequency(habit.id, frequency);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="habit-list"
    >
      {habits.map((habit) => (
        <div
          key={habit.id}
          style={{ backgroundColor: habit.color }}
          draggable
          onDragStart={(event) => handleDragStart(event, habit)}
          className="habit"
        >
          <h3>{habit.name}</h3>
          <HabitProgress habit={habit} updateProgress={updateProgress} />
          <button
            onClick={() =>
              updateFrequency(
                habit.id,
                frequency === 'daily' ? 'weekly' : 'daily'
              )
            }
          >
            Switch to {frequency === 'daily' ? 'Weekly' : 'Daily'}
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
