// import React, { useState, useEffect, useRef, useContext } from 'react';
// import Logo from './Logo';
// import Loading from '../loading.js';
// import { FaRegUserCircle } from "react-icons/fa";
// import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineDown } from "react-icons/ai";
// import productCategory from '../helpers/productCategory';
// import { CiSearch } from "react-icons/ci";
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';
// import { toast, ToastContainer } from 'react-toastify';
// import summaryApi from '../common/index';
// import 'react-toastify/dist/ReactToastify.css';
// import { BiCog } from 'react-icons/bi';
// import '../App.css';
// import Context from '../context/index.js';

// const Header = () => {
//   const user = useSelector(state => state?.user?.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const context = useContext(Context);


//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [filteredCategories, setFilteredCategories] = useState(productCategory);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0)


//   const categoryDropdownRef = useRef(null);
//   const profileDropdownRef = useRef(null);

//   const [floatingTexts, setFloatingTexts] = useState([]);
//   const [textIndex, setTextIndex] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };




//   const handleLogout = async () => {
//     setIsLoading(true); // Start loading state
//     try {
//       const fetchData = await fetch(summaryApi.logout_user.url, {
//         method: summaryApi.logout_user.method,
//         credentials: 'include'
//       });

//       const data = await fetchData.json();

//       if (data.success) {
//         toast.success('Logged out successfully!', {
//           style: {
//             background: 'linear-gradient(to right, #4a90e2, #9013fe)',
//             color: 'white'
//           }
//         });
//         dispatch(setUserDetails(null));
//         setTimeout(() => {
//           setIsLoading(false); // Stop loading state
//           navigate('/');
//           window.location.reload(); // Refresh the page
//         }, 1000); // Adjust the timeout duration as needed
//       } else {
//         toast.error(data.message || 'Logout failed. Please try again.', {
//           style: {
//             background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
//             color: 'white'
//           }
//         });
//         setIsLoading(false); // Stop loading state if logout fails
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//       toast.error('An error occurred. Please try again.', {
//         style: {
//           background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
//           color: 'white'
//         }
//       });
//       setIsLoading(false); // Stop loading state on error
//     }
//   };

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen(prev => !prev);
//     setIsProfileDropdownOpen(false); // Close profile dropdown if open
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(prev => !prev);
//     setIsCategoryDropdownOpen(false); // Close category dropdown if open
//   };

//   const handleCategorySearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     const filtered = productCategory.filter(category =>
//       category.label.toLowerCase().includes(query)
//     );
//     setFilteredCategories(filtered);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setIsCategoryDropdownOpen(false);
//       }
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//         setIsProfileDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleIconClick = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate('/');
//     }, 2000); // Adjust the timeout duration as needed
//   };

//   // Fetch cart count for the logged-in user
//   useEffect(() => {
//     if (user?.userId) {
//       fetchCartCount(user.userId);
//       fetchWishlistCount(user.userId);
//     }

//     const texts = [
//       "🚀 Explore the universe of products...",
//       "🔥 Grab the hottest deals now!",
//       "💎 Unearth rare finds",
//       "🔍 Seek and you shall find...",
//       "🛒 Trendy collections await!",
//       "🛒 EvoCartel makes the shopping easy",
//     ];
//     setFloatingTexts(texts);

//     const intervalId = setInterval(() => {
//       setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [user]);

