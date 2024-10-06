import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { getGoals, getProgress } from '@/lib/api/client';
import { Goal } from '@/types/goal';
import { ProgressData } from '@/types/progress';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/formatters';

interface DashboardStatsProps {
  goals: Goal[];
  progress: ProgressData | null;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  goals,
  progress,
}) => {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (progress) {
      setTotalWorkouts(progress.workouts.length);
    }
  }, [progress]);

  useEffect(() => {
    if (goals) {
      const completedGoalsCount = goals.filter(
        (goal) => goal.status === 'completed'
      ).length;
      setCompletedGoals(completedGoalsCount);
    }
  }, [goals]);

  useEffect(() => {
    if (progress && goals) {
      const completedGoalsCount = goals.filter(
        (goal) => goal.status === 'completed'
      ).length;

      const totalGoals = goals.length;

      const progressPercent =
        (completedGoalsCount / totalGoals) * 100 || 0;

      setProgressPercentage(progressPercent);
    }
  }, [progress, goals]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-gray-700">
            {totalWorkouts}
          </p>
          <p className="text-gray-500">Total Workouts</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-gray-700">
            {completedGoals}
          </p>
          <p className="text-gray-500">Completed Goals</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-gray-700">
            {progressPercentage}%
          </p>
          <p className="text-gray-500">Progress</p>
        </div>
      </div>
    </Card>
  );
};