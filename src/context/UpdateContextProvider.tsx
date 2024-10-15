import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { providerProps } from '../types/commonTypes';

interface UpdateContextInterface {
  hasUpdated: boolean;
  setHasUpdated: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: UpdateContextInterface = {
  hasUpdated: false,
  setHasUpdated: () => {}
}

export const UpdateContext = createContext<UpdateContextInterface>(defaultContextValue);

export const UpdateProvider = ({ children }: providerProps) => {
  const [hasUpdated, setHasUpdated] = useState(false);

  return (
    <UpdateContext.Provider value={{ hasUpdated, setHasUpdated }}>
      {children}
    </UpdateContext.Provider>
  );
};
