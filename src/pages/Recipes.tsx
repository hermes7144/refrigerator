import { Link } from 'react-router-dom';
import RecipeTable from '../components/recipe/RecipeTable';

export default function Recipes() {
  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='flex justify-center text-2xl font-bold'>
        <h1>레시피 목록</h1>
      </div>
      <div className='flex justify-end mb-4'>
        <Link to='new' className='btn bg-brand text-white' state={{}}>
          추가
        </Link>
      </div>
      <RecipeTable />
    </div>
  );
}
