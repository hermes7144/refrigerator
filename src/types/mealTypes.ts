import  { Dayjs } from 'dayjs';
import { Ingredient } from './ingredientTypes';

export interface Meals {
  breakfast?: MealProps;
  lunch?: MealProps;
  dinner?: MealProps;
}

export interface MealProps {
  id?: string;
  name: MealType;
  date: string;
  ingredients: Ingredient[];
  done: boolean;
}

export interface EmptyMealProps {
  name: MealType;
}

export interface MealListProps {
  week: Dayjs[];
  selectedDate: string;
  meals?: MealsByDate ;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  isSkeleton?:boolean;
  onOpenDialog?: () => void;
}


export interface MealSectionProps {
  date: string;
  weekday: Dayjs;
  meals?: Meals;
  scrollRef: (el: HTMLDivElement | null) => void;
  isSkeleton?:boolean;
  onOpenDialog?: (meal:MealProps | EmptyMealProps, date:Dayjs) => void;
}

export interface MealsByDate {
  [date: string]: {
    breakfast?: MealProps;
    lunch?: MealProps;
    dinner?: MealProps;
  };
}

export interface MealItemProps {
  meal: MealProps;
  date: Dayjs;
  onOpenDialog: (meal:MealProps, date:Dayjs) => void;
}

export interface EmptyMealItemProps {
  meal:EmptyMealProps;
  date: Dayjs;
  onOpenDialog: (meal: {name: string }, date:Dayjs) => void;
}


export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface IMealDialogProps {
  meal:MealProps | EmptyMealProps;
  date:Dayjs;
  visible:boolean;
  onClose: ()=> void;
}