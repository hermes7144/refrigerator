import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../context/AuthContext';
import { getShopping } from '../api/firebase';
import { RecipeProps } from '../types/RecipeTypes';

export default function useShoppings() {
  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();
  const shoppingsQuery = useQuery({ queryKey: ['shopping', uid], queryFn: () => getShopping(uid) });

  // const addRecipe = useMutation({
  //   mutationFn: (recipe: RecipeProps) => addNewRecipe(uid, recipe),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shopping', uid] }),
  // });

  // const updateRecipe = useMutation({
  //   mutationFn: (recipe: RecipeProps) => editRecipe(uid, recipe),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shopping', uid] }),
  // });

  // const removeRecipe = useMutation({
  //   mutationFn: (recipe: RecipeProps) => deleteRecipe(uid, recipe),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shopping', uid] }),
  // });

  return { shoppingsQuery };
  // return { recipesQuery, addRecipe, updateRecipe, removeRecipe };
}
