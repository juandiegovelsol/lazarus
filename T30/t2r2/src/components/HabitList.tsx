import React from 'react';
import { Habit, HabitSection } from '../types/Habit';
import HabitProgress from './HabitProgress';

interface HabitListProps {
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
  updateFrequency: (id: number, frequency: string) => void;
  removeHabit: (id: number) => void;
  sections: HabitSection[];
  sectionFrequency: string;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  updateProgress,
  updateFrequency,
  removeHabit,
  sections,
  sectionFrequency,
}) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, habit: Habit) => {
    event.dataTransfer.setData('habitId', habit.id.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const habitId = parseInt(event.dataTransfer.getData('habitId'));
    updateFrequency(habitId, sectionFrequency);
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
          <select
            value={habit.frequency}
            onChange={(e) => updateFrequency(habit.id, e.target.value)}
          >
            {sections.map((section) => (
              <option key={section.id} value={section.frequency}>
                {section.name}
              </option>
            ))}
          </select>
          {habit.progress >= habit.goal && (
            <button onClick={() => removeHabit(habit.id)}>Remove</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitList;

