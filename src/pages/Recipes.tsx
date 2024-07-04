import { useState } from 'react';
import { Ingredient } from '../types/ingredientTypes';
import RemoveDialog from '../components/ingredient/RemoveDialog';
import useRecipes from '../hooks/useRecipes';
import { Link } from 'react-router-dom';

export default function Recipes() {
  const { recipesQuery: { data: recipes }, addRecipe, updateRecipe, removeRecipe } = useRecipes();

  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<any | null>(null);

  const handleAddIngredient = (recipe) => {
    if (recipe.id) {
      updateRecipe.mutate(recipe);
    } else {
      addRecipe.mutate(recipe);
    }
  };
  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
  };

  const handleRemoveIngredient = (): void => {
    if (!editingIngredient) return;
    removeRecipe.mutate(editingIngredient);
    setRemoveVisible(false); // RemoveDialog를 닫습니다.
  };

  const handleRemoveDialog = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setRemoveVisible(true);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <Link to='/recipework'  state={{ recipe:null }}>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
          추가
        </button>
        </Link>
      </div>
      <RemoveDialog removeVisible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
      <div className="flex justify-center">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-center">Ingredient</th>
              <th className="px-4 py-2 text-center">Qty</th>
              <th className="px-4 py-2 text-center">Expiration</th>
              <th className="px-4 py-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {/* {recipes?.map(recipe => (
              <IngredientItem 
                key={ingredient?.id} 
                ingredient={ingredient} 
                onEdit={handleEditIngredient} 
                onDelete={handleRemoveDialog} 
              />
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}