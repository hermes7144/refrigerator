import { ReactComponent as Breakfast } from '../../assets/image/breakfast.svg';
import { ReactComponent as Lunch } from '../../assets/image/lunch.svg';
import { ReactComponent as Dinner } from '../../assets/image/dinner.svg';

import { EmptyMealProps } from '../../types/mealTypes';


export const MealImage: React.FC<{meal:EmptyMealProps}> = ({ meal }) => {
  const { mealType, done =false } = meal;

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

  const IconComponent = getIconComponent(mealType);

  return <IconComponent className={done ? 'brightness-75' : ''} />;
};
