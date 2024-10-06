import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createUser } from '@/lib/api/client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export default function SignupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (password !== passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await createUser({
        name,
        email,
        password,
      });
      toast.success('Account created successfully!');
      router.push('/login');
    } catch (error) {
      setErrorMessage('An error occurred while creating your account.');
      setIsLoading(false);
      console.error('Error creating user:', error);
    }
  };

  if (session) {
    router.push('/dashboard');
    return null;
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Signup</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Signup">
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mt-4">
              <Input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <Input
                label="Confirm Password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                  {isLoading ? 'Creating...' : 'Signup'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
}