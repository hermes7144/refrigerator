import React, { useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import MealItem from '../components/MealItem';
import useMeals from '../hooks/useMeals';
import { getWeekDates } from '../ts/util';
import { MealsByDate } from '../types/mealTypes';

dayjs.locale('ko');

// 홈 컴포넌트
const Home: React.FC = () => {
  const {
    mealsQuery: { data: meals, isError },
  } = useMeals();
  const week = getWeekDates();
  const scrollRefs = useRef<(HTMLDivElement | null)[]>(Array(week.length).fill(null));

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  // 스크롤 애니메이션 핸들러
  const handleScrollToDate = (index: number) => {
    const target = scrollRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isError) {
    return <div>Error loading meals</div>;
  }

  return (
    <div className='px-4'>
      <div className='flex flex-col items-center'>
        {/* 날짜 목록 */}
        <ul className='flex w-full justify-center gap-2 p-2'>
          {week.map((weekday, i) => (
            <DateItem key={i} date={selectedDate} weekday={weekday} onClick={(selectedDate: Dayjs) => setSelectedDate(selectedDate.format('YYYY-MM-DD'))} scrollTo={() => handleScrollToDate(i)} />
          ))}
        </ul>
        {/* 식사 섹션 목록 */}
        <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-40'>
          {week.map((weekday, i) => (
            <MealSection key={i} date={selectedDate} weekday={weekday} meals={meals} scrollRef={(el) => (scrollRefs.current[i] = el)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// 날짜 아이템 컴포넌트
const DateItem: React.FC<{ date: string; weekday: dayjs.Dayjs; onClick: (date: Dayjs) => void; scrollTo: () => void }> = ({ date, weekday, onClick, scrollTo }) => {
  return (
    <li
      className={'flex flex-col items-center cursor-pointer'}
      onClick={() => {
        scrollTo();
        onClick(weekday);
      }}>
      <span className='text-gray-600 text-xs'>{dayjs(weekday).format('ddd')}</span>
      <div className={`flex items-center justify-center rounded-full w-10 h-10 text-xl mt-2 p-2 ${date === weekday.format('YYYY-MM-DD') ? 'bg-blue-500 text-white' : 'bg-slate-300 text-gray-600'}`}>{dayjs(weekday).format('DD')}</div>
    </li>
  );
};

// 식사 섹션 컴포넌트
const MealSection: React.FC<{ date: string; weekday: dayjs.Dayjs; meals: MealsByDate | undefined; scrollRef: (el: HTMLDivElement | null) => void }> = ({ date, weekday, meals, scrollRef }) => {
  const formattedDate = dayjs(weekday).format('YYYY-MM-DD');
  const mealsForDate = meals?.[formattedDate] || {};

  return (
    <div ref={scrollRef} className='flex flex-col gap-2 p-4 relative'>
      <div className='flex'>
        {date === formattedDate && (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        )}
        <h2 className='text-lg font-semibold'>{`${dayjs(weekday).format('M월 D일 ddd요일')}`}</h2>
      </div>
      <MealItem meal='breakfast' date={formattedDate} meals={mealsForDate.breakfast || null} />
      <MealItem meal='lunch' date={formattedDate} meals={mealsForDate.lunch || null} />
      <MealItem meal='dinner' date={formattedDate} meals={mealsForDate.dinner || null} />
    </div>
  );
};

export default Home;
