import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        createdAt: new Date(session.user.createdAt),
        updatedAt: new Date(session.user.updatedAt),
        role: session.user.role,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const value: AuthContextType = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;