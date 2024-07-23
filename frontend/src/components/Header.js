import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import summaryApi from '../common/index';
import 'react-toastify/dist/ReactToastify.css';
import { BiCog } from 'react-icons/bi';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(summaryApi.logout_user.url, {
        method: summaryApi.logout_user.method,
        credentials: 'include'
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success('Logged out successfully!', {
          style: {
            background: 'linear-gradient(to right, #4a90e2, #9013fe)',
            color: 'white'
          }
        });
        dispatch(setUserDetails(null));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error(data.message || 'Logout failed. Please try again.', {
          style: {
            background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
            color: 'white'
          }
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred. Please try again.', {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white'
        }
      });
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='h-20 shadow-md bg-white'>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className='cursor-pointer'>
          <Link to='/'>
            <Logo w={200} h={65} />
          </Link>
        </div>
        <div className="relative mt-4">
          <input
            size={35}
            type="search"
            placeholder="Search Your Product Here ..."
            className="pl-10 pr-4 py-2 border-2 focus:border-gray-300 focus:shadow-md focus:outline-none focus:text-gray-600 input-gradient-border"
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700">
            <CiSearch size={20} />
          </div>
        </div>
        <div className="flex items-center mx-6 mt-4 relative">
          {user?._id && (
            <div className="relative cursor-pointer text-2xl mr-2" onClick={toggleDropdown} ref={dropdownRef}>
              <div className="relative">
                {user?.profilePic ? (
                  <img
                    src={`http://localhost:8000/${user?.profilePic}`}
                    alt={user?.name || 'User Profile'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaRegUserCircle />
                )}
                {isDropdownOpen && user?.role === 'ADMIN' && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <Link
                      to="/admin-panel/all-products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <BiCog className="mr-2" /> Admin Panel
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className='text-2xl relative'>
            <span><IoCartSharp /></span>
            <div className='bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          <div className="mx-4">
            {user?._id ? (
              <button onClick={handleLogout} className='gradient-button text-sm'>Logout</button>
            ) : (
              <Link to='./Login'>
                <button className='gradient-button text-sm'>Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
}

export default Header;
