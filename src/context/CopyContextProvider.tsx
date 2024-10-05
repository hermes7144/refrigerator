import { useState, ReactNode } from 'react';
import CopyContext from './CopyContext'; // import the context
import { MealProps } from '../types/mealTypes';

// Provider 생성
export const CopyProvider = ({ children }: { children: ReactNode }) => {
  const [copy, setCopy] = useState<MealProps | null>(null);

  return (
    <CopyContext.Provider value={{ copy, setCopy }}>
      {children}
    </CopyContext.Provider>
  );
};
