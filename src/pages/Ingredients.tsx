import { useState } from 'react';
import useIngredients from '../hooks/useIngredients';
import { IngredientItem } from '../components/IngredientItem';
import DialogAddIngredient, { Ingredient } from '../components/DialogAddIngredient';
import DialogRemoveIngredient from '../components/DialogRemoveIngredient';

export default function Ingredients() {
  const {
    ingredientsQuery: { data: ingredients },
    addIngredient,
    updateIngredient,
    deleteIngredient,
  } = useIngredients();

  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (ingredient.id) {
      updateIngredient.mutate(ingredient);
    } else {
      addIngredient.mutate(ingredient);
    }
  };

  const handleRemoveIngredient = (): void => {
    if (!editingIngredient) return;
    deleteIngredient.mutate(editingIngredient);
  };

  const handleOpenDialog = () => {
    document.getElementById('my_modal_1').showModal();
    setEditingIngredient(null);
  };

  const handleCloseDialog = () => {
    document.getElementById('my_modal_1').close();
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    document.getElementById('my_modal_1').showModal();
  };

  const handleRomoveIngredientDialog = (ingredient) => {
    setEditingIngredient(ingredient);
    document.getElementById('my_modal_2').showModal();
  };

  const handleCloseRomoveDialog = () => {
    document.getElementById('my_modal_2').close();
  };

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-end'>
        <button className='btn' onClick={handleOpenDialog}>
          추가
        </button>
      </div>
      <DialogAddIngredient onSubmit={handleAddIngredient} onClose={handleCloseDialog} initialIngredient={editingIngredient} />
      <DialogRemoveIngredient onSubmit={handleRemoveIngredient} onClose={handleCloseRomoveDialog} />

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
            {ingredients?.map((ingredient) => (
              <IngredientItem key={ingredient?.id} ingredient={ingredient} onEdit={handleEditIngredient} onDelete={handleRomoveIngredientDialog} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
