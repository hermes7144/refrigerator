import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { providerProps } from '../types/commonTypes';

interface SidebarContextInterface {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  broken: boolean;
  setBroken: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: SidebarContextInterface = {
  toggled: false,
  setToggled: () => {},
  broken: false,
  setBroken: () => {},
};
export const SidebarContext = createContext<SidebarContextInterface>(defaultContextValue);

export function SidebarProvider({ children }: providerProps) {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return <SidebarContext.Provider value={{ toggled, setToggled, broken, setBroken }}>{children}</SidebarContext.Provider>;
}
