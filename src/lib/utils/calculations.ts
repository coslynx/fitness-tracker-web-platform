import { Workout } from '@/types/progress';

export const calculateAverageWorkoutDuration = (workouts: Workout[]): number => {
  if (workouts.length === 0) {
    return 0;
  }
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  return totalDuration / workouts.length;
};

export const calculateTotalWorkoutTime = (workouts: Workout[]): number => {
  if (workouts.length === 0) {
    return 0;
  }
  return workouts.reduce((sum, workout) => sum + workout.duration, 0);
};

export const calculateTotalWorkoutsByType = (workouts: Workout[], type: string): number => {
  if (workouts.length === 0) {
    return 0;
  }
  return workouts.filter((workout) => workout.type === type).length;
};

export const calculateMostFrequentWorkoutType = (workouts: Workout[]): string | null => {
  if (workouts.length === 0) {
    return null;
  }
  const workoutTypes = workouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let mostFrequentType = null;
  let maxCount = 0;

  for (const type in workoutTypes) {
    if (workoutTypes[type] > maxCount) {
      mostFrequentType = type;
      maxCount = workoutTypes[type];
    }
  }

  return mostFrequentType;
};