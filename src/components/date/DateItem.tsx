import { FC } from 'react';
import { DateItemProps } from '../../types';

export const DateItem: FC<DateItemProps> = ({ selected, weekday, handleClick }) => {
  const isSelected = selected === weekday.format('YYYY-MM-DD');
  return (
    <li className={'flex flex-col items-center cursor-pointer'} onClick={() => handleClick(weekday)}>
      <span className='text-gray-600 font-bold'>{weekday.format('ddd')}</span>
      <div className={`flex items-center justify-center rounded-full w-10 h-10 text-xl mt-2 font-bold p-2 ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-300 text-gray-600'}`}>
        {weekday.format('DD')}
      </div>
    </li>
  );
};
