import { ChangeEvent } from 'react';

export interface SearchInputProps {
  query:string;
  onChange: (target : ChangeEvent<HTMLInputElement>) => void;
}