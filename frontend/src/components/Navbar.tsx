import React, {useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg';
import { IoIosArrowDropdown, IoIosMenu, IoIosSearch } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const {setShowSearch, getCartCount} = useContext(ShopContext)!;

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to="/"><img src={assets.logo} className='w-20' alt="" /></Link>
         <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        
      
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        
      
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        
      </ul>
      <div className='flex items-center gap-6'>
        <IoIosSearch onClick={()=>setShowSearch(prev => !prev)} className='text-2xl w-8 cursor-pointer' />
        <div className='group relative'>
        <CgProfile className='text-2xl w-8 cursor-pointer'/>
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-2xl'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                    <Link to="/login"><p className='cursor-pointer hover:text-black'>Logout</p></Link>
                </div>
            </div>    
        </div>
        {/* 🛒 Cart Icon with dynamic badge */}
      <Link to='/cart' className='relative'>
        <IoCartOutline className='text-2xl w-8 min-w-5' />
        {getCartCount() > 0 && (
          <p className='absolute left-[15px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        )}
      </Link>
        <IoIosMenu onClick={()=>setVisible(true)} className='text-2xl w-8 cursor-pointer sm:hidden' />
      </div>
      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
        <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <IoIosArrowDropdown className='text-2xl rotate-90' />
            <p className='text-xl'>Back</p>
        </div>
        <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/'>HOME</NavLink>
        <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
        <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
        <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>  
      </div>
    </div>
  )
}

export default Navbar
