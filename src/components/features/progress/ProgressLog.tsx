import { useState, useEffect } from 'react';
import { ProgressData } from '@/types/progress';
import { Goal } from '@/types/goal';
import { formatDate } from '@/lib/utils/formatters';
import { Card } from '@/components/ui/Card';

interface ProgressLogProps {
  progressData: ProgressData | null;
}

export const ProgressLog: React.FC<ProgressLogProps> = ({ progressData }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    if (progressData) {
      setGoals(progressData.goals);
      setWorkouts(progressData.workouts);
    }
  }, [progressData]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Progress Log</h2>
      <ul className="space-y-4">
        {goals.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-2">Goals</h3>
            {goals.map((goal) => (
              <li key={goal.id}>
                <p className="text-gray-700 font-medium">{goal.name}</p>
                <p className="text-gray-500">
                  Type: {goal.type}, Target: {goal.target}, Deadline: {formatDate(goal.deadline)}
                </p>
              </li>
            ))}
          </>
        )}
        {workouts.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-2">Workouts</h3>
            {workouts.map((workout) => (
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