import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import  useAuthContext  from '../context/AuthContext';
import { addNewMeal, getMeals, editMeal, deleteMeal, checkMeal, fetchMealByTypeAndDate } from '../api/firebase';
import { MealProps } from '../types/mealTypes';

export default function useMeals() {
  const {uid} = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();

  const mealsQuery = useSuspenseQuery({ queryKey: ['meals',uid] ,queryFn: () => getMeals(uid) });

  const UsemealtypeandDateQuery = (mealType: string, date: string) => {
    return useSuspenseQuery({
        queryKey:['meal', uid, date, mealType], 
        queryFn: () => fetchMealByTypeAndDate(uid, date, mealType), 
        staleTime: 1000 * 60 * 5,
    });
  };

  const addMeal = useMutation({
    mutationFn: (meal: MealProps) => addNewMeal(uid, meal),
    onSuccess: (meal) => { queryClient.invalidateQueries({queryKey: ['meal', uid, meal.date, meal.mealType]})}
  });

  const updateMeal = useMutation({
    mutationFn: (meal: MealProps) => editMeal(uid, meal),
    onSuccess: (meal) => {
      queryClient.invalidateQueries({ queryKey: ['meal', uid, meal.date, meal.mealType]});
      // queryClient.invalidateQueries({ queryKey: ['ingredients', uid] });
    }
  });

  const removeMeal = useMutation({
    mutationFn: (meal: MealProps) => deleteMeal(uid, meal),
    onSuccess: (meal) => { queryClient.invalidateQueries({queryKey: ['meal', uid, meal.date, meal.mealType]})}
  });

  const editMealDone = useMutation({
    mutationFn: (meal: MealProps) => checkMeal(uid, meal),
    onSuccess: (meal) => { 
      queryClient.invalidateQueries({queryKey: ['meal', uid, meal.date, meal.mealType]})
    }
  });
  
  return { mealsQuery, addMeal, updateMeal, removeMeal, editMealDone, UsemealtypeandDateQuery };
}
