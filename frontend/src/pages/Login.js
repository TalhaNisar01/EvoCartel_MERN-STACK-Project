import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import summaryApi from '../common/index'; // Adjust the import as needed
import Logo from '../components/Logo';
import Context from '../context/index';


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // Initialize the navigate function
  const {fetchUserDetails}=useContext(Context);


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const response = await dataResponse.json();
      console.log("Response:", response); // Log the response to debug

      if (dataResponse.ok) {
        toast.success('Login successful!', {
          style: {
            background: 'linear-gradient(to right, #4a90e2, #9013fe)',
            color: 'white'
          }
        },
        fetchUserDetails()
      );

        
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      } else {
        toast.error(response.message || 'Failed to login. Please try again.', {
          style: {
            background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
            color: 'white'
          }
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white'
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white gradient-shadow rounded-lg border border-gray-300">
        <div className='flex items-center mb-8 ml-16'>
          <Logo w={200} h={70} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-8"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 gradient-button text-white font-bold rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link
              to="/SignUp"
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
};

export default LoginForm;
