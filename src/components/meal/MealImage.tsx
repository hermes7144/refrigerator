import { ReactComponent as Breakfast } from '../../assets/image/breakfast.svg';
import { ReactComponent as Lunch } from '../../assets/image/lunch.svg';
import { ReactComponent as Dinner } from '../../assets/image/dinner.svg';

import { Meal } from '../../types/mealTypes';

interface MealImageProps {
  meal: Meal | { name: string; done?: boolean };
}

export const MealImage: React.FC<MealImageProps> = ({ meal }) => {
  const { name, done = false } = meal;

  const getIconComponent = (mealName: string) => {
    switch (mealName) {
      case 'breakfast':
        return Breakfast;
      case 'lunch':
        return Lunch;
      case 'dinner':
        return Dinner;
      default:
        return () => null;
    }
  };

  const IconComponent = getIconComponent(name);

  return <IconComponent className={done ? 'brightness-75' : ''} />;
};
