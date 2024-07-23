import React from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-75'>
      <div className='relative bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto'>
        <button className='absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-600 transition' onClick={onClose}>
          <CgClose />
        </button>
        <div className='flex justify-center items-center'>
          <img src={imgUrl} className='max-w-full max-h-screen object-contain' alt='Product' />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
