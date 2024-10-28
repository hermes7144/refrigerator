import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { FC, memo } from 'react';

const WeekNavigationButton: FC<{ 
  onClick: () => void; 
  ariaLabel: string; 
  direction: 'left' | 'right';
}> = ({ onClick, ariaLabel ,direction}) => {

  return (
    <button onClick={onClick} aria-label={ariaLabel} className="desktop-button">
      {direction === 'right'?  <FaArrowRight />:<FaArrowLeft />}
    </button>
  );
};

export default memo(WeekNavigationButton);