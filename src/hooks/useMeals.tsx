import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import  useAuthContext  from '../context/AuthContext';
import { addNewMeal, getMeals, editMeal, deleteMeal, checkMeal } from '../api/firebase';
import { Meal } from '../types/mealTypes';

export default function useMeals() {
  const {uid} = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();

  const mealsQuery = useSuspenseQuery({ queryKey: ['meals',uid] ,queryFn: () => getMeals(uid) });

  const addMeal = useMutation({
    mutationFn: (meal: Meal) => addNewMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals',uid] }),
  });

  const updateMeal = useMutation({
    mutationFn: (meal: Meal) => editMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey:  ['meals',uid] }),
  });

  const removeMeal = useMutation({
    mutationFn: (meal: { name: string; date: string }) => deleteMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey:  ['meals',uid] }),
  });

  const editMealDone = useMutation({
    mutationFn: (meal: { name: string; date: string; done: boolean }) => checkMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey:  ['meals',uid] }),
  });

  return { mealsQuery, addMeal, updateMeal, removeMeal, editMealDone };
}
