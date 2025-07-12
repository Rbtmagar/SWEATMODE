import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [currentState, setCurrentState] = useState<'Login' | 'Sign Up'>('Login');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle login/signup logic
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Title */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl underline decoration-gray-500 decoration-2 underline-offset-4">
          {currentState}
        </p>
      </div>

      {/* Name input for Sign Up only */}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          className="w-full border-0 border-b-2 border-gray-500 focus:border-black focus:outline-none px-3 py-2"
          placeholder="Name"
          required
        />
      )}

      {/* Email */}
      <input
        type="text"
        className="w-full border-0 border-b-2 border-gray-500 focus:border-black focus:outline-none px-3 py-2"
        placeholder="Email"
        required
      />

      {/* Password with toggle */}
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full border-0 border-b-2 border-gray-500 focus:border-black focus:outline-none px-3 py-2 pr-10"
          placeholder="Password"
          required
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      {/* Toggle links */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>

      {/* Submit button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
