import { FC, useState } from 'react';
import { DateItemProps } from '../../types';
import dayjs from 'dayjs';

export const DateItem: FC<DateItemProps> = ({ isSelected, weekday, onDateClick }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    onMouseLeave={handleMouseLeave} onClick={() => onDateClick(weekday)}>
      <span className='text-gray-600 font-bold'>{dayjs(weekday).format('ddd')}</span>
      <div className={`flex items-center justify-center rounded-full w-10 h-10 text-xl mt-2 font-bold p-2 ${itemClass}`}>
        {dayjs(weekday).format('DD')}
      </div>
    </li>
  );
};
