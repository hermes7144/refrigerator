import { ReactComponent as Breakfast } from '../../assets/image/breakfast.svg';
import { ReactComponent as BreakfastDone } from '../../assets/image/breakfastDone.svg';
import { ReactComponent as Lunch } from '../../assets/image/lunch.svg';
import { ReactComponent as LunchDone } from '../../assets/image/lunchDone.svg';
import { ReactComponent as Dinner } from '../../assets/image/dinner.svg';
import { ReactComponent as DinnerDone } from '../../assets/image/dinnerDone.svg';

import { Meal } from '../../types/mealTypes';

interface MealImageProps {
  meal: Meal | { name: string; done?: boolean };
}

export const MealImage: React.FC<MealImageProps> = ({ meal }) => {
  const { name, done = false } = meal;

  const getIconComponent = (mealName: string, isDone: boolean) => {
    switch (mealName) {
      case 'breakfast':
        return isDone ? BreakfastDone : Breakfast;
      case 'lunch':
        return isDone ? LunchDone : Lunch;
      case 'dinner':
        return isDone ? DinnerDone : Dinner;
      default:
        return () => null;
    }
  };

  const IconComponent = getIconComponent(name, done);
  
  return <IconComponent />;
};

