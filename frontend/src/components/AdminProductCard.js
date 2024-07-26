import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded relative flex flex-col w-40 group'>
      {/* Category Label */}
      <div className='absolute top-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-tr-lg rounded-bl-lg'>
        {data.category}
      </div>

      <div className='flex-grow'>
        <div className='w-32 h-32 flex justify-center items-center mx-auto'>
          <img src={data?.productImage[0]} className='object-fill h-full' alt={data.productName} />
        </div>
        <h1 className='line-clamp-2 break-words'>{data.productName}</h1>
      </div>

      <div className='mt-auto'>
        <p className='font-semibold'>
          {/* Uncomment if you have a currency display function */}
          {/* {displayINRCurrency(data.sellingPrice)} */}
        </p>
      </div>

      {/* Edit Icon */}
      <div 
        className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer'
        onClick={() => setEditProduct(true)}
      >
        <div className='p-2 bg-white rounded-full shadow-md'>
          <MdModeEditOutline size={24} />
        </div>
      </div>
      
      {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
      )}
    </div>
  );
};

export default AdminProductCard;
