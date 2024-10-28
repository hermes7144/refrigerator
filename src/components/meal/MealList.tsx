import { FC, memo } from 'react';
import { MealSection } from './MealSection';
import { MealListProps } from '../../types/mealTypes';
import { useWeek } from '../../context/WeekContext';
import MealHeader from './MealHeader';

 const MealList: FC<MealListProps> = ({ selectedDate, scrollRefs }) => {
  const { week } = useWeek();

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-60 mt-24'>
    {week.map((date) => 
      <li key={date}>
        <MealHeader scrollRef={(el) => (scrollRefs.current[date] = el)} date={date}  selected={selectedDate === date} />
        <MealSection date={date}/>
      </li>
    )}
  </ul>
  );
};

export default memo(MealList);