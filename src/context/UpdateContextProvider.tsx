import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { providerProps } from '../types/commonTypes';

interface UpdateContextType {
  hasUpdated: boolean;
  setHasUpdated: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: UpdateContextType ={
  hasUpdated: false,
  setHasUpdated: () => {}
}

export const UpdateContext = createContext(defaultContextValue);

export const UpdateProvider = ({ children }: providerProps) => {
  const [hasUpdated, setHasUpdated] = useState(false);

  return (
    <UpdateContext.Provider value={{ hasUpdated, setHasUpdated }}>
      {children}
    </UpdateContext.Provider>
  );
};
