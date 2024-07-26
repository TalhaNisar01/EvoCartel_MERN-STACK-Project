import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common/index';
import Context from '../context';
import { MdDelete } from "react-icons/md";
import loadingGif from '../assets/Gif/cart1.gif';
import emptyCartGif from '../assets/Gif/cart2.gif';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(summaryApi.addToCartProductView.url, {
            method: summaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
      setLoading(true);
      const startTime = Date.now();
      
      await fetchData();
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      const remainingTime = Math.max(2000 - duration, 0);
  
      setTimeout(() => {
          setLoading(false);
      }, remainingTime);
  };
  

    useEffect(() => {
        handleLoading();
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(summaryApi.updateCartProduct.url, {
            method: summaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(summaryApi.updateCartProduct.url, {
                method: summaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(summaryApi.deleteCartProduct.url, {
            method: summaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto relative'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <img src={loadingGif} alt='Loading...' className='w-24 h-24' />
                </div>
            ) : (
                <>
                    {data.length === 0 && (
                        <div className='absolute inset-0 flex justify-center items-center bg-white'>
                            <img src={emptyCartGif} alt='Empty Cart' className='w-full h-full object-contain' />
                        </div>
                    )}
                    <div className={`text-center text-lg my-3 ${data.length === 0 ? 'hidden' : ''}`}>
                        <p className='bg-white py-5'>No Data</p>
                    </div>

                    <div className={`flex flex-col lg:flex-row gap-10 lg:justify-between p-4 ${data.length === 0 ? 'hidden' : ''}`}>
                        {/* View Product */}
                        <div className='w-full max-w-3xl'>
                            {data.map((product, index) => (
                                <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/* Delete Product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>

                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
