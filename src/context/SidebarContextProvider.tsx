import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { providerProps } from '../types/commonTypes';

interface SidebarContextType {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  broken: boolean;
  setBroken: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: SidebarContextType = {
  toggled: false,
  setToggled: () => {},
  broken: false,
  setBroken: () => {},
};
export const SidebarContext = createContext<SidebarContextType>(defaultContextValue);

export function SidebarProvider({ children }: providerProps) {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return <SidebarContext.Provider value={{ toggled, setToggled, broken, setBroken }}>{children}</SidebarContext.Provider>;
}
