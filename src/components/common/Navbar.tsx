import { Link } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { useEffect, useState } from 'react';
import useSidebarContext from '../../context/SidebarContext';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';

export default function Navbar() {
  const [hasBorder, setHasBorder] = useState(false);
  const { broken, setToggled } = useSidebarContext();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setHasBorder(scrollY > 50);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const authContext = useAuthContext();

  if (!authContext) {
    return null;
  }
  const { user, isAuthLoading, login, logout } = authContext;

  return (
    <header className={`navbar justify-between font-semibold bg-white fixed top-0 left-0 right-0 z-10 ${hasBorder ? 'border-b border-gray-300' : ''}`}>
      {broken && (
        <button className='w-10 h-10' onClick={() => setToggled(true)}>
          <IoIosMenu />
        </button>
      )}

      <Link to='/' className='flex items-center text-4xl text-brand'>
        <CgSmartHomeRefrigerator className='text-3xl' />
        <h1 className='tracking-tight leading-snug text-lg font-semibold'>MealManager</h1>
      </Link>
      <nav className='flex items-center gap-4'>{isAuthLoading ? '' : user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}</nav>
    </header>
  );
}
