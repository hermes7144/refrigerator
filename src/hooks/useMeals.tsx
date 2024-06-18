import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addNewMeal, getMeals, editMeals } from '../api/firebase';
import { Meal } from '../types/mealTypes';

export default function useMeals() {
  const authContext = useAuthContext();

  if (!authContext || !authContext.uid) {
    throw new Error('User is not authenticated');
  }

  const { uid } = authContext;

  const queryClient = useQueryClient();

  const mealsQuery = useQuery({
    queryKey: ['meals', uid],
    queryFn: () => getMeals(uid),
  });

  const addMeal = useMutation({
    mutationFn: (meal: Meal) => addNewMeal(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals', uid] }),
  });

  const updateMeal = useMutation({
    mutationFn: (meal: Meal) => editMeals(uid, meal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meals', uid] }),
  });

  return { mealsQuery, addMeal, updateMeal };
}
