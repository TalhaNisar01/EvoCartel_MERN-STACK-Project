import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common/index';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    imageUrl, // Add imageUrl as a prop
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    }

    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(summaryApi.updateUser.url, {
                method: summaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message, {
                    style: {
                        background: 'linear-gradient(to right, #4a90e2, #9013fe)',
                        color: 'white'
                    },
                    autoClose: 2000, // Auto close after 2 seconds
                    closeOnClick: true // Close on click
                });
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message, {
                    style: {
                        background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                        color: 'white'
                    },
                    autoClose: 3000, // Auto close after 3 seconds
                    closeOnClick: true // Close on click
                });            }
        } catch (error) {
            toast.error("An error occurred while updating the role", {
                style: {
                    background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                    color: 'white'
                },
                autoClose: 3000, // Auto close after 3 seconds
                closeOnClick: true // Close on click
            });
        }
    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md gradient-shadow relative">
                <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition" onClick={onClose}>
                    <IoMdClose size={24} />
                </button>
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Change User Role</h1>
                <div className='flex items-center mb-4'>
                    <div className='bg-gray-200 p-2 rounded-full'>
                        <img 
                            src={imageUrl || `https://ui-avatars.com/api/?name=${name}`} 
                            alt={name} 
                            className='w-16 h-16 rounded-full object-cover' 
                        />
                    </div>
                    <div className='ml-4'>
                        <p className="text-gray-700 mb-2"><strong>Name:</strong> {name}</p>
                        <p className="text-gray-700 mb-6"><strong>Email:</strong> {email}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-700"><strong>Role:</strong></p>
                    <select className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:ring-blue-300" value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition" onClick={updateUserRole}>
                    Change Role
                </button>
            </div>
        </div>
    );
}

export default ChangeUserRole;
