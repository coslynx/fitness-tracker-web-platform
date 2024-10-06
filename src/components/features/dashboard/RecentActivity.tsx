import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { getGoals, getProgress } from '@/lib/api/client';
import { Goal } from '@/types/goal';
import { ProgressData } from '@/types/progress';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/formatters';

interface RecentActivityProps {
  goals: Goal[];
  progress: ProgressData | null;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  goals,
  progress,
}) => {
  const [recentGoals, setRecentGoals] = useState<Goal[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    if (goals) {
      setRecentGoals(goals.slice(0, 3));
    }
  }, [goals]);

  useEffect(() => {
    if (progress) {
      setRecentWorkouts(progress.workouts.slice(0, 3));
    }
  }, [progress]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        {recentGoals.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-2">Goals</h3>
            {recentGoals.map((goal) => (
              <li key={goal.id}>
                <p className="text-gray-700 font-medium">{goal.name}</p>
                <p className="text-gray-500">
                  Type: {goal.type}, Target: {goal.target}, Deadline: {formatDate(goal.deadline)}
                </p>
              </li>
            ))}
          </>
        )}
        {recentWorkouts.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-2">Workouts</h3>
            {recentWorkouts.map((workout) => (
              <li key={workout.id}>
                <p className="text-gray-700 font-medium">
                  {workout.type} - {formatDate(workout.date)}
                </p>
                <p className="text-gray-500">
                  Duration: {workout.duration} minutes, Intensity: {workout.intensity}
                </p>
              </li>
            ))}
          </>
        )}
      </ul>
    </Card>
  );
};

interface Workout {
  id: string;
  type: string;
  date: Date;
  duration: number;
  intensity: string;
}