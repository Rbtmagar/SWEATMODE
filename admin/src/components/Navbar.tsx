// Navbar.tsx
import React from 'react';

interface NavbarProps {
  setToken?: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setToken }) => (
  <div className='flex items-center py-2 px-[4%] justify-between'>
    <span className='font-bold text-lg'>ADMIN PANEL</span>
    {setToken && (
      <button
        className='bg-gray-700 text-white px-5 py-2 rounded-full text-xs sm:text-sm'
        onClick={() => {
          localStorage.removeItem('adminToken');
          setToken('');
        }}
      >
        Logout
      </button>
    )}
  </div>
);

export default Navbar;
