import React, { useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import { Habit, HabitSection } from './types/Habit';
import './App.css';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [sections, setSections] = useState<HabitSection[]>([
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

  const updateFrequency = (id: number, frequency: string) => {
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
    const newSection: HabitSection = {
      id: sections.length + 1,
      name: `Section ${sections.length + 1}`,
      frequency: `section_${sections.length + 1}`,
    };
    setSections([...sections, newSection]);
  };

  const updateSectionName = (id: number, name: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, name } : section
      )
    );
  };

  const removeSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
    const defaultFrequency = sections[0]?.frequency || 'daily';
    setHabits(habits.map(habit => 
      habit.frequency === `section_${id}` ? {...habit, frequency: defaultFrequency} : habit
    ));
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <div className="habit-form">
        <HabitForm addHabit={addHabit} sections={sections} />
      </div>
      {sections.map((section) => (
        <div key={section.id} className="habit-list-section">
          <input
            type="text"
            value={section.name}
            onChange={(e) => updateSectionName(section.id, e.target.value)}
          />
          <button onClick={() => removeSection(section.id)}>Remove</button>
          <HabitList
            habits={habits.filter((habit) => habit.frequency === section.frequency)}
            updateProgress={updateProgress}
            updateFrequency={updateFrequency}
            removeHabit={removeHabit}
            sections={sections}
            sectionFrequency={section.frequency}
          />
        </div>
      ))}
      <button onClick={addSection}>+</button>
    </div>
  );
};

export default App;
