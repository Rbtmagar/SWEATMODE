import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl underline decoration-gray-500 decoration-2 underline-offset-4'>
          {currentState}
        </p>
      </div>
      {currentState === 'Login' ? '' : <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor Pointer'>Forgot Password?</p>
      </div>
    </form>
  )
}

export default Login;






