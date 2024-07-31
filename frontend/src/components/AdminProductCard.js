import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import summaryApi from '../common/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from './ConfirmationDialog '; // Import the new component

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${summaryApi.deleteProduct.url}/${data._id}`, {
        method: summaryApi.deleteProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product deleted successfully", {
          position: 'top-center',
          autoClose: 3000,
          style: {
            background: 'linear-gradient(to right, #4a90e2, #9013fe)',
            color: '#fff',
          },
        });
        fetchData();
      } else {
        toast.error(`Failed to delete product: ${result.message}`, {
          style: {
            background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
            color: 'white'
          }
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product", {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white'
        }
      });
    }
    setShowConfirmDialog(false); // Close dialog after action
  };

  return (
    <div className='bg-white p-4 rounded relative flex flex-col w-40 group'>
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

      <div
        className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer'
      >
        <div
          className='p-2 bg-white rounded-full shadow-md mx-2'
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline size={24} />
        </div>

        <div
          className='p-2 bg-white rounded-full shadow-md mx-2'
          onClick={() => setShowConfirmDialog(true)}
        >
          <MdDelete size={24} />
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
      )}

      {showConfirmDialog && (
        <ConfirmationDialog
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
