/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState<'Login' | 'Sign Up'>('Login');
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)!;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          // Optionally log user in right after sign up:
          setToken(response.data.token);
          localStorage.setItem('userToken', response.data.token);

          toast.success("Registration successful! Please log in.");
          setCurrentState('Login');
          setName('');
          setEmail('');
          setPassword('');
        } else {
          toast.error(response.data.message || "Registration failed.");
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('userToken', response.data.token);
          toast.success("Login successful!");
          setEmail('');
          setPassword('');
        } else {
          toast.error(response.data.message || "Login failed. Please try again.");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

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
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full border-0 border-b-2 border-gray-500 focus:border-black focus:outline-none px-3 py-2"
          placeholder="Name"
          required
        />
      )}

      {/* Email */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full border-0 border-b-2 border-gray-500 focus:border-black focus:outline-none px-3 py-2"
        placeholder="Email"
        required
      />

      {/* Password with toggle */}
      <div className="relative w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
      <button className="bg-black text-white font-light px-8 py-2 mt-4" disabled={loading}>
        {loading
          ? 'Please wait...'
          : currentState === 'Login'
          ? 'Sign In'
          : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
