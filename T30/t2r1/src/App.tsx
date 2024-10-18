import React, { useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitSection from './components/HabitSection';
import { Habit } from './types/Habit';
import './App.css';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Daily Habits', frequency: 'daily' },
    { id: 2, name: 'Weekly Habits', frequency: 'weekly' },
  ]);

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

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: `Section ${sections.length + 1}`,
      frequency: 'daily',
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <div className="habit-form">
        <HabitForm addHabit={addHabit} />
      </div>
      {sections.map((section) => (
        <HabitSection
          key={section.id}
          section={section}
          habits={habits.filter((habit) => habit.frequency === section.frequency)}
          updateProgress={updateProgress}
          updateFrequency={updateFrequency}
          removeHabit={removeHabit}
        />
      ))}
      <button className="add-section-button" onClick={addSection}>
        +
      </button>
    </div>
  );
};

export default App;
