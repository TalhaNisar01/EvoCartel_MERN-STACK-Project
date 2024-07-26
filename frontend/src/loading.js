import React from 'react';
import logo from './assets/Logo/logo.svg'; 

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <div className='animate-bounce'>
        <img src={logo} alt="Logo" className='w-44 h-36 mb-4 drop-shadow-lg rounded-full' />
      </div>
      <p className='text-blue-600 text-xl font-semibold animate-pulse'>Loading...</p>
    </div>
  );
};

export default Loading;
