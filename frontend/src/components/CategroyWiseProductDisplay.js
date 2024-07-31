import React, { useContext, useEffect, useState,useRef } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context/index';
import scrollTop from '../helpers/scrollTop';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4 text-gray-700 stylish-heading mb-4'>{heading}</h2>
      <div className='relative'>
        <button
          className='bg-gray-200 shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:flex items-center justify-center z-10'
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
          {loading ? (
            loadingList.map((_, index) => (
              <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-md shadow-lg flex'>
                <div className='bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                <div className='p-4 grid w-full gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800 bg-gray-300 animate-pulse p-1 rounded-md'></h2>
                  <p className='capitalize text-gray-600 p-1 bg-gray-300 animate-pulse rounded-md'></p>
                  <div className='flex gap-3 w-full'>
                    <p className='text-red-600 font-medium p-1 bg-gray-300 w-full animate-pulse rounded-md'></p>
                    <p className='text-gray-600 line-through p-1 bg-gray-300 w-full animate-pulse rounded-md'></p>
                  </div>
                  <button className='text-sm text-white px-3 py-0.5 rounded-md w-full bg-gray-300 animate-pulse'></button>
                </div>
              </div>
            ))
          ) : (
            data.map((product, index) => (
              <Link key={index} to={`/product/${product?._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-md shadow-lg flex' onClick={scrollTop}>
                <div className='bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                  <img src={product.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                </div>
                <div className='p-4 grid gap-2 w-full'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800'>{product?.productName}</h2>
                  <p className='capitalize text-gray-600'>{product?.category}</p>
                  <div className='flex gap-3'>
                    <p className='text-blue-600 font-medium'>{product?.sellingPrice}</p>
                    <p className='text-gray-600 line-through'>{product?.price}</p>
                  </div>
                  <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-md w-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                </div>
              </Link>
            ))
          )}
        </div>
        <button
          className='bg-gray-200 shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:flex items-center justify-center z-10'
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
