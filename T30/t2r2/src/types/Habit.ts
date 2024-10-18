export interface Habit {
  id: number;
  name: string;
  color: string;
  goal: number;
  progress: number;
  frequency: string;
}

export interface HabitSection {
  id: number;
  name: string;
  frequency: string;
}
