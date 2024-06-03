import { LuRefrigerator } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';

import DisplayUser from './DisplayUser';

export default function Navbar() {
  const authContext = useAuthContext();

  if (!authContext) {
    return null; // or some fallback UI
  }

  const { user, login, logout } = authContext;
  return (
    <header className='flex justify-between border-b border-gray-300 p-2 font-semibold bg-white'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <LuRefrigerator />
        <h1 className='hidden md:block'>Ref</h1>
      </Link>

      <nav className='flex items-center gap-4'>
        {user && (
          <>
            <Link to='/recipe' className='text-2xl'>
              <MdMenuBook />
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
