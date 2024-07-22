import { Link } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { FaCartArrowDown } from '@react-icons/all-files/fa/FaCartArrowDown';
import { BiFoodMenu } from '@react-icons/all-files/bi/BiFoodMenu';
import DisplayUser from './DisplayUser';

export default function Navbar() {
  const authContext = useAuthContext();

  if (!authContext) {
    return null; // or some fallback UI
  }

  const { user, login, logout } = authContext;
  return (
    <header className='navbar justify-between border-b border-gray-300 font-semibold bg-white fixed top-0 left-0 right-0 z-10'>
      <Link to='/' className='flex items-center space-x-3 text-4xl text-brand'>
        <CgSmartHomeRefrigerator className='text-3xl' />
        <div>
          <h1 className='hidden md:block tracking-tight leading-snug text-lg font-semibold'>MealManager</h1>
          <h1 className='block md:hidden tracking-tight text-xl font-semibold'>MM</h1>
        </div>
      </Link>
      <nav className='flex items-center gap-4'>
        {user && (
          <>
            <Link to='/recipes' className='text-2xl'>
              <BiFoodMenu />
            </Link>
            <Link to='/ingredients' className='text-2xl'>
              <FaCartArrowDown />
            </Link>
            <DisplayUser />
          </>
        )}

        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}
