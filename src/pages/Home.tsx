import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import DateList from '../components/date/DateList';
import { MealList } from '../components/meal/MealList';
import { getWeekDates } from '../utils/utils';
import { MealListSkeleton } from '../components/meal/MealListSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/common/ErrorFallback';
import dayjs from 'dayjs';

export default function Home() {
  const today = dayjs().format('YYYYMMDD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [shift, setShift] = useState(0); // Updated here

  const week = getWeekDates(shift);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});  

  const scrollToDate = useCallback((date: string) => {
    const target = scrollRefs.current[date];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, []);

  const handleDate = useCallback(
    (date: string) => {
      setSelectedDate(date);
      scrollToDate(date);
    },
    [scrollToDate]
  );

  const handleWeek = (weekShift: number) => {    
    setShift((prev) => prev + weekShift);
  };

  useEffect(() => {
    scrollToDate(today);
    setSelectedDate(today);
  }, [today, scrollToDate]);

  return (
    <div className='flex flex-col items-center px-4'>
      {/* <DateList week={week} selectedDate={selectedDate} onDate={handleDate} onWeek={handleWeek} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MealListSkeleton week={week} scrollRefs={scrollRefs} selectedDate={selectedDate} />}>
          <MealList week={week} scrollRefs={scrollRefs} selectedDate={selectedDate} />
        </Suspense>
      </ErrorBoundary> */}
    </div>
  );
}
