import { ReactComponent as Breakfast } from '../../assets/image/breakfast.svg';
import { ReactComponent as Lunch } from '../../assets/image/lunch.svg';
import { ReactComponent as Dinner } from '../../assets/image/dinner.svg';

export default function MealImage({ meal }: { meal: string }) {
  let IconComponent;

  switch (meal) {
    case 'breakfast':
      IconComponent = Breakfast;
      break;
    case 'lunch':
      IconComponent = Lunch;
      break;
    case 'dinner':
      IconComponent = Dinner;
      break;
    default:
      IconComponent = () => null;
      break;
  }

  return <IconComponent />;
}
