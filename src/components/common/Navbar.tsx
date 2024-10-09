import { Link } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
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
      <div className='flex gap-2'>
        {broken && (
          <button onClick={() => setToggled(true)}>
            <IoIosMenu className='h-6 w-6' />
          </button>
        )}

        <Link to='/' className='flex items-center gap-1 text-brand'>
          {!broken && <img className='w-8 mb-1' src='icon.svg' /> }
          <h1 className='tracking-tighter text-3xl font-semibold'>밥메이트</h1>
          
        </Link>
      </div>
      <nav className='flex items-center gap-4'>
        {isAuthLoading ? '' : user ? '' : <button onClick={() => demo()}>데모</button>}
        {isAuthLoading ? '' : user ? <button onClick={logout}>로그아웃</button> : <button onClick={login}>로그인</button>}
      </nav>
    </header>
  );
}
