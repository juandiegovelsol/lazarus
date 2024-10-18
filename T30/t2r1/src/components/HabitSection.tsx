import React from 'react';
import { Habit } from '../types/Habit';
import HabitList from './HabitList';

interface HabitSectionProps {
  section: { id: number; name: string; frequency: 'daily' | 'weekly' };
  habits: Habit[];
  updateProgress: (id: number, progress: number) => void;
  updateFrequency: (id: number, frequency: 'daily' | 'weekly') => void;
  removeHabit: (id: number) => void;
}

const HabitSection: React.FC<HabitSectionProps> = ({
  section,
  habits,
  updateProgress,
  updateFrequency,
  removeHabit,
}) => {
  return (
    <div className="habit-section">
      <h2>{section.name}</h2>
      <HabitList
        habits={habits}
        updateProgress={updateProgress}
        updateFrequency={updateFrequency}
        removeHabit={removeHabit}
        frequency={section.frequency}
      />
    </div>
  );
};

export default HabitSection;