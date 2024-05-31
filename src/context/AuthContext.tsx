import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from '@firebase/auth';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type UserType = {
  user?: User;
  uid?: string;
  login: () => void;
  logout: () => void;
  isAuthLoading: boolean;
};

export const AuthContext = createContext<UserType | null>(null);

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
      setIsAuthLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout, isAuthLoading }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
