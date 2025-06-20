import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Hero = () => {
    const { navigate } = useContext(ShopContext)!;
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 p-8 text-center sm:text-left">
        {/* Section Label */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
          <span className="w-10 h-[2px] bg-gray-500" />
          <p className="text-md font-medium text-gray-600">Our Best Sellers</p>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 leading-snug">
          Latest Arrivals
        </h1>

        {/* CTA Button */}
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-6">
          <button onClick={()=> navigate('./collection')} className="text-sm font-semibold text-gray-700 border border-gray-600 px-5 py-2 rounded hover:bg-gray-100 transition">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 h-full">
        <img
          src={assets.image}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;


// import React from 'react'
// import { assets } from '../assets/assets'

// const Hero = () => {
//   return (
//     <div className='flex flex-col sm:flex-row border border-gray-600'>
//         {/* Hero Left Side */}
//         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//             <div className=' text-gray-600 '>
//                 <div className='flex items-center gap-2 '>
//                     <p className='w-10 md:w-15 h-[2px] bg-[#414141]'></p>
//                     <p className='font-medium text-sm md:text-base'>Our Best Sellers</p>
//                 </div>
//                 <h1 className='prata-regular text-2xl sm:py-3 lg:text-3xl leading-relaxed'>Latest Arrivals</h1>
//                 <div className='flex items-center gap-2'>
//                     <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//                     <p className='w-10 md:w-15 h-[2px] bg-[#414141]'></p>
//                 </div>
//             </div>
//         </div>
//         {/* Hero Right Side */}
//         <img className='w-full sm:w-1/2' src={assets.image} alt='' />
//     </div>
//   )
// }

// export default Hero
