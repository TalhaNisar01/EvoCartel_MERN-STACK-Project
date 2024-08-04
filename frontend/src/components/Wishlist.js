import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';
import summaryApi from '../common/index';
import loadingGif from '../assets/Gif/cart1.gif';
import emptyWishlistGif from '../assets/empty_cart.gif';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Wishlist.css'


const Wishlist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clearConfirmation, setClearConfirmation] = useState(false);
    const context = useContext(Context);

    const fetchData = async () => {
        try {
            const response = await fetch(summaryApi.getWishlistProducts.url, {
                method: summaryApi.getWishlistProducts.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
            });

            const responseData = await response.json();
            if (responseData.success) {
                setData(responseData.data);
            } else {
                console.error('Failed to fetch wishlist products:', responseData.message);
            }
        } catch (error) {
            console.error('Error fetching wishlist products:', error);
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

    const removeFromWishlist = async (id) => {
        try {
            const response = await fetch(summaryApi.removeWishlistProduct.url, {
                method: summaryApi.removeWishlistProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ productId: id }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.message, {
                    style: {
                        background: 'linear-gradient(to right, #4a90e2, #9013fe)',
                        color: 'white',
                    },
                    autoClose: 2000,
                    closeOnClick: true,
                });

                fetchData();
                context.fetchUserWishlistCount();
            } else {
                toast.error(responseData.message, {
                    style: {
                        background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                        color: 'white',
                    },
                    autoClose: 2000,
                    closeOnClick: true,
                });
                console.error('Failed to remove item from wishlist:', responseData.message);
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.', {
                style: {
                    background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                    color: 'white',
                },
                autoClose: 2000,
                closeOnClick: true,
            });
            console.error('Error removing item from wishlist:', error);
        }
    };

    const clearWishlist = async () => {
        for (let product of data) {
            await removeFromWishlist(product?.productId);
        }
        setClearConfirmation(false);
    };

    return (
        <div className='container mx-auto relative bg-white'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <img src={loadingGif} alt='Loading...' className='w-40 h-40' />
                </div>
            ) : (
                <>
                    {data.length === 0 ? (
                        <div className='relative flex justify-center items-center h-screen cursor-pointer'>
                            <img src={emptyWishlistGif} alt='Empty Wishlist' className='w-full h-[60%] object-contain' />
                            <Link to="/" className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity'>
                                <p className='text-blue-950 text-lg font-semibold p-4 text-center'>
                                    Click to go back to the home page and add items to your wishlist
                                </p>
                            </Link>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-10 p-4'>
                            <div className='w-full'>
                                {data.map((product) => (
                                    <div key={product?.productId} className='w-full bg-white h-32 my-2 border border-gray-300 rounded-lg shadow-md grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-gray-100 rounded-l-lg'>
                                            <img src={product?.productImage[0] || ''} className='w-full h-full object-contain' alt={product?.productName} />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            <button
                                                className='absolute right-0 top-2 bg-gray-200 text-gray-700 hover:bg-gray-300 py-1 px-3 rounded-lg'
                                                onClick={() => removeFromWishlist(product?.productId)}
                                            >
                                                Remove
                                            </button>
                                            <h2 className='text-xl sm:text-xl md:text-2xl font-semibold line-clamp-1 productname-wishlist'>
                                                {product?.productName}
                                            </h2>

                                            <p className='capitalize text-gray-600'>{product?.category}</p>
                                            <div className='flex items-center justify-between mt-2'>
                                                <p className='text-gray-700 font-medium text-lg'>${(product?.sellingPrice).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='w-full max-w-sm mx-auto mt-10'>
                                <div className='bg-white p-4 rounded-lg shadow-md'>
                                    <h2 className='text-gray-800 bg-gray-200 px-4 py-2 rounded-lg'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-gray-600 mt-4'>
                                        <p>Total Items</p>
                                        <p>{data.length}</p>
                                    </div>
                                    <button
                                        className='bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded-lg mt-4'
                                        onClick={() => setClearConfirmation(true)}
                                    >
                                        Clear Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            {clearConfirmation && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-xl font-semibold mb-4'>Confirm Clear Wishlist</h2>
                        <p className='mb-4'>Are you sure you want to clear all items from the wishlist?</p>
                        <div className='flex justify-end gap-4'>
                            <button className='bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-lg' onClick={() => setClearConfirmation(false)}>Cancel</button>
                            <button className='bg-slate-500 text-white hover:bg-slate-700 py-2 px-4 rounded-lg' onClick={clearWishlist}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
