import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical';
import { RecipeItemProps } from '../../types/RecipeTypes';

const RegisterShoppingItem = ({ shopping, onEdit, onOpenDialog }: RecipeItemProps) => {
  return (
    <tr>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar hidden sm:block'>
            <div className='mask mask-squircle w-8 h-8'>{shopping?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
          </div>
          <div>
            <div className='font-bold'>{shopping?.name}</div>
          </div>
        </div>
      </td>
      <td className='text-center'>
        <div className='dropdown dropdown-left sm:dropdown-right'>
          <button tabIndex={0} role='button' className='btn btn-ghost rounded-full'>
            <HiDotsVertical />
          </button>
          <ul tabIndex={0} className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-20'>
            <li>
              <a onClick={() => onEdit(shopping)}>수정</a>
            </li>
            <li>
              <a onClick={() => onOpenDialog(shopping)}>삭제</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default RegisterShoppingItem;
