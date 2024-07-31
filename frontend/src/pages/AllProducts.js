import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common/index';
import AdminProductCard from '../components/AdminProductCard';
import Loading from '../loading'; 
import emptyCartGif from '../assets/empty_cart.gif'; 

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const fetchAllProduct = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();
    console.log("Data All Products:", dataResponse);
    setAllProduct(dataResponse?.data || []);
    setFilteredProduct(dataResponse?.data || []); // Initialize filtered products
    setLoading(false); // Set loading to false when fetching ends
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProduct(allProduct);
    } else {
      setFilteredProduct(
        allProduct.filter((product) =>
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allProduct]);

  if (loading) {
    return <Loading />; // Render the Loading component while loading
  }

  return (
    <div className='p-4'>
      <div className='bg-white py-3 px-6 rounded-lg shadow-lg flex justify-between items-center'>
        <button
          className='py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
        <input
          type="text"
          placeholder="Search by category"
          className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition w-full md:w-1/3 ml-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable container for all products */}
      <div className='flex flex-wrap gap-5 py-4 overflow-y-auto max-h-[80vh]'>
        {filteredProduct.length > 0 ? (
          filteredProduct.map((product, index) => (
            <AdminProductCard data={product} key={index} fetchData={fetchAllProduct} />
          ))
        ) : (
          <div className='w-full flex flex-col items-center'>
            <img src={emptyCartGif} alt="No items found" className='w-64 h-64' />
            <p className='text-gray-500 mt-4'>No products found</p>
          </div>
        )}
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
