import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getRecipes, addNewRecipe, editRecipe, deleteRecipe } from '../api/firebase';
import { Meal } from '../types/mealTypes';

export default function useRecipes() {
  const authContext = useAuthContext();

  if (!authContext || !authContext.uid) {
    throw new Error('User is not authenticated');
  }

  const { uid } = authContext;
  const queryClient = useQueryClient();
  const recipesQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(uid),
  });

  const addRecipe = useMutation({
    mutationFn: (recipe) => addNewRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  const updateRecipe = useMutation({
    mutationFn: (recipe) => editRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  const removeRecipe = useMutation({
    mutationFn: (recipe: { name: string; }) => deleteRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  return { recipesQuery, addRecipe, updateRecipe, removeRecipe };
}
