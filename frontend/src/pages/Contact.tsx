import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className='border-t pt-10 px-4 sm:px-[5vw]'>
      <h2 className='text-2xl font-bold text-center mb-10'>
        CONTACT <span className='text-black'>US</span>
      </h2>

      <div className='flex flex-col md:flex-row gap-8 items-center justify-center max-w-5xl mx-auto'>
        {/* Left Image */}
        <div className='w-full md:w-1/2'>
          <img
            src={assets.contact}
            alt="Contact Desk"
            className='w-full h-auto rounded shadow-sm object-cover'
          />
        </div>

        {/* Contact Info */}
        <div className='w-full md:w-1/2 text-gray-700'>
          <h3 className='text-lg font-semibold mb-2'>Our Store</h3>
          <p>Chanauli, Bharatpur-26</p>
          <p>Chitwan, Nepal</p>

          <p className='mt-4'>Tel: (+977) 984520000</p>
          <p>Email: <a href='mailto:admin@forever.com' className='text-blue-600 hover:underline'>sweatmode@gmail.com</a></p>

          {/* Careers Section */}
          <div className='mt-8'>
            <h4 className='text-md font-semibold mb-1'>Careers at SweatMode</h4>
            <p className='text-sm mb-3'>Learn more about our teams and job openings.</p>
            <button
              onClick={() => navigate('/about')}
              className='border border-gray-700 px-4 py-2 text-sm hover:bg-gray-200 transition'
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
      <div className='mt-20'>
      <NewsLetterBox />
      </div>
    </div>
  );
};

export default Contact;
