import React from 'react';
import Select, { SingleValue } from 'react-select'

interface IngredientSelectorProps {
  ingredients: Array<{ id: string; name: string; unit: string }>;
  selectedIngredient: string;
  onIngredientChange: (e: SingleValue<{ value: string; label: string; }>, index: number) => void;
  qty: string;
  onQtyChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ ingredients, selectedIngredient, onIngredientChange, qty, onQtyChange, index }) => {
  
const ingredientList = ingredients.map((ingredient) => ({ value: ingredient.id, label: `${ingredient.name} (${ingredient.unit})` }));
const defaultValue = ingredientList.find((ingredient) => ingredient.value === selectedIngredient);
    
  return (
    <div className='flex gap-1'>
       <Select className="basic-single w-60" classNamePrefix="select" options={ingredientList} defaultValue={defaultValue} onChange={(selectedOption) => onIngredientChange(selectedOption, index)}        />
      <input type='text' className='input input-bordered w-full max-w-16 h-10' onChange={(e) => onQtyChange(e, index)} value={+qty > 0 ? qty : undefined} />
    </div>
  );
};

export default IngredientSelector;
