import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProgress } from '@/lib/api/client';
import { ProgressChart } from '@/components/features/progress/ProgressChart';
import { ProgressLog } from '@/components/features/progress/ProgressLog';

export default function ProgressPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    if (user && session) {
      const fetchProgress = async () => {
        try {
          setIsLoading(true);
          const data = await getProgress(user.id);
          setProgressData(data);
        } catch (error) {
          console.error('Error fetching progress:', error);
          toast.error('Failed to fetch progress');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProgress();
    }
  }, [user, session]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container">
          <h1 className="text-4xl font-bold">Progress</h1>
          <div className="flex justify-center items-center h-48">
            {/* Spinner component */ }
          </div>
        </div>
      </main>
    );
  }

  if (!progressData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container">
          <h1 className="text-4xl font-bold">Progress</h1>
          <p className="text-lg mt-4">
            No progress data available yet. Start logging workouts and setting goals to see your progress!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <h1 className="text-4xl font-bold">Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <ProgressChart progressData={progressData} />
          </div>
          <div>
            <ProgressLog progressData={progressData} />
          </div>
        </div>
      </div>
    </main>
  );
}