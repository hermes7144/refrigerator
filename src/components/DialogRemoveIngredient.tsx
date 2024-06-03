// DialogAddIngredient.tsx

export type Ingredient = {
  id?: string;
  name: string | undefined;
  qty: unknown;
  unit?: string | undefined;
  category?: string | undefined;
  image?: string;
  expiration?: string;
};

type DialogAddIngredientProps = {
  onSubmit: (ingredient: Ingredient) => void;
  onClose: () => void;
  initialIngredient: Ingredient;
};

export default function DialogRemoveIngredient({ onSubmit, onClose, initialIngredient }: DialogAddIngredientProps) {
  const handleSubmit = () => {
    onSubmit(initialIngredient);
    onClose();
  };

  return (
    <dialog id='my_modal_2' className='modal modal-bottom sm:modal-middle' open>
      <div className='modal-box flex flex-col'>
        삭제하시겠습니까?
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn btn-sm'>취소</button>
          </form>
          <button className='btn btn-sm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
}
