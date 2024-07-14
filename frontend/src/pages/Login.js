import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css'; // Import your custom CSS file

import Logo from '../components/Logo'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white gradient-shadow rounded-lg border border-gray-300">
       <div className='flex items-center mb-8 ml-16'>
       <Logo w={200} h={70}/>
       </div>
         
       
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-8"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <Link
              to={"/Login/forgot-password"}
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
