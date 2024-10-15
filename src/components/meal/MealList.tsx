import { FC } from 'react';
import { MealSection } from './MealSection';
import { MealListProps } from '../../types/mealTypes';
import { useCopyContext } from '../../context/CopyContext';
import { useWeek } from '../../context/WeekContext';

export const MealList: FC<MealListProps> = ({  selectedDate, scrollRefs }) => {
  const {copy, setCopy} = useCopyContext();
  const handleCancelCopy = () => setCopy(null);
  const { week } = useWeek();


  return (
    <>
      {copy && 
        <div className='flex w-full justify-center fixed top-40 z-10 mt-2'>
          <button className='btn btn-error text-white' onClick={handleCancelCopy}>선택한 식단 취소하기</button>
        </div>
      }
      <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-60 mt-24'>
        {week.map((date) => 
          <MealSection
          key={date}
          date={date}
          scrollRef={(el) => (scrollRefs.current[date] = el)}
          selected={selectedDate === date}
          />)}
      </ul>
    </>
  );
};
