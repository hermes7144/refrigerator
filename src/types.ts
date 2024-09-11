import { Dayjs } from 'dayjs';

export interface DateListProps {
  week: Dayjs[];
  selectedDate: string;
  onDateClick: (date: Dayjs) => void;
  onWeek:(shift:number) => void;
}

export interface DateItemProps {
  selected: string;
  weekday: Dayjs;
  handleClick: (date: Dayjs) => void;
}