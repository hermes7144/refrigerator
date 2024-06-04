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
  onSubmit: () => void;
  onClose: () => void;
};

export default function DialogRemoveIngredient({ onSubmit, onClose }: DialogAddIngredientProps) {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <dialog id='my_modal_2' className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box flex flex-col'>
        삭제하시겠습니까?
        <div className='modal-action'>
          <button className='btn btn-sm' onClick={onClose}>
            취소
          </button>
          <button className='btn btn-sm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}
