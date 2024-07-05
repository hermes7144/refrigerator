import { useState } from 'react';
import RemoveDialog from '../components/ingredient/RemoveDialog';
import useRecipes from '../hooks/useRecipes';
import { Link } from 'react-router-dom';
import RecipeItem from '../components/recipe/RecipeItem';
import { Recipe } from '../types/RecipeTypes';

export default function Recipes() {
  const { recipesQuery: { data: recipes }, removeRecipe } = useRecipes();


  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const handleEditIngredient = (recipe: Recipe) => {
    setEditingRecipe(recipe);
  };

  const handleRemoveIngredient = (): void => {
    if (!editingRecipe) return;
    removeRecipe.mutate(editingRecipe);
    setRemoveVisible(false);
  };

  const handleRemoveDialog = (recipe:Recipe) => {
    setEditingRecipe(recipe);
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
              <th className="px-4 py-2 text-center">Recipe</th>
              <th className="px-4 py-2 text-center">Ingredient</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recipes?.map(recipe => (
              <RecipeItem 
                key={recipe.id} 
                recipe={recipe} 
                onEdit={handleEditIngredient} 
                onDelete={handleRemoveDialog} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}