//   const fetchCartCount = async (userId) => {
//     try {
//       const response = await fetch(`${summaryApi.addToCartProductCount.url}?userId=${userId}`, {
//         method: summaryApi.addToCartProductCount.method,
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (data.success) {
//         setCartCount(data.cartCount);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//       setCartCount(0);
//     }
//   };




//   //fetch wishlist count function

//   const fetchWishlistCount = async (userId) => {
//     try {
//       const response = await fetch(`${summaryApi.countWishlistProducts.url}?userId=${userId}`, {
//         method: summaryApi.countWishlistProducts.method,
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (data.success) {
//         setWishlistCount(data.wishlistCount); // Update state with fetched wishlist count
//       } else {
//         setWishlistCount(0); // Set to 0 if fetching fails
//       }
//     } catch (error) {
//       console.error('Error fetching wishlist count:', error);
//       setWishlistCount(0); // Set to 0 on error
//     }
//   };

//   if (isLoading) {
//     return <Loading />;
//   }







//   // console.log("Wishlist Count:",context?.wishlistCount)

//   return (

//     <header className='h-20 shadow-md bg-white fixed w-full z-40'>
//       <div className="container mx-auto flex items-center justify-between px-4">
//         <div className='cursor-pointer  md:w-[150]' onClick={handleIconClick}>
//           <Link to='/'>
//             <Logo w={200} h={65} />
//           </Link>
//         </div>
//         <div className="relative flex items-center focus-within:shadow-md p-2 mt-2  bg-transparent">
//           <div className="relative flex-grow">
//             <div className="pl-10 pr-4 py-2 focus:outline-none focus:text-gray-600">

//               <div className="floating-text text-blue-700 text-xl">
//                 {floatingTexts[textIndex]}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center mx-6 mt-4 relative items_menu">
//           {user?._id && (
//             <div className="relative cursor-pointer text-2xl mr-2" onClick={toggleProfileDropdown} ref={profileDropdownRef}>
//               <div className="relative">
//                 {user?.profilePic ? (
//                   <img
//                     src={`http://localhost:8000/${user?.profilePic}`}
//                     alt={user?.name || 'User Profile'}
//                     className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-slate-900"
//                   />
//                 ) : (
//                   <FaRegUserCircle />
//                 )}
//                 {isProfileDropdownOpen && (
//                   <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-gray-300 border border-gray-300 rounded-md shadow-lg z-50">
//                     <div className="py-2">
//                       <Link
//                         to={`/user-profile/${user?._id}`}
//                         className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white transition duration-200"
//                       >
//                         Profile
//                       </Link>
//                       {user?.role === 'ADMIN' && (
//                         <Link
//                           to="/admin-panel/all-products"
//                           // target='_blank'
//                           className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 flex items-center"
//                         >
//                           Admin Panel
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 )}

//               </div>
//             </div>
//           )}
//           <div className='text-3xl relative flex items-center'>
//             <Link to="/wishlist" className="relative flex items-center mr-4 cursor-pointer">
//               <AiOutlineHeart />
//               {user?._id && (
//                 <>
//                   <div className='absolute -top-2 left-4 bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center'>
//                     <p className='text-xs'>{context?.wishlistCount}</p>
//                   </div>
//                   <span className="ml-1 text-sm text-gray-600">Wishlist</span>
//                 </>
//               )}
//             </Link>

//             <Link to="/cart" className="relative flex items-center mr-4 cursor-pointer">
//               <AiOutlineShoppingCart />
//               {user?._id && (
//                 <>
//                   <div className='absolute -top-2 left-4 bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center'>
//                     <p className='text-xs'>{context?.cartProductCount}</p>
//                   </div>
//                   <span className="ml-1 text-sm text-gray-600">Cart</span>
//                 </>
//               )}
//             </Link>
//           </div>
//           <div className="mx-4">
//             {user?._id ? (
//               <button onClick={handleLogout} className='gradient-button text-sm'>Logout</button>
//             ) : (
//               <Link to='./Login'>
//                 <button className='gradient-button text-sm'>Login</button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </header>
//   );
// }

// export default Header;































