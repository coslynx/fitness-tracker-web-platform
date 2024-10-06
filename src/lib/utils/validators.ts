import { Goal } from '@/types/goal';
import { Workout } from '@/types/progress';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value);

export const isDate = (value: unknown): value is Date =>
  value instanceof Date && !isNaN(value.getTime());

export const isGoalType = (value: unknown): value is Goal['type'] =>
  isString(value) && ['weight-loss', 'muscle-gain', 'distance-running'].includes(value);

export const isWorkoutType = (value: unknown): value is Workout['type'] =>
  isString(value) && ['cardio', 'strength', 'yoga', 'other'].includes(value);

export const isWorkoutIntensity = (value: unknown): value is Workout['intensity'] =>
  isString(value) && ['low', 'medium', 'high'].includes(value);

export const isValidGoal = (goal: Goal): boolean => {
  if (!isString(goal.name) || goal.name.trim() === '') {
    return false;
  }
  if (!isGoalType(goal.type)) {
    return false;
  }
  if (!isString(goal.target) || goal.target.trim() === '') {
    return false;
  }
  if (!isDate(goal.deadline)) {
    return false;
  }
  return true;
};

export const isValidWorkout = (workout: Workout): boolean => {
  if (!isWorkoutType(workout.type)) {
    return false;
  }
  if (!isDate(workout.date)) {
    return false;
  }
  if (!isNumber(workout.duration)) {
    return false;
  }
  if (!isWorkoutIntensity(workout.intensity)) {
    return false;
  }
  return true;
};