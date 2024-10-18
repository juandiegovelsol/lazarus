import React, { useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import { Habit } from './types/Habit';
import './App.css';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]);
  };

  const updateProgress = (id: number, progress: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, progress } : habit
      )
    );
  };

  const removeHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleFrequency = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, frequency: habit.frequency === 'daily' ? 'weekly' : 'daily' }
          : habit
      )
    );
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <div className="habit-form">
        <HabitForm addHabit={addHabit} />
      </div>
      <div className="habit-list-container">
        <div className="habit-list-daily">
          <h2>Daily Habits</h2>
          <HabitList
            habits={habits.filter((habit) => habit.frequency === 'daily')}
            updateProgress={updateProgress}
            removeHabit={removeHabit}
            toggleFrequency={toggleFrequency}
          />
        </div>
        <div className="habit-list-weekly">
          <h2>Weekly Habits</h2>
          <HabitList
            habits={habits.filter((habit) => habit.frequency === 'weekly')}
            updateProgress={updateProgress}
            removeHabit={removeHabit}
            toggleFrequency={toggleFrequency}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