import React, { useState, useEffect, useRef, useContext } from 'react';
import Logo from './Logo';
import Loading from '../loading.js';
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart,AiOutlineSetting } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import summaryApi from '../common/index';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import Context from '../context/index.js';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);


 
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0)


  const profileDropdownRef = useRef(null);

  const [floatingTexts, setFloatingTexts] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  // Add this state
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const menuDropdownRef = useRef(null); // Add this ref

  // Add this event handler
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };



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
          navigate('/');
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



  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
     
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) { // Add this condition
        setTimeout(() => {
          setIsMenuOpen(false);
        }, 1000)
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
      fetchWishlistCount(user.userId);
    }

    const texts = [
      "🚀 Explore the universe of products...",
      "🔥 Grab the hottest deals now!",
      "💎 Unearth rare finds",
      "🔍 Seek and you shall find...",
      "🛒 Trendy collections await!",
      "🛒 EvoCartel makes the shopping easy",
    ];
    setFloatingTexts(texts);

    const intervalId = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(intervalId);
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




  //fetch wishlist count function

  const fetchWishlistCount = async (userId) => {
    try {
      const response = await fetch(`${summaryApi.countWishlistProducts.url}?userId=${userId}`, {
        method: summaryApi.countWishlistProducts.method,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setWishlistCount(data.wishlistCount); // Update state with fetched wishlist count
      } else {
        setWishlistCount(0); // Set to 0 if fetching fails
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      setWishlistCount(0); // Set to 0 on error
    }
  };

  if (isLoading) {
    return <Loading />;
  }







  // console.log("Wishlist Count:",context?.wishlistCount)

  return (

    <header className='h-20 shadow-md bg-white fixed w-full z-40'>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className='cursor-pointer  md:w-[150]' onClick={handleIconClick}>
          <Link to='/'>
            <Logo w={200} h={65} />
          </Link>
        </div>
        <div className="relative flex items-center focus-within:shadow-md p-2 mt-2  bg-transparent floating_text">
          <div className="relative flex-grow">
            <div className="pl-10 pr-4 py-2 focus:outline-none focus:text-gray-600">

              <div className="floating-text text-blue-700 text-xl">
                {floatingTexts[textIndex]}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mx-6 mt-4  items_menu">
          {user?._id && (
            <div className="relative cursor-pointer text-2xl mr-2" onClick={toggleProfileDropdown} ref={profileDropdownRef}>
              <div className="relative">
                {user?.profilePic ? (
                  <img
                    src={`http://localhost:8000/${user?.profilePic}`}
                    alt={user?.name || 'User Profile'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-slate-900"
                  />
                ) : (
                  <FaRegUserCircle />
                )}
                {isProfileDropdownOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-gray-300 border border-gray-300 rounded-md shadow-lg z-50">
                    <div className="py-2">
                      <Link
                        to={`/user-profile/${user?._id}`}
                        className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white transition duration-200"
                      >
                        Profile
                      </Link>
                      {user?.role === 'ADMIN' && (
                        <Link
                          to="/admin-panel/all-products"
                          // target='_blank'
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 flex items-center"
                        >
                          Admin Panel
                        </Link>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
          <div className='text-3xl relative flex items-center'>
            <Link to="/wishlist" className="relative flex items-center mr-4 cursor-pointer">
              <AiOutlineHeart />
              {user?._id && (
                <>
                  <div className='absolute -top-2 left-4 bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center'>
                    <p className='text-xs'>{context?.wishlistCount}</p>
                  </div>
                  <span className="ml-1 text-sm text-gray-600">Wishlist</span>
                </>
              )}
            </Link>

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

        {/* --------- */}
        <div className="menu-toggle-container" onClick={toggleMenu} ref={menuDropdownRef}>
          <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
        </div>

        {isMenuOpen && (
  <div className="menu-dropdown">

    {user?._id && (
      <Link to={`/user-profile/${user?._id}`} className="menu-item w-full flex items-center cursor-pointer">
        {user?.profilePic ? (
          <img
            src={`http://localhost:8000/${user?.profilePic}`}
            alt={user?.name || 'User Profile'}
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 shadow-slate-900 cursor-pointer"
          />
        ) : (
          <FaRegUserCircle className="text-2xl cursor-pointer" />
        )}
        <span className="ml-2">{user?.name || 'Profile'}</span>
      </Link>
    )}

    {user?.role === 'ADMIN' && (
      <div className="menu-item w-full">
        <Link
          to="/admin-panel/all-products"
          className="py-2 text-md text-gray-600 transition duration-200 flex items-center"
        >
          <AiOutlineSetting className="text-2xl ml-0 mr-2" />
          Admin Panel
        </Link>
      </div>
    )}

    {user?._id && (
      <>
        <div className="menu-item item-wishlist w-full flex items-center">
          <Link to="/wishlist" className="flex items-center w-full">
            <div className='relative flex items-center'>
              <AiOutlineHeart className="text-3xl mr-2" />
              <div className='absolute top-[-5px] left-[-5px] bg-gray-500 text-white rounded-full p-1 flex items-center justify-center text-xs'>
                {context?.wishlistCount}
              </div>
              <span className="text-md text-gray-600">Wishlist</span>
            </div>
          </Link>
        </div>

        <div className="menu-item item-cart w-full flex items-center">
          <Link to="/cart" className="flex items-center w-full">
            <div className='relative flex items-center'>
              <AiOutlineShoppingCart className="text-3xl mr-2" />
              <div className='absolute top-[-5px] left-[-5px] bg-gray-500 text-white rounded-full p-1 flex items-center justify-center text-xs'>
                {context?.cartProductCount}
              </div>
              <span className="text-md text-gray-600">Cart</span>
            </div>
          </Link>
        </div>
      </>
    )}

    {user?._id ? (
      <button onClick={handleLogout} className="menu-item gradient-button text-sm w-full ml-0">Logout</button>
    ) : (
      <>
      <div  className='menu-item item-cart w-full flex items-center' >

      
      <Link to='./Login' className="menu-item gradient-button text-sm ml-0 w-full">Login</Link>
      </div>
      </>
    )}
  </div>
)}









        {/* -------------- */}
      </div>
      <ToastContainer />
    </header>
  );
}

export default Header;
