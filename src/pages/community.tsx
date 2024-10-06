import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { getFollowingUsers } from '@/lib/api/client';
import { CommunityFeed } from '@/components/features/community/CommunityFeed';
import { UserProfile } from '@/components/features/community/UserProfile';

export default function CommunityPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]);

  const { user } = useStore();

  useEffect(() => {
    if (user && session) {
      const fetchFollowing = async () => {
        try {
          setIsLoading(true);
          const data = await getFollowingUsers(user.id);
          setFollowingUsers(data);
        } catch (error) {
          console.error('Error fetching following users:', error);
          toast.error('Failed to fetch following users');
        } finally {
          setIsLoading(false);
        }
      };

      fetchFollowing();
    }
  }, [user, session]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container">
          <h1 className="text-4xl font-bold">Community</h1>
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
        <h1 className="text-4xl font-bold">Community</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {followingUsers.map((user) => (
            <UserProfile key={user.id} user={user} />
          ))}
        </div>
        <CommunityFeed />
      </div>
    </main>
  );
}