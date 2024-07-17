import { FC, useState, useCallback } from 'react';
import { MealSection } from './MealSection';
import { MealListProps, Meal } from '../../types/mealTypes';
import useMeals from '../../hooks/useMeals';
import MealDialog from './MealDialog';
import { Dayjs } from 'dayjs';

const MealList: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {
  const { mealsQuery: { data: meals } } = useMeals();
  const [visible, setVisible] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<{ meal: Meal | null, date?: Dayjs }>({ meal: null, date: undefined });

  const handleCloseDialog = useCallback(() => {
    setVisible(false);
    setCurrentMeal({ meal: null, date: undefined });
  }, []);

  const handleDialog = useCallback((meal: Meal, date?: Dayjs) => {
    setCurrentMeal({ meal, date });
    setVisible(true);
  }, []);

  return (
    <>
      <ul className="flex flex-col w-full md:w-[500px] gap-4 pb-80">
        {week.map((weekday) => {
          const formattedDate = weekday.format('YYYY-MM-DD');
          return (
            <MealSection
              key={formattedDate}
              date={selectedDate}
              weekday={weekday}
              meals={meals?.[formattedDate]}
              scrollRef={(el) => (scrollRefs.current[formattedDate] = el)}
              onEdit={handleDialog}
            />
          );
        })}
      </ul>
      {visible && currentMeal.meal && (
        <MealDialog
          meal={currentMeal.meal}
          date={currentMeal.date}
          visible={visible}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default MealList;
