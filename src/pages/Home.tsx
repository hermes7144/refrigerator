import { Suspense, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {DateList} from '../components/date/DateList';
import { MealList } from '../components/meal/MealList';
import { getWeekDates } from '../utils/utils';
import { MealListSkeleton } from '../components/meal/MealListSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/common/ErrorFallback';

export default function Home() {
  const week = getWeekDates();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const handleDateClick = (date: Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');

    setSelectedDate(formattedDate);
    const target = scrollRefs.current[formattedDate];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' ,inline: 'center' });
    }
  };

  useEffect(() => {
    const target = scrollRefs.current[dayjs().format('YYYY-MM-DD')];    
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' ,inline: 'center' });
    }
    setSelectedDate(dayjs().format('YYYY-MM-DD'));
  },[]);
   
  return (
    <div className='flex flex-col items-center px-4'>
      <DateList week={week} selectedDate={selectedDate} onDateClick={handleDateClick} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MealListSkeleton week={week} scrollRefs={scrollRefs} selectedDate={selectedDate} />}>
          <MealList week={week} scrollRefs={scrollRefs} selectedDate={selectedDate} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
