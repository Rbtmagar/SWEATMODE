import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-600'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className=' text-gray-600 '>
                <div className='flex items-center gap-2 '>
                    <p className='w-10 md:w-15 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>Our Best Sellers</p>
                </div>
                <h1 className='prata-regular text-2xl sm:py-3 lg:text-3xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-10 md:w-15 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2' src={assets.image} alt='' />
    </div>
  )
}

export default Hero
