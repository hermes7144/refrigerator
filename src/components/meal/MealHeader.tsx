import { forwardRef, Ref } from 'react';
import dayjs from 'dayjs';

interface MealHeaderProps {
  date: string;
  selected: boolean;
}

// forwardRef를 사용하여 ref를 인자로 받는 컴포넌트로 변경
const MealHeader = forwardRef(
  ({ date, selected }: MealHeaderProps, ref: Ref<HTMLHeadingElement>) => {
    return (
      <h2 ref={ref} className={`flex items-center gap-1 text-lg font-semibold ${selected ? 'text-brand' : ''}`}>
        {dayjs(date).format('M.D ddd요일')}
      </h2>
    );
  }
);

export default MealHeader;