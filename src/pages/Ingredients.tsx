import { ChangeEvent, useState } from 'react';
import useIngredients from '../hooks/useIngredients';
import { IngredientProps } from '../types/ingredientTypes';
import RemoveDialog from '../components/common/RemoveDialog';
import IngredientsSearch from '../components/ingredient/IngredientsSearch';
import IngredientTable from '../components/ingredient/IngredientTable';
import Button from '../components/ui/Button';
import IngredientDialog from '../components/ingredient/IngredientDialog';

export default function Ingredients() {
  const { deleteIngredient } = useIngredients();

  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<IngredientProps | null>(null);




  const handleDialog = () => setVisible(true);    

  const handleCloseDialog = () => {
    setEditingIngredient(null);
    setVisible(false);
  };

  const handleEditIngredient = (ingredient: IngredientProps) => {
    setEditingIngredient(ingredient);
    setVisible(true);    
  };

  const handleRemoveIngredient = (): void => {
    if (editingIngredient) {
      deleteIngredient.mutate(editingIngredient);
      setRemoveVisible(false);
    }
  };

  const handleRemoveDialog = (ingredient: IngredientProps) => {
    setEditingIngredient(ingredient);
    setRemoveVisible(true);
  };

  const handleCloseRemoveDialog = () => setRemoveVisible(false);
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setQuery(target.value);    

  return (
    <div className="container mx-auto px-4 py-8 w-full md:w-3/5">
      <div className='flex justify-center text-2xl font-bold'><h1>재료 목록</h1></div>
      <div className="flex justify-between mb-4">
        <IngredientsSearch query={query} onChange={handleChange} />
        <Button text={'추가'} onClick={handleDialog} />
      </div>
      <IngredientTable query={query} onEdit={handleEditIngredient} onDelete={handleRemoveDialog} />
      <IngredientDialog visible={visible} onClose={handleCloseDialog} initialIngredient={editingIngredient} />
      <RemoveDialog removeVisible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
    </div>
  );
}
