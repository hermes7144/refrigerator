import { BsThreeDotsVertical } from 'react-icons/bs';
import DisplayDate from './DisplayDate';
import { Ingredient } from './DialogAddIngredient';

interface IngredientItemProps {
  ingredient: Ingredient;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
}

export const IngredientItem = ({ ingredient, onEdit, onDelete }: IngredientItemProps) => {
  // const { updateTodo, deleteTodo } = useTodos();
  // const handleDelete = deleteTodo.mutate;

  // const handleUpdate = (todo) => {
  //   updateTodo.mutate({
  //     ...todo,
  //     completedDate: todo.status === 'active' ? getDate() : '',
  //     status: todo.status === 'active' ? 'completed' : 'active',
  //   });

  //   if (todo.status === 'active' && runningTodo?.id === todo.id) {
  //     setRunningTodo(null);
  //     setIsRunning(false);
  //   }
  // };
  const handleDelete = () => {
    onDelete(ingredient);
    document.querySelector('.dropdown')?.removeAttribute('open');
  };

  const handleEdit = () => {
    onEdit(ingredient);
    document.querySelector('.dropdown')?.removeAttribute('open');
  };

  return (
    <tr>
      <th>
        <label>
          <input type='checkbox' className='checkbox' />
        </label>
      </th>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>{ingredient?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
          </div>
          <div>
            <div className='font-bold'>{ingredient.name}</div>
            <div className='text-sm opacity-50'>subtitle</div>
          </div>
        </div>
      </td>
      <td className='text-center'>
        {`${ingredient.qty} ${ingredient.unit}`}
        {/*   <br />
        <span className='badge badge-ghost badge-sm'>Desktop Support Technician</span> */}
      </td>
      <td className='text-center'>{ingredient.expiration ? <DisplayDate date={ingredient.expiration} /> : ''}</td>
      <td>
        <details className='dropdown'>
          <summary className='btn bg-transparent border-none shadow-none'>
            <BsThreeDotsVertical />
          </summary>
          <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-20'>
            <li>
              <a onClick={handleEdit}>수정</a>
            </li>
            <li>
              <a onClick={handleDelete}>삭제</a>
            </li>
          </ul>
        </details>
      </td>
    </tr>
  );
};
