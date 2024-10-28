import { FC, memo } from 'react';
import dayjs from 'dayjs';

interface DateHeaderProps {
  scrollRef: (el: HTMLHeadingElement | null) => void;
  date: string;
  selected: boolean;
}

const DateHeader: FC<DateHeaderProps> = ({ scrollRef, date, selected }) => {
  return (
    <h2 ref={scrollRef} className={`flex items-center gap-1 text-lg font-semibold ${selected && 'text-brand'}`}>
      {dayjs(date).format('M.D ddd요일')}
    </h2>
  );
};

export default memo(DateHeader);
