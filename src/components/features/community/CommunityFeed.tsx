import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { getFollowingUsers, getUserProgress } from '@/lib/api/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User } from '@/types/user';
import { ProgressData } from '@/types/progress';
import { ProgressChart } from '@/components/features/progress/ProgressChart';
import { ProgressLog } from '@/components/features/progress/ProgressLog';
import { formatDate } from '@/lib/utils/formatters';

interface CommunityFeedProps {
  followingUsers: User[];
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  followingUsers,
}) => {
  const { data: session } = useSession();
  const { setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<ProgressData[]>([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setIsLoading(true);
        const progressData = await Promise.all(
          followingUsers.map((user) => getUserProgress(user.id))
        );
        setUserProgress(progressData);
      } catch (error) {
        console.error('Error fetching user progress:', error);
        toast.error('Failed to fetch following user progress');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProgress();
  }, [followingUsers]);

  if (isLoading || userProgress.length === 0) {
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
      <h2 className="text-xl font-bold mb-4">Community Feed</h2>
      <ul className="space-y-4">
        {userProgress.map((progress) => (
          <li key={progress.user.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img
                src={progress.user.avatarUrl || '/images/placeholder-image.png'}
                alt={progress.user.name}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="text-lg font-bold">{progress.user.name}</h3>
            </div>
            {progress.goals.length > 0 && (
              <>
                <h4 className="text-gray-700 font-medium">Goals</h4>
                <ul className="space-y-1">
                  {progress.goals.map((goal) => (
                    <li key={goal.id}>
                      <p className="text-gray-600">
                        {goal.name} - Type: {goal.type}, Target: {goal.target}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {progress.workouts.length > 0 && (
              <>
                <h4 className="text-gray-700 font-medium">Recent Workouts</h4>
                <ul className="space-y-1">
                  {progress.workouts.slice(0, 3).map((workout) => (
                    <li key={workout.id}>
                      <p className="text-gray-600">
                        {workout.type} - {formatDate(workout.date)}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="flex justify-between items-center mt-2">
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => {}}
              >
                View Profile
              </Button>
              {session && session.user.id !== progress.user.id && (
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => {}}
                >
                  Follow
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};