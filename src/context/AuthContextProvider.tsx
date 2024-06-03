import { createContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';
import { UserType } from './AuthContext';

export const AuthContext = createContext<UserType | null>(null);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    onUserStateChange((user: User | null) => {
      setUser(user);
      setIsAuthLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: (user && user.uid) ?? null, login, logout, isAuthLoading }}>{children}</AuthContext.Provider>;
}
