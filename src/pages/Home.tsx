import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import DateList from '../components/date/DateList';
import { MealList } from '../components/meal/MealList';
import { MealListSkeleton } from '../components/meal/MealListSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/common/ErrorFallback';
import dayjs from 'dayjs';
import { CopyProvider } from '../context/CopyContextProvider';
 
export default function Home() {
  const today = dayjs().format('YYYYMMDD');
  const [selectedDate, setSelectedDate] = useState(today);
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

  useEffect(() => {
    scrollToDate(today);
    setSelectedDate(today);
  }, [today, scrollToDate]);

  return (
    <CopyProvider>
        <div className='flex flex-col items-center px-4'>
          <DateList selectedDate={selectedDate} onDate={handleDate} />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            // Suspense를 각각 mealList로 그려줘야 하나
            <Suspense fallback={<MealListSkeleton scrollRefs={scrollRefs} selectedDate={selectedDate} />}>
              <MealList scrollRefs={scrollRefs} selectedDate={selectedDate} />
            </Suspense>
          </ErrorBoundary>
        </div>
    </CopyProvider>
  );
}
