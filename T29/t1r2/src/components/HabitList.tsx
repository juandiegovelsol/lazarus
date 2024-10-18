import React from 'react';
import { Habit } from '../types/Habit';
import HabitProgress from './HabitProgress';

interface HabitListProps {
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, updateProgress }) => {
  const dailyHabits = habits.filter((habit) => habit.frequency === 'daily');
  const weeklyHabits = habits.filter((habit) => habit.frequency === 'weekly');

  return (
    <div className="habit-list">
      <div className="daily-habits">
        <h2>Daily Habits</h2>
        {dailyHabits.map((habit) => (
          <div key={habit.id} style={{ backgroundColor: habit.color }}>
            <h3>{habit.name}</h3>
            <HabitProgress habit={habit} updateProgress={updateProgress} />
            {habit.progress >= habit.goal && (
              <button
                onClick={() =>
                  updateProgress(habit.id, habit.progress - habit.goal)
                }
              >
                Reset
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="weekly-habits">
        <h2>Weekly Habits</h2>
        {weeklyHabits.map((habit) => (
          <div key={habit.id} style={{ backgroundColor: habit.color }}>
            <h3>{habit.name}</h3>
            <HabitProgress habit={habit} updateProgress={updateProgress} />
            {habit.progress >= habit.goal && (
              <button
                onClick={() =>
                  updateProgress(habit.id, habit.progress - habit.goal)
                }
              >
                Reset
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitList;
