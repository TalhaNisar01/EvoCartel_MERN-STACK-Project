import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common/index';
import AdminProductCard from '../components/AdminProductCard';
import Loading from '../loading'; 

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchAllProduct = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();
    console.log("Data All Products:", dataResponse);
    setAllProduct(dataResponse?.data || []);
    setLoading(false); // Set loading to false when fetching ends
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  if (loading) {
    return <Loading />; // Render the Loading component while loading
  }

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

      {/* Scrollable container for all products */}
      <div className='flex flex-wrap gap-5 py-4 overflow-y-auto max-h-[80vh]'>
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
