import useSidebarContext from '../../context/SidebarContext';
import { providerProps } from '../../types/commonTypes';

export default function ToggleWrapper({ children }: providerProps) {
  const { broken, setToggled } = useSidebarContext();

  return (
    <div className='flex-1 p-4'>
      {broken && (
        <button className='btn' onClick={() => setToggled(true)}>
          Toggle
        </button>
      )}
      {children}
    </div>
  );
}
