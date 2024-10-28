import { useCallback, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/common/ErrorFallback';
import DateList from '../components/date/DateList';
import dayjs from 'dayjs';
import { useCopyContext } from '../context/CopyContext';
import { useWeek } from '../context/WeekContext';
import MealSection from '../components/meal/MealSection';
import MealHeader from '../components/meal/MealHeader';

export default function Home() {
  const today = dayjs().format('YYYYMMDD');
  const [selectedDate, setSelectedDate] = useState(today);
  const scrollRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({});
  const { copy, setCopy } = useCopyContext();
  const handleCancelCopy = () => setCopy(null);
  const { week } = useWeek();

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
    <div className='flex flex-col items-center px-4'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DateList selectedDate={selectedDate} onDate={handleDate} />
        <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-60 mt-24'>
          {week.map((date) => (
            <li key={date}>
              <MealHeader
                ref={(el) => (scrollRefs.current[date] = el)}
                date={date}
                selected={selectedDate === date}
              />
              <MealSection date={date} />
            </li>
          ))}
        </ul>
        {copy && (
          <div className='flex w-full justify-center fixed top-40 z-10 mt-2'>
            <button className='btn btn-error text-white' onClick={handleCancelCopy}>
              선택한 식단 취소하기
            </button>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}