import {  useCallback, useEffect, useRef, useState, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import DateList from '../components/date/DateList';
import MealList from '../components/meal/MealList';
import ErrorFallback from '../components/common/ErrorFallback';
import { CopyProvider } from '../context/CopyContextProvider';
import dayjs from 'dayjs';
 
export default function Home() {
  const today = dayjs().format('YYYYMMDD');
  const [selectedDate, setSelectedDate] = useState(today);
  const scrollRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});  

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

  useEffect(() => {
    scrollToDate(today);
    setSelectedDate(today);
  }, [today, scrollToDate]);

  // TODO
  const MemoizedDateList = memo(DateList);
  const MemoizedMealList = memo(MealList);

  return (
    <CopyProvider>
        <div className='flex flex-col items-center px-4'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MemoizedDateList selectedDate={selectedDate} onDate={handleDate} />
            <MemoizedMealList scrollRefs={scrollRefs} selectedDate={selectedDate} />
          </ErrorBoundary>
        </div>
    </CopyProvider>
  );
}
