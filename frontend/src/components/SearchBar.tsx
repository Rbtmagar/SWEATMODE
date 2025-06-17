import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosSearch } from 'react-icons/io';
import { BiX } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)!;
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Auto-show search bar on /collection
useEffect(() => {
  if (location.pathname === '/collection') {
    setShowSearch(true);
  } else {
    setShowSearch(false);
  }
}, [location.pathname, setShowSearch]);

  // Auto-focus when shown
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
        />
        <IoIosSearch className='text-2xl w-4' />
      </div>
      <BiX onClick={() => setShowSearch(false)} className='inline text-2xl cursor-pointer' />
      {/* {location.pathname !== '/collection' && (
        <BiX onClick={() => setShowSearch(false)} className='inline text-2xl cursor-pointer' />
      )} */}
    </div>
  ) : null;
};

export default SearchBar;
