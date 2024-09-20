import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import  useAuthContext  from '../context/AuthContext';
import { addNewMeal, getMeals, editMeal, deleteMeal, checkMeal } from '../api/firebase';
import { MealProps } from '../types/mealTypes';

export default function useMeals() {
  const {uid} = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();

  const mealsQuery = useSuspenseQuery({ queryKey: ['meals',uid] ,queryFn: () => getMeals(uid) });

  const addMeal = useMutation({
    mutationFn: (meal: MealProps) => addNewMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals',uid] }),
  });

  const updateMeal = useMutation({
    mutationFn: (meal: MealProps) => editMeal(uid, meal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals', uid] });
      queryClient.invalidateQueries({ queryKey: ['ingredients', uid] });
    }
  });

  const removeMeal = useMutation({
    mutationFn: (meal: MealProps) => deleteMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey:  ['meals',uid] }),
  });

  const editMealDone = useMutation({
    mutationFn: (meal: MealProps) => checkMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey:  ['meals',uid] }),
  });

  return { mealsQuery, addMeal, updateMeal, removeMeal, editMealDone };
}
