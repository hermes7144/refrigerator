import { FC, useState } from 'react';
import { MealItem } from './MealItem';
import { MealSectionProps, MealType } from '../../types/mealTypes';
import { EmptyMealItem } from './EmptyMealItem';
import dayjs from 'dayjs';

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner'];

export const MealSection: FC<MealSectionProps> = ({ date, meals, scrollRef ,selected}) => {
  const [copy, setCopy] = useState();
  const [pasted, setPasted] = useState<boolean>(false); // 붙여넣기 성공 여부

  const handleCopy = (meal) => {
    setCopy(meal);
    setPasted(false); // 복사할 때 붙여넣기 상태 초기화
  };

  const handlePaste = () => {
    if (copy) {
      console.log(copy);
      setPasted(true); // 붙여넣기가 성공했음을 나타냄
    }
  };

  return (
    <div ref={scrollRef} className='flex flex-col gap-2 p-4'>
      <div className='flex items-center gap-1'>
        {selected && (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={5} d='M9 5l7 7-7 7' />
          </svg>
        )}
        <h2 className='text-lg font-semibold'>{dayjs(date).format('M/D ddd요일')}</h2>
      </div>
      {MEAL_TYPES.map(mealType => { 
        const meal = meals?.[mealType];
        return meal ? <MealItem key={mealType} meal={meal} date={date} onCopy={handleCopy}  onPaste={handlePaste}  />: <EmptyMealItem key={mealType} meal={{name:mealType}} date={date} onPaste={handlePaste}/>;
      })}
    </div>
  );
};
