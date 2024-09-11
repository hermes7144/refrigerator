import { Link } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import useSidebarContext from '../../context/SidebarContext';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';

export default function Navbar() {
  const { broken, setToggled } = useSidebarContext();


  const authContext = useAuthContext();

  if (!authContext) {
    return null;
  }
  const { user, isAuthLoading, login, logout, demo } = authContext;

  return (
    <header className={`navbar justify-between font-semibold bg-white fixed top-0 left-0 right-0 z-10 border-b border-gray-300`}>
      {broken && (
        <button onClick={() => setToggled(true)}>
          <IoIosMenu className='h-6 w-6' />
        </button>
      )}

      <Link to='/' className='flex items-center text-4xl text-brand'>
        <CgSmartHomeRefrigerator className='text-3xl' />
        <h1 className='tracking-tight leading-snug text-lg font-semibold'>MealManager</h1>
      </Link>
      <nav className='flex items-center gap-4'>
        {isAuthLoading ? '' : user ? '' : <button onClick={() => demo()}>DEMO</button>}
        {isAuthLoading ? '' : user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
      </nav>
    </header>
  );
}
