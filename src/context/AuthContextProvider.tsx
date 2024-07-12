import { createContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';
import { providerProps } from '../types/commonTypes';

interface AuthContextType {
  user: User | null;
  uid: string | null;
  login: () => void;
  logout: () => void;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: providerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    onUserStateChange((user: User | null) => {
      setUser(user);
      setIsAuthLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: (user && user.uid) ?? null, login, logout, isAuthLoading }}>{children}</AuthContext.Provider>;
}
