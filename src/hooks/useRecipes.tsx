import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../context/AuthContext';
import { getRecipes, addNewRecipe, editRecipe, deleteRecipe } from '../api/firebase';
import { RecipeProps } from '../types/RecipeTypes';

export default function useRecipes() {
  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();
  const recipesQuery = useQuery({ queryKey: ['recipes', uid], queryFn: () => getRecipes(uid) });

  const addRecipe = useMutation({
    mutationFn: (recipe: RecipeProps) => addNewRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes', uid] }),
  });

  const updateRecipe = useMutation({
    mutationFn: (recipe: RecipeProps) => editRecipe(uid, recipe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes', uid] }),
  });

  const removeRecipes = useMutation({
    mutationFn: async ({ action, selectedItems }) => {
      const promises = selectedItems.map(async (recipe) => {
        if (action === 'delete') {
          await deleteRecipe(uid, recipe);
        }
      });
      return Promise.all(promises);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes', uid] }),
  });

  return { recipesQuery, addRecipe, updateRecipe, removeRecipes };
}
