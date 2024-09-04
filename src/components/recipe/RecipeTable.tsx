import RecipeItem from './RecipeItem';

export default function RecipeTable({ items, selectedItems, toggleSelection }) {
  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-center w-1/2'>Recipe</th>
            <th className='px-4 py-2 text-center w-1/2'>Ingredient</th>
            <th className='w-1/4'></th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <RecipeItem key={item.id} item={item} isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} onSelect={() => toggleSelection(item)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
