import useRecipes from '../../hooks/useRecipes';
import RecipeItem from './RecipeItem';

 export default function RecipeTable({onEdit, onDelete}) {
  const { recipesQuery: { data: recipes } } = useRecipes();

  return (
    <div className="flex justify-center">
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-center w-1/2">Recipe</th>
          <th className="px-4 py-2 text-center w-1/2">Ingredient</th>
          <th className='w-1/4'></th>
        </tr>
      </thead>
      <tbody>
        {recipes?.map(recipe => (
          <RecipeItem 
            key={recipe.id} 
            recipe={recipe} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </tbody>
    </table>
  </div>
  )
;
}