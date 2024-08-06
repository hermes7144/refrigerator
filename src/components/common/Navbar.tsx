import { Link } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [hasBorder, setHasBorder] = useState(false);

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
      <Link to='/' className='flex items-center space-x-3 text-4xl text-brand'>
        <CgSmartHomeRefrigerator className='text-3xl' />
        <div>
          <h1 className='hidden md:block tracking-tight leading-snug text-lg font-semibold'>MealManager</h1>
          <h1 className='block md:hidden tracking-tight text-xl font-semibold'>MM</h1>
        </div>
      </Link>
      <nav className='flex items-center gap-4'>{isAuthLoading ? '' : user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}</nav>
    </header>
  );
}
