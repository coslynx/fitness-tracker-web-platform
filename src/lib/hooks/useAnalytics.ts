import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '@/lib/api/client';

export const useAnalytics = () => {
  const { data: analyticsData, isLoading, error } = useQuery(
    ['analytics'],
    () => getAnalytics(),
  );

  return {
    analyticsData,
    isLoading,
    error,
  };
};