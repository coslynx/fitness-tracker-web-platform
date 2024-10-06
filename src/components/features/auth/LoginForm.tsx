import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      setErrorMessage('Invalid email or password.');
      setIsLoading(false);
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Login</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Login">
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mt-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
}