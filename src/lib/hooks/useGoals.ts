import { useQuery } from '@tanstack/react-query';
import { getGoals } from '@/lib/api/client';
import { Goal } from '@/types/goal';

export const useGoals = (userId: string) => {
  const { data: goals, isLoading, error } = useQuery<Goal[]>(
    ['goals', userId],
    () => getGoals(userId),
  );

  return {
    goals,
    isLoading,
    error,
  };
};