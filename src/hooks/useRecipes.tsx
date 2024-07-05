import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getRecipes, addNewRecipe, editRecipe, deleteRecipe } from '../api/firebase';
import { Recipe } from '../types/RecipeTypes';

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
    mutationFn: (recipe: Recipe) => addNewRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  const updateRecipe = useMutation({
    mutationFn: (recipe:Recipe) => editRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  const removeRecipe = useMutation({
    mutationFn: (recipe: Recipe) => deleteRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  return { recipesQuery, addRecipe, updateRecipe, removeRecipe };
}
