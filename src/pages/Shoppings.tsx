import { Link } from 'react-router-dom';
import ShoppingTable from '../components/shopping/ShoppingTable';

export default function Shoppings() {
  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='flex justify-center text-2xl font-bold'>
        <h1>쇼핑 목록</h1>
      </div>
      <div className='flex justify-end mb-4'>
        <Link to='/shoppings/new' className='btn bg-brand text-white' state={{}}>
          추가
        </Link>
      </div>
      <ShoppingTable />
    </div>
  );
}
