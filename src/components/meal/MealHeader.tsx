import { forwardRef, Ref } from 'react';
import dayjs from 'dayjs';

interface MealHeaderProps {
  date: string;
  selected: boolean;
}

const MealHeader = forwardRef(({ date, selected }: MealHeaderProps, ref: Ref<HTMLHeadingElement>) => {
    return (
      <h2 ref={ref} className={`flex items-center gap-1 text-lg font-semibold ${selected ? 'text-brand' : ''}`}>
        {dayjs(date).format('M.D ddd요일')}
      </h2>
    );
  }
);

export default MealHeader;