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

  const updateFrequency = (id: number, frequency: 'daily' | 'weekly') => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, frequency } : habit
      )
    );
  };

  const removeHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const handleDragStart = (event: React.DragEvent, habitId: number) => {
    event.dataTransfer.setData('habitId', habitId.toString());
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent, frequency: 'daily' | 'weekly') => {
    const habitId = parseInt(event.dataTransfer.getData('habitId'));
    updateFrequency(habitId, frequency);
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <div className="habit-form">
        <HabitForm addHabit={addHabit} />
      </div>
      <div
        className="habit-list-daily"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'daily')}
      >
        <h2>Daily Habits</h2>
        <HabitList
          habits={habits.filter((habit) => habit.frequency === 'daily')}
          updateProgress={updateProgress}
          updateFrequency={updateFrequency}
          removeHabit={removeHabit}
          handleDragStart={handleDragStart}
        />
      </div>
      <div
        className="habit-list-weekly"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'weekly')}
      >
        <h2>Weekly Habits</h2>
        <HabitList
          habits={habits.filter((habit) => habit.frequency === 'weekly')}
          updateProgress={updateProgress}
          updateFrequency={updateFrequency}
          removeHabit={removeHabit}
          handleDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

export default App;
