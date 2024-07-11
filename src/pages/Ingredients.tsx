import { useEffect, useState, useTransition } from 'react';
import useIngredients from '../hooks/useIngredients';
import DialogAddIngredient from '../components/ingredient/DialogAddIngredient';
import { Ingredient } from '../types/ingredientTypes';
import RemoveDialog from '../components/ingredient/RemoveDialog';
import IngredientsSearch from '../components/ingredient/IngredientsSearch';
import IngredientTable from '../components/ingredient/IngredientTable';

export default function Ingredients() {
  const { ingredientsQuery: { data: initIngredients}, addIngredient, updateIngredient, deleteIngredient } = useIngredients();

  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (initIngredients) {
      setIngredients(initIngredients);
    }
  }, [initIngredients]);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (ingredient.id) {
      updateIngredient.mutate(ingredient);
    } else {
      addIngredient.mutate(ingredient);
    }
  };

  const handleDialog = () => {
    setVisible(true);    
  };

  const handleCloseDialog = () => {
    setEditingIngredient(null);
    setVisible(false);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setVisible(true);    
  };

  const handleRemoveIngredient = (): void => {
    if (!editingIngredient) return;
    deleteIngredient.mutate(editingIngredient);
    setRemoveVisible(false);
  };

  const handleRemoveDialog = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setRemoveVisible(true);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveVisible(false);
  };

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);    

    startTransition(() => {
      const filteredIngredients = initIngredients?.filter(ingredient => 
        ingredient.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      filteredIngredients && setIngredients(filteredIngredients);
    })
      // startTransition 미적용 테스트 함수
      // const filteredIngredients = initIngredients?.filter(ingredient => 
      //   ingredient.name.toLowerCase().includes(e.target.value.toLowerCase())
      // );
      // filteredIngredients && setIngredients(filteredIngredients);
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full md:w-3/5 ">
      <div className="flex justify-between mb-4">
        <IngredientsSearch query={query} onChange={handleChange} />
        <button className="btn btn-outline btn-info" onClick={handleDialog}>추가</button>
      </div>
      <IngredientTable ingredients={ingredients} isPending={isPending} onEdit={handleEditIngredient} onDelete={handleRemoveDialog} />
      <DialogAddIngredient visible={visible} onSubmit={handleAddIngredient} onClose={handleCloseDialog} initialIngredient={editingIngredient} />
      <RemoveDialog removeVisible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
    </div>
  );
}
