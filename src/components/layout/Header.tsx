import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getUser } from '@/lib/api/client';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { user, setUser } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && session) {
      const fetchUserData = async () => {
        try {
          setIsLoading(true);
          const userData = await getUser(user.id);
          setUser(userData);
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

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <header className="bg-gray-100 p-4 rounded-md">
        {/* Spinner component */}
      </header>
    );
  }

  return (
    <header className="bg-gray-100 p-4 rounded-md">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <img
            src="/images/logo.svg"
            alt="Fitness Tracker Logo"
            className="w-24 h-24"
          />
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/goals">Goals</Link>
            </li>
            <li>
              <Link href="/progress">Progress</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
          </ul>
        </nav>
        {session && (
          <div className="flex gap-4">
            <Link href="/settings">
              <button className="btn primary-color">Settings</button>
            </Link>
            <button className="btn secondary-color" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        {!session && (
          <div className="flex gap-4">
            <Link href="/login">
              <button className="btn primary-color">Login</button>
            </Link>
            <Link href="/signup">
              <button className="btn secondary-color">Signup</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}