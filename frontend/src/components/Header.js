import React, { useState, useEffect, useRef, useContext } from 'react';
import Logo from './Logo';
import Loading from '../loading.js';
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineDown } from "react-icons/ai";
import productCategory from '../helpers/productCategory';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import summaryApi from '../common/index';
import 'react-toastify/dist/ReactToastify.css';
import { BiCog } from 'react-icons/bi';
import '../App.css';
import Context from '../context/index.js';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(productCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const categoryDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

 
  const handleLogout = async () => {
    setIsLoading(true); // Start loading state
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
          setIsLoading(false); // Stop loading state
          window.location.reload(); // Refresh the page
        }, 1000); // Adjust the timeout duration as needed
      } else {
        toast.error(data.message || 'Logout failed. Please try again.', {
          style: {
            background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
            color: 'white'
          }
        });
        setIsLoading(false); // Stop loading state if logout fails
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred. Please try again.', {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white'
        }
      });
      setIsLoading(false); // Stop loading state on error
    }
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(prev => !prev);
    setIsProfileDropdownOpen(false); // Close profile dropdown if open
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
    setIsCategoryDropdownOpen(false); // Close category dropdown if open
  };

  const handleCategorySearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = productCategory.filter(category =>
      category.label.toLowerCase().includes(query)
    );
    setFilteredCategories(filtered);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIconClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000); // Adjust the timeout duration as needed
  };

  // Fetch cart count for the logged-in user
  useEffect(() => {
    if (user?.userId) {
      fetchCartCount(user.userId);
    }
  }, [user]);

  const fetchCartCount = async (userId) => {
    try {
    
      const response = await fetch(`${summaryApi.addToCartProductCount.url}?userId=${userId}`, {
        method: summaryApi.addToCartProductCount.method,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setCartCount(data.cartCount);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <header className='h-20 shadow-md bg-white fixed w-full z-40'>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className='cursor-pointer' onClick={handleIconClick}>
          <Link to='/'>
            <Logo w={200} h={65} />
          </Link>
        </div>
        <div className="relative mt-4 flex items-center">
          <div className="relative flex items-center border-2 focus-within:border-gray-300 focus-within:shadow-md">
            <div className="relative" ref={categoryDropdownRef}>
              <div 
                className="relative flex items-center cursor-pointer px-2 py-2 focus:outline-none focus:text-gray-600"
                onClick={toggleCategoryDropdown}
              >
                {selectedCategory ? productCategory.find(cat => cat.value === selectedCategory)?.label : "All Categories"}
                <AiOutlineDown className="ml-2" />
              </div>
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                  <input 
                    type="text" 
                    className="w-[90%] px-2 py-2 border-b mx-2 my-2 focus:outline-none border-2 border-gray-200"
                    placeholder="Search categories"
                    onChange={handleCategorySearch}
                  />
                  <div className="py-2">
                    <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => {
                      setSelectedCategory('');
                      setIsCategoryDropdownOpen(false);
                    }}>All Categories</div>
                    {filteredCategories.map(category => (
                      <div 
                        key={category.id} 
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setIsCategoryDropdownOpen(false);
                        }}
                      >
                        {category.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span className="mx-2 text-gray-400 text-xl">|</span>
            <input
              size={35}
              type="search"
              placeholder="Search Your Product Here ..."
              className="pl-10 pr-4 py-2 focus:outline-none focus:text-gray-600"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700">
              <CiSearch size={20} />
            </div>
          </div>
        </div>
        <div className="flex items-center mx-6 mt-4 relative">
          {user?._id && (
            <div className="relative cursor-pointer text-2xl mr-2" onClick={toggleProfileDropdown} ref={profileDropdownRef}>
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
                {isProfileDropdownOpen && user?.role === 'ADMIN' && (
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
          <div className='text-3xl relative flex items-center'>
            <div className="relative flex items-center mr-4">
              <AiOutlineHeart />
              <div className='absolute -top-2 left-4 bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center'>
                <p className='text-xs'>0</p>
              </div>
              <span className="ml-1 text-sm text-gray-600">Wishlist</span>
            </div>
            <Link to="/cart" className="relative flex items-center mr-4 cursor-pointer">
              <AiOutlineShoppingCart />
              {user?._id && (
                <>
                  <div className='absolute -top-2 left-4 bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center'>
                    <p className='text-xs'>{context?.cartProductCount}</p>
                  </div>
                  <span className="ml-1 text-sm text-gray-600">Cart</span>
                </>
              )}
            </Link>
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
