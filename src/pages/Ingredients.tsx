import { useState } from 'react';
import useIngredients from '../hooks/useIngredients';
import { IngredientItem } from '../components/IngredientItem';
import DialogAddIngredient from '../components/DialogAddIngredient';
import { Ingredient } from '../types/ingredientTypes';
import RemoveDialog from '../components/RemoveDialog';

export default function Ingredients() {
  const { ingredientsQuery: { data: ingredients }, addIngredient, updateIngredient, deleteIngredient } = useIngredients();

  const [visible, setVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (ingredient.id) {
      updateIngredient.mutate(ingredient);
    } else {
      addIngredient.mutate(ingredient);
    }
  };

  const handleDialog = () => {
    setEditingIngredient(null);
    setVisible(true);    
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setVisible(true);    
  };

  const handleRemoveIngredient = (): void => {
    if (!editingIngredient) return;
    deleteIngredient.mutate(editingIngredient);
  };

  const handleRomoveDialog = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setRemoveVisible(true)
  };

  const handleCloseRomoveDialog = () => {
    setRemoveVisible(false)
  };

  return (
    <div className='flex  flex-col p-2 justify-center max-w-screen-xl'>
      <div className='flex justify-end'>
        <button className='btn' onClick={handleDialog}>
          추가
        </button>
      </div>
      <DialogAddIngredient visible={visible} onSubmit={handleAddIngredient} onClose={handleCloseDialog} initialIngredient={editingIngredient} />
      <RemoveDialog removeVisible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRomoveDialog} />
      <div className='flex justify-center'>
        <table className='table w-full sm:w-3/4'>
          <colgroup>
            <col className='w-1/4' />
            <col className='w-1/4' />
            <col className='w-1/4' />
            <col className='w-1/6' />
          </colgroup>
          <thead>
            <tr>
              <th className='text-center'>Ingredient</th>
              <th className='text-center'>Qty</th>
              <th className='text-center'>Experiation</th>
            </tr>
          </thead>
          <tbody>
            {ingredients?.map(ingredient => <IngredientItem key={ingredient?.id} ingredient={ingredient} onEdit={handleEditIngredient} onDelete={handleRomoveDialog} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
