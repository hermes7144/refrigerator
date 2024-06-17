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
    <div>
      <select className='select select-bordered' onChange={(e) => onIngredientChange(e, index)} value={selectedIngredient}>
        <option value=''>카테고리</option>
        {ingredients?.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name} ({ingredient.unit})
          </option>
        ))}
      </select>
      <input type='text' onChange={(e) => onQtyChange(e, index)} value={qty} />
    </div>
  );
};

export default IngredientSelector;
