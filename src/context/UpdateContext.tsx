import { useContext } from 'react';
import { UpdateContext } from './UpdateContextProvider';

export default function useUpdateStatus() {
  return useContext(UpdateContext);
}
