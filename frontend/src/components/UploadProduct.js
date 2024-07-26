import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt, FaTag, FaAlignLeft, FaDollarSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadImage';
import summaryApi from '../common/index';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(summaryApi.uploadProduct.url, {
      method: summaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log("Response Data:", responseData);
    if (responseData.success) {
      toast.success(responseData.message);
      onClose(); // Close the upload form
      fetchData(); // Fetch all products to update the list
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden relative'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-bold text-xl'>Upload Product</h2>
          <button className='text-2xl text-gray-600 hover:text-blue-700 transition' onClick={onClose}>
            <CgClose />
          </button>
        </div>
        <form className='grid gap-4 overflow-y-auto h-[70vh] w-full' onSubmit={handleSubmit}>
          <label htmlFor='productName' className='flex items-center gap-2'>
            <FaTag />
            Product Name:
          </label>
          <input
            type='text'
            id='productName'
            placeholder='Enter product name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'
            required
          />
          <label htmlFor='brandName' className='flex items-center gap-2'>
            <FaTag />
            Brand Name:
          </label>
          <input
            type='text'
            id='brandName'
            placeholder='Enter brand name'
            value={data.brandName}
            name='brandName'
            onChange={handleOnChange}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'
            required
          />
          <label htmlFor='category' className='flex items-center gap-2'>
            <FaAlignLeft />
            Category:
          </label>
          <select
            required
            value={data.category}
            name='category'
            onChange={handleOnChange}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'>
            <option value={""}>Select Category</option>
            {productCategory.map((el) => (
              <option value={el.value} key={el.value}>{el.label}</option>
            ))}
          </select>
          <label htmlFor='productImage' className='flex items-center gap-2'>
            <FaCloudUploadAlt />
            Product Image:
          </label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 border rounded-lg h-32 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition'>
              <div className='text-gray-500 flex flex-col items-center gap-2'>
                <FaCloudUploadAlt size={24} />
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div className='flex flex-wrap gap-2'>
            {data.productImage.map((el, index) => (
              <div className='relative group' key={index}>
                <img
                  src={el}
                  alt={`product-${index}`}
                  className='w-20 h-20 object-cover border rounded-lg cursor-pointer'
                  onClick={() => {
                    setOpenFullScreenImage(true);
                    setFullScreenImage(el);
                  }}
                />
                <button className='absolute top-1 right-1 p-1 bg-blue-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition' onClick={() => handleDeleteProductImage(index)}>
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
          <label htmlFor='price' className='flex items-center gap-2'>
            <FaDollarSign />
            Price:
          </label>
          <input
            type='number'
            id='price'
            placeholder='Enter price'
            value={data.price}
            name='price'
            onChange={handleOnChange}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'
            required
          />
          <label htmlFor='sellingPrice' className='flex items-center gap-2'>
            <FaDollarSign />
            Selling Price:
          </label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='Enter selling price'
            value={data.sellingPrice}
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'
            required
          />
          <label htmlFor='description' className='flex items-center gap-2'>
            <FaAlignLeft />
            Description:
          </label>
          <div className='h-14 w-full'>
            <textarea
              id='description'
              className='p-2 border rounded-lg resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-100'
              placeholder='Enter product description'
              rows={4}
              onChange={handleOnChange}
              name='description'
              value={data.description}
              required
            />
          </div>
          <button className='py-2 px-4 bg-gradient-to-r mt-20 from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition'>
            Upload Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
