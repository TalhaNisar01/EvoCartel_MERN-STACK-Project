import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConfirmationDialog = ({ onClose, onConfirm }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg shadow-lg w-1/3 max-w-md p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold'>Confirm Deletion</h3>
          <button className='text-gray-600 hover:text-gray-900' onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>
        <p className='mb-4'>Are you sure you want to delete this product?</p>
        <div className='flex justify-end'>
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700'
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
