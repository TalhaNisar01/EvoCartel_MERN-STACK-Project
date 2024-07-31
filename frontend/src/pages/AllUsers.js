import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import { FaEnvelope, FaUserShield, FaCalendarAlt } from "react-icons/fa"; // Import icons
import ChangeUserRole from '../components/ChangeUserRole';
import Loading from '../loading'; // Import the Loading component
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify CSS is imported
import '../App.css'; // Make sure you have relevant styles here

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(true); // Add loading state

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
    
            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
                // toast.success(dataResponse.message, {
                //     style: {
                //         background: 'linear-gradient(to right, #4a90e2, #9013fe)',
                //         color: 'white'
                //     },
                //     autoClose: 3000,
                //     closeOnClick: true
                // });
            } else {
                toast.error(dataResponse.message, {
                    style: {
                        background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                        color: 'white'
                    },
                    autoClose: 3000,
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.', {
                style: {
                    background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                    color: 'white'
                },
                autoClose: 3000,
                closeOnClick: true
            });
        } finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    if (loading) {
        return <Loading />; // Render the Loading component while loading
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {allUser.map((el) => (
                    <div key={el._id} className='bg-white p-4 rounded-lg shadow-lg flex flex-col items-start'>
                        <div className='flex items-center mb-4'>
                            <div className='bg-gray-200 p-2 rounded-full'>
                                {/* Display user's image if available, otherwise display default avatar */}
                                <img 
                                    src={el.imageUrl || `https://ui-avatars.com/api/?name=${el.name}`} 
                                    alt={el.name} 
                                    className='w-16 h-16 rounded-full object-cover' 
                                />
                            </div>
                            <div className='ml-4'>
                                <h2 className='text-lg font-semibold'>{el.name}</h2>
                                <p className='text-gray-600 flex items-center'><FaEnvelope className="mr-2" />{el.email}</p>
                                <p className='text-gray-500 flex items-center'><FaUserShield className="mr-2" />{el.role}</p>
                                <p className='text-gray-400 text-sm flex items-center'><FaCalendarAlt className="mr-2" />Created on: {moment(el.createdAt).format('LL')}</p>
                            </div>
                        </div>
                        <button 
                            className='bg-blue-700 text-white p-2 rounded-full hover:bg-blue-900 flex items-center'
                            onClick={() => {
                                setUpdateUserDetails(el);
                                setOpenUpdateRole(true);
                            }}
                        >
                            <MdModeEdit className='mr-2' />
                            Edit Role
                        </button>
                    </div>
                ))}
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    imageUrl={updateUserDetails.imageUrl} // Pass imageUrl as a prop
                    callFunc={fetchAllUsers}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default AllUsers;
