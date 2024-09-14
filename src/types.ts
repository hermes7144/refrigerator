export interface DateListProps {
  week: string[];
  selectedDate: string;
  onDateClick: (date: string) => void;
  onWeek:(shift:number) => void;
}

export interface DateItemProps {
  isSelected: boolean;
  weekday: string;
  onDateClick: (date: string) => void;
}