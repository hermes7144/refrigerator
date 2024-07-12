import { User } from 'firebase/auth';
import { ChangeEvent } from 'react';

export type UserType = {
  user: User | null;
  uid: string | null;
  login: () => void;
  logout: () => void;
  isAuthLoading: boolean;
};

export type providerProps = {
  children: React.ReactNode;
};

export interface SearchInputProps {
  query:string;
  onChange: (target : ChangeEvent<HTMLInputElement>) => void;
}