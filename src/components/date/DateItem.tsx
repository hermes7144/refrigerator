import { FC, useState } from 'react';
import { DateItemProps } from '../../types';

export const DateItem: FC<DateItemProps> = ({ selected, weekday, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selected === weekday.format('YYYY-MM-DD');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const itemClass = isSelected ? 'bg-blue-500 text-white' : 'bg-slate-300 text-gray-600';
  const hoverClass = isHovered ? 'scale-110' : '';

  return (
    <li className={`flex flex-col items-center cursor-pointer transform transition-transform duration-200 ${hoverClass}`}   onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}onClick={() => handleClick(weekday)}>
      <span className='text-gray-600 font-bold'>{weekday.format('ddd')}</span>
      <div className={`flex items-center justify-center rounded-full w-10 h-10 text-xl mt-2 font-bold p-2 ${itemClass}`}>
        {weekday.format('DD')}
      </div>
    </li>
  );
};
