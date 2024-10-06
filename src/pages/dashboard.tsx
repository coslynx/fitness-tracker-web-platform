import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getGoals, getProgress, getUser } from '@/lib/api/client';
import { DashboardStats } from '@/components/features/dashboard/DashboardStats';
import { RecentActivity } from '@/components/features/dashboard/RecentActivity';
import { UserCard } from '@/components/features/dashboard/UserCard';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (user && session) {
      const fetchUserData = async () => {
        try {
          setIsLoading(true);
          const userData = await getUser(user.id);
          const goalData = await getGoals(user.id);
          const progressData = await getProgress(user.id);

          setUser(userData);
          setGoals(goalData);
          setProgress(progressData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Failed to fetch user data');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user, session]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex justify-center items-center h-48">
            {/* Spinner component */}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <UserCard user={user} />
          <DashboardStats goals={goals} progress={progress} />
          <RecentActivity goals={goals} progress={progress} />
        </div>
      </div>
    </main>
  );
}