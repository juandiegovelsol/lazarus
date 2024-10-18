import React from 'react';
import { Habit } from '../types/Habit';
import HabitProgress from './HabitProgress';

interface HabitListProps {
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
  updateFrequency: (id: number, frequency: 'daily' | 'weekly') => void;
  removeHabit: (id: number) => void;
  handleDragStart: (event: React.DragEvent, habitId: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  updateProgress,
  updateFrequency,
  removeHabit,
  handleDragStart,
}) => {
  return (
    <div>
      {habits.map((habit) => (
        <div
          key={habit.id}
          style={{
            backgroundColor: habit.color,
            maxWidth: 300,
            padding: 10,
            margin: 10,
            border: '1px solid #ddd',
            borderRadius: 5,
            cursor: 'move',
          }}
          draggable
          onDragStart={(event) => handleDragStart(event, habit.id)}
        >
          <h3 style={{ fontSize: 16, margin: 0 }}>{habit.name}</h3>
          <HabitProgress habit={habit} updateProgress={updateProgress} />
          <button
            style={{
              padding: 5,
              fontSize: 12,
              backgroundColor: '#33ccff',
              color: '#fff',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
            onClick={() =>
              updateFrequency(
                habit.id,
                habit.frequency === 'daily' ? 'weekly' : 'daily'
              )
            }
          >
            Switch to {habit.frequency === 'daily' ? 'Weekly' : 'Daily'}
          </button>
          {habit.progress >= habit.goal && (
            <button
              style={{
                padding: 5,
                fontSize: 12,
                backgroundColor: '#33ccff',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
              }}
              onClick={() => removeHabit(habit.id)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitList;
