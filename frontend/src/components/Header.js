import React from 'react';
import Logo from './Logo';
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import '../App.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-20 shadow-md bg-white'>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className='cursor-pointer'>
          <Link to='/'> <Logo w={200} h={65}/> </Link>
         
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
        <div className="flex items-center mx-6 mt-4">
          <div className="cursor-pointer text-3xl mr-2">
            <FaRegUserCircle />
          </div>
          <div className='text-3xl relative'>
            <span> <IoCartSharp /></span>
            <div className='bg-gray-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          <div className="mx-4">
            <Link to='./Login'>
            <button className='gradient-button'>Login</button>
            </Link>
           
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
