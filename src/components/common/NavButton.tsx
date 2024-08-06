// NavButton.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavButtonProps {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, icon: Icon, label }) => {
  const location = useLocation();

  return (
    <button className={`text-brand ${location.pathname === to ? 'active' : ''}`}>
      <Link to={to} className='flex flex-col items-center gap-1'>
        <Icon className='w-5 h-5' />
        <label className='text-xs font-semibold tracking-tight'>{label}</label>
      </Link>
    </button>
  );
};

export default NavButton;
