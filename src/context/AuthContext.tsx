import { useContext } from 'react';
import { User } from 'firebase/auth';
import { AuthContext } from './AuthContextProvider';

export type UserType = {
  user: User | null;
  uid: string | null;
  login: () => void;
  logout: () => void;
  isAuthLoading: boolean;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
