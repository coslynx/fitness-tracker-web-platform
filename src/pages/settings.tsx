import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/lib/api/client';

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length === 0) {
      toast.error('Please enter a password');
      return;
    }

    setIsLoading(true);

    try {
      const updatedUser = await updateUser({
        name,
        email,
        password,
      });

      if (updatedUser) {
        setUser(updatedUser);
        toast.success('Profile updated successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <h1 className="text-4xl font-bold">Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn primary-color"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}