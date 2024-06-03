import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addNewIngredient, editIngredient, getIngredients, removeIngredient } from '../api/firebase';
import { Ingredient } from '../components/DialogAddIngredient';

export default function useIngredients() {
  const authContext = useAuthContext();

  if (!authContext || !authContext.uid) {
    throw new Error('User is not authenticated');
  }

  const { uid } = authContext;

  const queryClient = useQueryClient();
  const ingredientsQuery = useQuery({
    queryKey: ['ingredients', uid],
    queryFn: () => getIngredients(uid),
  });

  const addIngredient = useMutation({
    mutationFn: (ingredient: Ingredient) => addNewIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients', uid] }),
  });

  const updateIngredient = useMutation({
    mutationFn: (ingredient: Ingredient) => editIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients', uid] }),
  });

  const deleteIngredient = useMutation({
    mutationFn: (ingredient: Ingredient) => removeIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients', uid] }),
  });

  return { ingredientsQuery, addIngredient, updateIngredient, deleteIngredient };
}