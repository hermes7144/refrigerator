import React from 'react';

interface IngredientSelectorProps {
  ingredients: Array<{ id: string; name: string; unit: string }>;
  selectedIngredient: string;
  onIngredientChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void;
  qty: string;
  onQtyChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ ingredients, selectedIngredient, onIngredientChange, qty, onQtyChange, index }) => {
  return (
    <div className='flex gap-1'>
      <select className='select select-bordered' onChange={(e) => onIngredientChange(e, index)} value={selectedIngredient}>
        <option value=''>카테고리</option>
        {ingredients?.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}({ingredient.unit === 'ea' ? '개' : ingredient.unit})
          </option>
        ))}
      </select>
      <input type='text' className='input  input-bordered w-full max-w-16' onChange={(e) => onQtyChange(e, index)} value={+qty > 0 ? qty : undefined} />
    </div>
  );
};

export default IngredientSelector;
