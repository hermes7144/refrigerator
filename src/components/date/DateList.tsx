import { FC } from 'react';
import { DateItem } from './DateItem';
import { DateListProps } from '../../types';

export const DateList: FC<DateListProps> = ({ week, selectedDate, onDateClick }) => (

  <ul className='flex w-full justify-center gap-2 p-2'>
    {week.map((weekday) => <DateItem key={weekday.format('YYYY-MM-DD')} selected={selectedDate} weekday={weekday} handleClick={onDateClick} />  )}
  </ul>
);
