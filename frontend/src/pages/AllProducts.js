import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common/index';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();
    console.log("Data All Products:", dataResponse);
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className='p-4'>
      <div className='bg-white py-3 px-6 rounded-lg shadow-lg flex justify-between items-center'>
        <h2 className='font-bold text-xl'>All Products</h2>
        <button
          className='py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All products section */}
      <div className='flex flex-wrap gap-5 py-4 overflow-y-auto'>
        {allProduct.map((product, index) => (
          <AdminProductCard data={product} key={index} fetchData={fetchAllProduct} />
        ))}
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
