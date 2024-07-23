import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify CSS is imported
import '../App.css';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
    
            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            //     toast.success(dataResponse.message, {
            //         style: {
            //              background: 'linear-gradient(to right, #4a90e2, #9013fe)',
            // color: 'white'
            //         },
            //         autoClose: 3000,
            //         closeOnClick: true
            //     });
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
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4' style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <table className='w-full userTable' style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr className='bg-black text-white' style={{ background: 'linear-gradient(to right, #4a90e2, #9013fe)', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sr.</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Created Date</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((el, index) => (
                        <tr key={el._id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{el?.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{el?.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{el?.role}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{moment(el?.createdAt).format('LL')}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                    onClick={() => {
                                        setUpdateUserDetails(el);
                                        setOpenUpdateRole(true);
                                    }}
                                    style={{ border: 'none', background: 'none' }}
                                >
                                    <MdModeEdit className="edit-icon" style={{ fontSize: '20px' }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default AllUsers;
