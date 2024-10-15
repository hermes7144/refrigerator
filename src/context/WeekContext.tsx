import { useContext } from 'react';
import { WeekContext } from './WeekContextProvider';

export const useWeek = () => {
  return useContext(WeekContext);
};