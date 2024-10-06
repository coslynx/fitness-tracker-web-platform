import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { getUser, getProgress } from '@/lib/api/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User } from '@/types/user';
import { ProgressData } from '@/types/progress';
import { ProgressChart } from '@/components/features/progress/ProgressChart';
import { ProgressLog } from '@/components/features/progress/ProgressLog';
import { formatDate } from '@/lib/utils/formatters';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { data: session } = useSession();
  const { setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser(user.id);
        const progressData = await getProgress(user.id);

        setUser(userData);
        setProgressData(progressData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user.id]);

  if (isLoading || !progressData) {
    return (
      <Card className="h-full p-4">
        <div className="flex justify-center items-center h-full">
          {/* Spinner component */}
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center mb-4">
          <img
            src={user.avatarUrl || '/images/placeholder-image.png'}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <h3 className="text-lg font-bold mt-2">{user.name}</h3>
        </div>
        <div className="space-y-2">
          <p className="text-gray-600">
            Joined: {formatDate(user.createdAt)}
          </p>
          <p className="text-gray-600">
            Last Active: {formatDate(user.updatedAt)}
          </p>
          {progressData.goals.length > 0 && (
            <>
              <h4 className="text-gray-700 font-medium">Goals</h4>
              <ul className="space-y-1">
                {progressData.goals.map((goal) => (
                  <li key={goal.id}>
                    <p className="text-gray-600">
                      {goal.name} - Type: {goal.type}, Target: {goal.target}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {progressData.workouts.length > 0 && (
            <>
              <h4 className="text-gray-700 font-medium">Recent Workouts</h4>
              <ul className="space-y-1">
                {progressData.workouts.slice(0, 3).map((workout) => (
                  <li key={workout.id}>
                    <p className="text-gray-600">
                      {workout.type} - {formatDate(workout.date)}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {/* Add more user data and actions here */}
          {session && session.user.id !== user.id && (
            <Button variant="primary" className="mt-4" onClick={() => {}}>
              Follow
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};