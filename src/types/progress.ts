import { Goal } from './goal';
import { Workout } from './workout';

export interface ProgressData {
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  goals: Goal[];
  workouts: Workout[];
}