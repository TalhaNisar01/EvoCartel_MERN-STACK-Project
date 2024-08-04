import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common/index';
import Context from '../context';
import loadingGif from '../assets/Gif/cart1.gif';
import emptyCartGif from '../assets/Gif/cart2.gif';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'



const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();

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




    const deleteCartProductItemsOrders = async (id) => {
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



    const clearCart = async () => {
        for (let product of data) {
            await deleteCartProduct(product._id);
        }
        setShowConfirm(false);
    };


    const clearCartItemsOrders = async () => {
        for (let product of data) {
            await deleteCartProductItemsOrders(product._id);
        }
        setShowConfirm(false);
    };

    const createOrder = async () => {
        const orderDetails = data.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
        }));

        const response = await fetch(summaryApi.createOrder.url, {
            method: summaryApi.createOrder.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ orderDetails })
        });

        const responseData = await response.json();

        if (responseData.success) {
            clearCartItemsOrders();
            setShowConfirm(false);
            setShowOrderModal(false);
            navigate('/order-confirmation'); // Redirect to order confirmation page
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto relative bg-white'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <img src={loadingGif} alt='Loading...' className='w-40 h-40' />
                </div>
            ) : (
                <>
                    {data.length === 0 && (
                        <div className='relative flex justify-center items-center h-screen cursor-pointer'>
                            <img src={emptyCartGif} alt='Empty Cart' className='w-full h-[60%] object-contain' />
                            <Link to={"/"} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity'>
                                <p className='text-blue-950 text-lg font-semibold p-4 text-center'>
                                    Click to go back to the home page and fill the cart
                                </p>
                            </Link>
                        </div>
                    )}

                    <div className={`text-center text-lg my-3 ${data.length !== 0 ? 'hidden' : ''}`}>
                        <p className='bg-white py-5'>No Data</p>
                    </div>

                    <div className={`flex flex-col gap-10 p-4 ${data.length === 0 ? 'hidden' : ''}`}>
                        {/* View Product */}
                        <div className='w-full'>
                            {data.map((product, index) => (
                                <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-gray-300 rounded-lg shadow-md grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-gray-100 rounded-l-lg mix-blend-multiply'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/* Delete Product */}
                                        <button 
                                            className='absolute right-0 top-2 bg-gray-200 text-gray-700 hover:bg-gray-300 py-1 px-3 rounded-lg' 
                                            onClick={() => deleteCartProduct(product?._id)}
                                        >
                                            Delete
                                        </button>
                                        <h2 className='text-xl font-semibold line-clamp-1 productname'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-gray-600'>{product?.productId.category}</p>
                                        <div className='flex items-center justify-between mt-2'>
                                            <p className='text-gray-700 font-medium text-lg'>${(product?.productId?.sellingPrice).toFixed(2)}</p>
                                            <p className='text-gray-800 font-semibold text-lg  sellingpricetotal'>${(product?.productId?.sellingPrice * product?.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-gray-300 text-gray-700 hover:bg-gray-300 w-6 h-6 flex justify-center items-center rounded-full' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                            <span className='text-gray-800'>{product?.quantity}</span>
                                            <button className='border border-gray-300 text-gray-700 hover:bg-gray-300 w-6 h-6 flex justify-center items-center rounded-full' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className='w-full max-w-sm mx-auto mt-10'>
                            <div className='bg-white p-4 rounded-lg shadow-md'>
                                <h2 className='text-gray-800 bg-gray-200 px-4 py-2 rounded-lg'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-gray-600 mt-4'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-gray-600 mt-2'>
                                    <p>Total Price</p>
                                    <p>${(totalPrice).toFixed(2)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full mt-4 rounded-lg hover:bg-blue-700' onClick={() => setShowOrderModal(true)}>Proceed to Checkout</button>
                                <button className='bg-slate-500 text-white hover:bg-slate-700 p-2 w-full mt-4 rounded-lg' onClick={() => setShowConfirm(true)}>Clear Cart</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Confirm Modal */}
            {showConfirm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center '>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-xl font-semibold mb-4'>Confirm Clear Cart</h2>
                        <p className='mb-4'>Are you sure you want to clear all items from the cart?</p>
                        <div className='flex justify-end gap-4'>
                            <button className='bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-lg' onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className='bg-slate-500 text-white hover:bg-slate-700 py-2 px-4 rounded-lg' onClick={clearCart}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Review Modal */}
            {showOrderModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center
                order_modal_place'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full'>
                        <h2 className='text-xl font-semibold mb-4'>Review Your Order</h2>
                        <div className='flex flex-col gap-4 mb-4'>
                            {data.map(product => (
                                <div key={product._id} className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <img src={product.productId.productImage[0]} alt={product.productId.productName} className='w-16 h-16 object-contain' />
                                        <div className='ml-4'>
                                            <h3 className='text-lg font-medium'>{product.productId.productName}</h3>
                                            <p className='text-gray-600'>Qty: {product.quantity}</p>
                                        </div>
                                    </div>
                                    <p className='text-gray-800 font-medium'>${(product.productId.sellingPrice * product.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between items-center mb-4'>
                            <p className='text-lg font-medium'>Total:</p>
                            <p className='text-lg font-semibold'>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-end gap-4'>
                            <button className='bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-lg' onClick={() => setShowOrderModal(false)}>Cancel</button>
                            <button className='bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg' onClick={createOrder}>Place Order</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;