import { useQuery } from '@tanstack/react-query';
import { getProgress } from '@/lib/api/client';
import { ProgressData } from '@/types/progress';

export const useProgress = (userId: string) => {
  const { data: progressData, isLoading, error } = useQuery(
    ['progress', userId],
    () => getProgress(userId),
  );

  return {
    progressData,
    isLoading,
    error,
  };
};