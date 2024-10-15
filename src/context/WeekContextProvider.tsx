import { createContext, useState } from 'react';
import { getWeekDates } from '../utils/utils';
import { providerProps } from '../types/commonTypes';


interface UpdateContextInterface {
  week: string[];
  handleWeek: (weekshift:number) => void;
}

const defaultContextValue: UpdateContextInterface = {
  week: [],
  handleWeek: () => {}
}
 
export const WeekContext = createContext<UpdateContextInterface>(defaultContextValue);


export const WeekProvider = ({ children }: providerProps) => {
  const [shift, setShift] = useState(0);

  const week = getWeekDates(shift);

  const handleWeek = (weekShift: number) => {
    setShift((prev) => prev + weekShift);
  };

  return (
    <WeekContext.Provider value={{ week, handleWeek }}>
      {children}
    </WeekContext.Provider>
  );
};
