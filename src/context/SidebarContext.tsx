import { useContext } from 'react';
import { SidebarContext } from './SidebarContextProvider';

export default function useSidebarContext() {
  return useContext(SidebarContext);
}
