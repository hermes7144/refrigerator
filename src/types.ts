export interface DateListProps {
  selectedDate: string;
  onDate: (date: string) => void;
}

export interface DateItemProps {
  isSelected: boolean;
  date: string;
  onDate: (date: string) => void;
}