export interface DateListProps {
  week: string[];
  selectedDate: string;
  onDate: (date: string) => void;
  onWeek:(shift:number) => void;
}

export interface DateItemProps {
  isSelected: boolean;
  date: string;
  onDate: (date: string) => void;
}