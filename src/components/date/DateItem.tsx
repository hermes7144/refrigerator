import { FC } from 'react';
import { DateItemProps } from '../../types';
import dayjs from 'dayjs';

export const DateItem: FC<DateItemProps> = ({ isSelected, date, onDate }) => {
  const itemClass = isSelected ? 'bg-blue-500 text-white' : 'bg-slate-300 text-gray-600';

  return (
    <li className={`flex flex-col items-center cursor-pointer`} onClick={() => onDate(date)}>
      <span className='text-gray-600 font-bold'>{dayjs(date).format('ddd')}</span>
      <div className={`flex items-center justify-center rounded-full w-10 h-10 text-xl mt-2 font-bold p-2 transition-transform duration-300 ${itemClass} hover:scale-110 hover:shadow-lg`}>
        {dayjs(date).format('DD')}
      </div>
    </li>
  );
};