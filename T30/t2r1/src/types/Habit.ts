export interface Habit {
  id: number;
  name: string;
  color: string;
  goal: number; 
  progress: number;
  frequency: 'daily' | 'weekly';
}
