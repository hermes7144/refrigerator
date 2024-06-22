import { FC, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getWeekDates } from '../ts/util';
import {DateList} from '../components/date/DateList';
import { MealList } from '../components/meal/MealList';


export const Home: FC = () => {
  const week = getWeekDates();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const handleDateClick = (date: Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');

    setSelectedDate(formattedDate);
    const target = scrollRefs.current[formattedDate];    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-col items-center px-4'>
      <DateList week={week} selectedDate={selectedDate} onDateClick={handleDateClick} />
      <MealList week={week} scrollRefs={scrollRefs} selectedDate={selectedDate} />
    </div>
  );
};




