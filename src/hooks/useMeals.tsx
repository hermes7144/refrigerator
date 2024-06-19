import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addNewMeal, getMeals, editMeal, deleteMeal, checkMeal } from '../api/firebase';
import { Meal } from '../types/mealTypes';

export default function useMeals() {
  const authContext = useAuthContext();

  if (!authContext || !authContext.uid) {
    throw new Error('User is not authenticated');
  }

  const { uid } = authContext;

  const queryClient = useQueryClient();

  const mealsQuery = useQuery({
    queryKey: ['meals'],
    queryFn: () => getMeals(uid),
  });

  const addMeal = useMutation({
    mutationFn: (meal: Meal) => addNewMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals'] }),
  });

  const updateMeal = useMutation({
    mutationFn: (meal: Meal) => editMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals'] }),
  });

  const removeMeal = useMutation({
    mutationFn: (meal: { name: string; date: string }) => deleteMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals'] }),
  });

  const editMealDone = useMutation({
    mutationFn: (meal: { name: string; date: string; done: boolean }) => checkMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals'] }),
  });

  return { mealsQuery, addMeal, updateMeal, removeMeal, editMealDone };
}
