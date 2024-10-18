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

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <div className="habit-container">
        <div className="habit-form">
          <HabitForm addHabit={addHabit} />
        </div>
        <div className="habit-list-container">
          <HabitList habits={habits} updateProgress={updateProgress} />
        </div>
      </div>
    </div>
  );
};

export default App;
