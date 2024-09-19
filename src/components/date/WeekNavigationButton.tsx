import { FC, ReactNode } from 'react';

const WeekNavigationButton: FC<{ 
  onClick: () => void; 
  ariaLabel: string; 
  icon: ReactNode;
  isVisible: boolean;
}> = ({ onClick, ariaLabel, icon, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button onClick={onClick} aria-label={ariaLabel} className="desktop-button">
      {icon}
    </button>
  );
};

export default WeekNavigationButton;