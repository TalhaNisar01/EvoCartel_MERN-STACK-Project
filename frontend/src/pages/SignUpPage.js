import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../helpers/imageTobase64'; // Import the function
import '../App.css'; // Import your custom CSS file
import summaryApi from "../common/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [profilePicBase64, setProfilePicBase64] = useState(null); // State for base64 image
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      profilePicture: file
    }));

    if (file) {
      try {
        const base64 = await imageToBase64(file);
        setProfilePicBase64(base64);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setError(""); // Clear any previous errors

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profilePicture) {
        formData.append("profilePic", data.profilePicture);
    }

    console.log("Sign Up Successfully", data);

    try {
        const dataResponse = await fetch(summaryApi.signUp.url, {
            method: summaryApi.signUp.method,
            body: formData // Send formData instead of JSON
        });

        const dataApi = await dataResponse.json();

        if (!dataResponse.ok) {
            // Handle specific error messages from the backend
            if (dataApi.message === "User already exists") {
                throw new Error(dataApi.message);
            } else {
                throw new Error(`HTTP error! status: ${dataResponse.status}`);
            }
        }

        console.log("SignUp Data:", dataApi);

        // Show success message
        toast.success('User successfully created!', {
            style: {
                background: 'linear-gradient(to right, #4a90e2, #9013fe)',
                color: 'white'
            }
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    } catch (error) {
        console.error("Error signing up:", error);

        // Show error message based on the error
        if (error.message === "User already exists") {
            toast.error('User already exists. Please use a different email.', {
                style: {
                    background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                    color: 'white'
                }
            });
        } else {
            toast.error('Failed to sign up. Please try again.', {
                style: {
                    background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
                    color: 'white'
                }
            });
        }
    }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-4 mb-20">
      <div className="w-full max-w-md p-8 bg-white gradient-shadow rounded-lg border border-gray-300">
        <div className='flex flex-col items-center mb-4'>
          {profilePicBase64 ? (
            <img
              src={profilePicBase64}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <FaUserCircle size={50} className="text-gray-700 mb-2" />
          )}
          <label className="text-blue-500 hover:text-blue-700 cursor-pointer">
            <input
              type="file"
              accept="image/*"  // Filter to only accept image files
              onChange={handleFileChange}
              className="hidden"
            />
            Upload Photo
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
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
              required
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
              required
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
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleToggleConfirmPassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-8"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 gradient-button text-white font-bold rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
