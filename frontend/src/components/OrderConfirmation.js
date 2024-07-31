import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo'


const OrderConfirmation = () => {
    return (
        <div className='container mx-auto flex flex-col items-center justify-center h-screen bg-white'>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
                <div className='ml-32 mt-0'><Logo w='170' h='100'/></div>
                
                <h1 className='text-4xl font-semibold text-green-600 mb-4'>Thank You! 🎉</h1>
                <p className='text-lg text-gray-700 mb-4'>Your order has been placed successfully.</p>
                <p className='text-lg text-gray-700 mb-8'>You will receive a confirmation email with the order details shortly.</p>
                <p className='text-lg text-green-600 mb-8'>Please Track Your Order on your Profile section...</p>

                <Link to="/" className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'>
                    Continue Shopping
                </Link>
            
                
            </div>
        </div>
    );
};

export default OrderConfirmation;
