import { createContext, useState } from 'react';
import { getWeekDates } from '../utils/utils';
import { providerProps } from '../types/commonTypes';


interface UpdateContextInterface {
  week: string[];
  handleShift: (weekshift:number) => void;
}

const defaultContextValue: UpdateContextInterface = {
  week: [],
  handleShift: () => {}
}
 
export const WeekContext = createContext<UpdateContextInterface>(defaultContextValue);


export const WeekProvider = ({ children }: providerProps) => {
  const [shift, setShift] = useState(0);

  const week = getWeekDates(shift);

  const handleShift = (weekShift: number) => {
    setShift((prev) => prev + weekShift);
  };

  return (
    <WeekContext.Provider value={{ week, handleShift }}>
      {children}
    </WeekContext.Provider>
  );
};
